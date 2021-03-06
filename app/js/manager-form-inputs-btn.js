$(function () {

    $(document).on('click', '.voting-actions-all-btn', function (e) {

        if ($(this).hasClass('input-selected')) {
            $('li.input-selected input').removeAttr('checked');
            $('li.input-selected').removeClass('input-selected');
            return false
        }

        $('.input-selected input').removeAttr('checked');
        $('.input-selected').removeClass('input-selected');

        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
            $('.voting-true input').attr('checked', 'checked');
            return false
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close input').attr('checked', 'checked');
            return false
        }
        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
            $('.voting-false input').attr('checked', 'checked');
            return false
        }
        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
            $('.voting-abstained input').attr('checked', 'checked');
            return false
        }

        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
            $('.voting-veto input').attr('checked', 'checked');
            return false
        }
        return false;


    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        $('.voting-actions-all-btn').removeClass('input-selected');
        $('.voting-actions-all-btn input').removeAttr('checked', 'checked');
        if ($(this).hasClass('input-selected')) {
            $(this).removeClass('input-selected').find('input').removeAttr('checked', 'checked');
        } else {
            $(this).closest('.voting-inputs__choice').find('.input-selected').removeClass('input-selected');
            $(this).closest('.voting-inputs__choice').find('input').removeAttr('checked', 'checked');
            $(this).addClass('input-selected').find('input').attr('checked', 'checked');
        }
        return false;
    });
});
