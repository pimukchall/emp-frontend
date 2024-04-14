<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="UpdateData"
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
      <v-card-title>{{ data.id }}</v-card-title>
      <v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                  <v-text-field
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      v-model="data.newPassword"
                      :rules="[
                      (v) => !!v || 'กรุณากรอกรหัสผ่านใหม่',
                      (v) => (v && v.length >= 8) || 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
                      ]"
                      @click:append="show1 = !show1"
                      label="รหัสผ่านใหม่"
                      required
                  ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                  <v-text-field
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      v-model="data.confirmPassword"
                      :rules="[
                      (v) => !!v || 'กรุณากรอกยืนยันรหัสผ่านใหม่',
                      (v) => (v && v.length >= 8) || 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
                      (v) => v === data.newPassword || 'รหัสผ่านไม่ตรงกัน',
                      ]"
                      @click:append="show2 = !show2"
                      label="ยืนยันรหัสผ่านใหม่"
                      required
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
            color="primary" 
            @click="confirm"                     
            :disabled="!valid"
            depressed 
            class="font-weight-medium mt-3">
          แก้ไข
        </v-btn>
        <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
          ยกเลิก
        </v-btn>
      </v-card-actions>
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
      confirmPassword: '',
      password: '',
      newPassword: '',
      show1: false,
      show2: false,

      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการแก้ไขข้อมูลหรือไม่?',
        },
        complete: {
          open: false,
          message: 'เสร็จสิ้น',
        },
        error: {
          open: false,
          message: '',
        },
      },
    };
  },

  methods: {
    async confirm() {
      try {
        if (!this.$refs.form.validate()) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.$emit('update:edit', false);
        this.modal.confirm.open = true;
      } catch (error) {
        this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      }
    },
    cancel() {
      this.$emit('update:edit', false);
    },
    async UpdateData() {
      try {
        if (this.data.newPassword !== this.data.confirmPassword) {
          this.modal.error.message = 'รหัสผ่านไม่ตรงกัน';
          return;
        }
        this.data.password = this.data.newPassword;
        const req = await this.$store.dispatch('api/user/putUsersPassword', this.data);
        this.modal.complete.open = true;
        this.recordLogUpdate(this.data.id);
      } catch (error) {
        this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      }
    },
    recordLogUpdate(id) {
      const log = {
        user_id: this.$auth.user.id,
        action: 'อัพเดทรหัสผ่าน',
        description: this.$auth.user.email + ' ' + `อัพเดทข้อมูลผู้ใช้งาน ID: ${id}` + ' ' + this.data.fname + ' ' + 'เวลา: ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
  },
};
</script>