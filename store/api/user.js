export const actions = {
    async getUsers({ getters }, data) {
      return await this.$axios
      .get('api/users', data)
      .then((res) => res.data)
    },
    async getUsersID({ getters }, data) {
      return await this.$axios
      .get('api/users/:id', data)
        .then((res) => res.data)
    },
    async postUsers({ getters }, data) {
        return await this.$axios
        .post('api/users/register', data)
        .then((res) => res.data)
    },
    async putUsers({ getters }, data) {
        return await this.$axios
        .put('api/users/update', data)
        .then((res) => res.data)
    },
    async putUsersPassword({ getters }, data) {
        return await this.$axios
        .put('api/users/updatePassword', data)
        .then((res) => res.data)
    },
    async deleteUsers({ getters }, data) {
        return await this.$axios
        .delete('api/users/delete', data)
        .then((res) => res.data)
    }
}