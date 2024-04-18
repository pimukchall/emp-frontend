export const actions = {
    async getCustomers({ getters }, data) {
      return await this.$axios
      .get('api/customers', data)
      .then((res) => res.data)
    },
    async getCustomersID({ getters }, data) {
      return await this.$axios
      .get('api/customers/:id', data)
        .then((res) => res.data)
    },
    async postCustomers({ getters }, data) {
        return await this.$axios
        .post('api/customers/create', data)
        .then((res) => res.data)
    },
    async putCustomers({ getters }, data) {
        return await this.$axios
        .put('api/customers/update', data)
        .then((res) => res.data)
    },
    async deleteCustomers({ getters }, data) {
        return await this.$axios
        .delete('api/customers/delete', data)
        .then((res) => res.data)
    },
}