$(function () {

    $(document).on('click', '.voting-actions-all-btn', function (e) {

        if ($(this).hasClass('input-selected')) {

            $('li.input-selected input').removeAttr('checked');
            $('li.input-selected').removeClass('input-selected');
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
            $('.voting-true input').attr('checked', 'checked');
        }
        else {
            $('.voting-true').removeClass('input-selected');
            $('.voting-true input').removeAttr('checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close input').attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close input').removeAttr('checked');
        }

        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
            $('.voting-false input').attr('checked', 'checked');
        }
        else {
            $('.voting-false').removeClass('input-selected');
            $('.voting-false input').removeAttr('checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close a').attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close a').removeAttr('checked');
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
            $('.voting-abstained input').attr('checked', 'checked');
        }
        else {
            $('.voting-abstained').removeClass('input-selected');
            $('.voting-abstained input').removeAttr('checked');
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
            $('.voting-veto input').attr('checked', 'checked');
        }
        else {
            $('.voting-veto').removeClass('input-selected');
            $('.voting-veto input').removeAttr('checked');
        }
        return false;


    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        $('.voting-actions-all-btn').removeClass('input-selected');
        $('.voting-actions-all-btn input').attr('data-scv', 0).removeAttr('checked');
        if ($(this).hasClass('input-selected')) {
            $(this).removeClass('input-selected');
        }
        else {
            $(this).closest('.voting-inputs__choice').find('.input-selected').removeClass('input-selected');
            $(this).closest('.voting-inputs__choice').find('input').attr('data-scv', 0).removeAttr('checked');
            $(this).addClass('input-selected');
        }

        // $('.voting-actions-sing-btn').attr('data-scv', 0);

        return false;


    });
});


