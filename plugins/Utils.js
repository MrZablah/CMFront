import Vue from 'vue';

if (process.browser) {
    window.onNuxtReady(() => {
        Vue.prototype.$Utils = {
            saveByteArray: (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, name) {
                    var blob = new Blob(data, {type: "octet/stream"}),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }()),
            newName: (fullname, name) => {
                var ext = fullname.substring(fullname.lastIndexOf('.') + 1).toLowerCase();
                return `${name.replace(/ /g, '')}.${ext}`;
            }
        }
    })
}