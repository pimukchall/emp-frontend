export const actions = {
    async getCategories({ getters }, data) {
        return await this.$axios
        .get('api/categories', data)
        .then((res) => res.data)
    },
    async getCategoriesID({ getters }, data) {
      return await this.$axios
      .get('api/categories:id', data)
      .then((res) => res.data)
  },
    async postCategories({ getters }, data) {
        return await this.$axios
        .post('api/categories/create', data)
        .then((res) => res.data)
    },
      async putCategories({ getters }, data) {
        return await this.$axios
        .put('api/categories/update', data)
        .then((res) => res.data)
    },
      async deleteCategories({ getters }, data) {
        return await this.$axios
        .delete('api/categories/delete', data)
        .then((res) => res.data)
    }
}