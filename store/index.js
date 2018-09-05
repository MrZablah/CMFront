import Vuex from 'vuex';
import * as auth from './auth';
import * as files from './files';
import * as clubs from './clubs';

const createStore = () => {
	return new Vuex.Store({
		state: {
			...auth.STATE,
			...files.STATE,
			...clubs.STATE,
		},
		mutations: {
			...auth.MUTATIONS,
			...files.MUTATIONS,
			...clubs.MUTATIONS,
		},
		actions: {
			...auth.ACTIONS,
			...files.ACTIONS,
			...clubs.ACTIONS,
		},
		getters: {
			...auth.GETTERS,
			...files.GETTERS,
			...clubs.GETTERS,
		}
	});
};

export default createStore;
