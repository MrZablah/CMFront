// Get Cookies
"use strict";var cookie=function(e){var t=function(t,i,o){var a="";if(o.days){var r=new Date;r.setTime(r.getTime()+24*o.days*60*60*1e3),a="expires="+r.toUTCString()}if(null==t||void 0==t)return"Cookie key not set: "+t;if(null==i||void 0==i)return"Cookie Value not set: "+t;var l=t+"="+i+";"+a+";path="+o.path+";";return null!=o.domain&&(l=l+"Domain="+o.domain+";"),o.secure&&(l+="secure;"),o.httpOnly&&(l+="HttpOnly;"),null!=o.sameSite&&(l=l+"SameSite="+o.sameSite+";"),e.cookie=l,n.length>0?"cookie create => Name: "+t+", Value: "+i+", Expires in: "+o.days+" days":null},n=function(t){if(null==t||void 0==t)return"Cookie key not set: "+t;var n=("; "+e.cookie).split("; "+t+"=");return 2==n.length?n.pop().split(";").shift():null};return{create:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.sameSite,a=void 0===o?1:o,r=i.secure,l=void 0!==r&&r,u=i.httpOnly,s=void 0!==u&&u,d=i.path,c=void 0===d?"/":d,v=i.domain,p=void 0===v?null:v,m=i.days;return 1===a&&(a=null),2===a&&(a="Strict"),3===a&&(a="Lax"),t(e,n,{sameSite:a,secure:l,httpOnly:s,path:c,domain:p,days:void 0===m?0:m})},read:function(e){return n(e)},delete:function(e){return null==(i=e)||void 0==i?"Cookie key not set: "+i:(t(i,"",{path:"/",days:-1}),n.length>0?"Cookie Deleted":null);var i}}}(document); // eslint-disable-line

import * as types from './types';

export const STATE = {
	online: true,
	islogin: false,
	isAdmin: false,
	token: null
};

export const MUTATIONS = {
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
	},
	appOnline(state){
		state.online = true;
	},
	appOffline(state){
		state.online = false;
	}
};

export const ACTIONS = {
	[types.LOGIN]({ commit }, code) {
		cookie.create('token', code, {sameSite: 3});
		commit('setToken', code);
		commit('login');
		commit('isAdmin');
		//this.$Api.auth.get(code).then((res) => {
		//});
	},
	[types.LOGOUT]({ commit }) {
		const token = cookie.read('token');
		//this.$Api.auth.logout(token);
		cookie.delete('token');
		commit('noToken');
		commit('logout');
		commit('notAdmin');
	},
	[types.AUTO_LOGIN]({ commit }) {
		const token = cookie.read('token');

		if (!token) 
			return;

		commit('setToken', token);
		commit('login');
		commit('isAdmin');
	},
	[types.CHANGE_ONLINE]({ commit }, bool){
		if(bool){
			commit('appOnline');
		}else{
			commit('appOffline');
		}
	}
};

export const  GETTERS = {
	[types.IS_ADMIN]: state => state.isAdmin,
	[types.IS_LOGIN]: state => state.islogin,
	[types.IS_ONLINE]: state => state.online,
	[types.GET_TOKEN]: state => state.token
};
