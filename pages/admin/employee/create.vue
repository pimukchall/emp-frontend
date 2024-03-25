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
        <v-card-title class="headline">เพิ่มพนักงาน</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.fname"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ']"
                  label="ชื่อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lname"
                  :rules="[(v) => !!v || 'กรุณากรอกนามสกุล']"
                  label="นามสกุล"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.code_emp"
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสพนักงาน']"
                  label="รหัสพนักงาน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.phone"
                  :rules="[(v) => !!v || 'กรุณากรอกเบอร์โทร']"
                  label="เบอร์โทร"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="departMents"
                  v-model="form.department_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกแผนก']"
                  label="แผนก"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
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
  middleware: 'auth',
  head() {
    return {
      title: 'เพิ่มพนักงาน',
    }
  },
  data() {
    return {
      form: {
        fname: null,
        lname: null,
        phone: null,
        department_id: null,
        code_emp: null,
      },
      departMents: [],

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

  async fetch() {
    await this.fetchDepartMents()
  },

  methods: {
    async fetchDepartMents() {
      const DepartMents = await this.$store.dispatch(
        'api/department/getDepartments'
      )
      this.departMents = DepartMents
    },

    async create() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        const req = await this.$store.dispatch(
          'api/employee/postEmployees',
          this.form
        )

        console.log(req)
        this.modal.confirm.open = false
        this.modal.complete.open = true
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error)
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
    goBack() {
      this.$router.push('/admin/employee')
    },
  },
}
</script>
