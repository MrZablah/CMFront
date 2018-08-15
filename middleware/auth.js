export default function({ store, route, redirect }) {
	console.log('[Auth Middleware]');

	if (!store.getters.getLogin && route.fullPath !== '/') return redirect('/');

	if (!store.getters.getIsAdmin && route.fullPath.toLowerCase().includes('files/'))
		return redirect('/');
}
