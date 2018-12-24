function submitNearestForm() {
  var ajaxForm = $(".ajax-form");

    if (ajaxForm) {
        var url = ajaxForm.attr("action");
        var info_controls = $('#load-wrapper').find('.swap-control-info');
        var photo_buttons = $('#load-wrapper').find('.photo-button');
        var content_blocks_photo = $('#load-wrapper').find('.content__block--photo');
       
        $('#loader').attr('style', 'display: block');
        $('#load-wrapper').attr('style', 'opacity: 0.5;');
       
        info_controls.attr('style', 'cursor: none;').attr('disabled', 'disabled');
        photo_buttons.attr('style', 'cursor: none; display: none;');

        $.ajax({
            type: "POST",
            url: url,
            data: ajaxForm.serialize(), // serializes the form's elements.
            success: function (data) {
                info_controls.attr('style', "cursor: pointer;").removeAttr('disabled');
                photo_buttons.attr('style', "cursor: pointer; display: inline-block;");

                $('#loader').attr('style', 'display: none;');
                $('#load-wrapper').attr('style', 'opacity: 1;');

                ajaxForm[0].outerHTML = data;

                if (content_blocks_photo.length > 0) {
                    $('.content__block--photo.issuers input[type="file"]').on('change', handleFileIssuerSelect);
                    $('.content__block--photo.share input[type="file"]').on('change', handleFileShareSelect);
                    $('.content__block--photo.registrar input[type="file"]').on('change', handleFileRegistrarSelect);
                    
                    $('#delete-photo-issuer').on('click', removeIssuerRelationsDepEmplPhoto);
                    $('#delete-photo-share').on('click', removeShareholderRelationsDepEmplPhoto);
                    $('#delete-avatar').on('click', removeRegistrarAvatar);
                }
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
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
$(document).on("change", ".swap-control-edit select", function () {
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

$(document).on('keydown', '.ajax-form', function (e) {
    if (e.keyCode === 13){
        submitNearestForm();
        return false;
    }
});