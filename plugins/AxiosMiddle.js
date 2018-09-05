export default function({ $axios, redirect, store }) {
	$axios.onRequest(() => {
		// console.log('Making request to ' + config.url);
		store.dispatch('CHANGE_ONLINE', true);
	});

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
		if (code === 401) {
			store.dispatch('LOGOUT');
			redirect('/');
		}
		if (!error.status) {
			// network error
			store.dispatch('CHANGE_ONLINE', false);
			redirect('/');
		}
	});
}