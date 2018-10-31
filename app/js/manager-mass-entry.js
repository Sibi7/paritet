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
        var parent = $(this).closest('.voting-actions__choice-wrap');
        var changeSpan = parent.find('.change-span');
        var inputHide = parent.find('.input-hide');
        changeSpan.text('0');
        inputHide.val('0');

        return false;
    });
    $(document).on('click', '.separation-votes .voting-btn-cumulative', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputHide = parent.find('.separation-cumulative-za');
        var changeSpan = parent.find('.change-span-candidate');
        var totaLeft = parent.find('.votes-left .total-left');
        var totalMax = parent.find('.votes-left .total-max').text();
        var totalVotes = parent.find('.voting-actions__wrap-input .totals-votes');
        if ($(this).hasClass('voting-active')) {
            $(this).removeClass('voting-active');
        }
        else {
            $(this).addClass('voting-active').removeClass('voting-not-active');
            // $(this).closest('.voting-actions__choice-wrap').find('.change-span').click();
        }
        if (!$(this).hasClass('voting-active')) {
            changeSpan.text('0');
            inputHide.val('0');
            totalVotes.text('0');
            totaLeft.text(totalMax);
        }
        // var changeSpan = $('.change-span-candidate');
        // var inputHide = $('.separation-cumulative-za');
        // changeSpan.text('0');
        // inputHide.val('0');

        return false;
    });
    // перезаписываем значение в change-span, если в инпут были введены цифры. + обрабатываем введенные цифры и добавляем разряды числам.
    $(document).on('change', '.input-hide', function () {
        var number = $(this).val();
        var format = String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        $(this).closest('.voting-actions__wrap-input').find('.change-span').html(format);

    });
    // если во время ввода в контроле ввода был нажат Enter, сохраняем значения в change-span
    $(document).on('keydown', '.input-hide', function (e) {
        var container = $(".input-hide-wrap");
        var changleSpan = $(".change-span");
        if (e.key === 'Enter') {
            $(this).trigger('blur');
            container.hide();
            changleSpan.show();
            inputCheckValForBtnActive();
        }
        if (e.keyCode === 38) {
            var parent = $(this).closest('.input-hide-wrap');
            var count = parent.find('.input-hide'),
                val = parseInt(parent.find('.input-hide').val());
            if (val === 999999) {
                return false;
            } else {
                count.val(val + 1);
                $('.js-single-addtocart').attr('data-quantity', count.val());
                $('.js-single-favorites').attr('data-quantity', count.val());
            }
            calculateTotalVoises(parent.find('.input-hide'));
        }
        if (e.keyCode === 40) {
            var parent = $(this).closest('.input-hide-wrap');
            var count = parent.find('.input-hide');
            var counter = parseInt(count.val()) - 1;
            counter = counter < 0 ? 0 : counter;
            count.val(counter);
            count.change();
            $('.js-single-addtocart').attr('data-quantity', counter);
            $('.js-single-favorites').attr('data-quantity', counter);
            calculateTotalVoises(parent.find('.input-hide'));
            return false;
        }
        if (e.keyCode === 27) {
            $(this).val('0');
            container.hide();
            changleSpan.show();
            calculateTotalVoises($(this));
        }
    });

    $(document).on('click', '.change-span', function () {

        var parent = $(this).closest('.voting-actions__choice-wrap');
        var btn = parent.find('.voting-actions-btn');
        var btnVotesZa = parent.find('.voting-btn-cumulative');
        var inputHide = parent.find('.input-hide');
        if (parent.hasClass('voting-parent-active')) {
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
            if (!btn.hasClass('voting-active')) {
                btn.trigger('click');
            }
            if (!btnVotesZa.hasClass('voting-active')) {
                btnVotesZa.addClass('voting-active').removeClass('voting-not-active');
            }

        }
        $(this).hide();
        $(this).siblings('.input-hide-wrap').show().addClass('input-hide-visible');
        inputHide.val(inputHide.val().trim());
        inputHide.select();
    });

    $(document).mouseup(function (e) {
        var container = $(".input-hide-wrap");
        var changleSpan = $(".change-span");
        if (container.has(e.target).length === 0) {
            container.hide();
            changleSpan.show();
            inputCheckValForBtnActive();
        }

    });

//Функция проверки на введеные данные, если голосов 0 то кнопка неактивна по закрытию контролла ввода
    function inputCheckValForBtnActive() {
        var parent = $('.separation-votes .voting-actions__choice-wrap');
        parent.each(function () {
            var btn = $(this).find('.voting-actions-btn');
            var inputHide = $(this).find('.input-hide');
            if (inputHide.val() === '0') {
                btn.removeClass('voting-active');
            }
        });

    }

    function calculateTotalVoises(_this) {
        // var changeSpan = $('.separation-votes .cum-change-span');
        // var votingClose = $('.voting-close');
        var parent = _this.closest('.separation-votes  .voting-actions__choice-btn');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeftMassEntry = parent.find('.total-left');
        var btnNotActive = parent.find('.voting-actions-btn');
        var btnNotZa = parent.find('.voting-btn-cumulative');
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
                    btnNotZa.addClass('voting-not-active');
                    btnInvalid.addClass('voting-active');
                    checkMinusColor();
                }
                else {
                    btnNotActive.removeClass('voting-not-active');
                    btnInvalid.removeClass('voting-active');
                    checkMinusColor();
                }
            }

        });
        if (_this.val() === '') {
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(0);

        }
    }
    // Функция которая проверяет после голосования "Total-left/Голосов осталось" на первый знак минус, если он есть тогда данные красного цвета
    function checkMinusColor() {
        var totalLeft = $('.separation-votes .votes-left .total-left');
        if (totalLeft.text().trim()[0] === '-') {
           totalLeft.css({
               color: 'red'
           })
        }
        else {
            totalLeft.css({
                color: '#141414'
            })
        }
    }

    checkMinusColor();

    $(document).on('keyup', '.separation-votes .input-hide', function () {

        calculateTotalVoises($(this))
    });

    // Событие на кнопки с разделенным голосованием, если в поле инпут было введено значение, а потом отжали кнопку ЗА ПРОТИВ или ВОЗДЕРЖАЛСЯ, то значение в инпуте сбрасывается и пересчитывается счетчик "Голосов осталось"
    $(document).on('click', '.voting-actions-btn', function () {
        var _this = $(this);
        var parent = _this.closest('.voting-actions__choice-wrap');
        var inputHide = parent.find('.input-hide');
        calculateTotalVoises(inputHide);
    });

    $(document).on('blur', '.separation-votes .input-hide', function () {
        var parent = $(this).closest('.voting-actions__wrap-input');
        var inputsForClear = parent.find('.input-hide');
        var spansForClear = parent.find('.change-span');
        clearInputs(inputsForClear, spansForClear);
        var number = $(this).val();
        var format = String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        $(this).trigger('focus');
        $(this).closest('.voting-actions__wrap-input').find('.change-span').html(format);
    });
    $(document).on('keydown', '.input-hide', function (e) {
        return isAllowedKeyCode(e.originalEvent.key);
    });

    // функция проверки если кнопка ЗА
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
        var inputHide = $('.cumulative-voting-input .input-hide');
        var changeSpan = $('.cumulative-voting-input  .change-span');
        var totalLeft = parent.find('.total-left');
        var totalMax = parent.find('.total-max').text();
        if ($(this).hasClass('input-selected')) {
            votesLeft.show();
            votes.hide();
        }
        else {
            votesLeft.hide();
            votes.show();
        }
        if (!$(this).hasClass('input-selected')) {
            changeSpan.text('0');
            inputHide.val('0');
            totalLeft.text(totalMax);
        }

    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-false', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-abstained', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-close', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.change-span-candidate', function () {
        $('.cum-not-dividing .votes').hide();
        $('.cum-not-dividing .votes-left').show();
        var inputHideWrap = $(this).siblings('.input-hide-wrap');
        var parent = $(this).closest('.cumulative-voting-input');
        if (inputHideWrap.css('display', 'block')) {
            if (!parent.find('.voting-actions-sing-btn.voting-true').hasClass('input-selected')) {
                parent.find('.voting-actions-sing-btn.voting-true').click();
            }
            if (!parent.find('.voting-btn-cumulative.voting-true').hasClass('input-selected')) {
                parent.find('.voting-btn-cumulative.voting-true').addClass('voting-active').removeClass('voting-not-active');
            }
        }
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
        clearInputs(parent.find('.input-hide'), parent.find('.change-span'))
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

    $(document).on('click', '.separation-votes .voting-close', function () {
        var parent = $(this).closest('.voting-enter__tr');
        ajaxForSeparationBtn($(this)).done(function () {
            parent.find('.voting-close').click()
        });
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
        console.log(massEntryArray);
        massEntryArray.splice(massEntryArray.indexOf($(this).siblings('input').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (data) {
            if (votesLeft.text() === '0') {
                return false;
            }
            else {
                inputHide.val(data.result.replace(/\u00a0/g, ''));
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
        var parent = _this.closest('.voting-multiple-candidates');
        if (_this.closest('.voting-multiple-candidates').length) {
            console.log(_this.closest('.voting-inputs__choice').find('.voting-actions-sing-btn.voting-true.input-selected'))
            _this.closest('.voting-inputs__choice').find('.voting-actions-sing-btn.voting-true.input-selected').click();
        }
        return $.ajax({
            url: '/Manager/Input/SplitVoicesAjax/' + meetingId,
            type: 'post',
            data: {
                decisionID: decisionIdInput,
                registerAccountId: registerAccountId,
            },
            success: function (data) {
                var content = _this.closest('.voting-enter__tr').find('.voting-enter__td.margin-left-auto');
                setTimeout(function () {
                    content[0].outerHTML = data;
                    toggleVotesZaCandidate(parent);
                    disabledAllBtnSeparation();
                    separationVotesBtnSubstitution();
                    vetoCheckBtn();
                }, 0);
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }

        });


    }


    // Если в простом голосование разделены голоса, то верхний ряд кнопок disabled
    function disabledAllBtnSeparation() {
        if ($('.separation-votes').length > 0) {
            $('.voting-enter__select-all .voting-inputs').addClass('input-sent-candidate');
        }
        else {
            $('.voting-enter__select-all .voting-inputs').removeClass('input-sent-candidate');
        }
    }

    disabledAllBtnSeparation();

    $(document).on('click', '.voting-divide', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = _this.closest('.voting-multiple-candidates');
        var parentSepar = _this.closest('.cumulative-voting-input');
        ajaxForSeparationBtn(_this).done(function () {
            toggleVotesZaCandidate(parent);

            var changeSpanCandidate = parentSepar.find('.change-span-candidate');
            var inputHideCumulative = parentSepar.find('.separation-cumulative-za');
            changeSpanCandidate.text('0');
            inputHideCumulative.val('0');
        })


    });

    function separationVotesBtnSubstitution() {
        var parentCum = $('.cumulative-voting-input');
        var separationBlockCumulative = parentCum.find('.separation-votes.voting-sent');
        var btnZaCumSeparationZa = separationBlockCumulative.find('.voting-true');
        btnZaCumSeparationZa.removeClass('voting-actions-btn').addClass('voting-btn-cumulative voting-not-active');
    }

    separationVotesBtnSubstitution();
    // сворачиваем разделение голосов
    $(document).on('click', '.voting-clear-division', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = _this.closest('.voting-multiple-candidates');
        var parentSepar = _this.closest('.cumulative-voting-input');
        var btnAllVotingClose = $('.voting-actions-all-btn.voting-close');
        ajaxForSeparationBtn($(this)).done(function () {
            var changeSpanCandidate = parentSepar.find('.change-span-candidate');
            var inputHideCumulative = parentSepar.find('.separation-cumulative-za');
            changeSpanCandidate.text('0');
            inputHideCumulative.val('0');
            if (parent.length) {
                disabledAllBtn();
                toggleVotesZaCandidate(parent);
                votesZaSimpleMultiplySum(parent.find('.voting-clear-division'))
            }
            // после сворачивания голосов делаем проверку на кнопку "Х" всего бюллетеня. если есть ненажатые кнопки "Х" по вопросу, тогда отжимаем кнопку у всего бюллетеня
            if (btnAllVotingClose.hasClass('input-selected')) {
                btnAllVotingClose.removeClass('input-selected');
            }
        });

    });

    function toggleVotesZaCandidateInit() {
        var parents = $('.voting-multiple-candidates');
        parents.each(function () {
            toggleVotesZaCandidate($(this));
        });

    }

    toggleVotesZaCandidateInit();

    function toggleVotesZaCandidate(parent) {
        if (parent.length) {
            if (parent.find('.separation-votes').length) {
                parent.find('.votes-za-candidate').show();
            }
            else {
                parent.find('.votes-za-candidate').hide().find('.total-left').text('0');
            }
        }
    }

    function votesZaSimpleMultiplySum(_this) {
        var parent = _this.closest('.voting-multiple-candidates');
        var blocks = parent.find('.separation-votes');
        var arrForSnd = [];
        var clickedNotSeparatedBtn = parent.find('.voting-actions-sing-btn.voting-true.input-selected');
        blocks.each(function () {
            if ($(this).find('.input-hide').val() === '') {
                arrForSnd.push(0);
                return true;
            }
            arrForSnd.push($(this).find('.input-hide:first').val());
        });
        clickedNotSeparatedBtn.each(function () {
            arrForSnd.push($(this).closest('.voting-inputs').find('.votes-per-candidate').val().replace(/\u00a0/g, ''));
        });
        console.log('votesZaSimpleMultiplySum() arrForSnd', arrForSnd)

        additionFraction(arrForSnd.join(';')).done(function (data) {
            if (blocks.length) {
                parent.find('.votes-za-candidate .total-left').text(data.result);
            } else {
                parent.find('.votes-za-candidate .total-left:first').text(0)
            }
        })

    }

    $(document).on('keyup', '.voting-multiple-candidates .separation-votes .input-hide', function () {

    });


    $(document).on('keyup blur change', '.voting-multiple-candidates .separation-votes .input-hide', function (e) {

        if ($(this).closest('.voting-actions__choice-wrap').find('.voting-true').length) {
            // if ($(this).val() === '' && e.type === 'keyup') return false;
            votesZaSimpleMultiplySum($(this));
        }
    });
    $(document).on('click', '.voting-multiple-candidates .voting-clear-division', function (e) {
        if ($(this).closest('.voting-actions__choice-wrap').find('.voting-true').length) {
            // if ($(this).val() === '' && e.type === 'keyup') return false;
            votesZaSimpleMultiplySum($(this));
        }
    });
    // $(document).on('click', '.voting-multiple-candidates .voting-divide', function (e) {
    //     $(this).closest('.voting-actions__choice-wrap').find('.voting-true').click();
    // });

    $(document).on('click', '.voting-multiple-candidates .separation-votes .input-balance', function () {
        $(this).trigger('blur');
    });
    // Кумулятивное голосование!

    $(document).on('blur', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var givenZa = parent.find('.totals-votes');
        var arrOfInputsYes = parent.find('.separation-cumulative-za');
        var arrOfInputsYesVal = [];
        arrOfInputsYes.each(function () {
            //Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
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
    $(document).on('keyup', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var givenZa = parent.find('.totals-votes');
        var arrOfInputsYes = parent.find('.separation-cumulative-za');
        var arrOfInputsYesVal = [];
        arrOfInputsYes.each(function () {
            //Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка

            arrOfInputsYesVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });
        additionFraction(arrOfInputsYesVal.join(';')).done(function (res) {
            givenZa.text(res.result);
            givenZa.closest('.separation-cumulative-wrap-input').find('.input-hide').val(res.result);
            calculateTotalVoises(givenZa);
            var votingTrue = parent.find('.voting-true.voting-btn-cumulative');
            if(givenZa.text() === "0"){
                votingTrue.addClass('voting-not-active');
            }

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
        var _this = $(this);
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        massEntryArray.splice(massEntryArray.indexOf($(this).closest('.input-hide-wrap').find('.separation-cumulative-za').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (res) {
            totalLeft.text(0);
            if (!parent.find('.voting-true').hasClass('input-selected')) {
                parent.find('.voting-true').click();
            }
            _this.closest('.input-hide-wrap').find('.separation-cumulative-za').val(res.result.replace(/\u00a0/g, ''));
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

//  Проверка change-span, если пустой, то добавляем 0 по умолчаниюа
    function clearInputs(inputs, spans) {
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                $(this).val(0);
            }
        });
        spans.each(function () {
            if ($(this).text().trim() === '') {
                $(this).text(0)
            }

        })
    }

    var inputHideValid = $('.input-hide');
    var changeSpanValid = $('.change-span');
    clearInputs(inputHideValid, changeSpanValid);
    // Клики по кнопке 1/* голосов
    $(document).on('click', '.cumulative-voting-input .division-votes', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var amountCandidates = parent.find('.candidateQuota').val().trim();
        var totalVoices = parent.find('.total-max').text().replace(/\u00a0/g, ''); // Удаляем спецсимвол пробела
        var totalLeft = parent.find('.total-left');
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

    // Функция проверки количества голосов, если голосов ноль, то кнопки disabled
    function numberCheckVotes() {
        var parents = $('.voting-enter__td.margin-left-auto');
        parents.each(function () {
            var btnDisabled = $(this).find('.voting-inputs'),
                total = $(this).find('.total-left'),
                btn = $(this).find('.voting-actions-sing-btn');

            if (total.text().trim() === '0') {
                btnDisabled.addClass('input-sent');
                if (btn.hasClass('input-selected')) {
                    btn.removeClass('input-selected');
                }
            }

        });

    }

    $(document).on('click', '.voting-actions-all-btn', function () {
        numberCheckVotes();
    });
    numberCheckVotes();

    // функция проверки кнопки ВЕТО в блоке с кнопками ЗА ПРОТИВ ВОЗДЕРЖАЛСЯ, если есть ВЕТО расширяем блок, чтобы все кнопки помещались
    function vetoCheckBtn() {
        var votingInputs = $('.voting-inputs');
        votingInputs.each(function () {
            if ($(this).find('.voting-veto').length) {
                $(this).css({
                    width: '504px'
                })

            }
            else {
                $(this).css({
                    width: '418px'
                })
            }
        });
    }

    vetoCheckBtn();

    $(document).on('click', '.voting-multiple-candidates .voting-true', function () {
        var parent = $(this).closest('.voting-multiple-candidates');
        var activeZa = parent.find('.voting-actions-sing-btn.voting-true.input-selected');
        var votesPerCandidate = parent.find('.votes-per-candidate').val();
        var votesSum = parent.find('.voices-sum');
        var total = parent.find('.max-sum-votes').text();
        var votesMax = parent.find('.votes-max');
        var arrForSend = [];
        var totalZa = $('.votes-za');
        var votingClose = $('.voting-actions-sing-btn.voting-close');
        var separetionValZa = parent.find('.separation-votes');

        activeZa.each(function () {
            arrForSend.push(votesPerCandidate);
        });
        separetionValZa.each(function () {
            arrForSend.push($(this).find('.voting-actions__choice-wrap:first .input-hide').val());
        });

        console.log('arrForSend', arrForSend)

        if (arrForSend.length) {
            additionFraction(arrForSend.join(';')).done(function (data) {
                votesSum.text(data.result);
                parent.find('.votes-za-candidate .total-left').text(data.result);
                comparingIsLager(total, data.result).done(function (res) {
                    if (res.result === 'false') {
                        // если тотал меньше, чем мы отдаем (значит показываем строку с голосами, добавляем тексту красный цвет, и делаем голосование недейтвительным)
                        votesSum.css({
                            color: '#e73b3b'
                        });
                        votesMax.hide();
                        totalZa.show();
                        activeZa.removeClass('input-selected');
                        votingClose.addClass('input-selected')

                    } else {
                        // если тотал больше, чем мы отдаем (значит все норм, скрываем строку с голосами, и убираем красный цвет у текста)
                        totalZa.hide();
                        votesMax.show();
                    }
                })
            })
        } else {
            votesSum.text(0)
        }

    });

    // функция проверки всего бюлетеня, если голосов === 0, тогда кнопки disabled
    function disabledBtnTotal() {
        var parent = $('.voting-inputs');
        var totalVotesInput = $('.can-veto');
        var cumulativeChange = $('.separation-cumulative .change-span');
        if (totalVotesInput.text().trim() === 'Владелец имеет право вето') {
            cumulativeChange.addClass('voting-not-active');
            parent.each(function () {
                if (!$(this).find('.voting-veto').length) {
                    $(this).addClass('input-sent');
                }
                if ($(this).find('.voting-veto').length) {
                    $(this).removeClass('input-sent').addClass('veto-disabled-list-btn');
                }

            });
        }
    }

    disabledBtnTotal();


//    Инкремент Декремент для контролла ввода/ стелочки вверх/низ

    $(document).on('click', '.input-hide-plus', function () {

        var parent = $(this).closest('.input-hide-wrap');
        var count = parent.find('.input-hide'),
            val = parseInt(parent.find('.input-hide').val());
        if (val == 999999) {
            return false;
        } else {
            count.val(val + 1).trigger('keyup').change().focus();
            $('.js-single-addtocart').attr('data-quantity', count.val());
            $('.js-single-favorites').attr('data-quantity', count.val());
        }
        calculateTotalVoises(parent.find('.input-hide'));
        return false;
    });

    $(document).on('click', '.input-hide-minus', function () {

        var parent = $(this).closest('.input-hide-wrap');
        var count = parent.find('.input-hide');
        var counter = parseInt(count.val()) - 1;
        counter = counter < 0 ? 0 : counter;
        count.val(counter).trigger('keyup');
        count.change().focus();
        $('.js-single-addtocart').attr('data-quantity', counter);
        $('.js-single-favorites').attr('data-quantity', counter);
        calculateTotalVoises(parent.find('.input-hide'));
        return false;
    });

    //Событие на кнопку "X" для всего бюллетеня
    $(document).on('click', '.voting-actions-all-btn.voting-close', function () {
        if ($(this).hasClass('input-selected')) { //  Делаем проверку, если бала нажата кнопка "Х" для всего бюллетеня - идем далее.. Если нет, ничего не делаем
            var parent = $('.disabled-form'), // Находим родительский класс для всего бюллетеня
                allSeparationBtnClose = parent.find('.separation-votes .voting-close'); // Находим все кнопки "X" в раделенном голосовании
            allSeparationBtnClose.click(); // делаем по ним клик тем самым вызывая ajax запрос на сворачивание разделенного голосования
        }
    });

});

/*
* функция горячей клавиши TAB в разделенном голосование для переключения к следующему контролу
* */
function findNextInput(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + ++currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.wrap-input-hotkey');
    var changeSpan = wrapInputHide.siblings('.separation-hot-btn');
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="1"]').click().select();
    }
}

/*
* функция горячей клавиши TAB в разделенном голосование для переключения к предыдущему контролу
* */
function findPrevInput(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + --currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.wrap-input-hotkey');
    var changeSpan = wrapInputHide.siblings('.separation-hot-btn');
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="3"]').click().select();
    }
}

//Функция добавляет data-атрибуты для change-span-candidate  и  input-hide в кумулятивном голосовании
function changeSpanCandidateAddAttr() {
    var parent = $('.cumulative-voting-input');
    var changeSpan = parent.find('.change-span-candidate');
    var separationCumulativeZa = parent.find('.separation-cumulative-za');
    var i = 1;
    var j = 1;
    changeSpan.each(function () {
        $(this).attr('data-span-num', i);
        i++;
    });
    separationCumulativeZa.each(function () {
        $(this).attr('data-inp-num', j);
        j++;
    });
}

changeSpanCandidateAddAttr();

function findPrevInputAcumulative(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + --currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.cumulative-hotkey');
    var changeSpan = wrapInputHide.siblings('.change-span-candidate');
    var btnParent = _this.closest('.separation-votes .voting-actions__choice-wrap');
    btnParent.each(function () {
        var btn = $(this).find('.voting-actions-btn');
        var inputHide = $(this).find('.input-hide');
        if (inputHide.val() === '0') {
            btn.removeClass('voting-active');
        }
    });
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="3"]').click().select();
    }


}

function findNextInputAcumulative(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + ++currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.cumulative-hotkey');
    var changeSpan = wrapInputHide.siblings('.change-span-candidate');
    var btnParent = _this.closest('.separation-votes .voting-actions__choice-wrap');
    btnParent.each(function () {
        var btn = $(this).find('.voting-actions-btn');
        var inputHide = $(this).find('.input-hide');
        if (inputHide.val() === '0') {
            btn.removeClass('voting-active');
        }
    });
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();

    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="1"]').click().select();
    }
}
