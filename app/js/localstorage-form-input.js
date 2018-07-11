$(function () {

    var inputCon = new Condition();
    var uri = getUri();
    inputCon.init({
        valAttrName: 'data-scv',
        cookieName: '___input-result___' + uri.bulletinId,
        customLoad: function (item, name, value, type) {
            //console.log(item, name, value, type);
            if (type === 'block') {
                if (parseInt(value) === 1) {
                    item.classList.add('input-selected');
                }
            }
            if (type === 'input') {
                item.value = value;
            }
            if (type === 'checkbox') {
                if (parseInt(value) === 1) {
                    $(item).closest('.voting-inputs__choice--item').addClass('input-selected');
                    item.setAttribute('checked', 'checked');
                }
            }
        },
        afterLoad: function () {
            var v = new allVoting();
            v.clickToBtn();
        }

    });

    inputCon.runLoad();

    $(document).on('change', '.bullet-number-all', function (e) {

        if (!$(".bullet-number-all").hasClass('checked__')) {
            var v = new allVoting();
            var votingSelected = document.querySelector('.input-selected');
            console.log(votingSelected);
            if (votingSelected.classList.contains('voting-false')) {
                v.addToCookie('voting-false');
                console.log('voting-false');
            }
            if (votingSelected.classList.contains('voting-true')) {
                v.addToCookie('voting-true');
                console.log('voting-true');
            }
            if (votingSelected.classList.contains('voting-abstained')) {
                v.addToCookie('voting-abstained');
                console.log('voting-abst');
            }
        }

        $(".bullet-number-all").toggleClass('checked__');
    });

    $(document).on('click', '.voting-actions-all-btn', function (e) {

        var val = parseInt($(this).find('input').attr('data-scv'));


        if ($(this).hasClass('input-selected')) {

            $('li.input-selected input').attr('data-scv', 0);
            $('li.input-selected').removeClass('input-selected');
            inputCon.runSave();
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
            $('.voting-true input').attr('data-scv', 1);
        }
        else {
            $('.voting-true').removeClass('input-selected');
            $('.voting-true input').attr('data-scv', 0);
        }

        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
            $('.voting-false input').attr('data-scv', 1);
        }
        else {
            $('.voting-false').removeClass('input-selected');
            $('.voting-false input').attr('data-scv', 0);
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
            $('.voting-abstained input').attr('data-scv', 1);
        }
        else {
            $('.voting-abstained').removeClass('input-selected');
            $('.voting-abstained input').attr('data-scv', 0);
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
            $('.voting-veto input').attr('data-scv', 1);
        }
        else {
            $('.voting-veto').removeClass('input-selected');
            $('.voting-veto input').attr('data-scv', 0);
        }

        if (val === 0) {
            $(this).find('input').attr('data-scv', 1)
        }
        else {
            $(this).find('input').attr('data-scv', 0);
        }
        inputCon.runSave();
        return false;


    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        var _this = $(this);
        $('.voting-actions-all-btn').removeClass('input-selected');
        $('.voting-actions-all-btn input').attr('data-scv', 0);


        if ($(this).hasClass('input-selected')) {
            checkCookie();
            $(this).removeClass('input-selected');

        }
        else {
            $(this).closest('.voting-inputs__choice').find('.input-selected').removeClass('input-selected');
            $(this).closest('.voting-inputs__choice').find('input').attr('data-scv', 0);
            $(this).addClass('input-selected');
            checkCookie();

        }

        // $('.voting-actions-sing-btn').attr('data-scv', 0);
        function checkCookie() {
            var val = parseInt(_this.find('input').attr('data-scv'));
            if (val === 0) {
                _this.find('input').attr('data-scv', 1)
            }
            else {
                _this.find('input').attr('data-scv', 0);
            }
        }

        inputCon.runSave();
        return false;


    });

    function getUri() {
        var search = window.location.search.substr(1),
            keys = {};

        search.split('&').forEach(function (item) {
            item = item.split('=');
            keys[item[0]] = item[1];
        });

        return keys;

    }

});