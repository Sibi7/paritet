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
        if (parent.hasClass('voting-parent-active')) {
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
            if (!btn.hasClass('voting-active')) {
                btn.trigger('click');
            }

        }
        $(this).hide();
        $(this).siblings('.input-hide-wrap').show().addClass('input-hide-visible');
    });
    $(document).mouseup(function (e) {
        var container = $(".input-hide-wrap");
        if (container.has(e.target).length === 0){
            container.hide();
            $('.change-span').show();
        }
    });
    // пересчитывание  разделения голосов формы ввода
    $(document).on('blur', '.input-hide', function () {
        var parent = $(this).closest('.separation-votes  .voting-actions__choice-btn');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeftMassEntry = parent.find('.total-left');
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (result) {
            if (result['status'] === "success") {
                totalLeftMassEntry.text(result.result);
                $(this).closest('.voting-actions__choice-wrap').removeClass('.voting-parent-active');
                if (result.result[0] === '-') {
                    totalLeftMassEntry.css({
                        color: 'red'
                    })
                }
                else {
                    totalLeftMassEntry.css({
                        color: '#141414'
                    })
                }
            }

        });
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
        console.log(massEntryArray);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (data) {
            if(votesLeft.text()=== '0'){
               return false;
            }
            else{
                inputHide.val(data.result);
                changeSpan.text(data.result);
                votesLeft.text(0);
            }
        })

    });
});