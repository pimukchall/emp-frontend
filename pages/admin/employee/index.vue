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
    <EmployeeEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายชื่อพนักงาน</h1>
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
            <v-btn elevation="2" rounded @click="gotoCreate"
              >เพิ่มพนักงาน</v-btn
            >
            <v-btn elevation="2" rounded @click="exportToExcel"
              >ออกรายงาน</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col
            v-for="employee in filtered"
            :key="employee.id"
            cols="12"
            md="4"
          >
            <v-card elevation="6" shaped>
              <v-card-title>{{ employee.fname }}</v-card-title>
              <v-card-subtitle>
                รหัสพนักงาน: {{ employee.code_emp }}
                <br />
                แผนก: {{ mapDataDepartment(employee.department_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(employee.id)">
                  <v-icon>{{
                    isExpanded(employee.id)
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="success"
                  dark
                  @click="openEditEmployeeDialog(employee)"
                >
                  แก้ไขข้อมูล
                  <v-icon dark right> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="error"
                  dark
                  @click="deleteData(employee.id)"
                >
                  ลบ
                  <v-icon dark right> mdi-cancel </v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(employee.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>ชื่อ : {{ employee.fname }}</p>
                    <p>นามสกุล : {{ employee.lname }}</p>
                    <p>เบอร์ติดต่อ : {{ employee.phone }}</p>
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
import * as XLSX from 'xlsx'
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      employees: [],
      departments: [],
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
      return this.employees.filter((employee) => {
        return (
          employee.fname.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.lname.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.phone.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.code_emp.toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapDataDepartment(employee.department_id)
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      })
    },
  },

  async fetch() {
    await this.fetchEmployeeData()
    await this.fetchDepartmentData()
  },

  methods: {
    async fetchEmployeeData() {
      this.employees = await this.$store.dispatch('api/employee/getEmployees')
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
    isExpanded(id) {
      return this.currentExpanded === id
    },
    toggleExpansion(id) {
      this.currentExpanded = this.currentExpanded === id ? null : id
    },
    async deleteData(id) {
      try {
        const req = await this.$store.dispatch('api/employee/deleteEmployees', {
          params: { id },
        })
        this.modal.complete.open = true
        this.$fetch()
      } catch (error) {
        this.modal.error.open = true
        this.modal.error.message =
          'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
      }
    },
    gotoCreate() {
      this.$router.push('/admin/employee/create')
    },
    openEditEmployeeDialog(data) {
      this.editData = data
      this.editDialog = true
    },
    exportToExcel() {
      const ws = XLSX.utils.json_to_sheet(this.employees)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Employees')
      XLSX.writeFile(wb, 'employees.xlsx')
    },
  },
}
</script>
