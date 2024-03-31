<template>
    <div>
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <v-dialog 
      persistent 
      :retain-focus="false" 
      v-model="open" v-if="data" 
      max-width="650" 
      max-height="300"
      content-class="rounded-xl"
      >
        <v-card class="rounded-xl">
            <v-card-title>{{ data.id }}</v-card-title>
            <v-card-text>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.brand" 
                          :rules="[(v) => !!v || 'กรุณากรอกยี่ห้อ']" 
                          label="ยี่ห้อ"
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                        v-model="data.model" 
                        :rules="[(v) => !!v || 'กรุณากรอกชื่อรุ่น']"
                        label="รุ่น" 
                        outlined 
                        required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.cpu" 
                          :rules="[(v) => !!v || 'กรุณากรอกชื่อ CPU']"
                          label="ชื่อ CPU" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.gpu" 
                          :rules="[(v) => !!v || 'กรุณากรอกชื่อ GPU']"
                          label="ชื่อ GPU" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.ram" 
                          :rules="[
                            (v) => !!v || 'กรุณากรอกขนาด RAM',
                            (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกเป็นตัวเลข'
                          ]"
                          label="หน่วยความจำ" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.storage" 
                          :rules="[
                            (v) => !!v || 'กรุณากรอกพื้นที่จัดเก็บข้อมูล',
                            (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกเป็นตัวเลข'
                          ]"
                          label="พื้นที่จัดเก็บข้อมูล" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.os" 
                          :rules="[(v) => !!v || 'กรุณากรอกระบบปฏิบัติการ']"
                          label="ระบบปฏิบัติการ" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.license_window" 
                          :rules="[(v) => !!v || 'กรุณากรอกหมายเลขลิขสิทธิ์']"
                          label="หมายเลขลิขสิทธิ์" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          v-model="data.asset_number" 
                          :rules="[(v) => !!v || 'กรุณากรอกรหัสทรัพย์สิน']"
                          label="รหัสทรัพย์สิน" 
                          outlined 
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="uSer"
                          v-model="data.user_id"
                          item-text="fname"
                          item-value="id"
                          :rules="[(v) => !!v || 'กรุณาเลือกผู้รับผิดชอบ']"
                          label="ผู้รับผิดชอบ"
                          outlined
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="eMployee"
                          v-model="data.employee_id"
                          item-text="fname"
                          item-value="id"
                          :rules="[(v) => !!v || 'กรุณาเลือกผู้ถือครอง']"
                          label="ผู้ถือครอง"
                          outlined
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="sTore"
                          v-model="data.store_id"
                          item-text="name"
                          item-value="id"
                          :rules="[(v) => !!v || 'กรุณาเลือกสาขาที่ซื้อ']"
                          label="สาขาที่ซื้อ"
                          outlined
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="[
                            { id: 0, name: 'In use' },
                            { id: 1, name: 'Write off' },
                            { id: 2, name: 'Available' }
                          ]"
                          v-model="data.status"
                          item-text="name"
                          item-value="id"
                          :rules="[(v) => !!v || 'กรุณาเลือกสถานะ']"
                          label="สถานะ"
                          outlined
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="data.note"
                          label="หมายเหตุ"
                          outlined
                        >
                      </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="12" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="data.date_out"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formattedDate"
                            label="วันที่ส่งมอบ"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || 'กรุณากรอกวันที่ส่งมอบ']"
                            outlined
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false"
                            >ยกเลิก</v-btn
                          >
                          <v-btn text color="primary" @click="$refs.menu.save(date)"
                            >ยืนยัน</v-btn
                          >
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
                    ยืนยัน
                </v-btn>
                <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
                    ยกเลิก
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import moment from 'moment';
moment.locale('th');
export default {
    props: {
        method: { type: Function },
        open: {
            required: true,
        },
        data: {
            required: true,
        },
    },

    data() {
        return {
          valid:false,
          menu: false,
          uSer: [],
          sTore: [],
          eMployee: [],
          store_id: null,
          user_id: null,
          employee_id: null,
          date_out: new Date().toISOString().substr(0, 10),
          date: new Date().toISOString().substr(0, 10),

          modal: {
            complete: {
              open: false,
              message: 'แก้ไขข้อมูลสำเร็จ',
            },
            error: {
              open: false,
              message: 'ขออภัย กรุณากรอกข้อมูลให้ครบถ้วน',
            },
          },
        }
    },

    computed: {
    formattedDate() {
      return moment(this.data.date_out).format('Do MMMM YYYY');
    },
  },

    async fetch() {
        await this.fetchUserData()
        await this.fetchStoreData()
        await this.fetchEmployeeData()
    },

    methods: {
        async confirm() {
            try {
                this.$emit('update:edit', false)
                await this.UpdateData(this.data.id)
            } catch (error) {
                this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
            }
        },
        cancel() {
            this.$emit('update:edit', false)
        },
        async UpdateData() {
            try {
                const req = await this.$store.dispatch('api/notebook/putNotebooks', this.data)
                this.modal.complete.open = true
            } catch (error) {
              this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            }
        },
        
        async fetchUserData() {
            const USer = await this.$store.dispatch(
              'api/user/getUsers'
            )
            this.uSer = USer
        },
        async fetchStoreData() {
            const STore = await this.$store.dispatch(
              'api/store/getStores'
              )
            this.sTore = STore
        },
        async fetchEmployeeData() {
            const EMployee = await this.$store.dispatch(
              'api/employee/getEmployees'
            )
            this.eMployee = EMployee
        },
    },
}
</script>