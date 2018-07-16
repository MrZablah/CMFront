<template>
    <b-container>
        <h1>{{id}}</h1>
    </b-container>
</template>

<script>
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        }
    }
</script>
