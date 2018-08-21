import Vuex from 'vuex';
import {authState, authMutations, authActions, authGetters} from './auth';
import {filesState, filesMutations, filesActions, filesGetters} from './filesStore';
import {clubsState, clubsMutations, clubsActions, clubsGetters} from './ClubsStore';

const createStore = () => {
	return new Vuex.Store({
		state: {
			...authState,
			...filesState,
			...clubsState
		},
		mutations: {
			...authMutations,
			...filesMutations,
			...clubsMutations
		},
		actions: {
			...authActions,
			...filesActions,
			...clubsActions
		},
		getters: {
			...authGetters,
			...filesGetters,
			...clubsGetters
		}
	});
};

export default createStore;
