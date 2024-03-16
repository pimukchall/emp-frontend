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
      :method="goBack"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <div class="d-flex justify-center">
      <v-card width="400" height="300">
        <v-card-title> Sign In </v-card-title>
          <v-card-text>
            <v-text-field 
              v-model = "form.email"
              label="Email"
              outlined>
            </v-text-field>

            <v-text-field 
              v-model="form.password"
              label="Password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" 
              outlined>
          </v-text-field>

          <v-card-actions>
            <div>
              <span v-bind:title="message"> 
                <v-btn @click="login" width="350" class="mr-2" color="success" >Sign In</v-btn>
              </span>
            </div>
          </v-card-actions>
          </v-card-text>
      </v-card>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      message: 'You login on ' + new Date().toLocaleString(),
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
    async login2() {
      try {
        const response = await this.$axios.post('api/users/login', this.form);
        this.$store.commit('auth/setToken', response.data.token);
        this.$store.commit('auth/setUser', response.data.user);
        this.modal.complete.open = true;
        this.modal.complete.message = 'Login Success';
      } catch (error) {
        this.modal.error.open = true;
        this.modal.error.message = 'Login Failed';
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
        this.modal.complete.message = 'เข้าสู่ระบบสำเร็จ';
        this.modal.complete.open = true;

        console.log(req);

      } catch (error) {
        this.modal.error.message = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        this.modal.error.open = true;
      }
    },
    goBack() {
      this.$router.push('/admin/user');
    },
  },
}
</script>