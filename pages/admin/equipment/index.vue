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
    <EquipmentEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายการอุปกรณ์</h1>
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
            v-for="equipment in filtered"
            :key="equipment.id"
            cols="12"
            md="4"
          >
            <v-card elevation="6" shaped>
              <v-card-actions>
                <v-card-title>{{ equipment.asset_number }}</v-card-title>
                <v-spacer></v-spacer>
                <v-chip :color="statusColor(equipment)" label text-color="white"
                  >{{ statusCheck(equipment.status) }}
                </v-chip>
              </v-card-actions>
              <v-card-subtitle>
                ผู้ถือครอง: {{ mapEmployee(equipment.employee_id) }}
                <br />
                ผู้รับผิดชอบ: {{ mapUser(equipment.user_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(equipment.id)">
                  <v-icon>{{
                    isExpanded(equipment.id)
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="success"
                  dark
                  @click="openEditEquipmentDialog(equipment)"
                >
                  แก้ไข
                  <v-icon dark right> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="red"
                  dark
                  @click="deleteData(equipment.id)"
                >
                  ลบ
                  <v-icon dark right> mdi-cancel </v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(equipment.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>ชื่อรายการ: {{ equipment.name }}</p>
                    <p>สถานที่: {{ mapLocation(equipment.location_id) }}</p>
                    <p>ร้านที่ซื้อ: {{ mapStore(equipment.store_id) }}</p>
                    <p>รหัสทรัพย์สิน: {{ equipment.asset_number }}</p>
                    <p>หมายเลขเอกสาร: {{ equipment.document_number }}</p>
                    <p>ราคา: {{ equipment.price }}</p>
                    <p>จำนวน: {{ equipment.quantity }}</p>
                    <p>วันที่ลงทะเบียน: {{ formatDate(equipment.date_in) }}</p>
                    <p>วันที่เบิก: {{ formatDate(equipment.date_out) }}</p>
                    <p>หมายเหตุ: {{ equipment.note }}</p>
                  </v-card-text>
                  <v-divider></v-divider>
                  <div>
                    <div class="text-center">
                      <qrcode-vue
                        v-if="showQR"
                        :value="generateData(equipment)"
                        :size="200"
                      ></qrcode-vue>
                      <vue-barcode
                        v-else
                        :value="equipment.asset_number"
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
import QrcodeVue from 'qrcode.vue'
import VueBarcode from 'vue-barcode'
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      equipments: [],
      location: [],
      users: [],
      employees: [],
      store: [],
      showQR: true,

      currentExpanded: null,

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
      return this.equipments.filter((equipment) => {
        return (
          equipment.asset_number
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          equipment.name.toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapUser(equipment.user_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapEmployee(notebook.employee_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapLocation(equipment.location_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.mapStore(equipment.store_id)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          equipment.document_number
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          equipment.price
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          equipment.quantity
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.formatDate(equipment.date_in)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.formatDate(equipment.date_out)
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      })
    },
  },

  async fetch() {
    await this.fetchEquipmentData()
    await this.fetchUserData()
    await this.fetchStoreData()
    await this.fetchLocationData()
    await this.fetchEmployeeData()
  },
  methods: {
    async fetchEquipmentData() {
      this.equipments = await this.$store.dispatch(
        'api/equipment/getEquipments'
      )
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

    async fetchLocationData() {
      this.location = await this.$store.dispatch('api/location/getLocations')
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

    mapLocation(id) {
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i].id === id) {
          return this.location[i].name
        }
      }
      return 'ไม่มีข้อมูลสถานที่'
    },

    async deleteData(id) {
      try {
        const req = await this.$store.dispatch(
          'api/equipment/deleteEquipments',
          { params: { id } }
        )
        this.$fetch()
      } catch (error) {
        this.modal.error.open = true
        this.modal.error.message =
          'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
      }
    },
    gotoCreate() {
      this.$router.push('/admin/equipment/create')
    },
    openEditEquipmentDialog(data) {
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
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(
        this.equipments.map((equipment) => {
          return {
            รหัสทรัทย์สิน: equipment.asset_number,
            ชื่อรายการ: equipment.name,
            ผู้รับผิดชอบ: this.mapUser(equipment.user_id),
            ผู้ถือครอง: this.mapEmployee(equipment.employee_id),
            สถานที่: this.mapLocation(equipment.location_id),
            ร้านที่ซื้อ: this.mapStore(equipment.store_id),
            หมายเลขเอกสาร: equipment.document_number,
            ราคา: equipment.price,
            จำนวน: equipment.quantity,
            สถานะ: this.statusCheck(equipment.status),
            วันที่ลงทะเบียน: this.formatDate(equipment.date_in),
            วันที่เบิก: this.formatDate(equipment.date_out),
            หมายเหตุ: equipment.note,
          }
        })
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'รายการอุปกรณ์')
      XLSX.writeFile(workbook, 'รายการอุปกรณ์.xlsx')
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
    generateData(equipment) {
      return JSON.stringify({
        รหัสทรัพย์สิน: equipment.asset_number,
        ชื่อรายการ: equipment.name,
        สถานที่: this.mapLocation(equipment.location_id),
        ผู้ถือครอง: this.mapEmployee(equipment.employee_id),
        สถานะ: this.statusCheck(equipment.status),
        วันที่ลงทะเบียน: this.formatDate(equipment.created_at),
        วันที่เบิก: this.formatDate(equipment.date_out),
      })
    },
    toggleDisplay() {
      this.showQR = !this.showQR
    },
  },
}
</script>
