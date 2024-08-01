<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            <h3>หน้าหลัก</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-alert type="success" :value="true">
                                        ยินดีต้อนรับ {{ $auth.user.fname }} {{ $auth.user.lname }}
                                    </v-alert>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: 'user',
    middleware: 'auth',
    async mounted() {
        await this.checkRole();
    },
    methods: {
        async checkRole() {
            if (this.$auth.loggedIn) {
                const roleId = this.$auth.user.role_id.toString(); // Ensure role_id is a string
                console.log('User Role ID:', roleId);
                if (roleId === '1') {
                    console.log('Admin');
                    this.$router.push('/admin/home');
                } else if (roleId === '2') {
                    console.log('Executive');
                    this.$router.push('/executive/home');
                } else if (roleId === '3') {
                    console.log('Manager Warehouse');
                    this.$router.push('/manager/home');
                } else if (roleId === '5') {
                    console.log('Purchasing');
                    this.$router.push('/purchasing/home');
                } else if (roleId === '6') {
                    console.log('User');
                    this.$router.push('/user/home');
                } else {
                    console.log('You cannot access this page');
                    this.$router.push('/');
                }
            } else {
                console.log('User is not logged in');
                this.$router.push('/');
            }
        },
    },
}
</script>