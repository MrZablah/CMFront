export default function({ store, route, redirect }) {
	// console.log('[Auth Middleware]');

	if(route.path === '/OAuth/OAuth'){
		if(!route.query.code || route.query.code === undefined)
			return redirect('/');
		
		store.dispatch('LOGIN', route.query.code);
	}

	if (!store.getters.IS_LOGIN && route.fullPath !== '/') 
		return redirect('/');

	if (!store.getters.IS_ADMIN && route.fullPath.toLowerCase().includes('files/'))
		return redirect('/');
}
