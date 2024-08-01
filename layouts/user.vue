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
    <v-app-bar 
      :clipped-left="clipped" 
      fixed app 
      color= #4F6F52
      dark
    >
      <v-toolbar-title class="text-uppercase font-weight-bold" @click="home">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <div class="d-flex" style="align-items: center">
        <v-btn @click="theme" rounded>
          <h4 v-if="$vuetify.theme.dark">
            <v-icon>mdi-weather-night</v-icon>
          </h4>
          <h4 v-else>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </h4>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-list-item class="mr-2" v-on="on">{{ $auth.user.fname }}</v-list-item>
          </template>
          <v-list>
            <v-list-item @click="profile"> โปรไฟล์ </v-list-item>
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
  import moment from 'moment';
  moment.locale('th');
export default {
  name: 'user',
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
    home() {
      this.$router.push('/')
    },
    profile() {
      this.$router.push('/user/user/profile')
    },
    buttonSignOut() {
      this.modal.confirmLogout.open = true
    },
    signout() {
      this.$auth.logout()
      this.recordLog()
    },
    theme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        action: 'ออกจากระบบ',
        description: this.$auth.user.email + ' ' +'ออกจากระบบเวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log);
      this.$store.dispatch('api/log/postLogs', log);
    },
  },
}
</script>
<style scoped></style>
