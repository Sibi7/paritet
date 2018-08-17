$(function () {

    /* кнопки разделения голосов формы ввода */

    $(document).on('click', '.separation-votes .voting-actions-btn', function () {
        if($(this).hasClass('voting-active')){
            $(this).removeClass('voting-active');
        }
        else {
            $(this).addClass('voting-active');
            $(this).closest('.voting-actions__choice-wrap').find('.change-span').click();
            $(this).closest('.voting-actions__choice-wrap').find('.input-hide').focus();
        }
        return false;
    });
    $(document).on('click', '.separation-votes .change-span', function () {
        var parent = $(this).closest('.voting-actions__choice-wrap');
        var btn = parent.find('.voting-actions-btn');
        if(parent.hasClass('voting-parent-active')){
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
          if(!btn.hasClass('voting-active')){
              btn.trigger('click');
              console.log(111)
          }

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
            if(result['status']==="success"){
                totalLeftMassEntry.text(result.result);
                $(this).closest('.voting-actions__choice-wrap').removeClass('.voting-parent-active');
               if(result.result[0] === '-'){
                   totalLeftMassEntry.css({
                       color: 'red'
                   })
               }
               else{
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


});