import Vuex from 'vuex';
import Cookie from 'js-cookie';

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
			nuxtServerInit(vuexContext, context) {
				return this.$axios
					.$get('/file')
					.then(data => {
						// console.log(data);
						vuexContext.commit('setFiles', data);
					})
					.catch(e => context.error(e));
			}
		},
		getters: {
			loadedFiles(state) {
				return state.loadedFiles;
			}
		}
	});
};

export default createStore;
