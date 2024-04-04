export const actions = {
    async getNotebook({ getters }, data) {
        return await this.$axios
        .get('api/notebook', data)
        .then((res) => res.data)
      },
    async getNotebooksID({ getters }, data) {
      return await this.$axios
      .get('api/products:id', data)
      .then((res) => res.data)
    },
    async postNotebooks({ getters }, data) {
        return await this.$axios
        .post('api/products/create', data)
        .then((res) => res.data)
    },
    async putNotebooks({ getters }, data) {
        return await this.$axios
        .put('api/products/update', data)
        .then((res) => res.data)
    },
    async deleteNotebooks({ getters }, data) {
        return await this.$axios
        .delete('api/products/delete', data)
        .then((res) => res.data)
    },
}