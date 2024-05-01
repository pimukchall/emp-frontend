<template>
    <div>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card class="mx-auto mt-12 pa-2 pt-10 justify-center rounded-xl" max-width="auto" max-height="auto">
                <v-card-title class="headline">บันทึกการใช้งานของผู้ใช้</v-card-title>
                <v-card-subtitle>รายการทั้งหมด</v-card-subtitle>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headers"
                    :items="sortedLogs"
                  :search="search"
                    :items-per-page="10"
                  class="elevation-1"
                >
                    <template v-slot:item.user_id="{ item }">
                        {{ mapUser(item.user_id) }}
                    </template>
                    <template v-slot:item.mapTime="{ item }">
                        {{ mapTime(item.time) }}
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
import moment from 'moment'
  moment.locale('th')
  export default {
    layout: 'super',
    middleware: 'auth',
    data() {
      return {
        search: '',
        users: [],
        logs: [],
        headers: [
            { text: 'ผู้ใช้', value: 'user_id', sortable: false},
            { text: 'การกระทำ', value: 'action' , sortable: false},
            { text: 'รายละเอียด', value: 'description', sortable: false},
            { text: 'วันที่', value: 'mapTime' , sortable: false , width: '200px'},
        ],
      };
    },
    computed: {
    sortedLogs() {
        return this.logs.sort((a, b) => moment(b.time).valueOf() - moment(a.time).valueOf());
    },
    },
    async fetch() {
      await this.fetchUserData();
      await this.fetchLogsData();
    },
    methods: {
        async fetchUserData() {
            this.users = await this.$store.dispatch('api/user/getUsers')
        },
        async fetchLogsData() {
            this.logs = await this.$store.dispatch('api/log/getLogs')
        },
        mapUser(user_id) {
            if (this.users && this.users.length > 0) {
            const user = this.users.find(user => user.id === user_id);
            if (user) {
                return user.fname;
            } else {
                return 'ไม่มีข้อมูลผู้ใช้';
            }
            } else {
            return 'กำลังโหลดข้อมูลผู้ใช้...';
            }
        },
        mapTime(time) {
            return moment(time).format('Do MMMM YYYY');
        },
    },
    };
  </script>
  