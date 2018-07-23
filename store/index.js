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
			},
			deleteFile(state, id){
				state.loadedFiles = state.loadedFiles.filter(f => f.id !== id);
			}
		},
		actions: {
			setFiles(vuexContext, files) {
				vuexContext.commit('setFiles', files);
			},
			addNewFile(vuexContext, file){
				vuexContext.commit('addFiles', file);
			},
			deleteFile(vuexContext, fileId){
				vuexContext.commit('deleteFile', fileId);
			}
		},
		getters: {
			loadedFiles: state => state.loadedFiles,
			getFileById: (state) => (id) => {
				var file = state.loadedFiles.find(f => f.id == id);
				return file ? file : false;
			},
			getFileByName: (state) => (name) => {
				var file = state.loadedFiles.find(f => f.name == name);
				return file ? file : false;
			},
			existFileByName: (state) => (name) => {
				var file = state.loadedFiles.find(f => f.name == name);
				return file ? true : false;
			}
		}
	});
};

export default createStore;
