<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
          <div>
            <span v-bind:title="message1">
              <v-btn @click="gotoRegister" class="mr-2" color="primary">Sign Up</v-btn>
            </span>
            <span v-bind:title="message2">
              <v-btn @click="gotoLogin" color="success">Sign In</v-btn>
            </span>
          </div>
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
      title: 'MY STORE',
      message1: 'Create a new account',
      message2: 'Already have an account?',
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push('/auth/login')
    },
    gotoRegister() {
      this.$router.push('/auth/register')
    },
  },
}
</script>
<style scoped>
</style>