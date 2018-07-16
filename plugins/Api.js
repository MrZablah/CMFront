// ~/plugins/axios
import Vue from 'vue';

Vue.prototype.$Api = {
    getFiles: (axios) => {
        return axios.$get('/file');
    },
    uploadFile: (axios, fileToUpload, fileName) => {
        var form = new FormData();
        form.append('file', fileToUpload);
        form.append('name', fileName);
        return axios.$put('/file', form);
    }
}