<template>
    <b-button size="sm" variant="danger" @click="deleteFile()"><icons :icon="['fa', 'trash']"></icons></b-button>
</template>

<script>
export default {
    props:{
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        deleteFile(){
            this.$snotify.async('Deleting File...', () => new Promise((resolve, reject) => {
                this.$Api.file.delete(this.$axios, this.id).then(res => {
                    this.$store.dispatch('deleteFile', this.id);
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'File Deleted!',
                        config: {
                            closeOnClick: true
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't delete file.",
                        config: {
                            closeOnClick: true
                        }
                    })
                });
            }));
        }
    },
}
</script>
