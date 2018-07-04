$(function () {

    function searchFilter(obj) {
        var items = document.querySelectorAll(obj.itemSelector),
            input = document.querySelector(obj.inputSelector);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    }

    $(document).on('keyup', '.t-search', function () {
        searchFilter({
            itemSelector: '.search-select li',
            inputSelector: '.t-search'
        })
    });

});