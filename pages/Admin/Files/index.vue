<template>
    <b-container>
        <FilesList :Files="loadedFiles" :isAdmin="isAdmin"/>    
    </b-container>
</template>

<script>
import FilesList from "~/components/Files/FilesList";
export default {
    data() {
        return {
            isAdmin: true
        }
    },
    computed: {
        loadedFiles(){
            return this.$store.getters.loadedFiles;
        }
    },
    components: {
        FilesList
    }
}
</script>

