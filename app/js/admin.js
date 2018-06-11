$(function () {
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show()
    });

    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show()
    })
})