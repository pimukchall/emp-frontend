<template>
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.fname"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อจริง']"
                  label="ชื่อจริง"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.lname"
                  :rules="[(v) => !!v || 'กรุณากรอกนามสกุล']"
                  label="นามสกุล"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.username"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                  label="ชื่อผู้ใช้"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.email"
                  :rules="[(v) => !!v || 'กรุณากรอกอีเมล']"
                  label="อีเมล"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.password"
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
                  password="input-10-2"
                  label="รหัสผ่าน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.phone"
                  :rules="[(v) => !!v || 'กรุณากรอกเบอร์ติดต่อ']"
                  label="เบอร์ติดต่อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="departMents"
                  v-model="data.id_department"
                  item-text= name_department
                  item-value="id_department"
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
                <v-text-field
                  v-model="data.avatar"
                  label="ลิงค์รูปภาพ"
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
</template>

<script>
import moment from 'moment';
moment.locale('th');

export default {
  props: {
    method: {type: Function},
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
      menu: false,
      departMents: [],
      id_department: null,
      modal: {
        confirm: { open: false, message: 'ยืนยันการแก้ไขข้อมูลหรือไม่?' },
        loading: { open: false, message: 'กำลังโหลด' },
        complete: { open: false, message: 'เสร็จสิ้น' },
        error: { open: false, message: '' },
      },
    }
  },

  async fetch() {
    const DepartMents = await this.$store.dispatch(
      'api/department/getDepartments'
    )
    this.departMents = DepartMents
  },

  methods: {
    async confirm() {
      try {
        this.$emit('update:edit', false)
        await this.UpdateUsersData(this.data.id)
      } catch (error) {
        console.error('Error Updating user:', error)
      }
    },
    cancel() {
      this.$emit('update:edit', false)
    },
    
    async UpdateUsersData() {
      try {
        const req = await this.$store.dispatch('api/user/putUsers', this.data)
        console.log(req)
        this.$fetch()
      } catch (error) {
        console.error('Error Updating user 2:', error)
      }
    },
  },
}
</script>