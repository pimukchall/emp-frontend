<template>
  <div>
  <v-app dark>
    <v-app-bar 
      :clipped-left="clipped" 
      fixed app 
      color= #4F6F52
      dark
      >
      <v-toolbar-title
        class="text-uppercase"
      >
        {{ title }}
      </v-toolbar-title>
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
        <nuxt />
      </v-container>
    </v-main>
    <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>The Emperor House</strong>
    </v-col>
  </v-footer>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'EMP WAREHOUSES',
      clipped: false,
    };
  },
  methods: {
    theme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style scoped>
</style>