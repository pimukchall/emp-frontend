<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="deleteData"
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
    <CustomerEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายชื่อผู้ใช้</h1>
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
          <v-col class="text-right">
            <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มข้อมูลลูกค้า</v-btn>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col v-for="customer in filtered" :key="customer.id" cols="12" md="4">
            <v-card elevation="6" shaped>
              <v-card-title>
                {{ customer.fname }} <br />
              </v-card-title>
              <v-card-subtitle>
                  <p>เบอร์ติดต่อ : {{ customer.phone }}</p>
                </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(customer.id)">
                  <v-icon>{{
                    isExpanded(customer.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-btn class="mr-2" @click="gotoProfile(customer.id)">
                  ดูรายละเอียด
                </v-btn>
                <v-btn class="mr-2">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="openEditCustomerDialog(customer)">
                        <v-icon class="ml-2">mdi-pencil</v-icon>
                        <v-list-item-title class="ml-2" dense
                          >แก้ไข</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="confirmDelete(customer.id)">
                        <v-icon class="ml-2">mdi-delete</v-icon>
                        <v-list-item-title class="ml-2" dense
                          >ลบ</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(customer.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                      <p>ชื่อ : {{ customer.fname }}</p>
                      <p>นามสกุล : {{ customer.lname }}</p>
                      <p>รหัสประจำตัวประชาชน : {{ customer.idcard }}</p>
                      <p>รหัสเสียภาษีของบริษัท : {{ customer.companay_number }}</p>
                      <p>อีเมล : {{ customer.email }}</p>
                      <p>วันที่สมัคร : {{ formatDate(customer.date_in) }}</p>
                      <p>ที่อยู่ : {{ customer.address }}</p>
                      <p>ลิงก์ : {{ customer.link }}</p>
                    </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
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
      search: '',
      date: new Date().toISOString().substr(0, 10),
      customers: [],
      currentExpanded: null,

      editDialog: false,
      editData: {},

      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการลบข้อมูลหรือไม่?',
        },
        complete: {
          open: false,
          message: 'ลบข้อมูลสำเร็จ',
        },
        error: {
          open: false,
          message: '',
        },
      },
    }
  },

  computed: {
    filtered() {
      return this.customers.filter((customer) => {
        return (
          customer.fname.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },

  mounted() {
    this.$fetch()
  },

  async fetch() {
    await this.fetchCustomerData()
  },

  methods: {
    async fetchCustomerData() {
      this.customers = await this.$store.dispatch('api/customer/getCustomers')
    },

    confirmDelete(id) {
      this.modal.confirm.open = true
      this.modal.confirm.message = 'ยืนยันการลบข้อมูลหรือไม่?'
      this.modal.confirm.id = id
    },
    async deleteData() {
      try {
        const req = await this.$store.dispatch('api/customer/deleteCustomers', {
          params: { id: this.modal.confirm.id },
        })

        this.modal.complete.open = true

        this.recordLogDelete(this.modal.confirm.id)

        this.$fetch()
      } catch (error) {
        this.modal.error.open = true
        this.modal.error.message =
          'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
      }
    },
    gotoCreate() {
      this.$router.push('/admin/customer/create')
    },

    openEditCustomerDialog(data) {
      this.editData = data
      this.editDialog = true
    },

    isExpanded(id) {
      return this.currentExpanded === id
    },

    toggleExpansion(id) {
      this.currentExpanded = this.currentExpanded === id ? null : id
    },

    formatDate(date) {
      return moment(date).format('Do MMMM YYYY')
    },
    async recordLogDelete(id) {
      const customer = this.customers.find((customer) => customer.id === id) 
      const log = {
        user_id: this.$auth.user.id,
        action: 'ลบข้อมูล',
        description:
          this.$auth.user.email +
          ' ' +
          'ลบข้อมูลลูกค้า' +
          ' ' +
          customer.fname +
          ' ' +
          'เวลา ' +
          moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
    gotoProfile(id) {
      this.$router.push({ 
      path: '/admin/customer/profile', 
      query: { id: id }
      });
      console.log(id);
    },
  },
}
</script>
