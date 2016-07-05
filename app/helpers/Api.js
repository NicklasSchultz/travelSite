"use strict";
var Api = (function() { // jshint ignore:line
    var api = {};
    var ENDPOINTS = {
        SECTIONS: '/sections',
        CONTENT_PAGE: '/content'
    };

    api.getSections = function(parameters) {
        return doRequest(encodeUrl(ENDPOINTS.SECTIONS, parameters));
    };

    api.getContentPage = function(parameters) {
        return doRequest(encodeUrl(ENDPOINTS.CONTENT_PAGE, parameters), true);
    };

    function encodeUrl(url, params) {
        if(!params) {
            return url;
        }
        url += '?';
        var keys = Object.keys(params),
            keyLength = keys.length,
            i = 0;
        for(i; i<keyLength; i++) {
            if(i === 0) {
                url += keys[i] + '=' + params[keys[i]];
            } else {
                url += '&' +  keys[i] + '=' + params[keys[i]];
            }
        }
        return url;
    }

    function doRequest(url, ignoreParse) {
         var promise = new Promise( function (resolve, reject) {
            var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if(ignoreParse) {
                        resolve(this.responseText);
                    } else {
                        resolve(JSON.parse(this.responseText));
                    }
                } else {
                    reject('Request failed.  Returned status of ' + this.status);
                }
            };
            // Get the /sections from server. Kommer göra ett anrop till servern på url /sections, vilket kommer returnera alla sektioner vi har i databasen
            xhr.open("GET", url , true);
            xhr.send();
         });
         return promise;
    }

    return api;
}());