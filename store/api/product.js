export const actions = {
    async getProducts({ getters }, data) {
        return await this.$axios
        .get('api/products', data)
        .then((res) => res.data)
    },
    async getProductsID({ getters }, data) {
      return await this.$axios
      .get('api/products:id', data)
      .then((res) => res.data)
  },
    async postProducts({ getters }, data) {
        return await this.$axios
        .post('api/products/create', data)
        .then((res) => res.data)
    },
      async putProducts({ getters }, data) {
        return await this.$axios
        .put('api/products/update', data)
        .then((res) => res.data)
    },
      async deleteProducts({ getters }, data) {
        return await this.$axios
        .delete('api/products/delete', data)
        .then((res) => res.data)
    }
}