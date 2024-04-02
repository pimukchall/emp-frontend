export const actions = {
    async getStatus({ getters }, data) {
        return await this.$axios
        .get('api/status', data)
        .then((res) => res.data)
    },
    async getStatusID({ getters }, data) {
      return await this.$axios
      .get('api/status:id', data)
      .then((res) => res.data)
  },
    async postStatus({ getters }, data) {
        return await this.$axios
        .post('api/status/create', data)
        .then((res) => res.data)
    },
      async putStatus({ getters }, data) {
        return await this.$axios
        .put('api/status/update', data)
        .then((res) => res.data)
    },
      async deleteStatus({ getters }, data) {
        return await this.$axios
        .delete('api/status/delete', data)
        .then((res) => res.data)
    }
}