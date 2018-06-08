<template>
    <nuxt-link :to="postLink" tag="span" class="file-card">
        <b-card :id="id"
            :title="name"
            :img-src="thumbnail"
            img-fluid
            img-alt="image"
            img-top>
            <p class="card-text">{{description}}</p>
            <b-badge variant="secondary" v-for="tag in tags" :key="tag.id">{{tag.name}}</b-badge>
        </b-card>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        isAdmin: {
            type: Boolean,
            default: true
        },
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        thumbnail:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: Array
        }
    },
    computed:{
        postLink(){
            return this.isAdmin ? '/' : '/posts/' + this.id;
        }
    }
}
</script>

<style scoped>
.file-card{
    cursor: pointer;
}
</style>


