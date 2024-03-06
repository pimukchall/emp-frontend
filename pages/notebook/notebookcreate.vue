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
      :method="redirectToNotebook"
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
        max-height="auto"
      >
        <v-card-title class="headline">ลงทะเบียนอุปกรณ์</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.brand"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อยี่ห้อ']"
                  label="ชื่อยี่ห้อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.model"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรุ่น']"
                  label="ชื่อรุ่น"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.cpu"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ CPU']"
                  label="ชื่อ CPU"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.gpu"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ GPU']"
                  label="ชื่อ GPU"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.ram"
                  :rules="[(v) => !!v || 'กรุณากรอกขนาด RAM']"
                  label="ขนาด RAM"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.storage"
                  :rules="[(v) => !!v || 'กรุณากรอกขนาด Storage']"
                  label="ขนาด Storage"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.os"
                  :rules="[(v) => !!v || 'กรุณากรอกระบบปฏิบัติการ']"
                  label="ระบบปฏิบัติการ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.asset_number"
                  :rules="[(v) => !!v || 'กรุณากรอกหมายเลขครุภัณฑ์']"
                  label="หมายเลขครุภัณฑ์"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.license_window"
                  :rules="[(v) => !!v || 'กรุณากรอกหมายเลขลิขสิทธิ์ของ Windows']"
                  label="หมายเลขลิขสิทธิ์ของ Windows"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="uSer"
                  v-model="form.id"
                  item-text="username"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกผู้รับผิดชอบ']"
                  label="ผู้รับผิดชอบ"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="sTore"
                  v-model="form.id_store"
                  item-text="name_store"
                  item-value="id_store"
                  :rules="[(v) => !!v || 'กรุณาเลือกสาขาที่ซื้อ']"
                  label="สาขาที่ซื้อ"
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
                      label="วันที่ลงทะเบียน"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'กรุณากรอกวันที่ลงทะเบียน']"
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
                <v-textarea
                  v-model="form.note"
                  label="หมายเหตุ"
                  outlined
                  auto-grow
                ></v-textarea>
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
      title: 'ลงทะเบียนอุปกรณ์',
    }
  },
  data() {
    return {
      form: {
        brand: '',
        model: '',
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
        os: '',
        asset_number: '',
        license_window: '',
        id: null,
        id_store: null,
        date_in: new Date().toISOString().substr(0, 10),
        note: '',
      },
      uSer: [],
      sTore: [],
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      modal: {
        confirmRegister: {
          open: false,
          message: 'คุณต้องการลงทะเบียนอุปกรณ์หรือไม่?',
        },
        completeRegister: {
          open: false,
          message: 'ลงทะเบียนอุปกรณ์สำเร็จแล้ว',
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
    try {
      this.uSer = await this.$store.dispatch('api/user/getUsers');
      this.sTore = await this.$store.dispatch('api/store/getStores');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  methods: {
    async register() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        const req = await this.$store.dispatch('api/notebook/postNotebooks', this.form)

        console.log(req)
        this.modal.confirmRegister.open = false
        this.modal.completeRegister.open = true
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error)
      }
    },
    redirectToNotebook() {
      this.$router.push('/notebook')
    },
  },
}
</script>
