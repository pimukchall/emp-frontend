<template>
    <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="login"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <div class="d-flex justify-center">
      <v-card width="400" class="mt-12 pa-2 pt-10 justify-center rounded-xl">
        <v-card-title> เข้าสู่ระบบ </v-card-title>
          <v-card-text>
            <v-text-field 
              v-model = "form.email"
              label="อีเมล"
              outlined>
            </v-text-field>
            <v-text-field 
              v-model="form.password"
              label="รหัสผ่าน" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" 
              outlined>
            </v-text-field>
            <v-card-actions>
              <div>
                <v-btn @click="login" width="350" class="mr-2" color="success" >เข้าสู่ระบบ</v-btn>
              </div>
            </v-card-actions>
          </v-card-text>
      </v-card>
    </div>
  </div>
  </template>

<script>
import moment from 'moment';
moment.locale('th');

export default {
  layout: 'blank',
  name: 'Login',

  async mounted() {
        await this.checkRole();
    },

  data() {
    return {
      show1: false,
      show2: false,
      
      form: {
        email: '',
        password: '',
      },
      modal: {
        confirm: {
          open: false,
          message: '',
        },
        complete: {
          open: false,
          message: '',
        },
        error: {
          open: false,
          message: '',
        },
      },
    }
  },
  methods: {
    async checkRole() {
            if (this.$auth.loggedIn) {
                const roleId = this.$auth.user.role_id.toString(); // Ensure role_id is a string
                console.log('User Role ID:', roleId);
                if (roleId === '1') {
                    console.log('Admin');
                    this.$router.push('/admin/home');
                } else if (roleId === '2') {
                    console.log('Executive');
                    this.$router.push('/executive/home');
                } else if (roleId === '3') {
                    console.log('Manager Warehouse');
                    this.$router.push('/manager/home');
                } else if (roleId === '5') {
                    console.log('Purchasing');
                    this.$router.push('/purchasing/home');
                } else if (roleId === '6') {
                    console.log('User');
                    this.$router.push('/user/home');
                } else {
                    console.log('You cannot access this page');
                    this.$router.push('/');
                }
            } else {
                console.log('User is not logged in');
                this.$router.push('/');
            }
        },

    async login() {
      try {
        if (!this.form.email || !this.form.password) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
          this.modal.error.open = true;
          return;
        }
        const req = await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          }
        });
        this.recordLog();
        this.modal.complete.message = 'เข้าสู่ระบบสำเร็จ';
      } catch (error) {
        this.modal.error.message = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        this.modal.error.open = true;
        this.recordLogError();
      }
    },
    recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        action: 'เข้าสู่ระบบ',
        description: this.$auth.user.email + ' เข้าสู่ระบบเวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log);

      this.$store.dispatch('api/log/postLogs', log);
    },
    recordLogError(){
      const log = {
        action: 'เข้าสู่ระบบล้มเหลว',
        description: 'มีการพยายามเข้าสู่ระบบเวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log);

      this.$store.dispatch('api/log/postLogs', log);
    },
  },
}
</script>