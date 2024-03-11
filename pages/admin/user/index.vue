<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="deleteData"
      :confirm.sync="modal.confirm.open"
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
    <UserEditDialog :open="editDialog" :edit.sync="editDialog" :data="editData" />
    <UserEditPassword :open="editPasswordDialog" :edit.sync="editPasswordDialog" :data="editPasswordData" />

    <p v-if="$fetchState.pending">Fetching...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>

    <div v-else>
      <h1>รายชื่อผู้ใช้</h1>
      <div>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
              hide-details></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right">
            <v-btn elevation="2" rounded @click="$fetch">รีเฟรช</v-btn>
            <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มผู้ใช้</v-btn>
          </v-col>
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
              <!-- {{ user }} -->
              <v-card-subtitle>
                แผนก: {{ mapData(user.department_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(user.id)">
                  <v-icon>{{ isExpanded(user.id) ? 'mdi-chevron-up' :
                  'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-btn class="ma-2" color="success" dark @click="openEditUserDialog(user)">
                  แก้ไขข้อมูล
                  <v-icon dark right>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" dark @click="deleteData(user.id)">
                  ลบ
                  <v-icon dark right>
                    mdi-cancel
                  </v-icon>
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
                    <v-btn class="ma-2" color="warning" dark @click="openEditPasswordDialog(user)">
                      เปลี่ยนรหัสผ่าน
                    </v-btn>
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
  layout: 'navbar-admin',

  data() {
    return {
      search: '',

      users: [],
      departments: [],

      currentExpanded: null,

      editDialog: false,
      editData: {},

      editPasswordDialog: false,
      editPasswordData: {},

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
    };
  },

  computed: {
    filtered() {
      return this.users.filter(user => {
        return user.fname.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async fetch() {
    await this.fetchUserData();
    await this.fetchDepartmentData();
  },

  methods: {
    async fetchUserData() {
      this.users = await this.$store.dispatch('api/user/getUsers');
    },


    async fetchDepartmentData() {
      this.departments = await this.$store.dispatch('api/department/getDepartments');
    },
    mapData(id) {
      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id === id) {
          return this.departments[i].name;
        }
      }
      return 'ไม่มีแผนก';
    },

    async deleteData(id) {
      try {
        const req = await this.$store.dispatch('api/user/deleteUsers', { params: { id } });
        this.modal.complete.open = true;
        this.$fetch();
      } catch (error) {
        this.modal.error.open = true;
        this.modal.error.message = 'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่';
      }
    },

    gotoCreate() {
      this.$router.push('/auth/register');
    },

    openEditUserDialog(data) {
      this.editData = data;
      this.editDialog = true;
    },

    openEditPasswordDialog(data) {
      this.editPasswordData = data;
      this.editPasswordDialog = true;
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
