$(function () {

    var meetingBlockText = $('.meeting-text-wrap');
    if (meetingBlockText.length > 0) {
        meetingBlockText.each(function () {
            var hiddenText = $(this).find('.fullsize-text').val();
            if (hiddenText.length > 51) {
                $(this).append('<button type="button" class="need-hide-btn">больше...</button>');
            }
        });
    }

    $(document).on('click', '.need-hide-btn', function () {
        var smallText = $(this).siblings('.small-size-text').val(),
            hiddenText = $(this).siblings('.fullsize-text').val();
        $(this).prev().toggleClass('resize-text');

        if ($(this).prev().hasClass('resize-text')) {
            $(this).text('меньше...');
            $(this).siblings('.need-hide').html(hiddenText);
        } else {
            $(this).text('больше...');
            $(this).siblings('.need-hide').html(smallText)
        }
    })

});