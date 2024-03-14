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
      <NotebookEditDialog :open="editDialog" :edit.sync="editDialog" :data="editData" />
      <p v-if="$fetchState.pending">Fetching...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
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
              <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มอุปกรณ์</v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col v-for="notebook in filtered" :key="notebook.id" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ notebook.asset_number }}</v-card-title>
                <v-card-subtitle>
                  ผู้รับผิดชอบ: {{ mapUser(notebook.user_id)}} 
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="toggleExpansion(notebook.id)">
                    <v-icon>{{ isExpanded(notebook.id) ? 'mdi-chevron-up' :
                      'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="success" dark
                    @click="openEditNotebookDialog(notebook)">
                    แก้ไข
                    <v-icon dark right>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" dark
                    @click="deleteData(notebook.id)">
                    ลบ
                    <v-icon dark right>
                      mdi-cancel
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="isExpanded(notebook.id)">
                    <v-divider></v-divider>
                    <v-card-text>
                        <p>ยี่ห้อ : {{ notebook.brand }} </p>
                        <p>รุ่น : {{ notebook.model }}</p>
                        <p>หน่วยประมวลผล : {{ notebook.cpu }}</p>
                        <p>หน่วยความจำ : {{ notebook.ram }} GB</p>
                        <p>หน่วยประมวลผลกราฟฟิค : {{ notebook.gpu }}</p>
                        <p>หน่วยจัดเก็บข้อมูล : {{ notebook.storage }} GB</p>
                        <p>ระบบปฏิบัติการ : {{ notebook.os }}</p>
                        <p>หมายเลขลิขสิทธิ์ : {{ notebook.license_window }}</p>
                        <p>สาขาที่ซื้อ : {{ mapStore(notebook.store_id) }}</p>
                        <p>วันที่ลงทะเบียน : {{ formatDate(notebook.date_in) }}</p>
                        
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
  middleware: 'auth',
    data() {
      return {
        search: '',

        notebooks: [],
        users: [],
        store: [],

        currentExpanded: null,

        editDialog:false,
        editData:{},

        modal: {
          confirm: {
            open: false,
            message: 'คุณต้องการลบข้อมูลหรือไม่?'
          },
          complete: {
            open: false,
            message: 'ลบข้อมูลเรียบร้อย'
          },
          error: {
            open: false,
            message: 'เกิดข้อผิดพลาด'
          }
        }
      }
    },
    computed: {
      filtered() {
        return this.notebooks.filter(notebook => {
          return notebook.asset_number.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
  
    async fetch() {
      await this.fetchNotebookData()
      await this.fetchUserData()
      await this.fetchStoreData()
      
    },
    methods: {
      async fetchNotebookData() {
        this.notebooks = await this.$store
          .dispatch('api/notebook/getNotebooks')
      },

      async fetchUserData() {
        this.users = await this.$store
          .dispatch('api/user/getUsers')
      },

      async fetchStoreData() {
        this.store = await this.$store
          .dispatch('api/store/getStores')
      },

      mapUser(id) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
            return this.users[i].fname + ' ' + this.users[i].lname
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
          const req = await this.$store
            .dispatch('api/notebook/deleteNotebooks', {params:{id}})
            this.$fetch()
        } catch (error) {
          this.modal.error.open = true
          this.modal.error.message = 'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
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
        return this.currentExpanded === id;
      },
      toggleExpansion(id) {
        this.currentExpanded = this.currentExpanded === id ? null : id;
      },
      formatDate(date) {
        return moment(date).format('Do MMMM YYYY');
      },

    },
  }
  </script>