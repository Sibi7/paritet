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
    $(document).on('click', '.change-span', function () {

        var parent = $(this).closest('.voting-actions__choice-wrap');
        var btn = parent.find('.voting-actions-btn');
        var inputHide = parent.find('.input-hide');
        if (parent.hasClass('voting-parent-active')) {
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
            if (!btn.hasClass('voting-active')) {
                btn.trigger('click');
            }

        }
        inputHide.trigger('focus');
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

    function calculateTotalVoises(_this) {
        var parent = _this.closest('.separation-votes  .voting-actions__choice-btn');
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
        if (_this.val() === '') {
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(0);
            _this.val(0)
        }
    }

    // пересчитывание  разделения голосов формы ввода
    $(document).on('blur', '.separation-votes .input-hide', function () {
        calculateTotalVoises($(this))
    });
    $(document).on('keydown', '.input-hide', function (e) {
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('click', '.separation-votes .voting-close', function () {
        var parent = $(this).closest('.voting-actions__choice-btn');
        parent.find('.change-span').text('0');
        parent.find('.input-hide').val(0);
    });

    $(document).on('click', '.cumulative-voting-input .voting-close', function () {
        var parent = $(this).closest('.voting-inputs__choice');
        var btnZa = parent.find('.voting-true');


        if ($(this).hasClass('input-selected')) {
            btnZa.addClass('input-not-selected');
        }
        else {
            btnZa.removeClass('input-not-selected');
        }
        if ($('.voting-false').hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }
        if ($('.voting-abstained').hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }

    });
    $(document).on('click', '.cumulative-voting-input .voting-false', function () {
        var parent = $(this).closest('.voting-inputs__choice');
        var btnZa = parent.find('.voting-true');
        if ($(this).hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }

    });
    $(document).on('click', '.cumulative-voting-input  .voting-abstain', function () {
        var parent = $(this).closest('.voting-inputs__choice');
        var btnZa = parent.find('.voting-true');
        if ($(this).hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-true', function () {

        var parent = $(this).closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        if ($(this).hasClass('input-selected')) {
            votesLeft.show();
            votes.hide();
        }
        else {
            votesLeft.hide();
            votes.show();
        }
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-false', function () {
        var parent = $(this).closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        votesLeft.hide();
        votes.show();
        clearInputs(parent.find('.separation-cumulative-za'), parent.find('.voting-actions__wrap-input .change-span'))
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-abstained', function () {
        var parent = $(this).closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        votesLeft.hide();
        votes.show();
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-close', function () {
        var parent = $(this).closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        votesLeft.hide();
        votes.show();
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

    // ajax запрос для кнопки разделения голосов в форме ввода
    function ajaxForSeparationBtn($this) {
        var meetingId = $('.meeting-id').val();
        var decisionIdInput = $this.closest('.voting-enter__td.margin-left-auto').find('.decision-id').val();
        var url = new URL(window.location.href);
        var registerAccountId = url.searchParams.get('registerAccountId');
        var _this = $this;
        $.ajax({
            url: '/Manager/Input/SplitVoicesAjax/' + meetingId,
            type: 'post',
            data: {
                decisionID: decisionIdInput,
                registerAccountId: registerAccountId,
            },
            success: function (data) {

                var content = _this.closest('.voting-enter__tr').find('.voting-enter__td.margin-left-auto');
                content[0].outerHTML = data;
                console.log('content');
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }

        });
    }

    $(document).on('click', '.voting-divide', function (e) {
        e.preventDefault();
        ajaxForSeparationBtn($(this));
    });
    $(document).on('click', '.voting-clear-division', function (e) {
        e.preventDefault();
        ajaxForSeparationBtn($(this));
    });

    // Кумулятивное голосование!
    $(document).on('blur', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var givenZa = parent.find('.totals-votes');
        var arrOfInputsYes = parent.find('.separation-cumulative-za');
        var arrOfInputsYesVal = [];
        arrOfInputsYes.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsYesVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });

        additionFraction(arrOfInputsYesVal.join(';')).done(function (res) {
            givenZa.text(res.result);
            givenZa.closest('.separation-cumulative-wrap-input').find('.input-hide').val(res.result);
            calculateTotalVoises(givenZa)
        });
    });

    $(document).on('change', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var zaBtn = parent.find('.voting-true');
        if (zaBtn.hasClass('voting-active')) {
            return false
        }
        if (zaBtn.hasClass('input-selected')) {
            return false
        }
        zaBtn.click();
    });

    $(document).on('click', '.input-cum-balance', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputMassEntry = parent.find('.separation-cumulative-za');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeft = parent.find('.total-left');
        var _this = $(this)

        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        massEntryArray.splice(massEntryArray.indexOf($(this).closest('.input-hide-wrap').find('.separation-cumulative-za').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (res) {
            totalLeft.text(0);
            _this.closest('.input-hide-wrap').find('.separation-cumulative-za').val(res.result);
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(res.result);
        })
    });

    // не разделенное кумулятивное голосование
    $(document).on('blur', '.separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var isDividing = parent.find('.cum-not-dividing').length > 0;
        var inputMassEntry = parent.find('.separation-cumulative-za');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeft = parent.find('.votes-left .total-left');

        if (isDividing) {
            if (!parent.find('.voting-true').hasClass('input-selected')) {
                parent.find('.voting-true').click();
            }
            inputMassEntry.each(function () {
                massEntryArray.push($(this).val());
            });
            fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (res) {
                totalLeft.text(res.result);
                console.log(res)
            })
        }

    })

    function clearInputs(inputs, spans) {
        inputs.each(function () {
            $(this).val(0);
        });
        spans.each(function () {
            $(this).text(0)
        })
    }


});