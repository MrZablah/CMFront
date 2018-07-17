import Vuex from 'vuex';

const createStore = () => {
	return new Vuex.Store({
		state: {
			loadedFiles: [],
            user: null
		},
		mutations: {
			setFiles(state, files) {
				state.loadedFiles = files;
			},
			addFiles(state, files) {
				state.loadedFiles.push(files);
			}
		},
		actions: {
			setFiles(vuexContext, files) {
				vuexContext.commit('setFiles', files);
			},
		},
		getters: {
			loadedFiles: state => state.loadedFiles
		}
	});
};

export default createStore;
