<template>
    <b-container>
        <FilesList :Files="loadedFiles"/>    
    </b-container>
</template>

<script>
import FilesList from "~/components/Files/FilesList";
export default {
    // data() {
    //     return {
    //         files:[
    //             {
    //                 id: 1,
    //                 name: 'File One',
    //                 thumbnail: 'https://picsum.photos/300/300/?image=41',
    //                 description: 'This is a demo File',
    //                 tags:[
    //                     {
    //                         id: 1,
    //                         name: 'sexy'
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // },
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

