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
                    v-model="data.name"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อรายการ']"
                    label="ชื่อรายการ"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="data.quantity"
                    :rules="[
                      (v) => !!v || 'กรุณากรอกจำนวน',
                      (v) => /^\d+$/.test(v) || 'กรุณากรอกจำนวนให้ถูกต้อง',
                    ]"
                    label="จำนวน"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="data.price"
                    :rules="[
                      (v) => !!v || 'กรุณากรอกราคา',
                      (v) =>
                        /^\d+(\.\d+)?$/.test(v) || 'กรุณากรอกราคาให้ถูกต้อง',
                    ]"
                    label="ราคา"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="data.asset_number"
                    :rules="[(v) => !!v || 'กรุณากรอกรหัสทรัพย์สิน']"
                    label="รหัสทรัพย์สิน"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="data.document_number"
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
                    v-model="data.user_id"
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
                    v-model="data.store_id"
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
                    v-model="data.location_id"
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
                    v-model="data.status_id"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'กรุณาเลือกสถานะ']"
                    label="สถานะ"
                    outlined
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
                <v-col cols="12" sm="6">
                      <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="data.date_in"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                      >
                          <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="formattedDateIn"
                                  label="วันที่รับเข้า"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  :rules="[(v) => !!v || 'กรุณากรอกวันที่รับเข้า']"
                                  outlined
                                  required
                              ></v-text-field>
                          </template>
                          <v-date-picker v-model="date1" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu1 = false">ยกเลิก</v-btn>
                              <v-btn text color="primary" @click="$refs.menu1.save(date1)">ยืนยัน</v-btn>
                          </v-date-picker>
                      </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6">
                      <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :return-value.sync="data.date_out"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                      >
                          <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="formattedDateOut"
                                  label="วันที่ส่งมอบ"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  :rules="[(v) => !!v || 'กรุณากรอกวันที่ส่งมอบ']"
                                  outlined
                              ></v-text-field>
                          </template>
                          <v-date-picker v-model="date2" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu2 = false">ยกเลิก</v-btn>
                              <v-btn text color="primary" @click="$refs.menu2.save(date2)">ยืนยัน</v-btn>
                          </v-date-picker>
                      </v-menu>
                  </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-textarea 
                    v-model="data.note" 
                    label="หมายเหตุ" 
                    outlined
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="confirm"
            :disabled="!valid"
            depressed
            color="primary"
            class="font-weight-medium mt-3"
            >
            ยืนยัน
          </v-btn>
          <v-btn 
            color="error" 
            @click="cancel" 
            class="font-weight-medium mt-3"
          >
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
      menu1: false,
      menu2: false,
      userOptions: [],
      storeOptions: [],
      locationOptions: [],
      statusOptions: [],

      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),

      modal: {
        confirm: {
            open: false,
            message: 'ยืนยันการแก้ไขข้อมูลหรือไม่?',
          },
        complete: {
          open: false,
          message: 'แก้ไขข้อมูลสำเร็จ',
        },
        error: {
          open: false,
          message: 'ขออภัย กรุณากรอกข้อมูลให้ครบถ้วน',
        },
      },
    }
  },

  computed: {
    formattedDateOut() {
        return moment(this.data.date_out).format('Do MMMM YYYY')
      },
      formattedDateIn() {
        return moment(this.data.date_in).format('Do MMMM YYYY')
      },
  },

  async fetch() {
    await Promise.all([
      this.fetchUserData(),
      this.fetchStoreData(),
      this.fetchLocationData(),
      this.fetchStatusData(),
    ])
  },

  methods: {
    async confirm() {
      try {
        this.$emit('update:edit', false)
        this.modal.confirm.open = true
      } catch (error) {
        this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
      }
    },
    cancel() {
      this.$emit('update:edit', false)
    },
    async UpdateData() {
      try {
        const req = await this.$store.dispatch('api/product/putProducts', this.data)
        this.modal.complete.open = true
        console.log('Data:', this.data);
        this.recordLogUpdate(this.data.id);
      } catch (error) {
        this.modal.error.open = true
      }
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
      const location = await this.$store.dispatch('api/location/getLocations')
      this.locationOptions = location
    },
    async fetchStatusData() {
      const status = await this.$store.dispatch('api/status/getStatus')
      this.statusOptions = status
    },
    recordLogUpdate(id) {
      const product = this.data.name + ' ' + this.data.asset_number
      const log = {
        user_id: this.$auth.user.id,
        product_id: id,
        action: 'อัพเดทข้อมูล',
        description: this.$auth.user.email + ' ' + 'อัพเดทข้อมูลอุปกรณ์' + ' ' + product + ' ' + 'เวลา' + ' ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
  }
}
</script>
