export const actions = {
    async getEmployees({ getters }, data) {
        return await this.$axios
        .get('api/employees', data)
        .then((res) => res.data)
    },
    async getEmployeesID({ getters }, data) {
      return await this.$axios
      .get('api/employees:id', data)
      .then((res) => res.data)
  },
    async postEmployees({ getters }, data) {
        return await this.$axios
        .post('api/employees/create', data)
        .then((res) => res.data)
    },
      async putEmployees({ getters }, data) {
        return await this.$axios
        .put('api/employees/update', data)
        .then((res) => res.data)
    },
      async deleteEmployees({ getters }, data) {
        return await this.$axios
        .delete('api/employees/delete', data)
        .then((res) => res.data)
    }
}