$(function () {

    function searchFilter(obj) {
        var items = document.querySelectorAll(obj.itemSelector),
            input = document.querySelector(obj.inputSelector);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.innerHTML.toUpperCase().indexOf(input.value.trim().toUpperCase()) > -1) {
                item.style.display = "";
                item.classList.add('active-search-item');
            } else {
                item.style.display = "none";
                item.classList.remove('active-search-item');
            }
        }
    }

    $(document).on('keyup', '.t-search', function (e) {
        e.preventDefault();
        searchFilter({
            itemSelector: '.search-select li',
            inputSelector: '.t-search'
        });
        if (e.key === 'Enter' &&  $(this).siblings('.search-select')[0].querySelector('.active-search-item')) {
            $(this).siblings('.search-select')[0].querySelector('.active-search-item').click();
        }
    });
    $(document).on('submit', '.t-search-submit', function (e) {
        if (!$(this)[0].querySelector('.active-search-item')) {
          e.preventDefault();
        }
    })
});