export const actions = {
    async getDepartments({ getters }, data) {
        return await this.$axios
        .get('api/departments', data)
        .then((res) => res.data)
    },
    async getDepartmentsID({ getters }, data) {
      return await this.$axios
      .get('api/departments:id', data)
      .then((res) => res.data)
  },
    async postDepartments({ getters }, data) {
        return await this.$axios
        .post('api/departments/create', data)
        .then((res) => res.data)
    },
      async putDepartments({ getters }, data) {
        return await this.$axios
        .put('api/departments/update', data)
        .then((res) => res.data)
    },
      async deleteDepartments({ getters }, data) {
        return await this.$axios
        .delete('api/departments/delete', data)
        .then((res) => res.data)
    }
}