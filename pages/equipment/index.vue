<template>
    <div>
        <p v-if="$fetchState.pending">Fetching Equipment...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else>
            <h1>EMP Equipment</h1>
            <div>
                <v-spacer />
                <v-row>
                    <v-col class="text-right">
                        <v-btn elevation="2" rounded @click="$fetch">Refresh</v-btn>
                        <v-btn elevation="2" rounded @click="gotoEquipmentCreate">Create</v-btn>
                    </v-col>
                </v-row>
            </div>
            <div>
                <v-row>
                    <v-col v-for="equipment of equipments" :key="equipment.id_equipment" cols="12" md="4">
                        <v-card elevation="2" shaped>
                            <v-card-title>{{ equipment.equipment_name }}</v-card-title>
                            <v-card-subtitle>{{ equipment.price }} บาท</v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="toggleEquipmentExpansion(equipment.id_equipment)">
                                    <v-icon>{{ isEquipmentExpanded(equipment.id_equipment) ? 'mdi-chevron-up' :
                                        'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                                <v-btn class="ma-2" color="primary" dark>
                                    <v-icon dark>
                                        mdi-wrench
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ma-2" color="red" dark
                                @click="deleteEquipmentsData(equipment.id_equipment)">
                                    Delete
                                    <v-icon dark right>
                                        mdi-cancel
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                                <div v-show="isEquipmentExpanded(equipment.id_equipment)">
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <p>Date in : {{ equipment.date }}</p>
                                        <p>Asset Number : {{ equipment.asset_number }}</p>
                                        <p>Department : {{ equipment.department }}</p>
                                        <p>Undertaker : {{ equipment.undertaker }}</p>
                                        <p>Document Number : {{ equipment.document_number }}</p>
                                        <p>Store : {{ equipment.store }}</p>
                                        <p>Note : {{ equipment.note }}</p>
                                        <p>Date in: {{ formatDateWithoutTime(equipment.date) }}</p>
                                        <p>Date Out : {{ equipment.date_out }}</p>
                                        <!-- <p>Lasted Update : {{ new Date(equipment.updatetime).toLocaleString() }}</p> -->
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    layout: 'navbar-user',

    data() {
        return {
            equipments: [],
            currentExpanded: null,
        };
    },

    async fetch() {
        await this.fetchEquipmentData()
    },
    methods: {
        async fetchEquipmentData() {
            this.equipments = await this.$store
                .dispatch('api/equipment/getEquipments')
        },

        async deleteEquipmentsData(id_equipment) {
      try {
        const req = await this.$store
          .dispatch('api/equipment/deleteEquipments', {params:{id_equipment}})
          console.log(req);
          this.$fetch()
      } catch (error) {
        console.error('Error deleting Equipment:', error);
      }
    },
        gotoEquipmentCreate() {
            this.$router.push('/equipment/equipmentcreate')
        },
        formatDateWithoutTime(dateTimeString) {
            const date = new Date(dateTimeString);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        },
        isEquipmentExpanded(equipmentId) {
            return this.currentExpanded === equipmentId;
        },
        toggleEquipmentExpansion(equipmentId) {
            this.currentExpanded = this.currentExpanded === equipmentId ? null : equipmentId;
        },
    },
}
</script>