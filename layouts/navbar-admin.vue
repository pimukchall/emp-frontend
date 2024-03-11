<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <div>
        <v-btn text @click="user">ผู้ใช้</v-btn>
        <v-btn text @click="notebook">โน๊ตบุ๊ค</v-btn>
        <v-btn text @click="equipment">อุปกรณ์</v-btn>
        <v-btn text @click="department">แผนก</v-btn>
        <v-btn text @click="location">ที่ตั้ง</v-btn>
        <v-btn text @click="store">ร้านค้า</v-btn>

      </div>
        <v-spacer />
          <div>
            <span>
              <v-btn @click="signout" color="dark">ลงชื่อออก</v-btn>
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
      this.$router.push('/admin/user')
    },
    notebook() {
      this.$router.push('/admin/notebook')
    },
    equipment() {
      this.$router.push('/admin/equipment')
    },
    signout() {
      this.$router.push('/auth/login')
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
  },
}
</script>
<style scoped>
</style>