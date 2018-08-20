export default class FileService {
	constructor(ctx) {
		this.$axios = ctx.$axios;
		this.$store = ctx.$store;
	}

	get(){
		var token = this.$store.getters.getToken;
		if(token === null)
			return this.$store.dispatch('logout');

		return this.$axios.$get('/file', {
			headers: {Authorization: `Bearer ${token}`}
		});
	}

	delete(id) {
		var token = this.$store.getters.getToken;
		if(token === null)
			return this.$store.dispatch('logout');

		return this.$axios.$delete(`/file/${id}`, {
			headers: {Authorization: `Bearer ${token}`}
		});
	}

	upload(fileToUpload, fileName, progresCB) {
		var token = this.$store.getters.getToken;
		if(token === null)
			return this.$store.dispatch('logout');

		var form = new FormData();
		form.append('file', fileToUpload);
		form.append('fileName', fileName);
		return this.$axios.$post('/file', form, {
			headers: {Authorization: `Bearer ${token}`},
			onUploadProgress: function(progressEvent) {
				if (progressEvent.lengthComputable) {
					const totalLength = progressEvent.lengthComputable
						? progressEvent.total
						: progressEvent.target.getResponseHeader('content-length') ||
						progressEvent.target.getResponseHeader('x-decompressed-content-length');
					// console.log("onUploadProgress", totalLength);
					let progres = Math.round((progressEvent.loaded * 100) / totalLength) - 5;
					// console.log(progres);
					progresCB(progres);
				}
			}
		});
	}

	download(id) {
		var token = this.$store.getters.getToken;
		if(token === null)
			return this.$store.dispatch('logout');

		return this.$axios
			.$get(`/file/${id}/download`, {
				headers: {Authorization: `Bearer ${token}`}
			}).then(res => this.$axios.get(res, { responseType: 'arraybuffer' }));
	}

	edit(file, id) {
		var token = this.$store.getters.getToken;
		if(token === null)
			return this.$store.dispatch('logout');

		return this.$axios.$patch(`/file/${id}`, file, {
			headers: {Authorization: `Bearer ${token}`}
		});
	}
}
