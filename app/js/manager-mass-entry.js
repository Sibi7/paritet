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

        }
    }

    // пересчитывание  разделения голосов формы ввода
    // $(document).on('blur', '.separation-votes .input-hide', function () {
    //     calculateTotalVoises($(this))
    // });
    $(document).on('keyup', '.separation-votes .input-hide', function () {
        calculateTotalVoises($(this))
    });

    $(document).on('blur', '.separation-votes .input-hide', function () {
        if ($(this).val().trim() === "") {
            $(this).val(0);
        }
    });
    $(document).on('keydown', '.input-hide', function (e) {
        if (e.key === 'Enter'){
            $(this).trigger('blur');
        }
        return isAllowedKeyCode(e.originalEvent.key);
    });
    // $(document).on('click', '.separation-votes .voting-close', function () {
    //     var parent = $(this).closest('.voting-actions__choice-btn');
    //     parent.find('.change-span').text('0');
    //     parent.find('.input-hide').val(0);
    // });

    // $(document).on('click', '.cumulative-voting-input .voting-close', function () {
    //     var parent = $(this).closest('.voting-inputs__choice');
    //     var btnZa = parent.find('.voting-true');
    //
    //
    //     if ($(this).hasClass('input-selected')) {
    //         btnZa.addClass('input-not-selected');
    //     }
    //     else {
    //         btnZa.removeClass('input-not-selected');
    //     }
    //     if ($('.voting-false').hasClass('input-selected')) {
    //         btnZa.removeClass('input-not-selected');
    //     }
    //     if ($('.voting-abstained').hasClass('input-selected')) {
    //         btnZa.removeClass('input-not-selected');
    //     }
    //
    // });
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
    $(document).on('click', '.change-span-candidate', function () {
        $('.cum-not-dividing .votes').hide();
        $('.cum-not-dividing .votes-left').show();
    });

    // Очистка инпутов и спанов в кумулятивном не разделенном голосовании
    function cumNotSeparVotingClearInput(_this) {
        var parent = _this.closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        parent.find('.total-left').css('color', '#141414');
        parent.find('.voting-true').removeClass('disable-votin-btn');
        votesLeft.hide();
        votes.show();
        clearInputs(parent.find('.separation-cumulative-za'), parent.find('.voting-actions__wrap-input .change-span'))
    }

    $(document).on('click', '.cumulative-voting-input .not-separation .voting-false', function () {
        cumNotSeparVotingClearInput($(this))
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-abstained', function () {
        cumNotSeparVotingClearInput($(this))
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-close', function () {

        cumNotSeparVotingClearInput($(this));
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
            if (!parent.find('.voting-true').hasClass('input-selected')) {
                parent.find('.voting-true').click();
            }
            _this.closest('.input-hide-wrap').find('.separation-cumulative-za').val(res.result);
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(res.result);
            var zaBtn = parent.find('.voting-true');
            if (res['status'] === "success") {
                if (res.result[0] === '-') {
                    zaBtn.addClass('disable-votin-btn');
                    parent.find('.voting-close').addClass('input-selected');
                    totalLeft.css({
                        color: 'red'
                    })
                }
                else {
                    zaBtn.removeClass('disable-votin-btn');
                    parent.find('.voting-close').removeClass('input-selected');
                    totalLeft.css({
                        color: '#141414'
                    })
                }
            }
        })
    });

    // не разделенное кумулятивное голосование
    $(document).on('keyup', '.separation-cumulative-za', function () {
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
            fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (result) {
                totalLeft.text(result.result);
                var zaBtn = parent.find('.voting-true');
                if (result['status'] === "success") {
                    totalLeft.text(result.result);
                    if (result.result[0] === '-') {
                        zaBtn.addClass('disable-votin-btn');
                        parent.find('.voting-close').addClass('input-selected');
                        totalLeft.css({
                            color: 'red'
                        })
                    }
                    else {
                        zaBtn.removeClass('disable-votin-btn');
                        parent.find('.voting-close').removeClass('input-selected');
                        totalLeft.css({
                            color: '#141414'
                        })
                    }
                }
            })
        }

    });
    // очистка инпутов в кумулятивном не разделенном голосовании
    $(document).on('click', '.cum-not-dividing .voting-false', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputsForClear = parent.find('.separation-cumulative-za');
        var spansForClear = parent.find('.change-span');
        var totalMax = parent.find('.total-max:first');
        var totalLeft = parent.find('.total-left');
        totalLeft.text(totalMax.text());
        clearInputs(inputsForClear, spansForClear);
    });
    $(document).on('click', '.cum-not-dividing .voting-abstained', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputsForClear = parent.find('.separation-cumulative-za');
        var spansForClear = parent.find('.change-span');
        var totalMax = parent.find('.total-max:first');
        var totalLeft = parent.find('.total-left');
        totalLeft.text(totalMax.text());
        clearInputs(inputsForClear, spansForClear);
    });

    // функция очистки инпута и спана
    function clearInputs(inputs, spans) {
        inputs.each(function () {
            $(this).val(0);
        });
        spans.each(function () {
            $(this).text(0)
        })
    }

    // Клики по кнопке 1/* голосов
    $(document).on('click', '.cumulative-voting-input .division-votes', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var amountCandidates = parent.find('.candidateQuota').val().trim();
        var totalVoices = parent.find('.total-max').text().replace(/\u00a0/g, ''); // Удаляем спецсимвол пробела
        var totalLeft = parent.find('.total-left')
        var input = $(this).closest('.voting-actions__wrap-input').find('.separation-cumulative-za');
        var span = $(this).closest('.voting-actions__wrap-input').find('.change-span');
        var _this = $(this);
        $.ajax({
            url: '/FractionCalculator/Divide',
            type: 'get',
            data: {
                value1: totalVoices,
                value2: amountCandidates
            },
            dataType: 'json',
            success: function (html) {
                if (!parent.find('.voting-true').hasClass('input-selected')) {
                    parent.find('.voting-true').click();
                }
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                } else {
                    input.val(request);
                    span.text(request);
                    var arrOfInputs = parent.find('.separation-cumulative-za');
                    var arrOfInputsVal = [];
                    arrOfInputs.each(function () {
                        // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
                        if ($(this).val().trim() === '') {
                            $(this).val(0)
                        }
                        arrOfInputsVal.push($(this).val()); // Значение каждого инпута заносим в массив
                    });
                    additionFraction(arrOfInputsVal.join(';')).done(function () {
                        fractionMinusArrayFraction(arrOfInputsVal, totalVoices).done(function (result) {
                            var zaBtn = parent.find('.voting-true');
                            if (result['status'] === "success") {
                                totalLeft.text(result.result);
                                if (result.result[0] === '-') {
                                    zaBtn.addClass('disable-votin-btn');
                                    parent.find('.voting-close').addClass('input-selected');
                                    totalLeft.css({
                                        color: 'red'
                                    })
                                }
                            }
                        })
                    });
                }
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    });

// Если есть количество кандидатов в голосовании, то кнопки: за, против, воздержался не активные
    function disabledAllBtn() {
        var candidates = $('.candidateQuota').val();
        if (candidates > 0) {
            $('.voting-enter__select-all .voting-inputs').addClass('input-sent-candidate');
        }
    }

    disabledAllBtn();

// функция проверки  если выбран один ряд кнопок за/против/воздержался, тогда кнопка в верхнем ряду становится активной.

    function autoButtonPressAbstained() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnAbstained = parentAllBtn.find('.voting-abstained'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnAbstained = parentSingBtn.find('.voting-abstained').length,
            inputSelected = parentSingBtn.find('.voting-abstained.input-selected').length;

        if (singBtnAbstained === inputSelected) {
            btnAbstained.addClass('input-selected');
            if (candidates > 0) {
                btnAbstained.removeClass('input-selected');
            }
        }

    }
    function autoButtonPressFalse() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnFalse = parentAllBtn.find('.voting-false'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnFalse = parentSingBtn.find('.voting-false').length,
            inputSelected = parentSingBtn.find('.voting-false.input-selected').length;

        if (singBtnFalse === inputSelected) {
            btnFalse.addClass('input-selected');
            if (candidates > 0) {
                btnFalse.removeClass('input-selected');
            }
        }
    }
    function autoButtonPressTrue() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnTrue = parentAllBtn.find('.voting-true'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnTrue = parentSingBtn.find('.voting-true').length,
            inputSelected = parentSingBtn.find('.voting-true.input-selected').length;

        if (singBtnTrue === inputSelected) {
            btnTrue.addClass('input-selected');
            if (candidates > 0) {
                btnTrue.removeClass('input-selected');
            }
        }
        disabledAllBtn();
    }
    function autoBtnPressClose() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnClose = parentAllBtn.find('.voting-close'),

            parentSingBtn = $('.disabled-form'),
            singBtnClose = parentSingBtn.find('.voting-close').length,
            inputSelected = parentSingBtn.find('.voting-close.input-selected').length;

        if (singBtnClose === inputSelected) {
            btnClose.addClass('input-selected');
        }
        disabledAllBtn();
    }
    autoBtnPressClose();

    $(document).on('click', '.disabled-form .voting-abstained', function () {
        autoButtonPressAbstained();
    });
    $(document).on('click', '.disabled-form .voting-false', function () {
        autoButtonPressFalse();
    });
    $(document).on('click', '.disabled-form .voting-close', function () {
        autoBtnPressClose();
    });
    $(document).on('click', '.disabled-form .voting-true', function () {
        autoButtonPressTrue();
    });

});