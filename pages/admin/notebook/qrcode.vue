<!-- QRCode.vue -->
<template>
    <div>
      <h2>QR Code Generator</h2>
      <img :src="qrcodeUrl" alt="QR Code">
    </div>
  </template>
  
  <script>
  export default {

    data() {
      return {
        qrcodeUrl: ''
      };
    },
    methods: {
      generateQRCode(id_notebook) {
        // สร้าง URL สำหรับ QR code โดยใช้ id
        this.qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${id_notebook}&size=200x200`;
      }
    },
    mounted() {
      // เรียก API เพื่อดึงข้อมูล ID จากฐานข้อมูล
      // และสร้าง QR code
      axios.get('https://localhost:3000/api/notebook/getNotebooks')
        .then(response => {
          const id_notebook = response.data.id_notebook;
          this.generateQRCode(id_notebook);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* เพิ่มสไตล์ตามต้องการ */
  </style>
  