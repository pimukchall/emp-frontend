<template>
  <v-app dark>
    <v-app-bar 
      :clipped-left="clipped" 
      fixed app 
      color= #4F6F52
      dark
    >
      <v-toolbar-title class="text-uppercase font-weight-bold" @click="home">
        {{ title }}
      </v-toolbar-title>
      <div class="d-flex">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab text v-on="on">อุปกรณ์ไอที</v-tab>
            </template>
            <v-list>
              <v-list-item @click="">
                คอมพิวเตอร์
              </v-list-item>
              <v-list-item @click="notebook">
                โน๊ตบุ๊ค
              </v-list-item>
              <v-list-item @click="">
                จอคอมพิวเตอร์
              </v-list-item>
              <v-list-item @click="">
                UPS
              </v-list-item>
              <v-list-item @click="">
                สมาร์ทโฟน และ แท็บเล็ต
              </v-list-item>
              <v-list-item @click="">
                ปริ้นเตอร์
              </v-list-item>
              <v-list-item @click="">
                เซิร์ฟเวอร์ และ ระบบเครือข่าย
              </v-list-item>
              <v-list-item @click="">
                ซิมการ์ด และ อุปกรณ์เสริม
              </v-list-item>
              <v-list-item @click="">
                กล้อง และ อุปกรณ์เสริม
              </v-list-item>
              <v-list-item @click="">
                ไอพีโทรศัพท์
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab text v-on="on">อุปกรณ์</v-tab>
            </template>
            <v-list>
              <v-list-item @click="">
                อุปกรณ์เครื่องใช้สำนักงาน
              </v-list-item>
              <v-list-item @click="equipment">
                เครื่องมือเครื่องใช้
              </v-list-item>
              <v-list-item @click="">
                ยานพาหนะ
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab text v-on="on">อื่นๆ</v-tab>
            </template>
            <v-list>
              <v-list-item @click="department">
                แผนก
              </v-list-item>
              <v-list-item @click="location">
                สถานที่
              </v-list-item>
              <v-list-item @click="store">
                ร้านค้า
              </v-list-item>
            </v-list>
          </v-menu>
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
