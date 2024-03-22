<template>
  <div>
    <ModalConfirmLogout
      :open="modal.confirmLogout.open"
      :message="modal.confirmLogout.message"
      @update:confirmLogout="(value) => (modal.confirmLogout.open = value)"
      @update:message="(value) => (modal.confirmLogout.message = value)"
      :method="signout"
    />
    <v-app dark>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-toolbar-title class="text-uppercase" @click="home">{{
          title
        }}</v-toolbar-title>
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
            <v-menu offset-y open-on-hover>
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
        <div>
          <v-btn @click="theme" elevation="2" rounded>
            <h4 v-if="$vuetify.theme.dark">
              <v-icon>mdi-weather-night</v-icon>
            </h4>
            <h4 v-else>
              <v-icon>mdi-white-balance-sunny</v-icon>
            </h4>
          </v-btn>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-btn class="mr-2" v-on="on">{{ $auth.user.fname }}</v-btn>
            </template>
            <v-list>
              <v-list-item @click="buttonSignOut"> ลงชื่อออก </v-list-item>
            </v-list>
          </v-menu>
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
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
      clipped: false,
      title: 'EMP WAREHOUSES',
      tabs: null,
      modal: {
        confirmLogout: {
          open: false,
          message: 'คุณต้องการออกจากระบบหรือไม่?',
        },
      },
    }
  },
  methods: {
    user() {
      this.$router.push('/admin/user')
    },
    notebook() {
      this.$router.push('/admin/notebook')
    },
    equipment() {
      this.$router.push('/admin/equipment')
    },
    signout() {
      this.$auth.logout()
    },
    department() {
      this.$router.push('/admin/department')
    },
    location() {
      this.$router.push('/admin/location')
    },
    store() {
      this.$router.push('/admin/store')
    },
    home() {
      this.$router.push('/admin/home')
    },
    buttonSignOut() {
      this.modal.confirmLogout.open = true
    },
    theme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
