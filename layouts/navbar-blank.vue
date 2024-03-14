<template>
    <v-app dark>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'DefaultLayout',
    data() {
      return {
        fixed: false,
        clipped: false,
        title: 'EMP WAREHOUSES',
      }
    },
  }
  </script>
  <style scoped>
  </style>