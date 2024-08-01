export const actions = {
    async getUsers({ getters }, data) {
      return await this.$axios
      .get('users', data)
      .then((res) => res.data)
    },
    async getUsersID({ getters }, data) {
      return await this.$axios
      .get('users/:id', data)
        .then((res) => res.data)
    },
    async postUsers({ getters }, data) {
        return await this.$axios
        .post('users', data)
        .then((res) => res.data)
    },
    async putUsers({ getters }, data) {
        return await this.$axios
        .put('users/:id', data)
        .then((res) => res.data)
    },
    async deleteUsers({ getters }, data) {
        return await this.$axios
        .delete('users/:id', data)
        .then((res) => res.data)
    },
}