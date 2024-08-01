<template>
  <v-row>
    <v-col v-for="product in filtered" :key="product.id" cols="12" md="4">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">รหัสสินค้า : {{ product.asset_number }}</div>
            <v-list-item-title class="text-h5 mb-1">
                {{ product.name }} {{ product.model }}
            </v-list-item-title>
            <v-list-item-subtitle>
                วันที่ลงทะเบียน : {{ formatDate(product.date_in) }} <br>
                ราคา : {{ product.price }} บาท <br>
            </v-list-item-subtitle>
          </v-list-item-content>

            <v-list-item-avatar 
                tile 
                size="80" 
                color="grey">
                <v-img :src="`http://localhost:3001/${product.file}`" />
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text> Button </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
moment.locale('th')
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      products: [],
    }
  },
    computed: {
        filtered() {
        return this.products
        },
    },
    async mounted() {
      await this.fetchProductData()
    },
  methods: {
    async fetchProductData() {
      this.products = await this.$store.dispatch('api/product/getProducts')
      console.log(this.products)
    },
    formatDate(date) {
      return moment(date).format('ll')
    },
},
}
</script>
