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
            if (type === 'checkbox') {
                if (parseInt(value) === 1) {
                    item.setAttribute('checked', 'checked');
                }
            }
        }

    });


    inputCon.runLoad();


    $(document).on('click', '.voting-actions-all-btn', function (e) {

        if ($(this).hasClass('input-selected')) {

            $('li.input-selected').removeClass('input-selected');
            // $('.voting-true').addClass('input-selected');
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
        }
        else {
            $('.voting-true').removeClass('input-selected');
        }
        //
        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
        }
        else {
            $('.voting-false').removeClass('input-selected');
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
        }
        else {
            $('.voting-abstained').removeClass('input-selected');
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
        }
        else {
            $('.voting-veto').removeClass('input-selected');
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
        return false

    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        var parent = $(this).closest('.voting-inputs__choice');
        parent.find('.input-selected').removeClass('input-selected');
        $(this).toggleClass('input-selected');
        $('.voting-actions-all-btn').removeClass('input-selected');
        return false
    });
});