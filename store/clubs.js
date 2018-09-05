import * as types from './types';

export const STATE = {
	loadedClubs: []
};

export const MUTATIONS = {
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

export const ACTIONS = {
	[types.SET_CLUBS]({ commit }, clubs) {
		commit('setClubs', clubs);
	},
	[types.ADD_CLUB]({ commit }, club) {
		commit('addClubs', club);
	},
	[types.DELETE_CLUB]({ commit }, clubId) {
		commit('deleteClub', clubId);
	}
};

export const GETTERS = {
	[types.GET_CLUBS]: state => state.loadedClubs,
	[types.GET_CLUB_ID]: state => id => {
		let club = state.loadedClubs.find(c => c.id == id);
		return club ? club : false;
	},
	[types.GET_CLUB_NAME]: state => name => {
		let club = state.loadedClubs.find(c => c.name == name);
		return club ? club : false;
	},
	[types.EXIST_CLUB_NAME]: state => name => {
		let club = state.loadedClubs.find(c => c.name == name);
		return club ? true : false;
	}
};
