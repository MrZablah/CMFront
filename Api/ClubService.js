export default class ClubService {
	constructor(ctx) {
		this.$axios = ctx.$axios;
		this.$store = ctx.$store;
	}

	get(){
		var token = this.$store.getters.GET_TOKEN;
		if(token === null)
			return this.$store.dispatch('LOGOUT');

		return this.$axios.$get('/club', {
			headers: {Authorization: `Bearer ${token}`}
		});
	}

	delete(id) {
		var token = this.$store.getters.GET_TOKEN;
		if(token === null)
			return this.$store.dispatch('LOGOUT');

		return this.$axios.$delete(`/club/${id}`, {
			headers: {Authorization: `Bearer ${token}`}
		});
	}

	edit(club, id) {
		var token = this.$store.getters.GET_TOKEN;
		if(token === null)
			return this.$store.dispatch('LOGOUT');

		return this.$axios.$patch(`/club/${id}`, club, {
			headers: {Authorization: `Bearer ${token}`}
		});
	}
}
