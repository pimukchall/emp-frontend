<template>
      <p v-if="$fetchState.pending">Fetching...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
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
                        <p>หมายเลขครุภัณฑ์: {{ equipment.asset_number }}</p>
                        <p>หมายเลขเอกสาร: {{ equipment.document_number }}</p>
                        <p>ราคา: {{ equipment.price }}</p>
                        <p>จำนวน: {{ equipment.quantity }}</p>
                        <p>วันที่ลงทะเบียน: {{ formatDate(equipment.created_at) }}</p>
                        <p>วันที่เบิก: {{ formatDate(equipment.date_out) }}</p>
                    </v-card-text>
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
  export default {
  layout: 'user',
  middleware: 'auth',
    data() {
      return {
        search: '',
        equipments: [],
        location: [],
        users: [],
        store: [],
        currentExpanded: null,
      }
    },
    computed: {
      filtered() {
        return this.equipments.filter(equipment => {
          return equipment.asset_number.toLowerCase().includes(this.search.toLowerCase());
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
    },
  }
  </script>