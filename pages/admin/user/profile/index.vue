<template>
    <div>
    <UserEditDialog :open="editDialog" :edit.sync="editDialog" :data="editData" />
    <UserEditPassword :open="editPasswordDialog" :edit.sync="editPasswordDialog" :data="editPasswordData" />
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>ข้อมูลส่วนตัว</h1>
        <div>
          <v-row>
            <v-col v-for="user in users" :key="user.id" cols="12">
              <v-card 
                class="mx-auto"
                max-width="400"
                outlined
              >
                <v-card-title>{{ user.fname }}</v-card-title>
                <v-card-subtitle>
                  แผนก: {{ mapDataDepartment(user.department_id) }}
                  <br>
                  สิทธิ์: {{ mapDataRole(user.role_id) }}
                </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text>
                      <p>ชื่อ : {{ user.fname }}</p>
                      <p>นามสกุล : {{ user.lname }}</p>
                      <p>อีเมล : {{ user.email }}</p>
                      <p>เบอร์ติดต่อ : {{ user.phone }}</p>
                      <p>วันที่สมัคร : {{ formatDate(user.date_in) }}</p>
                    </v-card-text>
                    <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="success" dark @click="openEditUserDialog(user)">
                  แก้ไขข้อมูล
                </v-btn>
                <v-btn class="ma-2" color="warning" dark @click="openEditPasswordDialog(user)">
                    เปลี่ยนรหัสผ่าน
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
    data() {
      return {
        users: [],
        departments: [],
        roles: [],
        currentExpanded: null,
        editDialog: false,
        editData: {},
        editPasswordDialog: false,
        editPasswordData: {},
      };
    },
  
    async fetch() {
      await this.fetchUserData();
      await this.fetchDepartmentData();
      await this.fetchRoleData();
    },
  
    methods: {
      async fetchUserData() {
        try {
            this.users = await this.$axios.$get('/api/users/' + this.$auth.user.id);
        } catch (error) {
            }
      },
      async fetchDepartmentData() {
        this.departments = await this.$store.dispatch('api/department/getDepartments');
      },
      mapDataDepartment(id) {
        for (let i = 0; i < this.departments.length; i++) {
          if (this.departments[i].id === id) {
            return this.departments[i].name;
          }
        }
        return 'ไม่มีแผนก';
      },
      async fetchRoleData() {
        this.roles = await this.$store.dispatch('api/role/getRoles');
      },
      mapDataRole(id) {
        for (let i = 0; i < this.roles.length; i++) {
          if (this.roles[i].id === id) {
            return this.roles[i].name;
          }
        }
        return 'ไม่มีสิทธิ์';
      },
  
      formatDate(date) {
        return moment(date).format('Do MMMM YYYY');
      },
      openEditUserDialog(data) {
      this.editData = data;
      this.editDialog = true;
    },

    openEditPasswordDialog(data) {
      this.editPasswordData = data;
      this.editPasswordDialog = true;
    },
    },
  };
  </script>

  