<template>
    <div>
      <NotebookEditDialog :open="editDialog" :edit.sync="editDialog" :data="editData" />
      <p v-if="$fetchState.pending">Fetching Notebooks...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div v-else>
        <h1>EMP Notebooks</h1>
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
              <v-btn elevation="2" rounded @click="$fetch">รีเฟรช</v-btn>
              <v-btn elevation="2" rounded @click="gotoCreateNotebook">เพิ่มอุปกรณ์</v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col v-for="notebook in filteredNotebooks" :key="notebook.id_notebook" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ notebook.model }}</v-card-title>
                <v-card-subtitle>
                  ผู้รับผิดชอบ: {{ notebook.id}}
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="toggleNotebookExpansion(notebook.id_notebook)">
                    <v-icon>{{ isNotebookExpanded(notebook.id_notebook) ? 'mdi-chevron-up' :
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
                    @click="deleteNotebooksData(notebook.id_notebook)">
                    ลบ
                    <v-icon dark right>
                      mdi-cancel
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="isNotebookExpanded(notebook.id_notebook)">
                    <v-divider></v-divider>
                    <v-card-text>
                        <p>ยี่ห้อ : {{ notebook.brand }} </p>
                        <p>รุ่น : {{ notebook.model }}</p>
                        <p>หน่วยประมวลผล : {{ notebook.cpu }}</p>
                        <p>หน่วยความจำ : {{ notebook.ram }}</p>
                        <p>หน่วยจัดเก็บข้อมูล : {{ notebook.storage }}</p>
                        <p>ระบบปฏิบัติการ : {{ notebook.os }}</p>
                        <p>หมายเลขสินทรัพย์ : {{ notebook.asset_number }}</p>
                        <p>หมายเลขลิขสิทธิ์ : {{ notebook.license_window }}</p>
                        <p>สาขาที่ซื้อ : {{ notebook.id_store }}</p>
                        <p>วันที่ลงทะเบียน : {{ formatDate(notebook.date_in) }}</p>
                        <!-- <p>วันที่ประกันหมด : {{ notebook.date_exp }}</p> -->
                        <p>หมายเหตุ : {{ notebook.note }}</p>
                        
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
    data() {
      return {
        search: '',
        notebooks: [],
        currentExpanded: null,
        editDialog:false,
        editData:{},

      }
    },
    computed: {
      filteredNotebooks() {
        return this.notebooks.filter(notebook => {
          return notebook.model.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
  
    async fetch() {
      await this.fetchNotebookData()
      
    },
    methods: {
      async fetchNotebookData() {
        this.notebooks = await this.$store
          .dispatch('api/notebook/getNotebooks')
      },

      async deleteNotebooksData(id_notebook) {
        try {
          const req = await this.$store
            .dispatch('api/notebook/deleteNotebooks', {params:{id_notebook}})
            console.log(req);
            this.$fetch()
        } catch (error) {
          console.error('Error deleting notebook:', error);
        }
      },
      gotoCreateNotebook() {
        this.$router.push('/notebook/notebookcreate')
      },
      openEditNotebookDialog(data) {
        console.log(data);
        this.editData = data
        this.editDialog = true
      },
      isNotebookExpanded(notebookId) {
        return this.currentExpanded === notebookId;
      },
      toggleNotebookExpansion(notebookId) {
        this.currentExpanded = this.currentExpanded === notebookId ? null : notebookId;
      },
      formatDate(date) {
        return moment(date).format('Do MMMM YYYY');
      },
      async getDepartment() {
        this.departments = await this.$store
          .dispatch('api/department/getDepartments')
      },
    },
  }
  </script>