<template>
      <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
      <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
      <div v-else>
        <h1>แผนก</h1>
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
            <v-col v-for="department in filtered" :key="department.id" cols="12" md="4">
              <v-card elevation="6" shaped>
                <v-card-title>{{ department.name }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
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
        departments: [],
      };
    },
    computed: {
      filtered() {
        return this.departments.filter(department => {
          return department.name.toLowerCase().includes(this.search.toLowerCase());
        });
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
  