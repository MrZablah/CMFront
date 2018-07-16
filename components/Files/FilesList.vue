<template>
    <b-card-group deck>
        <FileCard 
            v-for="file in Files" :key="file.id"
            :id="file.id"
            :name="file.name"
            :thumbnail="file.thumbUrl"
            :tags="file.tags"
            :isAdmin="isAdmin"/>
            <!-- :description="file.description != null ? file.description : ''" -->
    </b-card-group>
</template>

<script>
import FileCard from "~/components/Files/FileCard.vue";

export default {
    props:{
        Files: {
            type: Array,
            required: true
        },
        isAdmin: {
            type: Boolean
        }
    },
    components:{
        FileCard
    }
};
</script>
