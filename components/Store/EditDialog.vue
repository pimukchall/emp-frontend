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
          <v-btn color="primary" @click="confirm" class="font-weight-medium mt-3">
            แก้ไข
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
          this.$emit('update:edit', false);
          await this.UpdateData(this.data.id);
        } catch (error) {
          console.error('Error Updating :', error);
        }
      },
      cancel() {
        this.$emit('update:edit', false);
      },
      async UpdateData() {
        try {
          const req = await this.$store.dispatch('api/store/putStores', this.data);
          this.modal.complete.open = true;
        } catch (error) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        }
      },
    },
  };
  </script>
  