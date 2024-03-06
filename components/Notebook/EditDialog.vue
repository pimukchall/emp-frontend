<template>
    <v-dialog persistent :retain-focus="false" v-model="open" v-if="data" max-width="650" max-height="300"
        content-class="rounded-xl">
        <v-card class="rounded-xl">
            <v-card-title>{{ data.id }}</v-card-title>
            <v-card-text>
                <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.model" 
                      :rules="[(v) => !!v || 'Model is required']"
                      label="Model" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.brand" 
                      :rules="[(v) => !!v || 'Brand is required']" 
                      label="Brand"
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.cpu" 
                      :rules="[(v) => !!v || 'CPU is required']"
                      label="CPU" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.ram" 
                      :rules="[(v) => !!v || 'RAM is required']"
                      label="RAM" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.gpu" 
                      :rules="[(v) => !!v || 'GPU is required']"
                      label="GPU" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.ram" 
                      :rules="[(v) => !!v || 'Ram is required']"
                      label="Ram" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.storage" 
                      :rules="[(v) => !!v || 'Storage is required']"
                      label="Storage" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.os" 
                      :rules="[(v) => !!v || 'OS is required']"
                      label="OS" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.license_window" 
                      :rules="[(v) => !!v || 'License Window is required']"
                      label="License Window" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.asset_number" 
                      :rules="[(v) => !!v || 'Asset number is required']"
                      label="Asset number" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.undertaker" 
                      :rules="[(v) => !!v || 'Undertaker is required']"
                      label="Undertaker" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.department" 
                      :rules="[(v) => !!v || 'Department is required']"
                      label="Department" 
                      outlined 
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      v-model="data.note" 
                      label="Note" 
                      outlined 
                    >
                    </v-text-field>
                  </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="data.date_in"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="confirm" class="font-weight-medium mt-3">
                    Ok
                </v-btn>
                <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        open: {
            required: true,
        },
        data: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
          valid:false,
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          menu: false,
          modal: false,
          menu2: false,
        }
    },
    methods: {
        async confirm() {
            try {
                this.$emit('update:edit', false)
                await this.UpdateNotebooksData(this.data.id_notebook)
            } catch (error) {
                console.error('Error Updating notebook 1:', error);
            }
        },
        cancel() {
            this.$emit('update:edit', false)
        },

        async UpdateUsersData() {
            try {
                const req = await this.$store
                .dispatch('api/notebook/putNotebooks', this.data)

                console.log(req)
                
            } catch (error) {
                console.error('Error Updating notebook 2:', error);
            }
        },
    },
}
</script>