<template>
    <b-card-group deck>
        <FilesPreview 
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
import FilesPreview from "~/components/Files/FilePreview.vue";

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
        FilesPreview
    }
};
</script>
