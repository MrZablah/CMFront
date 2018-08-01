import Vue from 'vue';


var newName = (fullname, name) => {
    var ext = fullname.substring(fullname.lastIndexOf('.') + 1).toLowerCase();
    return `${name.replace(/ /g, '')}.${ext}`;
};

var isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}

Vue.prototype.$Utils = {
    newName,
    isEmptyOrSpaces
}

