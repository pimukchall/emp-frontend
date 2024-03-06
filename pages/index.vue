<template>
  <div>
    <login @login-form-submitted="handleLoginFormSubmitted"></login>
  </div>
  </template>
  
  <script>
  import login from '~/pages/auth/login.vue'
  export default {
    components: {
      login
    },
    methods: {
      handleLoginFormSubmitted(email, password) {
        console.log('page', email, password)
      }
    }
  }
  </script>
  
  <style lang="css" scoped></style>