<template>
    <div>
      <ModalConfirm
        :open="modal.confirm.open"
        :message="modal.confirm.message"
        :method="create"
        :confirm.sync="modal.confirm.open"
      />
      <ModalComplete
        :open="modal.complete.open"
        :message="modal.complete.message"
        :method="goBack"
        :complete.sync="modal.complete.open"
      />
      <ModalError
        :open="modal.error.open"
        :message="modal.error.message"
        :error.sync="modal.error.open"
      />
      <v-container>
        <v-card
          class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
          max-width="800"
          max-height="auto"
        >
          <v-card-title class="headline">เพิ่มไซต์งาน</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.name"
                    :rules="[(v) => !!v || 'กรุณากรอกชื่อไซต์งาน']"
                    label="ชื่อไซต์งาน"
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
                    v-model="form.address"
                    :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
                    label="ที่อยู่"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="agree"
                    label="ยอมรับข้อตกลงและเงื่อนไข"
                  ></v-checkbox>
                  <v-card-actions class="justify-center">
                    <v-btn
                      @click="create"
                      :disabled="!valid"
                      depressed
                      color="secondary"
                      >เพิ่ม</v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  <script>
  export default {
    layout: 'admin',
    head() {
      return {
        title: 'เพิ่มไซต์งาน',
      }
    },
    data() {
      return {
        form: {
            name: '',
            address: '',
        },
  
        modal: {
          confirm: {
            open: false,
            message: 'คุณต้องการเพิ่มรายการหรือไม่?',
          },
          complete: {
            open: false,
            message: 'เพิ่มรายการสำเร็จ',
          },
          error: {
            open: false,
            message: '',
          },
          loading: {
            open: false,
            message: 'กำลังโหลด...',
          },
        },
        valid: false,
        agree: false,
      }
    },
  
    methods: {
      async create() {
        try {
          if (!this.$refs.form.validate() || !this.agree) {
            this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
            this.modal.error.open = true
            return
          }
          const req = await this.$store.dispatch('api/location/postLocations', this.form)
  
          console.log(req)
          this.modal.confirm.open = false
          this.modal.complete.open = true
        } catch (error) {
          console.error('เกิดข้อผิดพลาด:', error)
          this.modal.error.message = 'เกิดข้อผิดพลาด'
        }
      },
      goBack() {
        this.$router.push('/admin/location')
      },
    },
  }
  </script>
  