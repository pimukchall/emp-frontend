<template>
    <div>
      <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="UpdateData"
      />
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
      v-model="open"
      v-if="data"
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
                <v-col cols="12">
                  <v-text-field
                    v-model="data.name"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อร้านค้า']"
                    label="ชื่อร้านค้า"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="data.seller"
                    label="ชื่อผู้ขาย"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="data.phone"
                    :rules="[(v) => !!v || 'กรุณากรอกเบอร์โทรศัพท์'] && [(v) => (v && v.length === 10) || 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ']"
                    label="เบอร์โทรศัพท์"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="data.address"
                    :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
                    label="ที่อยู่"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="confirm"
            :disabled="!valid"
            depressed 
            color="primary" 
            class="font-weight-medium mt-3"
            >แก้ไข
          </v-btn>
          <v-btn color="error" 
            @click="cancel" 
            class="font-weight-medium mt-3"
            >ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </template>
  <script>
  import moment from 'moment'
  moment.locale('th')
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
        valid: false,
        modal: {
          confirm: {
            open: false,
            message: 'ยืนยันการแก้ไขข้อมูลหรือไม่?',
          },
          complete: {
            open: false,
            message: 'เสร็จสิ้น',
          },
          error: {
            open: false,
            message: '',
          },
        },
      };
    },
    methods: {
      async confirm() {
        try {
          this.$emit('update:edit', false)
          this.modal.confirm.open = true
        } catch (error) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
        }
      },
      cancel() {
        this.$emit('update:edit', false);
      },
      async UpdateData() {
        try {
          const req = await this.$store.dispatch('api/store/putStores', this.data);
          this.modal.complete.open = true;
          console.log('Data:', this.data);
          this.recordLogUpdate(this.data.id);
        } catch (error) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        }
      },
      recordLogUpdate(id) {
      const log = {
        user_id: this.$auth.user.id,
        action: 'อัพเดทข้อมูล',
        description: this.$auth.user.email + ' ' + 'อัพเดทข้อมูลร้านค้า' + ' ' + id + ' ' + 'เวลา' + ' ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(log)
      this.$store.dispatch('api/log/postLogs', log)
    },
    },
  };
  </script>
  