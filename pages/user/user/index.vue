<template>
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายชื่อผู้ใช้</h1>
      <div>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
              hide-details></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col v-for="user in filtered" :key="user.id" cols="12" md="4">
            <v-card elevation="6" shaped>
              <v-col cols="12" md="4">
                <v-avatar color="primary" size="75">
                  <v-img :src="user.image" alt="Avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-card-title>{{ user.fname }}</v-card-title>
              <v-card-subtitle>
                แผนก: {{ mapDataDepartment(user.department_id) }}
                <br>
                สิทธิ์: {{ mapDataRole(user.role_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(user.id)">
                  <v-icon>{{ isExpanded(user.id) ? 'mdi-chevron-up' :
                  'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(user.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>ชื่อ : {{ user.fname }}</p>
                    <p>นามสกุล : {{ user.lname }}</p>
                    <p>อีเมล : {{ user.email }}</p>
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
</template>

<script>
import moment from 'moment';
moment.locale('th');
export default {
  layout: 'user',
  data() {
    return {
      search: '',
      users: [],
      departments: [],
      roles: [],
      currentExpanded: null,
    };
  },

  computed: {
    filtered() {
      return this.users.filter(user => {
        return user.fname.toLowerCase().includes(this.search.toLowerCase()) ||
          user.lname.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase()) ||
          user.phone.toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapDataDepartment(user.department_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapDataRole(user.role_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.formatDate(user.date_in).toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async fetch() {
    await this.fetchUserData();
    await this.fetchDepartmentData();
    await this.fetchRoleData();
  },

  methods: {
    async fetchUserData() {
      this.users = await this.$store.dispatch('api/user/getUsers');
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
};
</script>
