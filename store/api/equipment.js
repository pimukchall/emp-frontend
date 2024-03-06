export const actions = {
    async getEquipments({ getters }, data) {
        return await this.$axios
        .get('api/equipments', data)
        .then((res) => res.data)
    },
    async postEquipments({ getters }, data) {
        return await this.$axios
        .post('api/equipments/create', data)
        .then((res) => res.data);
    },
      async putEquipments({ getters }, data) {
        return await this.$axios
        .put('api/equipments/update', data)
        .then((res) => res.data);
    },
      async deleteEquipments({ getters }, data) {
        return await this.$axios
        .delete('api/equipments/delete', data)
        .then((res) => res.data);
    }
}