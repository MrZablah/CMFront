<template>
    <b-button v-if="isMobil()" size="sm" variant="success" @click="downloadFile()"><icons :icon="['fas', 'arrow-to-bottom']"></icons></b-button>
</template>

<script>
const downloadjs = require('downloadjs');
export default {
    props:{
        id: {
            type: Number,
            required: true
        },
        pathName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        isMobil(){
            if( this.$Utils.isMobile.iOS() )
                return false;
            return true;
        },
        downloadFile(){
            this.$snotify.async('Downloading File...', () => new Promise((resolve, reject) => {
                this.$Api.file.download(this.$axios, this.id).then(res => {
                    let newName = this.$Utils.newName(this.pathName, this.name);
                    let type = res.headers['content-type'].toLowerCase();
                    downloadjs(res.data, newName, type);
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'File downloaded!',
                        config: {
                            closeOnClick: true
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't download file.",
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

