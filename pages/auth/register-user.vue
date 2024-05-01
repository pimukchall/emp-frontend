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
      :loading.sync="modal.loading.open"
    />
    <v-container>
      <v-card
        class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
        max-width="800"
        max-height="1000"
      >
        <v-card-title class="headline">สมัครสมาชิก</v-card-title>
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
                  v-model="form.email"
                  :rules="emailRules"
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
                    (v) => (v && v.length === 10) || 'เบอร์ติดต่อต้องมีความยาว 10 ตัวอักษร',
                  ]"
                  label="เบอร์ติดต่อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  v-model="form.password"
                  :rules="[
                    (v) => !!v || 'กรุณากรอกรหัสผ่าน',
                    (v) => (v && v.length >= 8) || 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
                  ]"
                  password="input-10-2"
                  label="รหัสผ่าน"
                  @click:append="show1 = !show1"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  :rules="[
                    (v) => !!v || 'กรุณากรอกยืนยันรหัสผ่าน',
                    (v) => v === form.password || 'รหัสผ่านไม่ตรงกัน',
                    (v) => (v && v.length >= 8) || 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
                  ]"
                  password="input-10-2"
                  label="ยืนยันรหัสผ่าน"
                  @click:append="show2 = !show2"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="departmentOptions"
                  v-model="form.department_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกแผนก']"
                  label="แผนก"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="agree"
                  label="ยอมรับข้อตกลงและเงื่อนไข"
                  required
                ></v-checkbox>
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="confirm"
                    :disabled="!valid"
                    depressed
                    color="secondary"
                    class="font-weight-medium mt-3"
                    >สมัครสมาชิก
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
import moment from 'moment';
moment.locale('th');

export default {
  layout: 'guest',
  middlewares: 'auth',
  head() {
    return {
      title: 'สมัครสมาชิก',
    }
  },
  data() {
    return {
      form: {
        fname: null,
        lname: null,
        username: null,
        password: null,
        email: null,
        phone: null,
        department_id: null,
        role_id: 3,
        date_in: new Date().toISOString().substr(0, 10),
      },
      emailRules: [
        (v) => !!v || 'กรุณากรอกอีเมล',
        (v) => /.+@.+\..+/.test(v) || 'อีเมลไม่ถูกต้อง',
      ],
      confirmPassword: '',
      show1: false,
      show2: false,
      menu: false,
      departmentOptions: [],
      valid: false,
      agree: false,
      
      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการสมัครสมาชิกใช่หรือไม่',
        },
        complete: {
          open: false,
          message: 'สมัครสมาชิกสำเร็จ',
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

  async fetch() {
    await this.fetchDepartMents();
  },

  methods: {
    async confirm() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
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
        const req = await this.$store.dispatch('api/user/postUsers', this.form)
        this.recordLog()
        this.modal.complete.open = true
      } catch (error) {
        this.modal.error.message = 'มีบัญชีนี้อยู่แล้ว กรุณาลองใหม่อีกครั้ง'
      }
    },
    goBack() {
      this.$router.push('/guest/home')
    },
    async fetchDepartMents() {
      const department = await this.$store.dispatch('api/department/getDepartments')
      this.departmentOptions = department
    },
    recordLog(){
      const account = {
        email: this.form.email
      }
      const log = {
        action: 'สมัครสมาชิก',
        description: 'ได้เพิ่มสมาชิกใหม่ ' + account.email + ' เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log);

      this.$store.dispatch('api/log/postLogs', log);
    },
  },
}
</script>
