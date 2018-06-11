$(function () {
    //табы для переключения между юр. лицом и физ. лицом во всплывающем окне
    $('.filter__block').each(function (i) {
        if (i != 0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.modal__tab', function () {
        var tabId = $(this).attr('data-id');
        $(this).siblings('.modal__tab').removeClass('modal__tab--active');
        $(this).addClass('modal__tab--active');
        $('.filter__block').hide(0);
        $('.filter__block[data-id=' + tabId + ']').show();
    });

    //показать или скрыть полей "номер документа" и "представители" при выборе роли владельца
    $(document).on('click', '.admin-user-role', function () {
        if ($(this).val() === 'SHAREHOLDER') {
            $('.owner-row').removeClass('hidden')
        } else {
            $('.owner-row').addClass('hidden')
        }
    });

    //клик по кнопке "Добавить" во всплывающем окне представителей
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show()
    });

    //клик на поле ввода представителей - открывает окно представителей
    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show()
    });

    //клик на кнопку "Выбрать" в окне представителей
    $(document).on('click', '#user-cabinet-new .filter .submit', function () {
        var trArr = document.querySelectorAll('#user-cabinet-new .filter tr');
        var users = '';
        for (var i = 0; i < trArr.length; i++) {
            var checkbox = trArr[i].querySelector('input[type="checkbox"]:checked');
            var span = trArr[i].querySelectorAll('td > span');

            if (checkbox !== null) {
                var user = '';
                for (var j = 0; j < span.length; j++) {
                    user = user + span[j].innerHTML + ' '
                }
                users += user;
            }
        }
        var inp = document.querySelector('#user-cabinet-new .admin-represent');
        inp.setAttribute('value', users);

        if ($('#user-cabinet-new .admin-represent').val().replace(' ', '').length === 0) {
            inp.setAttribute('value', 'Нет')
        }
        $('#user-cabinet-new .filter').hide();
    });


    $(document).on('click', '#user-cabinet-new .filter label, .filter__row-text', function () {
        var checkbox = $(this).closest('tr').find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });


    $(document).on('click', '#user-cabinet-new .search > span', function () {
        $('#user-cabinet-new .t-search').val('');
        $('#user-cabinet-new .filter').hide();
        $(this).remove();
    });


});