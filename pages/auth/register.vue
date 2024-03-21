<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="register"
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
                  :items="departMents"
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
              <v-col cols="12" sm="6">
                <v-select
                  :items="roles"
                  v-model="form.role_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกตำแหน่ง']"
                  label="ตำแหน่ง"
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
                  v-model="form.image"
                  label="ลิงค์รูปภาพ"
                  outlined
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
  layout: 'admin',
  middlewares: 'admin',
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
        role_id: null,
        date_in: new Date().toISOString().substr(0, 10),
        image: null,
      },
      emailRules: [
        (v) => !!v || 'กรุณากรอกอีเมล',
        (v) => /.+@.+\..+/.test(v) || 'อีเมลไม่ถูกต้อง',
      ],
      confirmPassword: '',
      show1: false,
      show2: false,
      departMents: [],
      roles: [],
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

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
    await this.fetchDepartMents();
    await this.fetchRoles();
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
        this.modal.confirm.open = true
        this.modal.complete.open = true
      } catch (error) {
        this.modal.error.message = 'มีบัญชีนี้อยู่แล้ว กรุณาลองใหม่อีกครั้ง'
      }
    },
    goBack() {
      this.$router.push('/admin/user')
    },
    async fetchDepartMents() {
      const DepartMents = await this.$store.dispatch('api/department/getDepartments')
      this.departMents = DepartMents
    },
    async fetchRoles() {
      const Roles = await this.$store.dispatch('api/role/getRoles')
      this.roles = Roles
    },
  },
}
</script>
