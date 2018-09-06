import Vue from 'vue';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage, faEye, faTrash, faFileEdit, faArrowToBottom, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { faTable } from '@fortawesome/pro-light-svg-icons';
// import {  } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faImage, faTable, faEye, faTrash, faFileEdit, faArrowToBottom, faTimes);
Vue.component('icons', FontAwesomeIcon);

// Vuelidate
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// Toasty notifications
import Snotify from 'vue-snotify';
const options = {
	toast: {
		timeout: 2000,
		position: 'centerTop'
	}
};
Vue.use(Snotify, options);

// Tags input
import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);
