<template lang="html">
    <div>
        <v-text-field v-model="query" label="Search"></v-text-field>
        <v-btn @click="handleSearchUser">Search</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            query: '',
            results: []
        }
    },
    methods: {
        handleSearchUser() {
            const url = 'http://localhost:3001/api/users/search?query=' + this.query
            axios.get(url).then((res) => {
                console.log(res.data)
                this.results = res.data.results
            })
        }
    }
}
</script>

<style lang="css" scoped></style>