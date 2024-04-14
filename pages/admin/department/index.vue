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
    <DepartmentEditDialog
      :open="editDialog"
      :data="editData"
      :edit.sync="editDialog"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto mt-12 pa-2 pt-10 justify-center rounded-xl" max-width="auto" max-height="auto">
              <v-card-title class="headline">แผนก</v-card-title>
              <v-card-subtitle>รายชื่อแผนกทั้งหมด</v-card-subtitle>
              <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                  </v-col>
                  <v-spacer/>
                  <v-col class="text-right mt-4">
                    <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มแผนก</v-btn>
                  </v-col>
              </v-row>
                <v-data-table
                  :headers="headers"
                  :items="reversed"
                  :search="search"
                  item-key="name"
                  class="elevation-1"
                >
                <template v-slot:expanded-item="{ headers}">
                  <td :colspan="headers.length">
                  </td>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="openEditDialog(item)">mdi-pencil</v-icon>
                  <v-icon small @click="confirmDelete(item.id)">mdi-delete</v-icon>
                </template>

                </v-data-table>   
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('th')
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      departments: [],
      expanded: [],
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
      headers: [
        { text: 'ชื่อแผนก', value: 'name' },
        { text: 'การจัดการ', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    reversed() {
      return this.departments.slice().reverse();
    },
  },
  async fetch() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.departments = await this.$store.dispatch('api/department/getDepartments');
    },
    confirmDelete(id) {
      this.modal.confirm.open = true
      this.modal.confirm.message = 'ยืนยันการลบข้อมูลหรือไม่?'
      this.modal.confirm.id = id
    },
    async deleteData() {
      try {
        const req = await this.$store.dispatch('api/department/deleteDepartments', { params: { id: this.modal.confirm.id } });
        this.modal.complete.open = true;
        this.recordLogDelete()
        this.$fetch();
      } catch (error) {
        this.modal.error.open = true;
        this.modal.error.message = 'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่';
      }
    },
    gotoCreate() {
      this.$router.push('/admin/department/create');
    },
    openEditDialog(data) {
      this.editData = data;
      this.editDialog = true;
    },
    async recordLogDelete() {
      const log = {
        user_id: this.$auth.user.id,
        action: 'ลบข้อมูล',
        description: this.$auth.user.email + ' ' + 'ลบแผนก' + ' ' + 'เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
  },
};
</script>