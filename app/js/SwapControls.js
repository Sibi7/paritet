function submitNearestForm() {
    var ajaxForm = $(".ajax-form");
    if (ajaxForm) {
        var url = ajaxForm.attr("action");

        $.ajax({
            type: "POST",
            url: url,
            data: ajaxForm.serialize(), // serializes the form's elements.
            success: function (data) {
                ajaxForm[0].outerHTML = data;
            },
            error: function (data) {
                alert("error");
            }
        });
    }
}

function returnControlInEditMode() {
    var issuerId = $("#IssuerID").val();
    var propertyName = $("#PropertyName").val();
    var control = $(".swap-control-info");
    $.ajax({
        type: "GET",
        url: "/Manager/Issuer/GetManagementEditor/"+issuerId+"?propertyName="+propertyName,
        success: function (data) {
            control[0].outerHTML = data;
        },
        error: function (data) {
            alert("error");
        }
    });
}

$(document).on("focusout", ".swap-control-edit", function () {
    submitNearestForm();
});
$(document).on("click", ".swap-control-info", function () {
    returnControlInEditMode();
});