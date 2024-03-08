<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <div>
        <v-btn text @click="user">User</v-btn>
        <v-btn text @click="notebook">Notebook</v-btn>
        <v-btn text @click="equipment">Equipment</v-btn>
      </div>
        <v-spacer />
          <div>
            <span>
              <v-btn @click="signout" color="dark">Sign out</v-btn>
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
    }
  },
  methods: {
    user() {
      this.$router.push('/user')
    },
    notebook() {
      this.$router.push('/notebook')
    },
    equipment() {
      this.$router.push('/equipment')
    },
    signout() {
      this.$router.push('/auth/login')
    },
  },
}
</script>
<style scoped>
</style>