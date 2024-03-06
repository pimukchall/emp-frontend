<template>
  <div>
    <ModalConfirm
      :open="modal.confirmRegister.open"
      :message="modal.confirmRegister.message"
      :method="register"
      :confirm.sync="modal.confirmRegister.open"
    />
    <ModalComplete
      :open="modal.completeRegister.open"
      :message="modal.completeRegister.message"
      :method="redirectToLogin"
      :complete.sync="modal.completeRegister.open"
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
                  v-model="form.username"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                  label="ชื่อผู้ใช้"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  :rules="[(v) => !!v || 'กรุณากรอกอีเมล']"
                  label="อีเมล"
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
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
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
                    (v) => v === form.password || 'Password does not match',
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
                <v-text-field
                  v-model="form.phone"
                  :rules="[(v) => !!v || 'กรุณากรอกเบอร์ติดต่อ']"
                  label="เบอร์ติดต่อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="departMents"
                  v-model="form.id_department"
                  item-text="name_department"
                  item-value="id_department"
                  :rules="[(v) => !!v || 'กรุณาเลือกแผนก']"
                  label="แผนก"
                  outlined
                  required
                >
                </v-select>
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
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.avatar"
                  :rules="[(v) => !!v || 'กรุณากรอกลิงค์รูปภาพ']"
                  label="ลิงค์รูปภาพ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-checkbox
                  v-model="agree"
                  label="ยอมรับข้อตกลงและเงื่อนไข"
                ></v-checkbox>
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="register"
                    :disabled="!valid"
                    depressed
                    color="secondary"
                    >สมัคร</v-btn
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
import moment from 'moment';
moment.locale('th');

export default {
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
        id_department: null,
        date_in: new Date().toISOString().substr(0, 10),
        avatar: null,
      },
      confirmPassword: '',
      show1: false,
      show2: false,
      departMents: [],
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      modal: {
        confirmRegister: {
          open: false,
          message: 'คุณต้องการสมัครสมาชิกใช่หรือไม่',
        },
        completeRegister: {
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
      valid: false,
      agree: false,
    }
  },

  computed: {
    formattedDate() {
      return moment(this.form.date_in).format('Do MMMM YYYY');
    },
  },

  async fetch() {
    const DepartMents = await this.$store.dispatch(
      'api/department/getDepartments'
    )
    this.departMents = DepartMents
  },

  methods: {
    async register() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        const req = await this.$store.dispatch('api/user/postUsers', this.form)

        console.log(req)
        this.modal.confirmRegister.open = false
        this.modal.completeRegister.open = true
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error)
      }
    },
    redirectToLogin() {
      this.$router.push('/auth/login')
    },
  },
}
</script>
