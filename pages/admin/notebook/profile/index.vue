<template>
    <div>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>รายการโน๊ตบุ๊ค</h1>
        <div>
        </div>
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
                    {{ product.brand }} {{ product.model }} <br>
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
                      <p>Brand: {{ product.brand }}</p>
                      <p>Model: {{ product.model }}</p>
                      <p>CPU: {{ product.cpu }}</p>
                      <p>GPU: {{ product.gpu }}</p>
                      <p>RAM: {{ product.ram }}</p>
                      <p>Storage: {{ product.storage }}</p>
                      <p>OS: {{ product.os }}</p>
                      <p>หมายเลขลิขสิทธิ์: {{ product.license }}</p>
                      <p>หมายเหตุ: {{ product.note }}</p>
                      <p>วันที่ลงทะเบียน: {{ formatDate(product.date_in) }}</p>
                      <p>วันที่ส่งมอบ: {{ formatDate(product.date_out) }}</p>
                      <p>วันที่ประกันหมด: {{ Expire(product.date_in) }}</p>
                      <p>ร้านที่ซื้อ: {{ mapStore(product.store_id) }}</p>
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
        // console.log('productId', productId)
        this.products = await this.$axios.$get(`/api/products/${productId}`)
        // console.log('products', this.products)
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
        // หาผู้ใช้จาก user_id ในรายการ users
        const user = this.users.find(user => user.id === userId);
        // ตรวจสอบว่ามีผู้ใช้หรือไม่
        if (user) {
          // หากมีผู้ใช้ ให้ค้นหา department_id จากผู้ใช้
          const departmentId = user.department_id;
          // ตรวจสอบว่า department_id มีค่าหรือไม่
          if (departmentId !== undefined && departmentId !== null) {
            // หากมีค่า ให้ค้นหาชื่อแผนกจากรายการ departments
            const department = this.departments.find(department => department.id === departmentId);
            // ตรวจสอบว่ามีข้อมูลแผนกหรือไม่
            if (department) {
              return department.name;
            } else {
              return 'ไม่มีข้อมูลแผนก';
            }
          } else {
            // หากไม่มีค่า department_id
            return 'ไม่มีข้อมูลแผนก';
          }
        } else {
          // หากไม่พบผู้ใช้
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
      Expire(date_in) {
        if (date_in) {
          return moment(date_in).add(3, 'years').format('Do MMMM YYYY')
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
  