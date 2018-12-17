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

function handleFileIssuerSelect(evt) {
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
      $('.content__block--photo.issuers img')[0].src = e.target.result;
      if ($('.content__block--photo.issuers').data("autoLoad")) {
        sendRegistrarIssuerImageToServer();
      }
    };
    reader.readAsDataURL(f);
  }
}

function handleFileShareSelect(evt) {
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
      $('.content__block--photo.share img')[0].src = e.target.result;
      if ($('.content__block--photo.share').data("autoLoad")) {
        sendRegistrarShareholderImageToServer();
      }
    };
    reader.readAsDataURL(f);
  }
}

function handleFileRegistrarSelect(evt) {
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
      $('.content__block--photo.registrar img')[0].src = e.target.result;
      if ($('.content__block--photo.registrar').data("autoLoad")) {
        sendRegistrarAvatarToServer();
      }
    };
    reader.readAsDataURL(f);
  }
}

$('.content__block--photo.user input[type="file"]').on('change', handleFileSelect);
$('.content__block--photo.profile input[type="file"]').on('change', handleFileSelect);
$('.content__block--photo.issuers input[type="file"]').on('change', handleFileIssuerSelect);
$('.content__block--photo.share input[type="file"]').on('change', handleFileShareSelect);
$('.content__block--photo.registrar input[type="file"]').on('change', handleFileRegistrarSelect);

$('#delete-photo').on('click', removeAvatar);
$('#delete-photo-issuer').on('click', removeIssuerRelationsDepEmplPhoto);
$('#delete-photo-share').on('click', removeShareholderRelationsDepEmplPhoto);
$('#delete-avatar').on('click', removeRegistrarAvatar);

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
        success: function(result) {
            $('.content__block--photo img')[0].src = "/images/icons/add-photo.png";
            $('#delete-photo').hide();
            if ($('.content__block--photo').data("forself")) {
              $('.header__user img')[0].src = "/images/icons/add-photo.png";
            }
        },
        error: function (err) {
            if (err.status === 401) {
                location.href='/User/SignIn';
            }
            else {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        },
        complete: function(jqXHR, status) {
        }
    });
}

function removeShareholderRelationsDepEmplPhoto() {
  var _url = "/Admin/Settings/RemoveShareholderRelationsDepEmplPhoto";

  $.ajax({
    url: _url,
    type: 'POST',
    data: { registrarId: $('#EntityID').val() },
    success: function (result) {
      $('.content__block--photo.share img')[0].src = "/images/icons/default-avatar.png";
      $('#photo-share').text("Максимальный размер 200К");
      $('#delete-photo-share').hide();

    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
      },
    complete: function (jqXHR, status) {
    }
  });
}

function removeIssuerRelationsDepEmplPhoto() {
  var _url = "/Admin/Settings/RemoveIssuerRelationsDepEmplPhoto";

  $.ajax({
    url: _url,
    type: 'POST',
    data: { registrarId: $('#EntityID').val() },
    success: function (result) {
      $('.content__block--photo.issuers img')[0].src = "/images/icons/default-avatar.png";
      $('#photo-issuer').text("Максимальный размер 200К");
      $('#delete-photo-issuer').hide();

    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
      },
    complete: function (jqXHR, status) {
    }
  });
}

function removeRegistrarAvatar() {
  var _url = "/Admin/Settings/RemoveRegistrarAvatar";

  $.ajax({
    url: _url,
    type: 'POST',
    data: { registrarId: $('#EntityID').val() },
    success: function (result) {
      $('.content__block--photo.registrar img')[0].src = "/images/icons/registrar-avatar.png";
      $('#avatar-reg').text("Максимальный размер 200К");
      $('#delete-avatar').hide();
    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
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
            if (err.status === 401) {
                location.href='/User/SignIn';
            }
            else {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        },
        complete: function (jqXHR, status) {
        }
  });
}

function sendRegistrarIssuerImageToServer() {
  var _url = "";
  var f_name_issuer = $('.content__block--photo.issuers input[type="file"]')[0].files[0].name;

  var formData = new FormData();
  if ($('.content__block--photo.issuers').data("forself")) {
    _url = "/Admin/Settings/LoadIssuerRelationsDepEmplPhoto";
    formData.append('issuerPhotoFile', $('.content__block--photo.issuers input[type="file"]')[0].files[0]);
    formData.append('issuerPhotoName', f_name_issuer);
  }

  formData.append('registrarId', $('#EntityID').val());
  $.ajax({
    url: _url,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      $('#photo-issuer').text(f_name_issuer);
      $('#photo-issuer-name').val(f_name_issuer);
      $('#delete-photo-issuer').show();
    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
      },
    complete: function (jqXHR, status) {
    }
  });
}

function sendRegistrarShareholderImageToServer() {
  var _url = "";
  var f_name_share = $('.content__block--photo.share input[type="file"]')[0].files[0].name;

  var formData = new FormData();
  if ($('.content__block--photo.share').data("forself")) {
    _url = "/Admin/Settings/LoadShareholderRelationsDepEmplPhoto";
    formData.append('sharePhotoFile', $('.content__block--photo.share input[type="file"]')[0].files[0]);
    formData.append('sharePhotoName', f_name_share);
  }

  formData.append('registrarId', $('#EntityID').val());
  $.ajax({
    url: _url,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      $('#photo-share').text(f_name_share);
      $('#photo-share-name').val(f_name_share);
      $('#delete-photo-share').show();
    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
      },
    complete: function (jqXHR, status) {
    }
  });
}

function sendRegistrarAvatarToServer() {
  var _url = "";
  var f_name_reg = $('.content__block--photo.registrar input[type="file"]')[0].files[0].name;

  var formData = new FormData();
  if ($('.content__block--photo.registrar').data("forself")) {
    _url = "/Admin/Settings/LoadRegistrarAvatar";
    formData.append('avatarPhotoFile', $('.content__block--photo.registrar input[type="file"]')[0].files[0]);
    formData.append('avatarName', f_name_reg);
  }
  formData.append('registrarId', $('#EntityID').val());
  $.ajax({
    url: _url,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function () {
      $('#avatar-reg').text(f_name_reg);
      $('#avatar-name').val(f_name_reg);
      $('#delete-avatar').show();
    },
      error: function (err) {
          if (err.status === 401) {
              location.href='/User/SignIn';
          }
          else {
              alert('Ошибка! Ответ сервера: ' + err.status);
          }
      },
    complete: function (jqXHR, status) {
    }
  });
}
