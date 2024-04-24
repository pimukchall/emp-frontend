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
          <v-card-title class="headline">เพิ่มร้านค้า</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อร้านค้า']"
                    label="ชื่อร้านค้า"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.seller"
                    label="ชื่อผู้ขาย"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.phone"
                    :rules="[(v) => !!v || 'กรุณากรอกเบอร์โทรศัพท์'] && [(v) => (v && v.length === 10) || 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ']"
                    label="เบอร์โทรศัพท์"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.address"
                    :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
                    label="ที่อยู่ร้านค้า"
                    outlined
                    required
                  >
                  </v-textarea>
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
        title: 'เพิ่มร้านค้า',
      }
    },
    data() {
      return {
        form: {
            name: '',
            address: '',
            seller: '',
            phone: '',
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
          const req = await this.$store.dispatch('api/store/postStores', this.form)
          console.log(req)
          this.modal.complete.open = true
          this.recordLog()
        } catch (error) {
          console.error('เกิดข้อผิดพลาด:', error)
          this.modal.error.message = 'เกิดข้อผิดพลาด'
        }
      },
      goBack() {
        this.$router.push('/admin/store')
      },
      recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        action: 'เพิ่มข้อมูล',
        description: this.$auth.user.email + ' ' + 'เพิ่มข้อมูลร้านค้า' + ' ' + this.form.name + ' ' + 'เวลา' + ' ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      this.$store.dispatch('api/log/postLogs', log);
    },
    },
  }
  </script>
  