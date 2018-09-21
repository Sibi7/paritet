$(function () {
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show()
    });

    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show()
    });

    // Очистка модального окна по клику на кнопку отмена, при создании пользователя в роли Админа. "Представляет"
    $(document).on('click', '.clear-popup', function () {
        var elTable = $('.cancel-clear-table');
        elTable.html('<tr></tr>')
    });
    
    function clearDisabledAddBtn(modal) {
        var checkBox = modal.find('.cancel-clear-table input');
        if(checkBox.attr('checked') === 'checked'){
            modal.find('.filter__footer .submit').removeAttr('disabled');
        }
    }
    clearDisabledAddBtn($('.represent-filter'));
    clearDisabledAddBtn($('.represent-filter'));
});