import Vue from 'vue';

// Limit text
Vue.filter('limitWords', (str, maxLength = 30, separator = ', ', suffix = '...') => {
	if (str.length > maxLength) {
		return str.substring(0, str.lastIndexOf(separator, maxLength)) + suffix;
	} else {
		return str;
	}
});

// Separete by comas using .map(), by name
Vue.filter('nameSpaced', arrg => {
	let res = arrg.map(e => e.name).join(', ');
	return res;
});

// Separete first child by comas using .map(), , by name
Vue.filter('nameChildSpaced', (arrg, child) => {
	return arrg.map(e => e[child].map(e => e.name).join(', ')).join(' | ');
});
