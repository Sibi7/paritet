function allVoting() {
    this.addToCookie = function (btnType) {
        setCookie('allVotingType', btnType);
    };
    this.delFromCookie = function () {
        deleteCookie('allVotingType');
    };
    this.getCookie = function () {
        return getCookie('allVotingType');
    };
    this.clickToBtn = function () {
      var btnType = this.getCookie(),
          btnObj = document.getElementById(btnType);

      if(btnType){
          if(!btnObj.classList.contains('input-selected')){
              setTimeout(function () {
                  btnObj.click();
              }, 0)
          }
      }

    };
    this.clickNumberAllBtn = function () {
        var btnType = this.getCookie();
        if (btnType){
            console.log(123);
            var btn = document.querySelector('#bullet-number-all');
            btn.classList.add('checked__');
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
    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }
}