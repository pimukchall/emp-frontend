export const actions = {
    async getRoles({ getters }, data) {
        return await this.$axios
        .get('api/roles', data)
        .then((res) => res.data)
    },
    async getRolesID({ getters }, data) {
      return await this.$axios
      .get('api/roles:id', data)
      .then((res) => res.data)
  },
    async postRoles({ getters }, data) {
        return await this.$axios
        .post('api/roles/create', data)
        .then((res) => res.data)
    },
      async putRoles({ getters }, data) {
        return await this.$axios
        .put('api/roles/update', data)
        .then((res) => res.data)
    },
      async deleteRoles({ getters }, data) {
        return await this.$axios
        .delete('api/roles/delete', data)
        .then((res) => res.data)
    }
}