<template>
    <v-app dark>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-toolbar-title
          class="text-uppercase font-weight-bold"
          @click="home"
        >
          {{ title }}
        </v-toolbar-title>
        <div>
          <v-btn text @click="user">ผู้ใช้</v-btn>
          <v-btn text @click="notebook">โน๊ตบุ๊ค</v-btn>
          <v-btn text @click="equipment">อุปกรณ์</v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">อื่นๆ</v-btn>
            </template>
            <v-list>
              <v-list-item @click="department">แผนก</v-list-item>
              <v-list-item @click="location">ที่ตั้ง</v-list-item>
              <v-list-item @click="store">ร้านค้า</v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer />
            <div>
                <v-btn @click="login">เข้าสู่ระบบ</v-btn>
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
    name: 'user',
    data() {
      return {
        fixed: false,
        clipped: false,
        title: 'EMP WAREHOUSES',
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
        this.$router.push('/home')
      },
    },
  }
  </script>
  <style scoped>
  </style>