export const actions = {
    async getProducts({ getters }, data) {
        return await this.$axios
        .get('api/products', data)
        .then((res) => res.data)
    },
    async getProductsID({ getters }, data) {
      return await this.$axios
      .get('api/products:id', data)
      .then((res) => res.data)
  },
    async postProducts({ getters }, data) {
        return await this.$axios
        .post('api/products/create', data)
        .then((res) => res.data)
    },
      async putProducts({ getters }, data) {
        return await this.$axios
        .put('api/products/update', data)
        .then((res) => res.data)
    },
      async deleteProducts({ getters }, data) {
        return await this.$axios
        .delete('api/products/delete', data)
        .then((res) => res.data)
    },
      async getNotebook({ getters }, data) {
        return await this.$axios
        .get('api/notebook', data)
        .then((res) => res.data)
      },
      async getDesktop({ getters }, data) {
        return await this.$axios
        .get('api/desktop', data)
        .then((res) => res.data)
      },
      async getMonitor({ getters }, data) {
        return await this.$axios
        .get('api/monitor', data)
        .then((res) => res.data)
      },
      async getSmartphone({ getters }, data) {
        return await this.$axios
        .get('api/products/smartphone', data)
        .then((res) => res.data)
      },
      async getPrinter({ getters }, data) {
        return await this.$axios
        .get('api/printer', data)
        .then((res) => res.data)
      },
      async getNetwork({ getters }, data) {
        return await this.$axios
        .get('api/network', data)
        .then((res) => res.data)
      },
      async getAccessories({ getters }, data) {
        return await this.$axios
        .get('api/accessories', data)
        .then((res) => res.data)
      },
      async getCamera({ getters }, data) {
        return await this.$axios
        .get('api/products/camera', data)
        .then((res) => res.data)
      },
      async getIp({ getters }, data) {
        return await this.$axios
        .get('api/ip', data)
        .then((res) => res.data)
      },
      async getOffice({ getters }, data) {
        return await this.$axios
        .get('api/office', data)
        .then((res) => res.data)
      },
      async getEquipment({ getters }, data) {
        return await this.$axios
        .get('api/equipment', data)
        .then((res) => res.data)
      },
      async getVehicle({ getters }, data) {
        return await this.$axios
        .get('api/vehicle', data)
        .then((res) => res.data)
      },
}