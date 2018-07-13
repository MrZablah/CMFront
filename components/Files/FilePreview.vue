<template>
    <nuxt-link :to="postLink" tag="span" class="file-card">
        <b-card class="custom_card"
            :id="id"
            :title="name"
            :img-src="thumbnail"
            img-fluid
            img-alt="image"
            img-top>
            <!-- <p class="card-text">{{description}}</p> -->
            <b-badge class="custom_badge" variant="secondary" v-for="tag in tags" :key="tag.id">{{tag.name}}</b-badge>
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
        // description: {
        //     type: String,
        //     required: true
        // },
        tags: {
            type: Array
        }
    },
    computed:{
        postLink(){
            return this.isAdmin ? '/Admin/Files/' + this.id : '/';
        }
    }
}
</script>

<style lang="scss" scoped>
    .file-card{
        cursor: pointer;
    }
    .custom{
        &_badge{
            margin: 1px;
            background-color: orange;
        }
        &_card{
           margin-bottom: 1rem;
            @include mediaQ(576px){
                max-width: 250px;
            }
        }
    }
</style>


