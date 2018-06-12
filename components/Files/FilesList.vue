<template>
    <b-card-group columns>
        <FilesPreview v-for="file in Files" :key="file.id"
            :id="file.id"
            :name="file.name"
            :thumbnail="file.thumbnail"
            :description="file.description != null ? file.description : ''"
            :tags="file.tags"
            :isAdmin="isAdmin"/>
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