$(function () {

    var inputCon = new Condition();
    inputCon.init({
        valAttrName: 'data-scv',
        cookieName: '___input-result___',
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
                    item.setAttribute('checked', 'checked');
                }
            }
        }

    });


    inputCon.runLoad();


    $(document).on('click', '.voting-actions-all-btn', function (e) {

        var val = parseInt($(this).attr('data-scv'));

        if ($(this).hasClass('input-selected')) {

            $('li.input-selected').removeClass('input-selected').attr('data-scv', 0);
            // $('.voting-true').addClass('input-selected');
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected').attr('data-scv', 1);
        }
        else {
            $('.voting-true').removeClass('input-selected').attr('data-scv', 0);
        }
        //
        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected').attr('data-scv', 1);
        }
        else {
            $('.voting-false').removeClass('input-selected').attr('data-scv', 0);
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected').attr('data-scv', 1);
        }
        else {
            $('.voting-abstained').removeClass('input-selected').attr('data-scv', 0);
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected').attr('data-scv', 1);
        }
        else {
            $('.voting-veto').removeClass('input-selected').attr('data-scv', 0);
        }


        // $('.voting-inputs .voting-actions-all-btn').attr('data-scv', 0);
        // if (val === 0) {
        //     $(this).attr('data-scv', 1)
        // }
        // else {
        //     $(this).attr('data-scv', 0);
        // }
        inputCon.runSave();
        return false;



    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        var parent = $(this).closest('.voting-inputs__choice');
        parent.find('.input-selected').attr('data-scv', 0).removeClass('input-selected');
        $('.voting-actions-all-btn').attr('data-scv', 0).removeClass('input-selected');
        var val = parseInt($(this).attr('data-scv'));

        if($(this).hasClass('input-selected')){
            $(this).removeClass('input-selected')
        }
        else {
            $(this).addClass('input-selected');
        }

        // $('.voting-actions-sing-btn').attr('data-scv', 0);
        if (val === 0) {
            $(this).attr('data-scv', 1)
        }
        else {
            $(this).attr('data-scv', 0);
        }
        inputCon.runSave();
        return false;

    });
});