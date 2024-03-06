export const actions = {
    async getStores({ getters }, data) {
        return await this.$axios
        .get('api/stores', data)
        .then((res) => res.data)
    },
    async getStoresID({ getters }, data) {
      return await this.$axios
      .get('api/stores:id_store', data)
      .then((res) => res.data)
  },
    async postStores({ getters }, data) {
        return await this.$axios
        .post('api/stores/create', data)
        .then((res) => res.data)
    },
      async putStores({ getters }, data) {
        return await this.$axios
        .put('api/stores/update', data)
        .then((res) => res.data)
    },
      async deleteStores({ getters }, data) {
        return await this.$axios
        .delete('api/stores/delete', data)
        .then((res) => res.data)
    }
}