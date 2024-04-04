export const actions = {
    async getLogs({ getters }, data) {
        return await this.$axios
        .get('api/logs', data)
        .then((res) => res.data)
    },
    async getLogsID({ getters }, data) {
      return await this.$axios
      .get('api/logs:id', data)
      .then((res) => res.data)
    },
    async postLogs({ getters }, data) {
        return await this.$axios
        .post('api/logs/create', data)
        .then((res) => res.data)
    },
    async putLogs({ getters }, data) {
        return await this.$axios
        .put('api/logs/update', data)
        .then((res) => res.data)
    },
}