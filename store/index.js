import Vuex from 'vuex';
import filesStore from "./filesStore";

const createStore = () => {
	return new Vuex.Store({
		...filesStore
	});
};

export default createStore;
