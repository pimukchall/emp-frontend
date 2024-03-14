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
      <LocationEditDialog
        :open="editDialog"
        :data="editData"
        :edit.sync="editDialog"
      />

      <p v-if="$fetchState.pending">Fetching ...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
  
      <div v-else>
        <h1>ไซต์งาน</h1>
        <div>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                hide-details></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right">
              <v-btn elevation="2" rounded @click="gotoCreate">เพิ่มไซต์งาน</v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col v-for="location in filtered" :key="location.id" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ location.name }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="toggleExpansion(location.id)">
                    <v-icon>{{ isExpanded(location.id) ? 'mdi-chevron-up' :
                    'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="success" dark @click="openEditDialog(location)">
                    แก้ไขข้อมูล
                    <v-icon dark right>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" dark @click="deleteData(location.id)">
                    ลบ
                    <v-icon dark right>
                      mdi-cancel
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="isExpanded(location.id)">
                    <v-divider></v-divider>
                    <v-card-text>
                      <p>ที่อยู่ : {{ location.address }}</p>
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
  
  export default {
    layout: 'navbar-admin',
    middleware: 'auth',
    data() {
      return {
        search: '',
  
        locations: [],
  
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
      };
    },
  
    computed: {
      filtered() {
        return this.locations.filter(location => {
          return location.name.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
  
    async fetch() {
        await this.fetchData();
    },
  
    methods: {
  
      async fetchData() {
        this.locations = await this.$store.dispatch('api/location/getLocations');
      },  
      async deleteData(id) {
        try {
          const req = await this.$store.dispatch('api/location/deleteLocations', { params: { id } });
          this.modal.complete.open = true;
          this.$fetch();
        } catch (error) {
          this.modal.error.open = true;
          this.modal.error.message = 'ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่';
        }
      },
  
      gotoCreate() {
        this.$router.push('/admin/location/create');
      },
  
      openEditDialog(data) {
        this.editData = data;
        this.editDialog = true;
      },
  
      isExpanded(id) {
        return this.currentExpanded === id;
      },
  
      toggleExpansion(id) {
        this.currentExpanded = this.currentExpanded === id ? null : id;
      },
    },
  };
  </script>
  