<template>
      <p v-if="$fetchState.pending">Fetching ...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div v-else>
        <h1>ร้านค้า</h1>
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
            <v-col v-for="store in filtered" :key="store.id" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ store.name }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="toggleExpansion(store.id)">
                    <v-icon>{{ isExpanded(store.id) ? 'mdi-chevron-up' :
                    'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="isExpanded(store.id)">
                    <v-divider></v-divider>
                    <v-card-text>
                      <p>ที่อยู่ : {{ store.address }}</p>
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
    middleware: 'auth',
    data() {
      return {
        search: '',
        stores: [],
        currentExpanded: null,
      };
    },
  
    computed: {
      filtered() {
        return this.stores.filter(store => {
          return store.name.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
  
    async fetch() {
        await this.fetchData();
    },
  
    methods: {
  
      async fetchData() {
        this.stores = await this.$store.dispatch('api/store/getStores');
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
  