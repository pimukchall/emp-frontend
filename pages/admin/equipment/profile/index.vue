<template>
    <div>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <div>
            <v-col
              v-for="product in products"
              :key="product.id"
              cols="12"
            >
              <v-card 
                class="mx-auto"
                max-width="400"
                outlined
                >
                <v-card-actions>
                  <v-card-title>
                    {{ product.name }} <br>
                    {{ product.asset_number }}
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-chip :color="colorCheck(product.status_id)">
                    {{ mapStatus(product.status_id) }}
                  </v-chip>
                </v-card-actions>
                <v-card-subtitle>
                  ผู้รับผิดชอบ: {{ mapUser(product.user_id) }} <br>
                  แผนก: {{ mapDepartment(product.user_id) }} <br>
                  สถานที่: {{ mapLocation(product.location_id) }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
                    <v-divider></v-divider>
                    <v-card-text>
                      <p>จำนวน: {{ product.quantity }}</p>
                      <p>ราคา: {{ product.price }}</p>
                      <p>เลขที่เอกสาร: {{ product.document_number }}</p>
                      <p>ร้านที่ซื้อ: {{ mapStore(product.store_id) }}</p>
                      <p>วันที่ลงทะเบียน: {{ formatDate(product.date_in) }}</p>
                      <p>วันที่จัดส่ง: {{ formatDate(product.date_out) }}</p>
                      <p>หมายเหตุ: {{ product.note }}</p>
                      <p>ไฟล์ที่แนบ: {{ product.file }}</p>
                        <v-btn
                          v-if="product.file"
                          color="primary"
                          @click="openFile(product.file)"
                        >เปิด</v-btn>
                    </v-card-text>
              </v-card>
            </v-col>
        </div>
      </div>
    </div>
  </template>
  <script>
  import moment from 'moment'
  moment.locale('th')
  export default {
    layout: 'admin',
    middleware: 'auth',
    data() {
      return {
        products: [],
        location: [],
        users: [],
        store: [],
        status: [],
        departments: [],
      }
    },
  
    async fetch() {
      await this.fetchProductData()
      await this.fetchUserData()
      await this.fetchDepartmentData()
      await this.fetchStoreData()
      await this.fetchLocationData()
      await this.fetchStatusData()
    },
    methods: {
      async fetchProductData() {
        const productId = this.$route.query.id;
        this.products = await this.$axios.$get(`/api/products/${productId}`)
      },
      async fetchUserData() {
        this.users = await this.$store.dispatch('api/user/getUsers')
      },
      async fetchDepartmentData() {
        this.departments = await this.$store.dispatch('api/department/getDepartments')
      },
      async fetchStoreData() {
        this.store = await this.$store.dispatch('api/store/getStores')
      },
      async fetchLocationData() {
        this.location = await this.$store.dispatch('api/location/getLocations')
      },
      async fetchStatusData() {
        this.status = await this.$store.dispatch('api/status/getStatus')
      },
      mapUser(id) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
            return this.users[i].fname + ' ' + this.users[i].lname
          }
        }
        return 'ไม่มีข้อมูลผู้ใช้'
      },
      mapDepartment(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
          const departmentId = user.department_id;
          if (departmentId !== undefined && departmentId !== null) {
            const department = this.departments.find(department => department.id === departmentId);
            if (department) {
              return department.name;
            } else {
              return 'ไม่มีข้อมูลแผนก';
            }
          } else {
            return 'ไม่มีข้อมูลแผนก';
          }
        } else {
          return 'ไม่มีข้อมูลผู้ใช้';
        }
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
        return 'ไม่มีข้อมูลสถานที่'
      },
      mapStatus(id) {
        for (let i = 0; i < this.status.length; i++) {
          if (this.status[i].id === id) {
            return this.status[i].name
          }
        }
        return 'ไม่มีข้อมูลสถานะ'
      },
      formatDate(date) {
        if (date) {
          return moment(date).format('Do MMMM YYYY')
        }
        return 'ไม่มีข้อมูลวันที่'
      },
      openFile(file) {
        window.open(`http://localhost:3001/${file}`, '_blank')
      },
      colorCheck(status) {
        if (status === 1) {
          return 'success'
        } else if (status === 2) {
          return 'warning'
        } else if (status === 3) {
          return 'info'
        } else if (status === 4) {
          return 'error' 
        } else {
          return 'grey'
        }  
      },
    },
  }
  </script>
  