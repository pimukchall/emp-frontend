<template>
  <div>
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
  layout: 'user',
  data() {
    return {
      search: '',
      departments: [],
      headers: [
        { text: 'ชื่อแผนก', value: 'name' },
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
  },
};
</script>