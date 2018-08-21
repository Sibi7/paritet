$(function () {

    /* кнопки разделения голосов формы ввода */

    $(document).on('click', '.separation-votes .voting-actions-btn', function () {
        if ($(this).hasClass('voting-active')) {
            $(this).removeClass('voting-active');
        }
        else {
            $(this).addClass('voting-active');
            $(this).closest('.voting-actions__choice-wrap').find('.change-span').click();
        }
        return false;
    });
    $(document).on('click', '.separation-votes .change-span', function () {

        var parent = $(this).closest('.voting-actions__choice-wrap');
        var btn = parent.find('.voting-actions-btn');
        var inputHide = parent.find('.input-hide');
        console.log(inputHide);
        if (parent.hasClass('voting-parent-active')) {
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
            if (!btn.hasClass('voting-active')) {
                btn.trigger('click');
            }

        }
        inputHide.focus();
        $(this).hide();
        $(this).siblings('.input-hide-wrap').show().addClass('input-hide-visible');
    });
    $(document).mouseup(function (e) {
        var container = $(".input-hide-wrap");
        var changleSpan = $(".change-span");
        if (container.has(e.target).length === 0) {
            container.hide();
            changleSpan.show();
        }
    });

    // пересчитывание  разделения голосов формы ввода
    $(document).on('blur', '.input-hide', function () {
        var parent = $(this).closest('.separation-votes  .voting-actions__choice-btn');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeftMassEntry = parent.find('.total-left');
        var btnNotActive = parent.find('.voting-actions-btn');
        var btnInvalid = parent.find('.voting-close');
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (result) {
            if (result['status'] === "success") {
                totalLeftMassEntry.text(result.result);
                $(this).closest('.voting-actions__choice-wrap').removeClass('.voting-parent-active');
                if (result.result[0] === '-') {
                    btnNotActive.addClass('voting-not-active');
                    btnInvalid.addClass('voting-active');
                    totalLeftMassEntry.css({
                        color: 'red'
                    })
                }
                else {
                    btnNotActive.removeClass('voting-not-active');
                    btnInvalid.removeClass('voting-active');
                    totalLeftMassEntry.css({
                        color: '#141414'
                    })
                }
            }

        });
        if ($(this).val() === '') {
            $(this).closest('.voting-actions__wrap-input').find('.change-span').text(0)
            $(this).val(0)
        }
    });
    $(document).on('keydown', '.input-hide', function (e) {
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('click', '.separation-votes .voting-close', function () {
        var parent = $(this).closest('.voting-actions__choice-btn');
        parent.find('.change-span').text('0');
        parent.find('.input-hide').val(0);
    });


    $(document).on('click', '.input-balance', function () {
        var parent = $(this).closest('.separation-votes');
        var votesLeft = parent.find('.total-left');
        var inputHide = $(this).closest('.voting-actions__choice-wrap').find('.input-hide');
        var changeSpan = $(this).closest('.voting-actions__choice-wrap').find('.change-span');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();


        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        massEntryArray.splice(massEntryArray.indexOf($(this).siblings('input').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (data) {
            if (votesLeft.text() === '0') {
                return false;
            }
            else {
                inputHide.val(data.result);
                changeSpan.text(data.result);
                votesLeft.text(0);
            }
        })

    });
    $(document).on('click', '.voting-close', function (e) {
        e.preventDefault();
        var meetingId = $('.meeting-id').val();
        var url = new URL(window.location.href);
        var registerAccountId = url.searchParams.get('registerAccountId');
        var bulletinId = url.searchParams.get('bulletinId');

        $.ajax({
            url: '/Manager/Input/SplitVoicesAjax/' + meetingId,
            type: 'post',
            data: {
                registerAccountId: registerAccountId,
                bulletinId: bulletinId,
            },
            success: function (data) {
                console.log(data)
            }

        });
    });
});