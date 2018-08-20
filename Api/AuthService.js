export default class AuthService {
	constructor(ctx) {
		this.$axios = ctx.$axios;
	}

	login(){
		let returnUrl = `${location.protocol}//${location.hostname}${(location.port ? ':'+location.port: '')}`;
		this.$axios.$get(`/OAuth/Login?returnUrl=${returnUrl}`).then(res => {
			return location.href = res;
		});
	}

	logout(token){
		return this.$axios.$get(`/OAuth/Logoff?token${token}`);
	}
	
	get(code){
		return this.$axios.$get(`/OAuth/GetToken?code=${code}`);
	}

}