<template>
    <div>
        <home />
    </div>
  </template>
  
  <script>
    import home from '~/pages/home/index.vue'
      export default {
        layout: 'user',
          components: {
              home
          },
    }
  </script>
  
  <style lang="css" scoped></style>