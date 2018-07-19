import Vue from 'vue';


var newName = (fullname, name) => {
    var ext = fullname.substring(fullname.lastIndexOf('.') + 1).toLowerCase();
    return `${name.replace(/ /g, '')}.${ext}`;
};

if (process.browser) {
    window.onNuxtReady(() => {
        Vue.prototype.$Utils = {
            newName,
            isMobile: {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            }
        }
    })
}

