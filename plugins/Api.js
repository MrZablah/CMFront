import FileService from '@/Api/FileService';
import AuthService from '@/Api/AuthService';

export default (ctx, inject) => {
	const file = new FileService({ $axios: ctx.app.$axios, $store: ctx.app.store });
	const auth = new AuthService({ $axios: ctx.app.$axios });

	ctx.$Api = {'file': file, 'auth': auth};
	inject('Api', {'file': file, 'auth': auth});
};
