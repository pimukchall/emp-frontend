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
    <ModalLoading
      :open="modal.loading.open"
      :message="modal.loading.message"
      :method="goBack"
      :loading.sync="modal.loading.open"
    />
    <v-container>
      <v-card
        class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
        max-width="800"
        max-height="auto"
      >
        <v-card-title class="headline">ลงทะเบียนลูกค้า</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.fname"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อจริง']"
                    label="ชื่อจริง"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.lname"
                    :rules="[(v) => !!v || 'กรุณากรอกนามสกุล']"
                    label="นามสกุล"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.idcard"
                    :rules="[(v) => !!v || 'กรุณากรอกรหัสประจำตัวประชาชน', (v) => (v && v.length === 13) || 'รหัสประจำตัวประชาชนต้องมีความยาว 13 ตัวอักษร']"
                    label="รหัสประจำตัวประชาชน"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.companay_number"
                    label="รหัสเสียภาษีของบริษัท (ถ้ามี)"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    :rules="[
                      (v) => !!v || 'กรุณากรอกอีเมล',
                      (v) => /.+@.+\..+/.test(v) || 'อีเมลไม่ถูกต้อง',
                    ]"
                    label="อีเมล"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.phone"
                    :rules="[
                      (v) => !!v || 'กรุณากรอกเบอร์ติดต่อ',
                      (v) =>
                        (v && v.length === 10) ||
                        'เบอร์ติดต่อต้องมีความยาว 10 ตัวอักษร',
                    ]"
                    label="เบอร์ติดต่อ"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.address"
                    :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
                    label="ที่อยู่"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.link"
                    label="ลิงก์ (ถ้ามี)"
                    outlined
                  >
                  </v-text-field>
                </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.date_in"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedDate"
                      label="วันที่สมัคร"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'กรุณากรอกวันที่สมัคร']"
                      outlined
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >ยกเลิก</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
                      >ยืนยัน</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="confirm"
                    :disabled="!valid"
                    depressed
                    color="secondary"
                    class="font-weight-medium mt-3"
                    >ลงทะเบียน
                    </v-btn>
                    <v-btn 
                    color="error" 
                    @click="goBack"
                    class="font-weight-medium mt-3"
                    >ยกเลิก
                  </v-btn>
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
  layout: 'super',
  middleware: 'auth',

  async mounted() {
    await this.checkRole()
  },
  
  head() {
    return {
      title: 'ลงทะเบียนลูกค้า',
    }
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        idcard: '',
        companay_number: '',
        email: '',
        phone: '',
        address: '',
        link: '',
        date_in: new Date().toISOString().substr(0, 10),
      },
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      valid: false,

      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการลงทะเบียนใช่หรือไม่',
        },
        complete: {
          open: false,
          message: 'ลงทะเบียนสำเร็จ',
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
    }
  },

  computed: {
    formattedDate() {
      return moment(this.form.date_in).format('Do MMMM YYYY')
    },
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
        const req = await this.$store.dispatch('api/customer/postCustomers',this.form)
        // console.log('req', req)
        // console.log('Data:', this.form)
        this.recordLog()
        this.modal.complete.open = true
      } catch (error) {
        this.modal.error.message = 'มีบัญชีนี้อยู่แล้ว กรุณาลองใหม่อีกครั้ง'
      }
    },
    goBack() {
      this.$router.push('/super/customer')
    },
    recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        action: 'เพิ่มข้อมูลลูกค้า',
        description: this.$auth.user.email + ' ' + 'เพิ่มข้อมูลลูกค้า' + ' ' + this.form.fname + ' ' + 'เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      this.$store.dispatch('api/log/postLogs', log);
    },
    async checkRole() {
      if (this.$auth.user.role_id === 1) {
        this.$router.push('/super/customer/create')
      } else if (this.$auth.user.role_id === 2) {
        this.$router.push('/admin/customer/create')
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>
