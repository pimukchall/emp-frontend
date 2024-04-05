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
    async putFilesPath ({ getters }, data) {
        return await this.$axios
        .put('api/files/updatePath', data)
        .then((res) => res.data)
    }
}
