<template>
  <div>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
        <!-- <v-btn text @click="gotoRegister">Sign up</v-btn> -->
        <v-btn text @click="gotoLogin">Sign in</v-btn>
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
    gotoRegister() {
      this.$router.push('/auth/register');
    },
    gotoLogin() {
      this.$router.push('/auth/login');
    },
    gotoUser() {
      this.$router.push('/admin/user');
    },
  },
};
</script>
<style scoped>
</style>