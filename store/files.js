import * as types from './types';

export const STATE = {
	loadedFiles: []
};

export const MUTATIONS = {
	setFiles(state, files) {
		state.loadedFiles = files;
	},
	addFiles(state, file) {
		state.loadedFiles.push(file);
	},
	deleteFile(state, id) {
		state.loadedFiles = state.loadedFiles.filter(f => f.id !== id);
	}
};

export const ACTIONS = {
	[types.SET_FILES]({ commit }, files) {
		commit('setFiles', files);
	},
	[types.ADD_FILE]({ commit }, file) {
		commit('addFiles', file);
	},
	[types.DELETE_FILE]({ commit }, fileId) {
		commit('deleteFile', fileId);
	}
};

export const GETTERS = {
	[types.GET_FILES]: state => state.loadedFiles,
	[types.GET_FILE_ID]: state => id => {
		let file = state.loadedFiles.find(f => f.id == id);
		return file ? file : false;
	},
	[types.GET_FILE_NAME]: state => name => {
		let file = state.loadedFiles.find(f => f.name == name);
		return file ? file : false;
	},
	[types.EXIST_FILE_NAME]: state => name => {
		let file = state.loadedFiles.find(f => f.name == name);
		return file ? true : false;
	}
};
