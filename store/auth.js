var aState = {
	islogin: true,
	isAdmin: true
};

var aMutations = {
	login(state) {
		state.islogin = true;
	},
	logout(state) {
		state.islogin = false;
	},
	isAdmin(state) {
		state.isAdmin = true;
	},
	notAdmin(state) {
		state.isAdmin = false;
	}
};

var aActions = {
	login({ commit }, user) {
		console.log(user);
		commit('login');
		commit('isAdmin');
		return user;
	},
	logout({ commit }) {
		commit('logout');
		commit('notAdmin');
	}
};

var aGetters = {
	getIsAdmin: state => state.isAdmin,
	getLogin: state => state.islogin
};

module.exports = {
	aState,
	aMutations,
	aActions,
	aGetters
};
