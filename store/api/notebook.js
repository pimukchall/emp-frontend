export const actions = {
    async getNotebooks({ getters }, data) {
        return await this.$axios
        .get('api/notebooks', data)
        .then((res) => res.data)
    },
    async getNotebooksID({ getters }, data) {
      return await this.$axios
      .get('api/notebooks:id_notebook', data)
      .then((res) => res.data)
  },
    async postNotebooks({ getters }, data) {
        return await this.$axios
        .post('api/notebooks/create', data)
        .then((res) => res.data)
    },
      async putNotebooks({ getters }, data) {
        return await this.$axios
        .put('api/notebooks/update', data)
        .then((res) => res.data)
    },
      async deleteNotebooks({ getters }, data) {
        return await this.$axios
        .delete('api/notebooks/delete', data)
        .then((res) => res.data)
    }
}