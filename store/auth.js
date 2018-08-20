// Get Cookies
"use strict";var cookie=function(e){var t=function(t,o,i){var r="";if(i){var l=new Date;l.setTime(l.getTime()+24*i*60*60*1e3),r="; expires="+l.toUTCString()}return null==t||void 0==t?"Cookie key not set: "+t:null==o||void 0==o?"Cookie Value not set: "+t:(e.cookie=t+"="+o+r+"; path=/",n.length>0?"cookie create => Name: "+t+", Value: "+o+", Expires in: "+i+" days":null)},n=function(t){if(null==t||void 0==t)return"Cookie key not set: "+t;var n=("; "+e.cookie).split("; "+t+"=");return 2==n.length?n.pop().split(";").shift():null};return{create:function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return t(e,n,o)},read:function(e){return n(e)},delete:function(e){return null==(o=e)||void 0==o?"Cookie key not set: "+o:(t(o,"",-1),n.length>0?"Cookie Deleted":null);var o}}}(document); // eslint-disable-line

var aState = {
	islogin: false,
	isAdmin: false,
	token: null
};

var aMutations = {
	login(state) {
		state.islogin = true;
	},
	logout(state) {
		state.islogin = false;
	},
	isAdmin(state) {
		state.isAdmin = true;
	},
	notAdmin(state) {
		state.isAdmin = false;
	},
	setToken(state, code){
		state.token = code;
	},
	noToken(state){
		state.token = null;
	}
};

var aActions = {
	login({ commit }, code) {
		this.$Api.auth.get(code).then((res) => {
			cookie.create('token', res, 0);
			commit('setToken', res);
			commit('login');
			commit('isAdmin');
		});
	},
	logout({ commit }) {
		const token = cookie.read('token');
		if (token) {
			this.$Api.auth.logout(token).then();
			cookie.delete('token');
		}
		commit('noToken');
		commit('logout');
		commit('notAdmin');
		document.location.href= '/';
	},
	tryAutoLogin({ commit }) {
		const token = cookie.read('token');
		if (!token) return;

		commit('setToken', token);
		commit('login');
		commit('isAdmin');
	}
};

var aGetters = {
	getIsAdmin: state => state.isAdmin,
	getLogin: state => state.islogin,
	getToken: state => state.token
};

module.exports = {
	aState,
	aMutations,
	aActions,
	aGetters
};
