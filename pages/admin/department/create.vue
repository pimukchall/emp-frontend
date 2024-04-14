<template>
    <div>
      <ModalConfirm
        :open="modal.confirm.open"
        :message="modal.confirm.message"
        :method="create"
        :confirm.sync="modal.confirm.open"
      />
      <ModalComplete
        :open="modal.complete.open"
        :message="modal.complete.message"
        :method="goBack"
        :complete.sync="modal.complete.open"
      />
      <ModalError
        :open="modal.error.open"
        :message="modal.error.message"
        :error.sync="modal.error.open"
      />
      <v-container>
        <v-card
          class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
          max-width="800"
          max-height="auto"
        >
          <v-card-title class="headline">เพิ่มแผนก</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อแผนก']"
                    label="ชื่อแผนก"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-card-actions class="justify-center">
                    <v-btn
                      @click="confirm"
                      :disabled="!valid"
                      depressed
                      color="secondary"
                      >เพิ่ม</v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  <script>
  import moment from 'moment'
  moment.locale('th')
  export default {
    layout: 'admin',
    middleware: 'auth',
    head() {
      return {
        title: 'เพิ่มแผนก',
      }
    },
    data() {
      return {
        form: {
            name: '',
        },
  
        modal: {
          confirm: {
            open: false,
            message: 'คุณต้องการเพิ่มรายการหรือไม่?',
          },
          complete: {
            open: false,
            message: 'เพิ่มรายการสำเร็จ',
          },
          error: {
            open: false,
            message: '',
          },
          loading: {
            open: false,
            message: 'กำลังโหลด...',
          },
        },
        valid: false,
      }
    },
  
    methods: {
      async confirm() {
      try {
        if (!this.$refs.form.validate()) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.modal.confirm.open = true
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
      async create() {
        try {
          const req = await this.$store.dispatch('api/department/postDepartments', this.form)
          console.log(req)
          this.modal.complete.open = true
          this.recordLog()
        } catch (error) {
          console.error('เกิดข้อผิดพลาด:', error)
          this.modal.error.message = 'เกิดข้อผิดพลาด'
        }
      },
      goBack() {
        this.$router.push('/admin/department')
      },
      recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        action: 'เพิ่มข้อมูล',
        description: this.$auth.user.email + ' ' + 'เพิ่มข้อมูลแผนก' + ' ' + this.form.name + ' ' + 'เวลา' + ' ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log);
    },
    },
  }
  </script>
  