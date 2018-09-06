<template>
    <b-container fluid>
        <b-row align-h="end">
            <b-button class="icon_container" variant="dark" @click="viewCard = !viewCard">
                Change View 
                <icons v-if="viewCard" :icon="['fal', 'table']"></icons>
                <icons v-else :icon="['fas', 'image']"></icons>
            </b-button>
        </b-row>
        <b-row class="custom_view_container">
            <FilesList v-if="viewCard" :Files="loadedFiles()"/>
            <FilesTable v-else :Files="loadedFiles()"/>
        </b-row>
    </b-container>
</template>

<script>
import FilesTable from "~/components/Files/FilesTable";
import FilesList from "~/components/Files/FilesList";
export default {
    data() {
        return {
            viewCard: false
        }
    },
    methods: {
        loadedFiles(){
            return this.$store.getters.GET_FILES;
        }
    },
    components: {
        FilesList,
        FilesTable
    }
}
</script>

<style lang="scss" scoped>
    .icon_container{
        font-size: 1.5rem;
        margin: 10px 0 10px 0;
        padding: 0px 7px;
    }
</style>


