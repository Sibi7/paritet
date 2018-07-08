$(function () {

    var inputCon = new Condition();
    inputCon.init({
        valAttrName: 'data-scv',
        cookieName: '___rrr___',
        customLoad: function (item, name, value, type) {
            //console.log(item, name, value, type);
            if (type === 'block') {
                if (parseInt(value) === 1) {
                    item.classList.add('block');

                }
            }
            if (type === 'input') {
                item.value = value;
            }
            if(type === 'checkbox'){
                if (parseInt(value) === 1) {
                    item.setAttribute('checked', 'checked');
                }
            }
        }

    });


    inputCon.runLoad();

    $(document).on('click', '.voting-input .voting-actions-all-btn ', function () {

        if ($(this).hasClass('voting-true')){
            $('.voting-actions__choice--item').removeClass('voting-selected');
            $('.voting-true').addClass('voting-selected');

        }

        if ($(this).hasClass('voting-false')){
            $('.voting-actions__choice--item').removeClass('voting-selected');
            $('.voting-false').addClass('voting-selected');
        }

        if ($(this).hasClass('voting-abstained')){
            $('.voting-actions__choice--item').removeClass('voting-selected');
            $('.voting-abstained').addClass('voting-selected');
        }

        if ($(this).hasClass('voting-veto')){
            $('.voting-actions__choice--item').removeClass('voting-selected');
            $('.voting-veto').addClass('voting-selected');
        }

        var val = parseInt($(this).attr('data-scv'));
        $('.voting-input .voting-actions-all-btn').attr('data-scv', 0);
        if (val === 0) {
            $(this).attr('data-scv', 1)
        }
        else {
            $(this).attr('data-scv', 0);
        }
        inputCon.runSave();


    });


    

});