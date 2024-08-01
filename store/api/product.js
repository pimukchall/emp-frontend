export const actions = {
    async getProducts({ getters }, data) {
        return await this.$axios
        .get('products', data)
        .then((res) => res.data)
    },
      async getProduct({ getters }, data) {
        return await this.$axios
        .get('products/:id', data)
        .then((res) => res.data)
    },
    async postProducts({ getters }, data) {
        return await this.$axios
        .post('products', data)
        .then((res) => res.data)
    },
      async putProducts({ getters }, data) {
        return await this.$axios
        .put('products/:id', data)
        .then((res) => res.data)
    },
      async deleteProducts({ getters }, data) {
        return await this.$axios
        .delete('products/:id', data)
        .then((res) => res.data)
    }
}