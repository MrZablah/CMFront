import AuthService from '@/Api/AuthService';
import FileService from '@/Api/FileService';
import ClubService from '@/Api/ClubService';

export default (ctx, inject) => {
	const auth = new AuthService({ $axios: ctx.app.$axios });
	const file = new FileService({ $axios: ctx.app.$axios, $store: ctx.app.store });
	const club = new ClubService({ $axios: ctx.app.$axios, $store: ctx.app.store });

	ctx.$Api = {'file': file, 'auth': auth, 'club': club};
	inject('Api', {'file': file, 'auth': auth, 'club': club});
};
