<template>
  <div>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title
        class="text-uppercase"
        @click="home"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn text @click="gotoLogin">เข้าสู่ระบบ</v-btn>
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
    gotoLogin() {
      this.$router.push('/auth/login');
    },
    home() {
      this.$router.push('/home');
    },
  },
};
</script>
<style scoped>
</style>