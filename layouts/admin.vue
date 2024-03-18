<template>
    <div>
      <ModalConfirmLogout
        :open="modal.confirm.open"
        :message="modal.confirm.message"
        @update:confirm="value => modal.confirm.open = value"
        @update:message="value => modal.confirm.message = value"
        :method="signout"
      />
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title
        class="text-uppercase"
        @click="home" 
      >{{ title }}</v-toolbar-title>
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
              {{ $auth.user.fname }}
              <v-btn @click="buttonSignOut" color="dark">ลงชื่อออก</v-btn>
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
      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการออกจากระบบหรือไม่?'
        },
      }
    };
  },
  methods: {
    user() {
      this.$router.push('/admin/user');
    },
    notebook() {
      this.$router.push('/admin/notebook');
    },
    equipment() {
      this.$router.push('/admin/equipment');
    },
    signout() {
      this.$auth.logout();
    },
    department() {
      this.$router.push('/admin/department');
    },
    location() {
      this.$router.push('/admin/location');
    },
    store() {
      this.$router.push('/admin/store');
    },
    home() {
      this.$router.push('/admin/home');
    },
    buttonSignOut() {
     this.modal.confirm.open = true
    }
  }
};
</script>
<style scoped>
</style>