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
        <v-card-title class="headline">ลงทะเบียนอุปกรณ์</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.name"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรายการ']"
                  label="ชื่อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="uSer"
                  v-model="form.user_id"
                  item-text="fname"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกผู้รับผิดชอบ']"
                  label="ผู้รับผิดชอบ"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.asset_number"
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสทรัพย์สิน']"
                  label="รหัสทรัพย์สิน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="lOcation"
                  v-model="form.location_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกสถานที่']"
                  label="สถานที่"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.document_number"
                  :rules="[(v) => !!v || 'กรุณากรอกหมายเลขเอกสาร']"
                  label="หมายเลขเอกสาร"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="sTore"
                  v-model="form.store_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกสาขาที่ซื้อ']"
                  label="สาขาที่ซื้อ"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.quantity"
                  :rules="[
                    (v) => !!v || 'กรุณากรอกจำนวน',
                    (v) => /^\d+$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น'
                  ]"
                  label="จำนวน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.price"
                  :rules="[
                    (v) => !!v || 'กรุณากรอกราคา',
                    (v) => /^\d+$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น'
                  ]"
                  label="ราคา"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.image"
                  label="รูปภาพ"
                  outlined
                ></v-text-field>
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
                <v-checkbox
                  v-model="agree"
                  label="ยอมรับข้อตกลงและเงื่อนไข"
                ></v-checkbox>
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="create"
                    :disabled="!valid"
                    depressed
                    color="secondary"
                    >เพิ่มรายการ</v-btn
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
  middleware: 'auth',
  head() {
    return {
      title: 'ลงทะเบียนอุปกรณ์',
    }
  },
  data() {
    return {
      form: {
        name: '',
        location_id: null,
        user_id: null,
        store_id: null,
        asset_number: '',
        document_number: '',
        price: '',
        quantity: '',
        image: '',
        date_in: new Date().toISOString().substr(0, 10),
      },
      uSer: [],
      sTore: [],
      lOcation: [],
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

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
      agree: false,
    }
  },

  computed: {
    formattedDate() {
      return moment(this.form.date_in).format('Do MMMM YYYY');
    },
  },

  async fetch() {
    await this.fetchUserData()
    await this.fetchStoreData()
    await this.fetchLocationData()

  },

  methods: {
    async create() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        const req = await this.$store.dispatch('api/equipment/postEquipments', this.form)

        this.modal.confirm.open = false
        this.modal.complete.open = true
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
    goBack() {
      this.$router.push('/admin/equipment')
    },
    async fetchUserData() {
            const USer = await this.$store.dispatch(
              'api/user/getUsers'
            )
            this.uSer = USer
        },
    async fetchStoreData() {
            const STore = await this.$store.dispatch(
              'api/store/getStores'
              )
            this.sTore = STore
        },
    async fetchLocationData() {
            const LOcation = await this.$store.dispatch(
              'api/location/getLocations'
              )
            this.lOcation = LOcation
        },
  },
}
</script>
