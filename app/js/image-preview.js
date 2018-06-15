function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; i < files.length; i++) {
        f = files[i];
        if (!f.type.match('image.*')) continue;
        if (f.size > 200 * 1024) {

            alert("Размер файла не может превышать 200 кб");
            continue;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            $('.content__block--photo img')[0].src = e.target.result;
            if ($('.content__block--photo').data("forself")) {
                $('.header__user img')[0].src = e.target.result;
            }
            if ($('.content__block--photo').data("autoLoad")) {
                sendImageToServer();
            }
        };
        reader.readAsDataURL(f);
    }
}

$('.content__block--photo input[type="file"]').on('change', handleFileSelect);

$('#delete-photo').on('click', removeAvatar);

function removeAvatar() {
    var _url = "";
    if ($('.content__block--photo').data("forself")) {
        _url = "/Profile/RemoveAvatar";
    }
    else {
        _url = "/Admin/User/RemoveAvatar";
    }

    $.ajax({
        url: _url,
        type: 'POST',
        data: { userName: $('#UserName').val() },
        success: function (result) {
            $('.content__block--photo img')[0].src = "/images/icons/add-photo.png";
            if ($('.content__block--photo').data("forself")) {
                $('.header__user img')[0].src = "/images/icons/add-photo.png";
            }
        },
        error: function (err) {
            alert('Ошибка! Ответ сервера: ' + err.status);
        },
        complete: function (jqXHR, status) {
        }
    });
}

function sendImageToServer() {
    var _url = "";
    if ($('.content__block--photo').data("forself")) {
        _url = "/Profile/LoadAvatar";
    }
    else {
        _url = "/Admin/User/LoadAvatar";
    }

    var formData = new FormData();
    formData.append('avatarFile', $('.content__block--photo input[type="file"]')[0].files[0]); // myFile is the input type="file" control
    formData.append('userName', $('#UserName').val());
    $.ajax({
        url: _url,
        type: 'POST',
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success: function (result) {
        },
        error: function (err) {
            alert('Ошибка! Ответ сервера: ' + err.status);
        },
        complete: function (jqXHR, status) {
        }
    });
}
