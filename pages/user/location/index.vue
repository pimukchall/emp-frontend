<template>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>ไซต์งาน</h1>
        <div>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                hide-details></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
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
  </template>
  <script>
  export default {
    layout: 'user',
    data() {
      return {
        search: '',
        locations: [],
        currentExpanded: null,
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
      isExpanded(id) {
        return this.currentExpanded === id;
      },
      toggleExpansion(id) {
        this.currentExpanded = this.currentExpanded === id ? null : id;
      },
    },
  };
  </script>
  