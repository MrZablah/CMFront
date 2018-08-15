import FileService from '@/Api/FileService';

export default (ctx, inject) => {
	const file = new FileService({ $axios: ctx.app.$axios });
	ctx.$Api = {'file': file};
	inject('Api', {'file': file});
};
