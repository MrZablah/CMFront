import Vue from 'vue';
import Snotify from 'vue-snotify';

const options = {
  toast: {
    timeout: 2000,
    position: "centerTop"
  }
}

Vue.use(Snotify, options);
