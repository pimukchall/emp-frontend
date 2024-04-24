<template>
    <div>
    <UserEditUser :open="editUserDialog" :edit.sync="editUserDialog" :data="editUserData" />
    <UserEditPassword :open="editPasswordDialog" :edit.sync="editPasswordDialog" :data="editPasswordData" />
    <UserEditUpload :open="editUploadDialog" :edit.sync="editUploadDialog" :data="editUploadData" />  
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>ข้อมูลส่วนตัว</h1>
        <div>
          <v-row>
            <v-col 
              v-for="user in users" 
              :key="user.id" 
              cols="12"
              >
              <v-card 
                class="mx-auto"
                max-width="400"
                outlined
              >
              <v-col cols="12" md="4">
                <v-avatar color="primary" size="75">
                  <template v-if="user.file">
                    <v-img :src="`http://localhost:3001/${user.file}`" />
                  </template>
                  <template v-else>
                    <v-icon>mdi-account</v-icon>
                  </template>
                </v-avatar>
              </v-col>
                <v-card-title>{{ user.fname }} <br>
                {{ user.empcode }}
              </v-card-title>
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
                <v-btn class="mr-2">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="openEditUserDialog(user)">
                        <v-icon class="ml-2">mdi-pencil</v-icon>
                        <v-list-item-title class="ml-2" dense>แก้ไข</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="openEditPasswordDialog(user)">
                        <v-icon class="ml-2">mdi-lock</v-icon>
                        <v-list-item-title class="ml-2" dense>เปลี่ยนรหัสผ่าน</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="openEditUploadDialog(user)">
                        <v-icon class="ml-2">mdi-upload</v-icon>
                        <v-list-item-title class="ml-2" dense>อัพโหลด</v-list-item-title>
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
    layout: 'user',
    middleware: 'auth',
    data() {
      return {
        users: [],
        departments: [],
        roles: [],
        currentExpanded: null,
        editUserDialog: false,
        editUserData: {},
        editPasswordDialog: false,
        editPasswordData: {},
        editUploadDialog: false,
        editUploadData: {},
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
      this.editUserData = data;
      this.editUserDialog = true;
    },

    openEditPasswordDialog(data) {
      this.editPasswordData = data;
      this.editPasswordDialog = true;
    },
    
    openEditUploadDialog(data) {
      this.editUploadData = data;
      this.editUploadDialog = true;
    },
    }
  };
  </script>

  