var filesState = {
	loadedFiles: []
};

var filesMutations = {
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

var filesActions = {
	setFiles({ commit }, files) {
		commit('setFiles', files);
	},
	addNewFile({ commit }, file) {
		commit('addFiles', file);
	},
	deleteFile({ commit }, fileId) {
		commit('deleteFile', fileId);
	}
};

var filesGetters = {
	loadedFiles: state => state.loadedFiles,
	getFileById: state => id => {
		var file = state.loadedFiles.find(f => f.id == id);
		return file ? file : false;
	},
	getFileByName: state => name => {
		var file = state.loadedFiles.find(f => f.name == name);
		return file ? file : false;
	},
	existFileByName: state => name => {
		var file = state.loadedFiles.find(f => f.name == name);
		return file ? true : false;
	}
};

module.exports = {
	filesState,
	filesMutations,
	filesActions,
	filesGetters
};
