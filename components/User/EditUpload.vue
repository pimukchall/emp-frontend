<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="UploadFile"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />

    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      v-if="data"
      max-width="650"
      max-height="300"
      content-class="rounded-xl"
    >
      <v-card class="rounded-xl">
        <v-card-title>อัพโหลดรูป</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="file"
                  :rules="[
                    (v) => {
                      if (!v) return 'กรุณาเลือกรไฟล์';
                      if (!['image/jpeg', 'image/png'].includes(v.type)) {
                        return 'อัพได้เฉพาะ รูปเท่านั้น';
                      }
                      if (v.size > 5000000) {
                        return 'ขนาดของรูปภาพต้องไม่เกิน 5 เมกะไบต์';
                      }
                      return true;
                    }
                  ]" 
                  accept="image/*"
                  label="เลือกรูปภาพ"
                  outlined
                  required
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" 
                    @click="confirm" 
                    :disabled="!valid"
                    depressed 
                    class="font-weight-medium mt-3">อัพโหลด</v-btn>
                  <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">ยกเลิก</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import moment from 'moment'
moment.locale('th')

export default {
  props: {
    method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
    },
  },

  data() {
    return {
      valid: false,
      date: new Date().toISOString().substr(0, 10),
      file: null,
      
      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการอัพโหลดหรือไม่?',
        },
        complete: {
          open: false,
          message: 'อัพโหลดสำเร็จ',
        },
        error: {
          open: false,
          message: '',
        },
      },
    }
  },

  methods: {
    async confirm() {
      try {
        if (!this.$refs.form.validate()) {
          this.modal.error.message = 'กรุณาเลือกรูปภาพ'
          this.modal.error.open = true
          return
        }
        this.$emit('update:edit', false)
        this.modal.confirm.open = true
      } catch (error) {
        this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
      }
    },
    cancel() {
      this.$emit('update:edit', false)
    },

    async UploadFile() {
        console.log('File:', this.file)
        try {
          const formData = new FormData()
          formData.append('file', this.file)
          const req = await this.$store.dispatch('api/file/postFiles', formData)
          let uploadedFilePath = req.path
          uploadedFilePath = uploadedFilePath.replace(/\\/g, '/')

          console.log('Upload:', uploadedFilePath)
          this.modal.complete.open = true

          await this.UpdateData(uploadedFilePath)

          this.file = null
          this.$emit('update:edit', false)

        } catch (error) {
          this.modal.error.message = 'กรุณาเลือกรูปภาพ'
        }
    },

    async UpdateData(uploadedFilePath) {
      try {
        const req = await this.$store.dispatch('api/file/putPathUser', {
          id: this.data.id,
          file: uploadedFilePath,
        })
        console.log('Update:', req)

        this.recordLogUpdate(this.data.id)
      } catch (error) {
        this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
      }
    },

    recordLogUpdate(id) {
      const log = {
        user_id: this.$auth.user.id,
        action: 'อัพโหลดไฟล์',
        description: this.$auth.user.email + ' ' + `อัพเดทข้อมูลผู้ใช้งาน ID: ${id}` + ' ' + this.data.fname + ' ' + 'เวลา: ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
   
  },
}
</script>
