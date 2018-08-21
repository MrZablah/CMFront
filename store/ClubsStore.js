var clubsState = {
	loadedClubs: []
};

var clubsMutations = {
	setClubs(state, clubs) {
		state.loadedClubs = clubs;
	},
	addClubs(state, club) {
		state.loadedClubs.push(club);
	},
	deleteClub(state, id) {
		state.loadedClubs = state.loadedClubs.filter(c => c.id !== id);
	}
};

var clubsActions = {
	setClubs({ commit }, clubs) {
		commit('setClubs', clubs);
	},
	addNewClub({ commit }, club) {
		commit('addClubs', club);
	},
	deleteClub({ commit }, clubId) {
		commit('deleteClub', clubId);
	}
};

var clubsGetters = {
	loadedClubs: state => state.loadedClubs,
	getClubById: state => id => {
		var club = state.loadedClubs.find(c => c.id == id);
		return club ? club : false;
	},
	getClubByName: state => name => {
		var club = state.loadedClubs.find(c => c.name == name);
		return club ? club : false;
	},
	existClubByName: state => name => {
		var club = state.loadedClubs.find(c => c.name == name);
		return club ? true : false;
	}
};

module.exports = {
	clubsState,
	clubsMutations,
	clubsActions,
	clubsGetters
};
