<template>
    <b-container>
        <EditFile :file="file"/>
    </b-container>
</template>

<script>
import EditFile from "~/components/Files/EditFile";
export default {
    data(){
        return {
            file: this.$store.getters.getFileById(this.$route.params.id)
        }
    },
    components: {
        EditFile
    }
}
</script>
