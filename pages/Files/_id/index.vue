<template>
    <b-container fluid class="mt-1">
         <b-row>
            <b-col md="3">
                <b-img rounded fluid :src="file.thumbUrl" class="img_thumb"/>
            </b-col>
            <b-col>
                <h1>Edit File</h1>
                <FileEdit :file="file" :clubs="clubs"/>
            </b-col>
         </b-row>
    </b-container>
</template>

<script>
import FileEdit from "~/components/Files/FileEdit";
export default {
    data(){
        return {
            file: '',
            clubs: this.$store.getters.GET_FILES
        }
    },
    created(){
        var file = this.$store.getters.GET_FILE_ID(this.$route.params.id);
        if(!file)
            return this.$router.push('/');
        return this.file = file;
    },
    components: {
        FileEdit
    }
}
</script>

<style lang="scss" scoped>
.img_thumb{
    background-color: #d1cfcf;
    text-align: center;
}
</style>
