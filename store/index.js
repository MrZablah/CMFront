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
			addFiles(state, file) {
				state.loadedFiles.push(file);
			}
		},
		actions: {
			setFiles(vuexContext, files) {
				vuexContext.commit('setFiles', files);
			},
			addNewFile(vuexContext, file){
				vuexContext.commit('addFiles', file);
			}
		},
		getters: {
			loadedFiles: state => state.loadedFiles,
			getFileById: (state) => (id) => {
				var file = state.loadedFiles.find(f => f.id == id);
				return file ? file : 'File not found';
			}
		}
	});
};

export default createStore;
