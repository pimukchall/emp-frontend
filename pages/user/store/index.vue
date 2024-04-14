<template>
  <div>
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto mt-12 pa-2 pt-10 justify-center rounded-xl" max-width="auto" max-height="auto">
              <v-card-title class="headline">ร้านค้า</v-card-title>
              <v-card-subtitle>รายชื่อร้านค้าทั้งหมด</v-card-subtitle>
              <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                  </v-col>
              </v-row>
                <v-data-table
                  :headers="headers"
                  :items="reversed"
                  :search="search"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  item-key="name"
                  show-expand
                  class="elevation-1"
                >
                <template v-slot:expanded-item="{ headers, item }" v-if="expanded.length">
                  <td :colspan="headers.length">
                    <v-col cols="12">
                      <v-card-subtitle class="expanded-details">
                        ที่อยู่: {{ item.address }}
                      </v-card-subtitle>
                    </v-col>
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
      stores: [],
      expanded: [],
      singleExpand: true,

      headers: [
        { text: 'ชื่อร้านค้า', value: 'name' },
        { text: 'ชื่อผู้ขาย', value: 'seller' },
        { text: 'เบอร์ติดต่อ', value: 'phone', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  computed: {
    reversed() {
      return this.stores.slice().reverse();
    },
  },
  async fetch() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.stores = await this.$store.dispatch('api/store/getStores');
    },
  },
};
</script>