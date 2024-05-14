<template>
    <div>
      <CustomerEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>ข้อมูลส่วนตัว</h1>
        <div>
          <v-row>
            <v-col 
              v-for="customer in customers" 
              :key="customer.id" 
              cols="12"
              >
              <v-card 
                class="mx-auto"
                max-width="400"
                outlined
              >
                <v-card-title>
                  {{ customer.fname }} <br />
              </v-card-title>
                <v-card-subtitle>
                  <p>เบอร์ติดต่อ : {{ customer.phone }}</p>
                </v-card-subtitle>
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
                    <v-card-actions>
                <v-spacer></v-spacer>
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
                        <v-list-item-title class="ml-2" dense>แก้ไข</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-btn>
              </v-card-actions>
                </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </template>
  <script>
  import moment from 'moment';
  moment.locale('th');
  export default {
    layout: 'admin',
    middleware: 'auth',
    async mounted() {
      await this.checkRole()
    },
    data() {
      return {
        customers: [],
        editDialog: false,
        editData: {},
      };
    },
    async fetch() {
      await this.fetchCustomerData();
    },
    methods: {
      async fetchCustomerData() {
        const customerId = this.$route.query.id;
        this.customers = await this.$axios.$get(`/api/customers/${customerId}`);
      },
      formatDate(date) {
        return moment(date).format('Do MMMM YYYY');
      },
      openEditCustomerDialog(data) {
      this.editData = data;
      this.editDialog = true;
    },
    async checkRole() {
          if (this.$auth.user.role_id === 1) {
            this.$router.push('/super/customer/profile')
          } else if (this.$auth.user.role_id === 2) {
            this.$router.push('/admin/customer/profile')
          } else if (this.$auth.user.role_id === 3) {
            this.$router.push('/user/customer/profile')
          } else {
            this.$router.push('/auth/login')
          }
    },
    }
  };
  </script>

  