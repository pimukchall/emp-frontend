export const actions = {
    async getLocations({ getters }, data) {
        return await this.$axios
        .get('api/locations', data)
        .then((res) => res.data)
    },
    async getLocationsID({ getters }, data) {
      return await this.$axios
      .get('api/locations:id_location', data)
      .then((res) => res.data)
    },
    async postLocations({ getters }, data) {
        return await this.$axios
        .post('api/locations/create', data)
        .then((res) => res.data)
    },
    async putLocations({ getters }, data) {
        return await this.$axios
        .put('api/locations/update', data)
        .then((res) => res.data)
    },
    async deleteLocations({ getters }, data) {
        return await this.$axios
        .delete('api/locations/delete', data)
        .then((res) => res.data)
    }
}