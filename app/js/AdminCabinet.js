var Representatives = []; // Выбранные представители
var RegistryPersonRepresentatives = []; //Добавленные прдеставители по физикам
var RegistryLegalRepresentatives = []; //Добавленные прдеставители по юрикам

// проверяем если в реестре счета для данного пользователя
function FindAccountsForUser() {
    name = $(".user_name").val();
    docnum = $(".user_doc").val();
    $.post("/admin/user/FindsAccountsForUser", { Name: name, DocNum: docnum }, function (data) {
        $(".user_name").removeClass("validate-input__true");
        $(".user_doc").removeClass("validate-input__true");
        $(".user_name").removeClass("validate-input__false");
        $(".user_doc").removeClass("validate-input__false");

        if (data) {
            $(".user_name").addClass("validate-input__true");
            $(".user_doc").addClass("validate-input__true");
        }
        else {
            $(".user_name").addClass("validate-input__false");
            $(".user_doc").addClass("validate-input__false");
        }
    });
    FindsProbableRepresentativesForUser(name, docnum);
    IsUserRepresentative(name, docnum);
}

function ChangePassword() {
    $.post("/user/ChangePassword", $("#ChangePasswordForm").serialize(), function (data) {
        if (data) {
            $(".modal-change-password-success").closest('.overlay').show();
        }
        else {
            $(".modal-change-password-fail").closest('.overlay').show();
        }
    });
}

// Ищем возможных представителей для пользователя
function FindsProbableRepresentativesForUser(Name, DocNum) {
    $.post("/admin/user/FindsProbableRepresentativesForUser", { Name: Name, DocNum: DocNum },
        function (data) {
            $(".filter_wrapper").html(data);
        }).done(function () {
        $('.filter__body').mCustomScrollbar({theme: "my-theme"});
    });;
}

function IsUserRepresentative(Name, DocNum) {
    $.post("/admin/user/IsUserRepresentative", { Name: Name, DocNum: DocNum },
        function (IsRepresent) {
            if (IsRepresent) {
                $('.admin-represent').text("Показать");
            }
            else {
                $('.admin-represent').text("Нет");
            }
        });
}

// парсим страницу на предмет выбранных представителей
function GetChoosenRepresentatives() {
    Representatives = [];
    RegistryPersonRepresentatives = [];
    RegistryLegalRepresentatives = [];
    $(".filter_wrapper input:checked[data-isregistry=False]").each(function () { Representatives.push(this.id); });
    $(".filter_wrapper input:checked[data-isregistry=True][data-islegal=True]").each(function () {
        RegistryLegalRepresentatives.push({
            "lname": $(this).data("lname"), "INN": $(this).data("INN")
        })
    });
    $(".filter_wrapper input:checked[data-isregistry=True][data-islegal=False]").each(function () {
        RegistryPersonRepresentatives.push({
            "pname": $(this).data("pname"), "docnum": $(this).data("docnum")
        })
    });
}

// добавляем в массив новых представителей
function AddRegistryRepresentative() {
    var lname = $(".entity-name").val();
    var INN = $(".entity-doc").val();
    var pname = $(".individual-name").val();
    var docnum = $(".individual-doc").val();
    var rowtext;
    var htmlData;
    if ($("label.modal__tab[data-id='entity'] input").prop("checked")) {
        rowtext = lname + ", " + INN;
        htmlData = "data-islegal=True data-lname=" + lname + " data-INN=" + INN;
    }
    if ($("label.modal__tab[data-id='individual'] input").prop("checked")) {
        rowtext = pname + ", " + docnum;
        htmlData = "data-islegal=False data-pname=" + pname + " data-docnum=" + docnum;
    }
    // Добавляем нового представителя в список выбора
    $(".filter__body table tr:last").after("\
        <tr>\
        <td>\
        <input type='checkbox' \
        data-isregistry=True "+ htmlData + " \
        'checked'>\
        <label></label>\
        <span class='filter__row-text'>"+ rowtext + "</span>\
        <div class='filter__edit-btn'>\
        <button class='ast-action-btn'><img src='~/images/icons/edit2.png' alt=''></button>\
        <button class='ast-action-btn'><img src='~/images/icons/cross.png' alt=''></button>\
        </div>\
        </td>\
        </tr>");
}

// Обновляем список представителей
function UpdateRepresentatives() {
    GetChoosenRepresentatives();
    var model = {
        UserId: $("#UserId").val(),
        Representatives: Representatives,
        RegistryLegalRepresentatives: RegistryLegalRepresentatives,
        RegistryPersonRepresentatives: RegistryPersonRepresentatives
    }

    $.ajax({
        url: "../UpdateRepresentatives",
        type: "POST",
        data: JSON.stringify(model),
        contentType: "application/json",
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
    }
    );
}

// вызываем функцию добавления пользователя
function AddUser() {
    if ($("#validate-form").valid()) {
        GetChoosenRepresentatives();
        var model = {
            UserName: $("#UserName").val(),
            NewPassword: $("#NewPassword").val(),
            Email: $("#Email").val(),
            Role: $("#Role").val(),
            FullName: $("#FullName").val(),
            DocumentNumber: $("#DocumentNumber").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            TwoFactorEnabled: $("#identification-new").prop("checked"),
            Representatives: Representatives,
            RegistryLegalRepresentatives: RegistryLegalRepresentatives,
            RegistryPersonRepresentatives: RegistryPersonRepresentatives
        }

        $.ajax({
            url: "AddUser",
            type: "POST",
            data: JSON.stringify(model),
            success: function (linkToNewUser) { window.location.replace(linkToNewUser) },
            error: ShowModalResultFail,
            contentType: "application/json"
        });
    }
}

function ShowModalResultSuccess() {
    $('.modal-add-user-result-succes').closest('.overlay').show();
};

function ShowModalResultFail() {
    $('.modal-add-user-result-fail').closest('.overlay').show();
};

function ShowModalAddUserCancel() {
    $('.modal-add-user-cancel').closest('.overlay').show();
};

function SelectIssuer() {
    $('#selectedIssuerId').attr('value', $('.filter__body .activeTr').data('issuerid'));
}

function SelectAccount() {
    $('#selectedAccountId').attr('value', $('.filter__body .activeTr').data('accountid'));
}


$(function () {
    //табы для переключения между юр. лицом и физ. лицом во всплывающем окне
    $('.filter__block').each(function (i) {
        if (i !== 0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.modal__tab', function () {
        var tabId = $(this).attr('data-id');
        $(this).siblings('.modal__tab').removeClass('modal__tab--active');
        $(this).addClass('modal__tab--active');
        $('.filter__block').hide(0);
        $('.filter__block[data-id=' + tabId + ']').show();
    });

    //показать или скрыть полей "номер документа" и "представители" при выборе роли владельца
    $(document).on('click', '.admin-user-role', function () {
        if ($(this).val() === 'SHAREHOLDER' || $(this).val() === 'ISSUER') {
            $('.owner-row').slideDown("slow");
        } else {
            $('.owner-row').slideUp("slow");
        }
    });

    //клик по кнопке "Добавить" во всплывающем окне представителей
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.closest('.overlay').show()
    });

    //клик на поле ввода представителей - открывает окно представителей
    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').closest('.overlay').show()
    });

    //клик на кнопку "Выбрать" в окне представителей
    $(document).on('click', '.represent-filter .submit', function () {
        var users = [];
        var IsAnyRep = $(".filter_wrapper input").length > 0;
        $(".filter_wrapper input:checked").each(function () {
            if ($(this).data("lname")) {
                users.push($(this).data("lname"));
            };
            if ($(this).data("pname")) {
                users.push($(this).data("pname"))
            };
        });

        if (users.length > 0) {
            $('.admin-represent').text(users.join(", "));
        }
        else {
            if (IsAnyRep) {
                $('.admin-represent').text('Показать');
            }
            else
            {
                $('.admin-represent').text('Нет');
            }
        }
    });

    // закрываем окошко с представителями
    $(document).on('click', '.represent-modal-filter button', function () {
        $('.represent-modal-filter').hide();
    });


    $(document).on('click', '.represent-filter label, .filter__row-text', function () {
        var checkbox = $(this).closest('tr').find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });


    $(document).on('click', '#user-cabinet-new .search > span', function () {
        $('#user-cabinet-new .t-search').val('');
        $('#user-cabinet-new .filter').hide();
        $(this).remove();
    });

    // модалка при удалении группы
    $(document).on('click', '.groups-list .group-delete', function () {
        $('#groupToDelete').attr('value', $(this).data('group-id'));
        $('.modal-delete').closest('.overlay').show();
    });

    // модалка при удалении пользователя
    $(document).on('click', '.users-list .user-delete', function () {
        $('#userToDelete').attr("value", $(this).data('userid'));
        $('.modal-delete-user').closest('.overlay').show();
    });

    // клик в меню удалить группу
    $(document).on('click', 'a:contains("Удалить")', function (event) {
        event.preventDefault();
        // немного костыльно, получаем идишинк из ссылки
        var url = $(this).attr("href");
        var id = url.substring(url.lastIndexOf('/') + 1);
        $('#groupToDelete').attr('value', id);
        $('.modal-delete').closest('.overlay').show();
    });

    $(document).on('click', '.groups-by-user .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('input[name="selectedGroup"]').val($('.activeTr').text());
        }
    });
});
