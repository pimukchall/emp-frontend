<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase font-weight-bold" @click="home">
        {{ title }}
      </v-toolbar-title>
      <div>
        <v-tabs v-model="tabs" background-color="transparent">
          <v-tabs-slider></v-tabs-slider>
          <v-tab text @click="user">
            <v-icon>mdi-account</v-icon>
            ผู้ใช้
          </v-tab>
          <v-tab text @click="notebook">
            <v-icon>mdi-laptop</v-icon>
            โน๊ตบุ๊ค
          </v-tab>
          <v-tab text @click="equipment">
            <v-icon>mdi-wheel-barrow</v-icon>
            อุปกรณ์
          </v-tab>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-tab text v-on="on">อื่นๆ</v-tab>
            </template>
            <v-list>
              <v-list-item @click="department">
                <v-icon>mdi-folder-account</v-icon>
                แผนก
              </v-list-item>
              <v-list-item @click="location">
                <v-icon>mdi-map-marker-radius</v-icon>
                ที่ตั้ง
              </v-list-item>
              <v-list-item @click="store">
                <v-icon>mdi-store-marker</v-icon>
                ร้านค้า
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </div>
      <v-spacer />
      <v-btn @click="theme" elevation="2" rounded>
        <h4 v-if="$vuetify.theme.dark">
          <v-icon>mdi-weather-night</v-icon>
        </h4>
        <h4 v-else>
          <v-icon>mdi-white-balance-sunny</v-icon>
        </h4>
      </v-btn>
      <v-btn @click="login" elevation="2" rounded> เข้าสู่ระบบ </v-btn>
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
  name: 'user',
  data() {
    return {
      fixed: false,
      clipped: false,
      title: 'EMP WAREHOUSES',
      tabs: null,
    }
  },
  methods: {
    user() {
      this.$router.push('/user/user')
    },
    notebook() {
      this.$router.push('/user/notebook')
    },
    equipment() {
      this.$router.push('/user/equipment')
    },
    department() {
      this.$router.push('/user/department')
    },
    location() {
      this.$router.push('/user/location')
    },
    store() {
      this.$router.push('/user/store')
    },
    login() {
      this.$router.push('/auth/login')
    },
    home() {
      this.$router.push('/')
    },
    theme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
<style scoped></style>
