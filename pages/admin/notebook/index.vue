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
    <NotebookEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายการโน๊ตบุ๊ค</h1>
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
              >เพิ่มอุปกรณ์</v-btn
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
            v-for="notebook in filtered"
            :key="notebook.id"
            cols="12"
            md="4"
          >
            <v-card elevation="6" shaped>
              <v-card-actions>
                <v-card-title>{{ notebook.asset_number }}</v-card-title>
                <v-spacer></v-spacer>
                <v-chip :color="statusColor(notebook)" text-color="white">
                  {{ statusCheck(notebook.status) }}
                </v-chip>
              </v-card-actions>
              <v-card-subtitle>
                ผู้ถือครอง: {{ mapEmployee(notebook.employee_id) }}
                <br />
                ผู้รับผิดชอบ: {{ mapUser(notebook.user_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(notebook.id)">
                  <v-icon>{{
                    isExpanded(notebook.id)
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="success"
                  dark
                  @click="openEditNotebookDialog(notebook)"
                >
                  แก้ไข
                  <v-icon dark right> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="red"
                  dark
                  @click="deleteData(notebook.id)"
                >
                  ลบ
                  <v-icon dark right> mdi-cancel </v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(notebook.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>ยี่ห้อ : {{ notebook.brand }}</p>
                    <p>รุ่น : {{ notebook.model }}</p>
                    <p>หน่วยประมวลผล : {{ notebook.cpu }}</p>
                    <p>หน่วยความจำ : {{ notebook.ram }} GB</p>
                    <p>หน่วยประมวลผลกราฟฟิค : {{ notebook.gpu }}</p>
                    <p>หน่วยจัดเก็บข้อมูล : {{ notebook.storage }} GB</p>
                    <p>ระบบปฏิบัติการ : {{ notebook.os }}</p>
                    <p>หมายเลขลิขสิทธิ์ : {{ notebook.license_window }}</p>
                    <p>สาขาที่ซื้อ : {{ mapStore(notebook.store_id) }}</p>
                    <p>วันที่ลงทะเบียน : {{ formatDate(notebook.date_in) }}</p>
                    <p>วันที่ประกันหมด : {{ Expire(notebook.date_in) }}</p>
                    <p>วันที่ส่งมอบ : {{ Expire(notebook.date_out) }}</p>
                    <p>หมายเหตุ : {{ notebook.note }}</p>
                  </v-card-text>
                  <v-divider></v-divider>
                  <div>
                    <div class="text-center">
                      <qrcode-vue
                        v-if="showQR"
                        :value="generateData(notebook)"
                        :size="200"
                      ></qrcode-vue>
                      <vue-barcode
                        v-else
                        :value="notebook.asset_number"
                        :options="{ width: 1, height: 30 }"
                      ></vue-barcode>
                    </div>
                    <div class="text-center">
                      <v-btn @click="toggleDisplay">{{
                        showQR ? 'แสดง Barcode' : 'แสดง QR Code'
                      }}</v-btn>
                    </div>
                  </div>
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
import QrcodeVue, { data } from 'qrcode.vue'
import VueBarcode from 'vue-barcode'
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      notebooks: [],
      users: [],
      store: [],
      employees: [],

      currentExpanded: null,
      showQR: true,
      editDialog: false,
      editData: {},

      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการลบข้อมูลหรือไม่?',
        },
        complete: {
          open: false,
          message: 'ลบข้อมูลเรียบร้อย',
        },
        error: {
          open: false,
          message: 'เกิดข้อผิดพลาด',
        },
      },
    }
  },
  components: {
    QrcodeVue,
    VueBarcode,
  },
  computed: {
    filtered() {
      return this.notebooks.filter((notebook) => {
        return (
          notebook.asset_number
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          notebook.brand.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.model.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.cpu.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.ram.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.gpu.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.storage.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.os.toLowerCase().includes(this.search.toLowerCase()) ||
          notebook.license_window
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapUser(notebook.user_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapEmployee(notebook.employee_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapStore(notebook.store_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.formatDate(notebook.date_in)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.formatDate(notebook.date_out)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.Expire(notebook.date_in)
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      })
    },
  },
  async fetch() {
    await this.fetchNotebookData()
    await this.fetchUserData()
    await this.fetchEmployeeData()
    await this.fetchStoreData()
  },
  methods: {
    async fetchNotebookData() {
      this.notebooks = await this.$store.dispatch('api/notebook/getNotebooks')
    },

    async fetchUserData() {
      this.users = await this.$store.dispatch('api/user/getUsers')
    },

    async fetchEmployeeData() {
      this.employees = await this.$store.dispatch('api/employee/getEmployees')
    },

    async fetchStoreData() {
      this.store = await this.$store.dispatch('api/store/getStores')
    },

    mapUser(id) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
          return this.users[i].fname + ' ' + this.users[i].lname
        }
      }
      return 'ไม่มีข้อมูลผู้ใช้'
    },

    mapEmployee(id) {
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].id === id) {
          return this.employees[i].fname + ' ' + this.employees[i].lname
        }
      }
      return 'ไม่มีข้อมูลผู้ใช้'
    },

    mapStore(id) {
      for (let i = 0; i < this.store.length; i++) {
        if (this.store[i].id === id) {
          return this.store[i].name
        }
      }
      return 'ไม่มีข้อมูลสาขา'
    },

    async deleteData(id) {
      try {
        const req = await this.$store.dispatch('api/notebook/deleteNotebooks', {
          params: { id },
        })
        this.$fetch()
      } catch (error) {
        this.modal.error.open = true
        this.modal.error.message =
          'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
      }
    },
    gotoCreate() {
      this.$router.push('/admin/notebook/create')
    },
    openEditNotebookDialog(data) {
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
    Expire(date_in) {
      return moment(date_in).add(3, 'years').format('Do MMMM YYYY')
    },
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(
        this.notebooks.map((notebook) => {
          return {
            รหัสทรัพย์สิน: notebook.asset_number,
            ผู้รับผิดชอบ: this.mapUser(notebook.user_id),
            ผู้ถือครอง: this.mapEmployee(notebook.employee_id),
            ยี่ห้อ: notebook.brand,
            รุ่น: notebook.model,
            หน่วยประมวลผล: notebook.cpu,
            หน่วยความจำ: notebook.ram,
            หน่วยประมวลผลกราฟฟิค: notebook.gpu,
            หน่วยจัดเก็บข้อมูล: notebook.storage,
            ระบบปฏิบัติการ: notebook.os,
            หมายเลขลิขสิทธิ์: notebook.license_window,
            สาขาที่ซื้อ: this.mapStore(notebook.store_id),
            วันที่ลงทะเบียน: this.formatDate(notebook.date_in),
            วันที่ประกันหมด: this.Expire(notebook.date_in),
            วันที่ส่งมอบ: this.Expire(notebook.date_out),
            สถานะ: this.statusCheck(notebook.status),
            หมายเหตุ: notebook.note,
          }
        })
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'รายการโน๊ตบุ๊ค')
      XLSX.writeFile(workbook, 'รายการโน๊ตบุ๊ค.xlsx')
    },
    statusCheck(status) {
      if (status === 0) {
        return 'In use'
      } else if (status === 1) {
        return 'Write off'
      } else if (status === 2) {
        return 'Available'
      }
    },
    statusColor(notebook) {
      if (notebook.status === 0) {
        return 'success'
      } else if (notebook.status === 1) {
        return 'error'
      } else if (notebook.status === 2) {
        return 'warning'
      }
    },
    generateData(notebook) {
      return JSON.stringify({
        รหัสทรัพย์สิน: notebook.asset_number,
        ผู้ถือครอง: this.mapEmployee(notebook.employee_id),
        วันที่ลงทะเบียน: this.formatDate(notebook.date_in),
        วันที่ส่งมอบ: this.Expire(notebook.date_out),
        สถานะ: this.statusCheck(notebook.status),
      })
    },
    toggleDisplay() {
      this.showQR = !this.showQR
    },
  },
}
</script>
