export default class FileService {
	constructor(ctx) {
		this.$axios = ctx.$axios;
	}

	get(){
		return this.$axios.$get('/file');
	}

	delete(id) {
		return this.$axios.$delete(`/file/${id}`);
	}

	upload(fileToUpload, fileName, progresCB) {
		var form = new FormData();
		form.append('file', fileToUpload);
		form.append('fileName', fileName);
		return this.$axios.$post('/file', form, {
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
		return this.$axios
			.$get(`/file/${id}/download`)
			.then(res => this.$axios.get(res, { responseType: 'arraybuffer' }));
	}

	edit(file, id) {
		return this.$axios.$patch(`/file/${id}`, file);
	}
}
