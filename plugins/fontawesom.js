import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage } from '@fortawesome/pro-solid-svg-icons';
import { faTable } from '@fortawesome/pro-light-svg-icons';
// import {  } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faImage, faTable);

Vue.component("icons", FontAwesomeIcon);