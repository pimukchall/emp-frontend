<template>
    <div>
        <login />
    </div>
  </template>
  
  <script>
    import login from '~/pages/auth/login.vue'
      export default {
        layout: 'blank',
          components: {
            login
          },
    }
  </script>