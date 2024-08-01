export const actions = {
    async getRoles({ getters }, data) {
        return await this.$axios
        .get('roles', data)
        .then((res) => res.data)
    },
    async getRolesID({ getters }, data) {
      return await this.$axios
      .get('roles/:id', data)
      .then((res) => res.data)
  }
}