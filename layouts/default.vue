<template>
  <div>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!$auth.loggedIn">
        <v-btn text @click="gotoRegister">Register</v-btn>
      </div>

      <div v-else>
        {{ $auth.user.fname }}
        <v-btn text @click="$auth.openLogoutConfirmationModal()">Logout</v-btn>
      </div>
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
      title: 'MY STORE',
      clipped: false,
      modal: {
        confirmLogout: {
          open: false,
          message: 'Are you sure you want to logout?',
        },
        completeLogout: {
          open: false,
          message: 'You have been logged out',
        },
      },
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push('/auth/register');
    },
  },
};
</script>
<style scoped>
</style>