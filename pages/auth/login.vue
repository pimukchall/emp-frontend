<template>
    <div class="d-flex justify-center">
      <v-card width="400" height="300">
        <v-card-title> Sign In </v-card-title>
          <v-card-text>
            <v-text-field 
              v-model = "form.username"
              label="Username"
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
                <v-btn @click="gotoDashboard" width="350" class="mr-2" color="success" >Sign In</v-btn>
              </span>
            </div>
          </v-card-actions>
          </v-card-text>
      </v-card>
    </div>
  </template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: 'You login on ' + new Date().toLocaleString(),
      show1: false,
      show2: false,
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    gotoDashboard() {
      this.$router.push('/user'),
      console.log('component', this.form.username, this.form.password)
      this.$emit('login-form-submitted', this.form.username, this.form.password)
    },

  },

}
</script>