// ~/plugins/axios
import Vue from 'vue';

Vue.prototype.$Api = {
    getFiles: (axios) => {
        return axios.$get('/file');
    }
}