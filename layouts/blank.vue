<template>
    <v-app dark>
      <v-app-bar 
        :clipped-left="clipped" 
        fixed app 
        color= #4F6F52
        dark
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="theme" elevation="2" rounded>
          <h4 v-if="$vuetify.theme.dark">
            <v-icon>mdi-weather-night</v-icon>
          </h4>
          <h4 v-else>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </h4>
        </v-btn>
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
    methods: {
      theme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      },
    },
  }
  </script>
  <style scoped>
  </style>