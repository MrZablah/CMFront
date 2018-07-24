<template>
    <b-container fluid class="mt-1">
         <b-row>
            <b-col md="3">
                <b-img rounded fluid :src="file.thumbUrl" class="img_thumb"/>
            </b-col>
            <b-col>
                <h1>Edit File</h1>
                <EditFile :file="file"/>
            </b-col>
         </b-row>
    </b-container>
</template>

<script>
import EditFile from "~/components/Files/EditFile";
export default {
    data(){
        return {
            file: ''
        }
    },
    created(){
        var file = this.$store.getters.getFileById(this.$route.params.id);
        if(!file)
            return this.$router.push('/');
        return this.file = file;
    },
    components: {
        EditFile
    }
}
</script>

<style lang="scss" scoped>
.img_thumb{
    background-color: #d1cfcf;
    text-align: center;
}
</style>
