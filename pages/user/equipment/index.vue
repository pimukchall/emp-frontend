<template>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>รายการอุปกรณ์</h1>
        <div>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col v-for="equipment in filtered" :key="equipment.id" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ equipment.asset_number }}</v-card-title>
                <v-card-subtitle>
                  ผู้รับผิดชอบ: {{ mapUser(equipment.user_id)}} 
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="toggleExpansion(equipment.id)">
                    <v-icon>{{ isExpanded(equipment.id) ? 'mdi-chevron-up' :
                      'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="isExpanded(equipment.id)">
                    <v-divider></v-divider>
                    <v-card-text>
                        <p>ชื่อรายการ: {{ equipment.name }}</p>
                        <p>สถานที่: {{ mapLocation(equipment.location_id) }}</p>
                        <p>ผู้รับผิดชอบ: {{ mapUser(equipment.user_id) }}</p>
                        <p>ร้านที่ซื้อ: {{ mapStore(equipment.store_id) }}</p>
                        <p>รหัสทรัพย์สิน: {{ equipment.asset_number }}</p>
                        <p>หมายเลขเอกสาร: {{ equipment.document_number }}</p>
                        <p>ราคา: {{ equipment.price }}</p>
                        <p>จำนวน: {{ equipment.quantity }}</p>
                        <p>วันที่ลงทะเบียน: {{ formatDate(equipment.created_at) }}</p>
                        <p>วันที่เบิก: {{ formatDate(equipment.date_out) }}</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <div>
                      <div class="text-center">
                        <qrcode-vue v-if="showQR" :value="generateData(equipment)" :size="200"></qrcode-vue>
                        <vue-barcode v-else :value="equipment.asset_number" :options="{width: 1, height: 30}"></vue-barcode>
                      </div>
                      <div class="text-center">
                        <v-btn @click="toggleDisplay">{{ showQR ? 'แสดง Barcode' : 'แสดง QR Code' }}</v-btn>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
  </template>
  <script>
  import moment from 'moment';
  moment.locale('th');
  import QrcodeVue from 'qrcode.vue';
  import VueBarcode from 'vue-barcode';
  export default {
  layout: 'user',
    data() {
      return {
        search: '',
        equipments: [],
        location: [],
        users: [],
        store: [],
        currentExpanded: null,
        showQR: true,
      }
    },
    components: {
      QrcodeVue,
      VueBarcode,
    },
    computed: {
      filtered() {
        return this.equipments.filter(equipment => {
          return equipment.asset_number.toLowerCase().includes(this.search.toLowerCase()) ||
            equipment.name.toLowerCase().includes(this.search.toLowerCase()) ||
            this.mapUser(equipment.user_id).toLowerCase().includes(this.search.toLowerCase()) ||
            this.mapLocation(equipment.location_id).toLowerCase().includes(this.search.toLowerCase()) ||
            this.mapStore(equipment.store_id).toLowerCase().includes(this.search.toLowerCase()) ||
            equipment.asset_number.toLowerCase().includes(this.search.toLowerCase()) ||
            equipment.document_number.toLowerCase().includes(this.search.toLowerCase()) ||
            equipment.price.toString().toLowerCase().includes(this.search.toLowerCase()) ||
            equipment.quantity.toString().toLowerCase().includes(this.search.toLowerCase()) ||
            this.formatDate(equipment.created_at).toLowerCase().includes(this.search.toLowerCase()) ||
            this.formatDate(equipment.date_out).toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
    async fetch() {
      await this.fetchEquipmentData()
      await this.fetchUserData()
      await this.fetchStoreData()
    },
    methods: {
      async fetchEquipmentData() {
        this.equipments = await this.$store
          .dispatch('api/equipment/getEquipments')
      },
      async fetchUserData() {
        this.users = await this.$store
          .dispatch('api/user/getUsers')
      },
      async fetchStoreData() {
        this.store = await this.$store
          .dispatch('api/store/getStores')
      },
      async fetchLocationData() {
        this.location = await this.$store
          .dispatch('api/location/getLocations')
      },
      mapUser(id) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
            return this.users[i].fname + ' ' + this.users[i].lname
          }
        }
        return 'ไม่มีข้อมูลผู้ใช้'
      },
      mapStore(id) {
        for (let i = 0; i < this.store.length; i++) {
          if (this.store[i].id === id) {
            return this.store[i].name
          }
        }
        return 'ไม่มีข้อมูลสาขา'
      },
      mapLocation(id) {
        for (let i = 0; i < this.location.length; i++) {
          if (this.location[i].id === id) {
            return this.location[i].name
          }
        }
        return 'ไม่มีข้อมูลสาขา'
      },
      isExpanded(id) {
        return this.currentExpanded === id;
      },
      toggleExpansion(id) {
        this.currentExpanded = this.currentExpanded === id ? null : id;
      },
      formatDate(date) {
        return moment(date).format('Do MMMM YYYY');
      },
      generateData(equipment) {
        return JSON.stringify({
          รหัสทรัพย์สิน: equipment.asset_number,
          ชื่อรายการ: equipment.name,
          สถานที่: this.mapLocation(equipment.location_id),
          ผู้รับผิดชอบ: this.mapUser(equipment.user_id),
          ร้านที่ซื้อ: this.mapStore(equipment.store_id),
          หมายเลขเอกสาร: equipment.document_number,
          ราคา: equipment.price,
          จำนวน: equipment.quantity,
          วันที่ลงทะเบียน: this.formatDate(equipment.created_at),
          วันที่เบิก: this.formatDate(equipment.date_out),
        });
      },
      toggleDisplay() {
        this.showQR = !this.showQR;
      },
    },
  }
  </script>