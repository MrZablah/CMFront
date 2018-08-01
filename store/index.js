import Vuex from 'vuex';
import {fState, fMutations, fActions, fGetters} from "./filesStore";
import {aState, aMutations, aActions, aGetters} from "./auth";

const createStore = () => {
	return new Vuex.Store({
		state: {
			...aState,
			...fState
		},
		mutations: {
			...aMutations,
			...fMutations
		},
		actions: {
			...aActions,
			...fActions
		},
		getters: {
			...aGetters,
			...fGetters
		}
	});
};

export default createStore;
