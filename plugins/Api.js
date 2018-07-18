import Vue from 'vue';

Vue.prototype.$Api = {
    getFiles: (axios) => {
        return axios.$get('/file');
    },
    uploadFile: (axios, fileToUpload, fileName, progresCB) => {
        var form = new FormData();
        form.append('file', fileToUpload);
        form.append('fileName', fileName);
        return axios.$post('/file', form, {
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    // console.log("onUploadProgress", totalLength);
                    var progres = Math.round( (progressEvent.loaded * 100) / totalLength ) - 5;
                    // console.log(progres);
                    progresCB(progres);
                }
            }
        });
    },
    downloadFile: (axios, id) => {
        return axios.get(`/file/${id}/download`, { responseType:"arraybuffer" });
    }
}