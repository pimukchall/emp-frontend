export const actions = {

    async getFiles ({ getters }, data) {
        return await this.$axios
        .get('api/files', data)
        .then((res) => res.data)
    },
    async postFiles ({ getters }, data) {
        return await this.$axios
        .post('api/files/upload', data)
        .then((res) => res.data)
    },
    async putPathUser ({ getters }, data) {
        return await this.$axios
        .put('api/files/user', data)
        .then((res) => res.data)
    },
    async putPathProduct ({ getters }, data) {
        return await this.$axios
        .put('api/files/product', data)
        .then((res) => res.data)
    },
    async deleteFiles ({ getters }, data) {
        return await this.$axios
        .delete('api/files/delete', data)
        .then((res) => res.data)
    },
}
