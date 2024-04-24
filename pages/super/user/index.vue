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
    <UserEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <UserEditPassword
      :open="editPasswordDialog"
      :edit.sync="editPasswordDialog"
      :data="editPasswordData"
    />
    <UserEditUpload
      :open="editUploadDialog"
      :edit.sync="editUploadDialog"
      :data="editUploadData"
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
            <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มผู้ใช้</v-btn>
            <v-btn elevation="2" rounded @click="exportToExcel"
              >ออกรายงาน</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col v-for="user in filtered" :key="user.id" cols="12" md="4">
            <v-card elevation="6" shaped>
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
              <v-card-title>
                {{ user.fname }} <br />
                {{ user.empcode }}
              </v-card-title>
              <v-card-subtitle>
                แผนก: {{ mapDataDepartment(user.department_id) }}
              </v-card-subtitle>
              <v-card-subtitle>
                สิทธิ์: {{ mapDataRole(user.role_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(user.id)">
                  <v-icon>{{
                    isExpanded(user.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
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
                        <v-list-item-title class="ml-2" dense
                          >แก้ไข</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="openEditPasswordDialog(user)">
                        <v-icon class="ml-2">mdi-lock</v-icon>
                        <v-list-item-title class="ml-2" dense
                          >เปลี่ยนรหัสผ่าน</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="openEditUploadDialog(user)">
                        <v-icon class="ml-2">mdi-upload</v-icon>
                        <v-list-item-title class="ml-2" dense
                          >อัพโหลด</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="confirmDelete(user.id)">
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
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('th')
import * as XLSX from 'xlsx'
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      date: new Date().toISOString().substr(0, 10),
      users: [],
      departments: [],
      roles: [],
      currentExpanded: null,

      editDialog: false,
      editData: {},

      editPasswordDialog: false,
      editPasswordData: {},

      editUploadDialog: false,
      editUploadData: {},

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
      return this.users.filter((user) => {
        return (
          user.fname.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },

  mounted() {
    this.$fetch()
  },

  async fetch() {
    await this.fetchUserData()
    await this.fetchDepartmentData()
    await this.fetchRoleData()
  },

  methods: {
    async fetchUserData() {
      this.users = await this.$store.dispatch('api/user/getUsers')
    },
    async fetchDepartmentData() {
      this.departments = await this.$store.dispatch(
        'api/department/getDepartments'
      )
    },
    mapDataDepartment(id) {
      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id === id) {
          return this.departments[i].name
        }
      }
      return 'ไม่มีแผนก'
    },
    async fetchRoleData() {
      this.roles = await this.$store.dispatch('api/role/getRoles')
    },
    mapDataRole(id) {
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].id === id) {
          return this.roles[i].name
        }
      }
      return 'ไม่มีสิทธิ์'
    },

    confirmDelete(id) {
      this.modal.confirm.open = true
      this.modal.confirm.message = 'ยืนยันการลบข้อมูลหรือไม่?'
      this.modal.confirm.id = id
    },
    async deleteData() {
      try {
        const req = await this.$store.dispatch('api/user/deleteUsers', {
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
      this.$router.push('/auth/register')
    },

    openEditUserDialog(data) {
      this.editData = data
      this.editDialog = true
    },

    openEditPasswordDialog(data) {
      this.editPasswordData = data
      this.editPasswordDialog = true
    },

    openEditUploadDialog(data) {
      this.editUploadData = data
      this.editUploadDialog = true
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
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(
        this.users.map((user) => {
          return {
            ชื่อ: user.fname,
            นามสกุล: user.lname,
            อีเมล: user.email,
            เบอร์ติดต่อ: user.phone,
            แผนก: this.mapDataDepartment(user.department_id),
            สิทธิ์: this.mapDataRole(user.role_id),
            วันที่สมัคร: this.formatDate(user.date_in),
          }
        })
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
      XLSX.writeFile(workbook, 'รายการผู้ใช้.xlsx')
      this.recordLogExport()
    },
    async recordLogDelete(id) {
      const user = this.users.find((user) => user.id === id)
      const log = {
        user_id: this.$auth.user.id,
        action: 'ลบข้อมูล',
        description:
          this.$auth.user.email +
          ' ' +
          'ลบข้อมูลผู้ใช้' +
          ' ' +
          user.email +
          ' ' +
          'เวลา ' +
          moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
    recordLogExport() {
      const log = {
        user_id: this.$auth.user.id,
        action: 'ออกรายงาน',
        description:
          this.$auth.user.email +
          ' ' +
          'ออกรายงานผู้ใช้' +
          ' ' +
          'เวลา ' +
          moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
  },
}
</script>
