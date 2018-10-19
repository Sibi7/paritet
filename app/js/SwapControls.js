function submitNearestForm() {
  var ajaxForm = $(".ajax-form");

    if (ajaxForm) {
        var url = ajaxForm.attr("action");
        console.log('ajaxForm', ajaxForm)
        console.log('ajaxForm.serialize()', ajaxForm.serialize())
        console.log('url', url)

        $.ajax({
            type: "POST",
            url: '/Admin/Settings/SettingsRegistrar/1',
            data: 111, // serializes the form's elements.
            success: function (data) {
              ajaxForm[0].outerHTML = data;
            },
            error: function (data) {
                alert("error");
            }
        });
    }
}

function returnControlInEditMode(clickedElement, inEditMode) {
    var issuerId = $("#EntityID").val();
    var pageId = $("#PageID").val();
    var control = $(clickedElement);
    var propertyName = control.children("#PropertyName").val();

    $.ajax({
        type: "GET",
        url: "/Helper/GetSwapEditor/" + issuerId + "?pageID=" + pageId + "&propertyName=" + propertyName + "&inEditMode=" + inEditMode,
        success: function (data) {
            control[0].outerHTML = data;
        },
        error: function (data) {
            alert("error");
        }
    });
}

$(document).on("change", ".swap-control-edit input", function () {
    submitNearestForm();
});
$(document).on("click", ".swap-control-info", function (e) {
    e.preventDefault();
    returnControlInEditMode(e.target, true);
});
$(document).on("click", ".ajax-form", function (e) {
    if (!$(e.target).parent().hasClass("swap-control-edit")) {
        $(".swap-control-edit").each(function () {
            returnControlInEditMode(this, false);
        });
    }
});