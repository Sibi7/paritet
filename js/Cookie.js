function Condition() {
    this.conditionArray = [];

    this.init = function (options) {
        var defaultOptions = {
            cookieName: '__condition',
            cookieExpires: 3600,
            typeAttrName: 'data-save-condition',
            nameAttrName: 'data-save-condition-name',
            valAttrName: 'data-save-condition-val',
            storage: 'cookie',
            customLoad: function (item, name, value, type) {
            },
            afterInit: function () {},
            afterLoad: function () {}
        };

        this.options = setOptions(defaultOptions, options);
    };

    this.runSave = function () {
        this.conditionArray = [];
        this.elems = this.getElementsByAttr(this.options.typeAttrName);
        for (var i = 0; i < this.elems.length; i++) {
            var type = this.getAttr(this.elems[i], this.options.typeAttrName);
            var name = this.getAttr(this.elems[i], this.options.nameAttrName);
            var val;
            if (type === 'input') {
                val = this.elems[i].value;
            }
            if (type === 'block' || type === 'checkbox') {
                val = this.getAttr(this.elems[i], this.options.valAttrName);
            }
            if(val!=0 && val !=''){
                this.conditionArray.push({name: name, val: val, type:type});
            }

        }
        this.setStorage(this.options.cookieName, JSON.stringify(this.conditionArray));
    };

    this.runLoad = function () {
        var arr = this.getStorage(this.options.cookieName);
        if (arr) {
            arr = JSON.parse(arr);
            for (var i = 0; i < arr.length; i++) {
                var el = this.getElementByAttr(this.options.nameAttrName, arr[i].name);
                if(el){
                    if(arr[i].type === 'block' || arr[i].type === 'checkbox'){
                        el.setAttribute(this.options.valAttrName, arr[i].val);
                    }

                    this.options.customLoad(el, arr[i].name, arr[i].val, arr[i].type);
                }
            }
        }
        this.options.afterLoad();
    };

    this.getAttr = function (elem, attr) {
        if (typeof elem === "object") {
            if (elem.hasAttribute(attr)) {
                return elem.getAttribute(attr);
            }
        }
        return false;
    };

    this.getElement = function (el, allEl) {
        allEl = allEl || false;
        var thisElement;
        if (el[0] === '#') {
            thisElement = document.getElementById(el.slice(1));
        }
        else {
            if (allEl) {
                thisElement = document.getElementsByClassName(el.slice(1));
            }
            else {
                thisElement = document.querySelector(el);
            }
        }
        return thisElement;
    };

    this.getElementsByAttr = function (attr) {
        var elems = document.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; elems.length; i++) {
            if (typeof elems[i] === "object") {
                if (elems[i].hasAttribute(attr)) {
                    arr.push(elems[i]);
                }
            }
            else {
                break;
            }
        }
        return arr;
    };

    this.getElementByAttr = function (attr, value) {
        var elems = document.getElementsByTagName('*');
        for (var i = 0; elems.length; i++) {
            if(typeof elems[i] === 'object'){
                if (elems[i].getAttribute(attr) == value) {
                    return elems[i];
                }
            }
            else {
                break;
            }

        }
    };

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setOptions(defaultOptions, options) {
        var finalParams = defaultOptions;
        for (var key in options) {
            if (typeof options[key] === "object" && key !== "class") {
                finalParams[key] = setOptions(finalParams[key], options[key]);
            }
            else {
                if (options.hasOwnProperty(key)) {
                    if (options[key] !== undefined) {
                        finalParams[key] = options[key];
                    }
                }
            }
        }

        return finalParams;
    }
    function setLocalStorage (key, value) {
        if(typeof value != "string"){
            value = JSON.stringify(value);
        }
        return localStorage.setItem(key, value);
    };
    function getLocalStorage (key) {
        return localStorage.getItem(key);
    };

    this.getStorage = function (key) {
        if(this.options.storage == "cookie"){
            return getCookie(key);
        }
        if (this.options.storage == "localStorage"){
            return getLocalStorage(key);
        }
    };
    this.setStorage = function (key, value) {
        if(this.options.storage == "cookie"){
            return setCookie (key, value, {expires: this.options.cookieExpires});
        }
        if (this.options.storage == "localStorage"){
            return setLocalStorage(key, value);
        }
    };


}