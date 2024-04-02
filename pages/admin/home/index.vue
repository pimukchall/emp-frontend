<template>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  data () {
    return {
      items: [
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2016/05/majesty-template-cover-4-01.jpg',
        },
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2016/05/pyrenis-web-01.jpg',
        },
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2020/04/POEM-org-T-02.jpg',
        },
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2020/04/prelude-new-T-02.jpg',
        },
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2016/09/Pinnacle-2018-org-T2-02.jpg',
        },
        {
          src: 'https://www.emperorhouse.com/web2/wp-content/uploads/2016/09/pyrenis_T.jpg',
        },
      ],
    }
  },
}
</script>