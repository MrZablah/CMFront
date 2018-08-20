export default function({ $axios, redirect, store }) {
	// $axios.onRequest(config => {
	// 	console.log('Making request to ' + config.url);
	// });

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
		if (code === 401) {
			store.dispatch('logout');
			redirect('/');
		}
	});
}