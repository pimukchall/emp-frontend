export const actions = {
    async getLogs({ getters }, data) {
        return await this.$axios
        .get('logs', data)
        .then((res) => res.data)
    },
    async getLogsID({ getters }, data) {
      return await this.$axios
      .get('logs/:id', data)
      .then((res) => res.data)
    },
    async postLogs({ getters }, data) {
        return await this.$axios
        .post('logs', data)
        .then((res) => res.data)
    },
    async putLogs({ getters }, data) {
        return await this.$axios
        .put('logs/:id', data)
        .then((res) => res.data)
    },
}