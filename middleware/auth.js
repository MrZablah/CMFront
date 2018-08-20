export default function({ store, route, redirect }) {
	// console.log('[Auth Middleware]');

	if(route.path === '/OAuth/OAuth'){
		if(!route.query.code || route.query.code === undefined)
			return redirect('/');
		
		store.dispatch('login', route.query.code);
	}

	if (!store.getters.getLogin && route.fullPath !== '/') 
		return redirect('/');

	if (!store.getters.getIsAdmin && route.fullPath.toLowerCase().includes('files/'))
		return redirect('/');
}
