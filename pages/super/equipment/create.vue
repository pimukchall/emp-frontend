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
                  label="ชื่อรายการ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.quantity"
                  :rules= "[(v) => !!v || 'กรุณากรอกจำนวน', v => /^\d+$/.test(v) || 'กรุณากรอกจำนวนให้ถูกต้อง']"
                  label="จำนวน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.price"
                  :rules= "[(v) => !!v || 'กรุณากรอกราคา', v => /^\d+(\.\d+)?$/.test(v) || 'กรุณากรอกราคาให้ถูกต้อง']"
                  label="ราคา"
                  outlined
                  required
                >
                </v-text-field>
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
                  :items="userOptions"
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
                <v-select
                  :items="storeOptions"
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
                  <v-select
                    :items="locationOptions"
                    v-model="form.location_id"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'กรุณาเลือกสถานที่ตั้ง']"
                    label="สถานที่ตั้ง"
                    outlined
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="statusOptions"
                    v-model="form.status_id"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'กรุณาเลือกสถานะ']"
                    label="สถานะ"
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
                  <v-textarea
                      v-model="form.note"
                      label="หมายเหตุ"
                      outlined
                      >
                  </v-textarea>
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
import moment from 'moment'
moment.locale('th')

export default {
  layout: 'super',
  middleware: 'auth',
  head() {
    return {
      title: 'ลงทะเบียนอุปกรณ์',
    }
  },
  data() {
    return {
      form: {
        category_id: 11,
        name: '',
        quantity: '',
        price: '',
        asset_number: '',
        document_number: '',
        user_id: '',
        store_id: '',
        location_id: '',
        status_id: '',
        date_in: new Date().toISOString().substr(0, 10),
        note: '',

      },
      userOptions: [],
      storeOptions: [],
      locationOptions: [],
      statusOptions: [],

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
      return moment(this.form.date_in).format('Do MMMM YYYY')
    },
  },

  async fetch() {
    await this.fetchUserData()
    await this.fetchStoreData()
    await this.fetchLocationData()
    await this.fetchStatusData()
    
  },

  methods: {
    async create() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        const req = await this.$store.dispatch('api/product/postProducts',this.form)
        console.log(req)
        this.modal.confirm.open = true
        this.modal.complete.open = true
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
    goBack() {
      this.$router.push('/super/equipment')
    },
    async fetchUserData() {
      const user = await this.$store.dispatch('api/user/getUsers')
      this.userOptions = user
    },
    async fetchStoreData() {
      const store = await this.$store.dispatch('api/store/getStores')
      this.storeOptions = store
    },
    async fetchLocationData() {
      const Location = await this.$store.dispatch('api/location/getLocations')
      this.locationOptions = Location
    },
    async fetchStatusData() {
      const status = await this.$store.dispatch('api/status/getStatus')
      this.statusOptions = status
    }
  },
}
</script>
