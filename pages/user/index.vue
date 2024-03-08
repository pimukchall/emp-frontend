<template>
  <div>
    <UserEditDialog :open="editDialog" :edit.sync="editDialog" :data="editData" />
    <p v-if="$fetchState.pending">Fetching Users...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <!-- {{ departments }} -->
      <h1>EMP Users</h1>
      <div>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
              hide-details></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right">
            <v-btn elevation="2" rounded @click="$fetch">รีเฟรช</v-btn>
            <v-btn elevation="2" rounded @click="gotoCreateUser">เพิ่มผู้ใช้</v-btn>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col v-for="user in filteredUsers" :key="user.id" cols="12" md="4">
            <v-card elevation="6" shaped>
              <v-col cols="12" md="4">
                <v-avatar color="primary" size="75">
                  <v-img :src="user.avatar" alt="Avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-card-title>{{ user.username }}</v-card-title>
              <!-- {{ user }} -->
              <v-card-subtitle>
                แผนก: {{ mapDepartment(user.id_department) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleUserExpansion(user.id)">
                  <v-icon>{{ isUserExpanded(user.id) ? 'mdi-chevron-up' :
                  'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-btn class="ma-2" color="success" dark @click="openEditUserDialog(user)">
                  แก้ไข
                  <v-icon dark right>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" dark @click="deleteUsersData(user.id)">
                  ลบ
                  <v-icon dark right>
                    mdi-cancel
                  </v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isUserExpanded(user.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>ชื่อจริง : {{ user.fname }}</p>
                    <p>นามสกุล : {{ user.lname }}</p>
                    <p>อีเมล : {{ user.email }}</p>
                    <p>รหัสผ่าน : {{ user.password }}</p>
                    <p>เบอร์ติดต่อ : {{ user.phone }}</p>
                    <p>วันที่สมัคร : {{ formatDate(user.date_in) }}</p>
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
import moment from 'moment';
moment.locale('th');

export default {
  layout: 'navbar-user',

  data() {
    return {
      search: '',
      users: [],
      departments: [],
      currentExpanded: null,
      editDialog: false,
      editData: {},
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async fetch() {
    await this.fetchUserData()
    await this.getDepartment()

  },
  methods: {
    async fetchUserData() {
      this.users = await this.$store
        .dispatch('api/user/getUsers')
    },
    async deleteUsersData(id) {
      try {
        const req = await this.$store
          .dispatch('api/user/deleteUsers', { params: { id } })
        console.log(req);
        this.$fetch()
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    gotoCreateUser() {
      this.$router.push('/auth/register')
    },
    openEditUserDialog(data) {
      console.log(data);
      this.editData = data
      this.editDialog = true
    },
    isUserExpanded(userId) {
      return this.currentExpanded === userId;
    },
    toggleUserExpansion(userId) {
      this.currentExpanded = this.currentExpanded === userId ? null : userId;
    },
    formatDate(date) {
      return moment(date).format('Do MMMM YYYY');
    },
    async getDepartment() {
      this.departments = await this.$store
        .dispatch('api/department/getDepartments')
    },
    mapDepartment(id) {
      for (let i = 0; i < this.departments.length; i++) {
        console.log(this.departments.length)
        // console.log(this.departments[i])
        // console.log(this.departments)
        if (this.departments[i].id_department === id) {
          return this.departments[i].name_department
        }
        else { return 'ไม่มีแผนก' }
      }
    },
  },
}
</script>