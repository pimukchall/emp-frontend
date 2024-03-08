<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!$auth.loggedIn">
        <v-btn text @click="gotoRegister">Register</v-btn>
        <v-btn text to="/auth/login">Login</v-btn>
      </div>

      <div v-else>
        {{ $auth.user.name }}
        <v-btn text @click="$auth.logout()">Logout</v-btn>
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
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
      clipped: false,
      title: 'MY STORE',
      
    }
  },
  methods: {
    gotoRegister() {
      this.$router.push('/auth/register')
    },
  },
}
</script>
<style scoped>
</style>