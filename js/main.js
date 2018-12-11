$(function () {

    function admInputFilter(input, table, n) {
        // Declare variables
        var filter, tr;
        filter = input.val().toUpperCase();
        tr = table.find("tbody tr");
        var td;

        // Loop through all table rows, and hide those who don't match the search query
        for (var i = 0; i < tr.length; i++) {

            var tdText = '';
            if (n === undefined) {
                td = tr[i].querySelectorAll("td");
                for(var j=0; j<td.length; j++) {
                    tdText = tdText + td[j].innerText
                }
                if (td) {
                    if (tdText.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            } else {
                td = tr[i].querySelectorAll("td")[n];

                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    $(document).on('click', '.t-search', function () {
        var filter = $(this).closest('.content__section').find('.filter');
        if(filter.length > 0) {
            filter.removeAttr('style');
            filter.show();
            var parent = filter.closest('.content__section')[0].getBoundingClientRect().bottom;
            var filterBottom = filter[0].getBoundingClientRect().bottom;
            if (filterBottom > parent) {
                filter.css({
                    'top': 'auto',
                    'bottom': '35px'
                })
            }
        }
    });

    $(document).on('keyup', '.t-search', function () {
        var filter = $(this).closest('.content__section').find('.filter');
        var filterTable = filter.find('table');
        var table = $(this).closest('.content__section').find('.table');
        if (filter.length > 0) {
            admInputFilter($(this), filterTable)
        } else {
            admInputFilter($(this), table)
        }
    });

    /*-------usersList------*/
    $(document).on('keyup', '.filter--input', function () {
        admInputFilter($(this), $('.table'));
    });


    /*search user for new account*/
    $(document).on('keyup', '#user-cabinet-new .t-search', function (event) {
        $('#user-cabinet-new .filter tr').find('input[type="checkbox"]').prop('checked', false);
        if(event.keyCode === 13 && $(this).val().length > 0 || event.keyCode === 8) {
            $('#user-cabinet-new .filter').fadeIn('fast');
            admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
        }
        admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
    });




    /*-----------------------------------------------------------------------------------*/
});



$(function() {

    var userList = document.querySelector(".users-list");
    var groupsList = document.querySelector(".group-users-table");
    var table = document.querySelector(".table");
    var registersList = document.querySelector(".group-registers-table");
    var billsList = document.querySelector(".group-bills-table");


    function sortTable(tbl, n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = tbl;
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.querySelectorAll("tbody tr");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 0; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].querySelectorAll("td")[n];
                y = rows[i + 1].querySelectorAll("td")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }


    /*------------users-list--------------*/
    $(document).on('click', '.users-list th.u-login', function () {
        sortTable(userList, 0);
    });
    $(document).on('click', '.users-list th.u-rol', function () {
        sortTable(userList, 1);
    });
    $(document).on('click', '.users-list th.u-name', function () {
        sortTable(userList, 2);
    });
    $(document).on('click', '.users-list th.u-status', function () {
        sortTable(userList, 3);
    });
    $(document).on('click', '.users-list th.u-visited', function () {
        sortTable(userList, 4);
    });
    $(document).on('click', '.users-list th.u-online-status', function () {
        sortTable(userList, 5);
    });
    /*------------!users-list--------------*/



    /*------------groupsList--------------*/
    $(document).on('click', '.group-users-table .th-number', function () {
        sortTable(groupsList, 0);
    });
    $(document).on('click', '.group-users-table .th-name', function () {
        sortTable(groupsList, 1);
    });
    /*------------!groupsList--------------*/


    /*------------table--------------*/
    $(document).on('click', '.table .t-sort', function () {
        sortTable(table, 0);
    });
    /*------------!table--------------*/


    /*------------registersList--------------*/
    $(document).on('click', '.group-registers-table .th-number', function () {
        sortTable(registersList, 0);
    });
    $(document).on('click', '.group-registers-table .th-name', function () {
        sortTable(registersList, 1);
    });

    $(document).on('click', '.group-registers-table .th-number', function () {
        sortTable(registersList, 0);
    });
    $(document).on('click', '.group-registers-table .th-name', function () {
        sortTable(registersList, 1);
    });
    /*------------!registersList--------------*/



    /*------------billsList--------------*/
    $(document).on('click', '.group-bills-table .th-number', function () {
        sortTable(billsList, 0);
    });
    $(document).on('click', '.group-bills-table .th-name', function () {
        sortTable(billsList, 1);
    });
    /*------------!billsList--------------*/


});
$(function () {
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show();
    });

    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show();
    });

    // Очистка модального окна по клику на кнопку отмена, при создании пользователя в роли Админа. "Представляет"
    $(document).on('click', '.clear-popup', function () {
        var elTable = $('.cancel-clear-table');
        elTable.html('<tr></tr>');
    });


    $(document).on('click', '.input-check-wrap', function () {
        var submitNotDisabled = $('.submit-checked');
        if($(this).find('input').is(':checked')){
            submitNotDisabled.removeClass('disabled');
        }
        else {
            submitNotDisabled.addClass('disabled');
        }
    });


});
// клик в меню удалить группу
function DeleteGroup(e, groupId) {
    e.preventDefault();
    $('#groupToDelete').attr('value', groupId);
    $('.overlay').has('.modal-group-delete').show();
}

// клик в меню удалить группу
function ArchiveUser(e, userId) {
    e.preventDefault();
    $('#userToDelete').attr('value', userId);
    $('.overlay').has('.modal-user-delete').show();
}

// проверяем если в реестре счета для данного пользователя
function FindAccountsForUser() {
    $(".user_name").valid();
    $(".user_doc").valid();
    if (!($(".user_doc").valid() && $(".user_name").valid())) {
        return;
    }
    name = $(".user_name").val();
    docnum = $(".user_doc").val();
    $.post("/admin/user/FindsAccountsForUser", {Name: name, DocNum: docnum}, function (data) {
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
    if ($("[name=TwoFactorEnabled]").val() === "True" && $("#SmsToken").val() === false) {
        $.post("/profile/SendSmsForChangePassword");
        $(".string").has("#SmsToken").slideDown("slow");
        return;
    }

    var model = {
        OldPassword: $("#OldPassword").val(),
        NewPassword: $("#NewPassword").val(),
        NewPasswordRepeat: $("#NewPasswordRepeat").val(),
        SmsToken: $("#SmsToken").val()
    };

    $.ajax({
        method: "POST",
        url: "/profile/ChangePassword",
        data: JSON.stringify(model),
        contentType: "application/json",
        success: function () {
            $(".modal-change-password-success").closest('.overlay').show();
        },
        error: function () {
            $(".modal-change-password-fail").closest('.overlay').show();
        }
    });
}

// Ищем возможных представителей для пользователя
function FindsProbableRepresentativesForUser(Name, DocNum) {
    $.post("/admin/user/FindsProbableRepresentativesForUser", {Name: Name, DocNum: DocNum},
        function (data) {
            $(".filter_wrapper").html(data);
        }).done(function () {
        $('.filter__body').mCustomScrollbar({theme: "my-theme"});
    });
}

function IsUserRepresentative(Name, DocNum) {
    $.post("/admin/user/IsUserRepresentative", {Name: Name, DocNum: DocNum},
        function (IsRepresent) {
            if (IsRepresent) {
                $('.admin-represent').text("Показать");
            }
            else {
                $('.admin-represent').text("Нет");
            }
        });
}


// Выбранные представители
function GetChoosenRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=False]")
        .each(function () {
            result.push($(this).data("account-id"));
        });

    return result;
}

//Добавленные представители по физикам
function GetRegistryPersonRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=True][data-is-legal=False]")
        .each(function () {
            result.push({
                "pname": $(this).data("pname"), "docnum": $(this).data("docnum")
            });
        });

    return result;
}

//Добавленные представители по юрикам
function GetRegistryLegalRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=True][data-is-legal=True]")
        .each(function () {
            result.push({
                "lname": $(this).data("lname"), "INN": $(this).data("inn")
            })
        });

    return result;
}

// добавляем в массив новых представителей
function AddRegistryRepresentative() {
    var lname = $(".entity-name").val();
    var INN = $(".entity-doc").val();
    var pname = $(".individual-name").val();
    var docnum = $(".individual-doc").val();
    var rowtext;
    var htmlData;
    var isLegal = $("label.modal__tab[data-id='entity'] input").prop("checked");
    var isPerson = $("label.modal__tab[data-id='individual'] input").prop("checked");
    if (isLegal) {
        $(".entity-doc").valid();
        $(".entity-name").valid();
        if (!($(".entity-doc").valid() && $(".entity-name").valid())) {
            return;
        }
        rowtext = lname + ", " + INN;
        htmlData = "data-is-legal=True data-lname=" + lname + " data-inn=" + INN;
    }
    if (isPerson) {
        $(".individual-doc").valid();
        $(".individual-name").valid();
        if (!($(".individual-doc").valid() && $(".individual-name").valid())) {
            return;
        }
        rowtext = pname + ", " + docnum;
        htmlData = "data-is-legal=False data-pname=" + pname + " data-docnum=" + docnum;
    }

    // Если добавляем нового
    if ($("#edit-represntative-number").val().length === 0) {
        // Добавляем нового представителя в список выбора
        $(".filter__body table tr:last").after("\
        <tr>\
        <td>\<div class='input-check-wrap'>\
        <input type='checkbox' \
        data-is-registry=True " + htmlData + " \
        checked>\
        <label></label>\
        <span class='filter__row-text'>" + rowtext + "</span></div>\
        <div class='filter__edit-btn'>\
        <button class='ast-action-btn edit-representative'><img src='/images/icons/edit2.png' alt=''></button>\
        <button class='ast-action-btn delete-representative'><img src='/images/icons/cross.png' alt=''></button>\
        </div>\
        </td>\
        </tr>");

        $(".submit-checked").removeClass("disabled");
    }


    // Иначе редактируем существующего
    else {
        console.log($("tr"));
        console.log($("tr")[$("#edit-represntative-number").val()]);
        var rowToEdit = $("tr")[$("#edit-represntative-number").val()];
        var inputToEdit = $(rowToEdit).find("input");
        var spanToEdit = $(rowToEdit).find("span");
        if (isLegal) {
            inputToEdit.data("lname", lname);
            inputToEdit.data("INN", INN);
        }
        if (isPerson) {
            inputToEdit.data("pname", pname);
            inputToEdit.data("docnum", docnum);
        }

        spanToEdit.text(rowtext);
    }

    $("#edit-represntative-number").val('');
    $('.represent-modal-filter').hide();
}

// Обновляем список представителей
function UpdateRepresentatives() {
    $(".filter.represent-filter").hide();

    var model = {
        UserId: $("#UserId").val(),
        Representatives: GetChoosenRepresentatives(),
        RegistryLegalRepresentatives: GetRegistryLegalRepresentatives(),
        RegistryPersonRepresentatives: GetRegistryPersonRepresentatives()
    };

    if (model.UserId === undefined) {
        return;
    }

    $.ajax({
        url: "/admin/user/UpdateRepresentatives",
        type: "POST",
        data: JSON.stringify(model),
        contentType: "application/json",
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

// вызываем функцию добавления пользователя
function AddUser() {
    if ($("#validate-form").valid()) {
        var model = {
            UserName: $("#UserName").val(),
            NewPassword: $("#NewPassword").val(),
            Email: $("#Email").val(),
            Role: $("#Role").val(),
            FullName: $("#FullName").val(),
            DocumentNumber: $("#DocumentNumber").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            TwoFactorEnabled: $("#identification-new").prop("checked"),
            Representatives: GetChoosenRepresentatives(),
            RegistryLegalRepresentatives: GetRegistryLegalRepresentatives(),
            RegistryPersonRepresentatives: GetRegistryPersonRepresentatives()
        };

        $.ajax({
            url: "AddUser",
            type: "POST",
            data: JSON.stringify(model),
            success: function (linkToNewUser) {
                window.location.replace(linkToNewUser)
            },
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

function resestPassword() {
    var model = {
        NewPassword: $('input[name="NewPassword"]').val(),
        NewPasswordRepeat: $('input[name="NewPassword"]').val(),
        UserId: $('input[name="UserId"]').val()
    };
    $.ajax({
        url: "ResetPassword",
        type: "POST",
        data: JSON.stringify(model),
        success: function () {
            $('.modal-success').closest('.overlay').show()
        },
        error: function () {
            $('.modal-fail').closest('.overlay').show()
        },
        contentType: "application/json"
    });
}

function generateLogin(fullName) {
    // fullName = transliterate(fullName);
    var structName = fullName.trim().split(" ");
    var login;
    if (structName.length > 1) {
        login = structName[0][0] + structName[1][0] + structName[2][0];
    }
    else {
        login = structName[0];
    }
    var number = "";
    var notValid = true;
    while (notValid) {
        login = login + number;
        // number = number + 1;
        $.ajax({
            url: "CheckUserName",
            method: "GET",
            data: "username=" + login,
            success: function (response) {
                if (response) {
                    notValid = false;
                }
            },
            async: false,
        });
    }
    return login;
}

$(function () {
    //табы для переключения между юр. лицом и физ. лицом во всплывающем окне
    $('.filter__block').each(function (i) {
        if (i !== 0) {
            $(this).hide(0);
        }
    });

    $("#ResetPasswordForm").each(function () {
        $(this).data("validator").settings.submitHandler = resestPassword;
    });

    // генерация пароля при создании пользователя
    $("#user-cabinet-new #NewPassword").each(function () {
        $(this).val(Math.random().toString(36).substr(2, 8));
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
        insideModal.closest('.overlay').show();
    });

    //клик на поле ввода представителей - открывает окно представителей
    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').closest('.overlay').show();
    });

    //клик на кнопку "Выбрать" в окне представителей
    $(document).on('click', '.represent-filter .submit', function () {

        var users = [];
        var IsAnyRep = $(".filter_wrapper input").length > 0;
        $(".filter_wrapper input:checked").each(function () {
            if ($(this).data("lname")) {
                users.push($(this).data("lname") + " " + $(this).data("inn"));
            }
            if ($(this).data("pname")) {
                users.push($(this).data("pname") + " " + $(this).data("docnum"));
            }
        });

        if (users.length > 0) {
            $('.admin-represent').text(users.join(", "));
        }
        else {
            if (IsAnyRep) {
                $('.admin-represent').text('Показать');
            }
            else {
                $('.admin-represent').text('Нет');
            }
        }
        // Отправляем ajax запрос
        UpdateRepresentatives();
    });

    // закрываем окошко с представителями
    $(document).on('click', '.represent-modal-filter button.cancel', function () {
        $("#edit-representative-number").val('');
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
        $('.overlay').has('.modal-group-delete').show();
    });

    // модалка при удалении пользователя
    $(document).on('click', '.users-list .user-delete', function () {
        $('#userToDelete').attr("value", $(this).data('userid'));
        $('.overlay').has('.modal-user-delete').show();
    });

    $(document).on('click', '.groups-by-user .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('input[name="selectedGroup"]').val($('.activeTr').text());
        }
    });

    // генерация логина
    $(document).on('blur', '.user-cabinet-new input[name=FullName]', function () {
        if (!$('#UserName').val()) {
            $('#UserName').val(generateLogin($('input[name="FullName"]').val()));
        }
    });

    $(document).on('click', '.delete-representative', function () {
        $("tr").has(this).remove();
    });

    $(document).on('click', '.edit-representative', function () {
        var input = $(this).closest("tr").children("td").children("input");
        $("#edit-represntative-number").val($("tr").index($(this).closest("tr")));
        console.log($("tr").index($(this).closest("tr")));
        console.log(this);

        console.log(input);
        console.log(input.data("is-legal") === "True");
        console.log($("input.entity-name"));
        if (input.data("is-legal") === "True") {
            $("input.entity-name").val(input.data("lname"));
            $("input.entity-doc").val(input.data("inn"));
        }

        if (input.data("is-legal") === "False") {
            $("input.individual-doc").val(input.data("docnum"));
            $("input.individual-name").val(input.data("pname"));
        }

        $(".filter.represent-modal-filter").show();
    });

    $(document).on("change", "#select-personal-manager-for-issuer", function () {
        var manager = $("#select-personal-manager-for-issuer").val();
        var emitent = $("#emitent-id").val();
        var model = { manager: manager, issuerId: emitent };
        $.ajax({
            url: "/admin/issuer/AssignManagerToIssuer",
            type: "POST",
            data: model
        });
    });

    $(document).on("click", ".groups-by-user .t-search", function () {
        if ($(".filter table tr").length === 0) {
            $(".groups-by-user button.submit").hide();
        }
        else {
            $(".groups-by-user button.submit").show();
        }
    });
});

$(function () {

    // ajax для кнопок "Подписать и отправить"
    $(document).on('click', '.voting-send-ajax', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = $(this).closest('.content__block');
        // Данные для отправки формы преобразуем в массив
        var formData = parent.find('form').serializeArray();
        var url = parent.find('form').attr('action').toString();
        var customUrl = url.replace(/SignBulletinAjax/g, 'SignBulletin');
        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            success: function (data) {
                parent.html(data)
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        }).done(function () {
            var regAccId = $('.register-account-id-num').val();
            $.ajax({
                url: '/Helper/GetVoteStatus/' + regAccId,
                type: 'get',
                success: function (data) {
                    $('.status-voiting').html(data);
                },
                error: function (err) {
                    if (err.status === 401) {
                        location.href='/User/SignIn';
                    }
                    else {
                        alert('Ошибка! Ответ сервера: ' + err.status);
                    }
                }
            })
        })
        // $.ajax({
        //     url:  customUrl,
        //     type: 'post',
        //     success: function (data) {
        //         var block = $('<div>');
        //         block.html(data);
        //         $('.status-voiting').html(block.find('.status-voiting').html());
        //     },
        //     error: function (err) { 
        //         console.error(err)
        //     }
        // })
    });

    $(document).on('click', '.voting-actions__choice--item', function () {
        var parent = $(this).closest('.voting-actions');
        var siblingsVotingActions = parent.siblings('.voting-actions');
        var inputs = parent.find('input[type="radio"]');
        var votingFalse = parent.find('.if-voting-false');
        var votingTrue = parent.find('.if-voting-true');
        var thisRadio = $(this).find('input[type="radio"]');
        var contentBlock = $(this).closest('.content__block');
        var thisClassList = $(this).attr('class').split(' ');
        var editedThisClassList = '';
        contentBlock.find('.help-hidden-block').removeClass('help-hidden-block--is-visible');

        // Берем классы нажатой кнопки, и переводим их в строку, по которой будет удобно искать кнопку в соседней строке
        for (var i=0; i<thisClassList.length; i++) {
            editedThisClassList += '.' + thisClassList[i].trim();
        }

        if (parent.hasClass('voting-actions-disable')) {
            return false
        }
        if (!contentBlock.hasClass('modal-is-shown')) {
            contentBlock.find('.modal-first-click').closest('.overlay').show().focus();
            contentBlock.find('.modal-first-click').find('button').focus();
            contentBlock.addClass('modal-is-shown');
            contentBlock.find('.voting-send').show();
        }
        // Запрещаем клик по кнопке, которая уже нажата в соседней строке
        if (siblingsVotingActions.find(editedThisClassList).hasClass('voting-selected')) {
            return false
        }
        if ($(this).hasClass('voting-selected')) {
            $(this).removeClass('voting-selected');
            thisRadio.removeAttr('checked');
            votingFalse.show();
            votingTrue.hide();
            parent.find('.cumulative-voting__sum').text('0');
            parent.find('.votes-cast').val(0);
            return false
        } else if (parent.find('.voting-selected').length > 0) {
            parent.find('.voting-actions__choice--item').removeClass('voting-selected');
            parent.find('.votes-cast').focus();
            $(this).addClass('voting-selected');
            inputs.each(function () {
                $(this).removeAttr('checked')
            });
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        } else {
            parent.find('.votes-cast').focus();
            $(this).addClass('voting-selected');
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        }
    });









});

$(function () {
    if($('.calendar').length > 0){
        function Calendar2(id, year, month) {
            var Dlast = new Date(year,month+1,0).getDate(),
                D = new Date(year,month,Dlast),
                DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
                DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
                calendar = '<tr>',
                Vmonth=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
            if (DNfirst != 0) {
                for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
            }else{
                for(var  j = 0; j < 6; j++) calendar += '<td>';
            }
            for(var  k = 1; k <= Dlast; k++) {
                if (k == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                    calendar += '<td class="today">' + k;
                }else{
                    calendar += '<td>' + k;
                }
                if (new Date(D.getFullYear(),D.getMonth(),k).getDay() == 0) {
                    calendar += '<tr>';
                }
            }
            for(var  n = DNlast; n < 7; n++) calendar += '<td>&nbsp;';
            document.querySelector('#'+id+' tbody').innerHTML = calendar;
            document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = Vmonth[D.getMonth()] +' '+ D.getFullYear();
            document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
        }
        Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
        }
// переключатель плюс месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
        }
    }

});


$(function() {




    // $(document).on('keyup', '.cumulative-voting__input', function () {
    //     onKeyUpCumulativeInput($(this))
    // });

    // function onChangeCumulativeInput(_this) {
    //     var parent = _this.closest('.cumulative-voting__block');
    //     var inputs = parent.find('.cumulative-voting__input');
    //     var total = parent.find('.cumulative-voting__total').val().replace(',', '.');
    //     var sumElement = parent.find('.cumulative-voting__sum');
    //     var sum = 0;
    //
    //     inputs.each(function () {
    //         sum += +($(this).attr('data-converted-fraction'))
    //     });
    //
    //     if (sum > total) {
    //         sumElement.addClass('red');
    //         parent.find('.cumulative-voting-warning').remove();
    //         if(+(_this.val()) > 0) {
    //             parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
    //         }
    //     } else {
    //         parent.find('.cumulative-voting-warning').remove();
    //         sumElement.removeClass('red');
    //     }
    //
    //     sumElement.text(sum);
    // }

    // $(document).on('blur', '.cumulative-voting__input', function () {
    //     onChangeCumulativeInput($(this))
    // });


    // $(document).on('click', '.voting-actions__choice--item', function () {
    //     var parent = $(this).closest('.cumulative-voting__block');
    //     var inputs = parent.find('.cumulative-voting__input');
    //     if (inputs.length > 0) {
    //         inputs.each(function () {
    //             $(this).val('')
    //         });
    //         parent.find('.cumulative-voting-warning').remove();
    //         parent.find('.cumulative-voting__sum').removeClass('red').text(0);
    //     }
    // });

    // $(document).on('click', '.cumulative-voting__block .voting-actions__choice--item', function () {
    //     var parent = $(this).closest('.cumulative-voting__block');
    //     if ($(this).hasClass('voting-false') || $(this).hasClass('voting-abstained')) {
    //         var total = parent.find('.cumulative-voting__total').val();
    //         parent.find('.noborder').attr('readonly', '').css({
    //             pointerEvents: 'none'
    //         });
    //         $('.cumulative-voting__sum').text(total);
    //     } else {
    //         parent.find('.noborder').removeAttr('readonly').css({
    //             pointerEvents: 'auto'
    //         });
    //     }
    // })

    // $(document).on('click', '.part-of-voices-btn', function () {
    //     var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
    //     var members = inputInfo.data('amount');
    //     var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
    //     var input = $(this).closest('.string').find('.cumulative-voting__input');
    //     input.val(Math.floor(voices / members));
    //     onKeyUpCumulativeInput(input);
    //     onChangeCumulativeInput(input);
    // });
    // $(document).on('click', '.remaining-voices-btn', function () {
    //     var votingBlock = $(this).closest('.cumulative-voting__block');
    //     var allInputs = votingBlock.find('.cumulative-voting__input');
    //     var sum = 0;
    //     var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
    //     var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
    //     var input = $(this).closest('.string').find('.cumulative-voting__input');
    //     input.val('');
    //     allInputs.each(function () {
    //         sum += +($(this).val());
    //     });
    //     input.val(voices - sum);
    //     // onKeyUpCumulativeInput(input);
    //     // onChangeCumulativeInput(input);
    // })

});

var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
document.addEventListener("click", closeAllSelect);
function disableBtn() {
    $('.main__disable-btn').removeAttr('disabled')
}
//Валидация вводимых символов
function isAllowedKeyCode(key) {
    // Разрешенные клавиши для ввода дроби
    if ((+key >= 0 && +key <= 9) || key === '/' || key === ' ' || key === 'Backspace' || key === 'Delete' || key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Shift' || key === 'Tab') {
        return true
    } else {
        return false
    }
}

function validationFraction(key) {
    // Разрешенные клавиши для ввода дроби
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Shift'  || key === 'Esc' || key === 'Tab') {
        return true
    } else {
        return false
    }
}

//Умножение
function multiplicationFractions(val1, val2) {
    return $.ajax({
        url: '/FractionCalculator/Multiplication',
        type: 'get',
        data: {
            value1: val1,
            value2: val2
        },
        dataType: 'json',
        success: function (html) {},
        error: function (err) {
            alert('Ошибка! Ответ сервера: ' + err.status);
        }
    })
}
function additionFraction(stringOfFractions) {
    var stringOfFraction = stringOfFractions.replace(/\s+/g, '');

    return $.ajax({
        url: '/FractionCalculator/SumOfFractions',
        type: 'get',
        data: {
            value: stringOfFraction
        },
        dataType: 'json',
        success: function (data) {
        },
        error: function (err) {
            alert('Ошибка! Ответ сервера: ' + err.status);
        }
    })
}
function fractionMinusArrayFraction(array, total) {
    var stringForSend = array.join(';');
    var totalVoices = total.replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
    return $.ajax({
        url: '/FractionCalculator/FractionMinusListOfFraction',
        type: 'get',
        data: {
            value1: totalVoices,
            listOfFraction: stringForSend
        },
        dataType: 'json',
        success: function (html) {},
        error: function (err) {
            alert('Ошибка! Ответ сервера: ' + err.status);
        }
    })
}
function fractionMinusFraction(votingVoicesLeft, votesCastInputHide){
    var value1 = votingVoicesLeft.replace(/\u00a0/g, '');
    var value2 = votesCastInputHide.replace(/\u00a0/g, '');
    return $.ajax({
        url: '/FractionCalculator/Subtract',
        type: 'get',
        data: {
            value1:value1,
            value2:value2
        },
        dataType: 'json',
        success: function (html) {
            // var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
            // if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
            //     votesCastSecond.val('Ошибка');
            //     voisesButtonClickEmit(_this).unclick() // отжимаем нажатую кнопку при ошибке
            // } else {
            //     votesCastSecond.val(request);
            //     voisesButtonClickEmit(_this); // нажимаем кнопку
            //     calculateCandidatesYesVotes(_this)
            // }
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
// Возвращает обьект с полем result:"true" если value не больше чем total, иначе false
function comparingIsLager(total, value) {
    var total = total.replace(/\s+/g, '');
    var value = value.replace(/\s+/g, '');
    return $.ajax({
        url: '/FractionCalculator/ComparingIsLager',
        type: 'get',
        data: {
            value1: total,
            value2: value
        },
        dataType: 'json',
        success: function (data) {
        },
        error: function (err) {
            if (err.status === 401) {
                location.href='/User/SignIn';
            }
            else {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        }
    })
}

$(function () {
    var con = new Condition();
    if (con) {
        con.init({
            valAttrName: 'data-scv',
            cookieName: '___rrr___',
            customLoad: function (item, name, value, type) {
                if (type === 'block') {
                    if (parseInt(value) === 1) {
                        item.classList.add('block');

                    }
                }
                if (type === 'input') {
                    item.value = value;
                }
                if (type === 'checkbox') {
                    if (parseInt(value) === 1) {
                        $(item).closest('.voting-actions__choice--item').addClass('voting-selected');
                        item.setAttribute('checked', 'checked');
                    }
                }
            }

        });
    }


    if (con) {
        con.runLoad();

        $(document).on('click', ".voting-actions__choice--item", function () {
            var val = parseInt($(this).find('input').attr('data-scv'));
            var inputs = $(this).closest('.voting-actions__choice').find('input');
            if (val === 0) {
                inputs.each(function () {
                    $(this).attr('data-scv', 0);
                });
                $(this).find('input').attr('data-scv', 1)
            }
            else {
                $(this).find('input').attr('data-scv', 0);
            }
            con.runSave();
        });
        $(document).on('keyup', '.votes-cast', function () {
            con.runSave();
        });
        $(document).on('click', '.part-of-voices-btn', function () {
            con.runSave();
        });
        $(document).on('keyup', '.cumulative-voting__input', function () {
            con.runSave();
        });
        // $('.ch').on('click', function (e) {
        //     var val = parseInt($(this).attr('data-scv'));
        //     if (val === 0) {
        //         $(this).attr('data-scv', 1)
        //     }
        //     else {
        //         $(this).attr('data-scv', 0);
        //     }
        //     con.runSave();
        // });
    }


    // Автоматическое нажатие кнопок голосования при вводе в инпут
    function voisesButtonClickEmit(_this) {
        var votingActions = _this.closest('.voting-actions');
        var siblingVotingAction = votingActions.siblings('.voting-actions');
        var buttons = votingActions.find('.voting-actions__choice--item');
        var btnTrue = votingActions.find('.voting-true');
        var btnFalse = votingActions.find('.voting-false');

        // Если не нажата ни одна кнопка
        if (!buttons.hasClass('voting-selected')) {
            var siblingVotingActionButtonSelected = siblingVotingAction.find('.voting-actions__choice--item.voting-selected');
            if (siblingVotingActionButtonSelected.length > 0) {
                if (siblingVotingActionButtonSelected.hasClass('voting-true')) {
                    btnFalse.click()
                } else {
                    btnTrue.click()
                }
            } else {
                btnTrue.click()
            }
        }
        this.unclick = function () {
            //если кнопка нажата - отжимаем
            if (buttons.hasClass('voting-selected')) {
                votingActions.find('.voting-selected').click()
            }
        };
        return this;
    }







    function calculateCandidatesYesVotes(_this) {
        var parent = _this.closest('.voting__block');
        var votingActions = _this.closest('.voting-actions');
        var votingVoicesTotal = parent.find('.votingVoicesTotal').val().replace(/\u00a0/g, '');
        var amountCandidates = _this.closest('.candidate-question').find('.dataCumulativeInput').data('amount-candidates');
        var candidatesList = _this.closest('.candidatesList');
        var arrOfInputsYes = candidatesList.find('.introducedVotes');
        var arrOfInputsYesVal = [];

        if (!votingActions.hasClass('voting-actions-splitted')) {
            votingActions.find('.introducedVotes').val(votingVoicesTotal);
        } else {
            votingActions.find('.introducedVotes').val(votingActions.find('.votes-cast').val());
        }

        if (!votingActions.find('.voting-selected.voting-true').length > 0) {
            votingActions.find('.introducedVotes').val(0);
        }
        arrOfInputsYes.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsYesVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });
        multiplicationFractions(votingVoicesTotal, amountCandidates).done(function (totalVoisesReq) {
            var totalVoises = totalVoisesReq.result.replace(/\u00a0/g, '');
            additionFraction(arrOfInputsYesVal.join(';')).done(function (e) {
                // Складываем дроби, и сравниваем с "Голосов всего"
                var sum = e.result.replace(/\u00a0/g, '');
                comparingIsLager(totalVoises, sum).done(function (data) {
                    if (data.result === 'false') {
                        candidatesList.siblings('.cumulative-voting-warning__amount-yes-voting').remove();
                        candidatesList.before('<span class="cumulative-voting-warning__amount-yes-voting">Превышено количество голосов ЗА. Голосование недействительно</span>')
                    } else if (data.result === 'true') {
                        candidatesList.siblings('.cumulative-voting-warning__amount-yes-voting').remove();
                    }
                })
            })
        });
    }
    var _changeInterval = null;
    // Простое разделенное голосование
    // $(document).on('click', '.voting-send', function () {
    //
    // });
    $(document).on('keydown', '.votes-cast', function(e) {
        voisesButtonClickEmit($(this));
        var remainingBtn = $(this).closest('.voting__block').find('.remainingVoicesBtn');
        remainingBtn.show();
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('keyup', '.votes-cast', function() {

        var _this = $(this);
        var parent = $(this).closest('.voting__block');
        var votingVoicesTotal = parent.find('.votingVoicesTotal').val().replace(/\u00a0/g, '');

        // Складываем введенные значения в разделенные голоса
        var arrOfInputs = parent.find('.votes-cast');
        var arrOfInputsVal = [];

        // wait untill user type in something
        // Don't let call setInterval - clear it, user is still typing
        clearInterval(_changeInterval);
        _changeInterval = setInterval(function() {
            arrOfInputs.each(function () {
                // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
                if ($(this).val().trim() === '') {
                    $(this).val(0)
                }
                arrOfInputsVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
            });

            additionFraction(arrOfInputsVal.join(';')).done(function (e) {
                // Складываем дроби, и сравниваем с "Голосов всего"
                var sum = e.result.replace(/\u00a0/g, '');
                comparingIsLager(votingVoicesTotal, sum).done(function (data) {
                    if (data.result === 'true') {
                        _this.closest('.question').find('.cumulative-voting-warning').remove()
                    } else {
                        _this.closest('.question').find('.cumulative-voting-warning').remove();
                        _this.closest('.voting__block').before('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                    }
                })
            });

            // Складываем введенные значения голосов ЗА
            calculateCandidatesYesVotes(_this);
            clearInterval(_changeInterval)
        }, 2000);

    });
    $(document).on('click', '.remainingVoicesBtn', function () {
        // Вычитание
        var parent = $(this).closest('.voting__block');
        var votesCastFirst = parent.find('.votesCastFirst').val(); // Значение первого инпута в обыкновенном голосовании
        var votesCastSecond = parent.find('.votesCastSecond'); // Значение второго инпута в обыкновенном голосовании
        var votingVoicesTotal = parent.find('.votingVoicesTotal').val().replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела)
        var _this = $(this);
        $.ajax({
            url: '/FractionCalculator/Subtract',
            type: 'get',
            data: {
                value1: votingVoicesTotal,
                value2: votesCastFirst
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    votesCastSecond.val('Ошибка');
                    voisesButtonClickEmit(_this).unclick() // отжимаем нажатую кнопку при ошибке
                } else {
                    votesCastSecond.val(request);
                    voisesButtonClickEmit(_this); // нажимаем кнопку
                    calculateCandidatesYesVotes(_this)
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
        })
        con.runSave();
    });
    $(document).on('click', '.candidate-question .voting-actions__choice--item', function () {
        calculateCandidatesYesVotes($(this))
    });
    $(document).on('click', '.splitVoises', function (event) {
        var _this = $(this);
        var Div = $("<div class='testDiv'></div>");
        var parent = _this.parents('.question');
        var question;
        var questionId = parent.attr('data-id');
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href').toString(),
            type: 'get',
            success: function (html) {
                Div.html(html);
                question = Div.find('.question[data-id=' + questionId + ']');
                _this = question.find('.splitVoises');
                parent.html(question.html())
            }
        }).done(function () {
            // if (_this.closest('.candidatesList').length > 0) {
            //     calculateCandidatesYesVotes(_this)
            // }
        })
    });


    // Срабатываение кнопки кумулятивного голосования
    function cumulativeButtonClickEmit(_this) {
        var parent = _this.closest('.cumulative-voting__block');
        var buttonsParent = parent.find('.voting-actions__choice');
        var buttons = buttonsParent.find('.voting-actions__choice--item');
        var btnTrue = buttonsParent.find('.voting-true');

        if (!buttons.hasClass('voting-selected')) {
            btnTrue.addClass('voting-selected');
            btnTrue.find('input[type="checkbox"]').attr('checked', 'checked');
        }
        if (!_this.closest('.content__block').hasClass('modal-is-shown')) {
            _this.closest('.content__block').find('.voting-send').removeAttr('style');
            _this.closest('.content__block').find('.questionModal').closest('.overlay').show();
            _this.closest('.content__block').find('.questionModal').find('button').focus();
            _this.closest('.content__block').addClass('modal-is-shown');
        }
        this.unclick = function () {
            //если кнопка нажата - отжимаем
            if (buttons.hasClass('voting-selected')) {
                buttonsParent.find('.voting-selected').click()
            }
        };
        return this;

    }

    //Вычитание массива дробей из дроби
    function fractionMinusListOfFraction(arrOfInputsValWithoutThis, _this) {
        var stringForSend = arrOfInputsValWithoutThis.join(';');
        var parent = _this.closest('.cumulative-voting__block');
        var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
        var input = _this.closest('.string').find('.cumulative-voting__input');
        return $.ajax({
            url: '/FractionCalculator/FractionMinusListOfFraction',
            type: 'get',
            data: {
                value1: totalVoices,
                listOfFraction: stringForSend
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                } else {
                    input.val(request);
                    cumulativeButtonClickEmit(_this); // Имитируем клик по кнопке ЗА, показываем модалку(если первый клик)
                    sumOfEnterFraction(_this).done(function (data) { // Суммируем все значения инпутов, и отображаем в отведенном для этого теге
                        // После успешного выполнения считаем, что бы количество голоов всего не превышало количество введенных голосов
                        comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                            // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                            if (result.result === 'false') {
                                parent.find('.cumulative-voting-warning').remove();
                                parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                            } else if (result.result === 'true') {
                                parent.find('.cumulative-voting-warning').remove();
                            }
                        })
                        // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
                        if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
                        } else {
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
                        }
                    })
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
        })
    }

    // Суммируем все значения инпутов кумулятивного голосования
    function sumOfEnterFraction(_this) {
        var parent = _this.closest('.cumulative-voting__block');
        var cumulativeVotingSum = parent.find('.cumulative-voting__sum');
        var arrOfInputs = parent.find('.cumulative-voting__input');
        var arrOfInputsVal = [];
        arrOfInputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsVal.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        var stringForSend = arrOfInputsVal.join(';'); // Обьединяем все в строку для отправки на сервер
        return $.ajax({
            url: '/FractionCalculator/SumOfFractions',
            type: 'get',
            data: {
                value: stringForSend
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace('  ', ' '); // Двойные пробелы заменяем на одинарные
                cumulativeVotingSum.html(request);
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        })
    }

    // Кумулятивное голосование
    $(document).on('click', '.part-of-voices-btn', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputInfo = parent.find('.dataCumulativeInput');
        var amountCandidates = inputInfo.data('amount-candidates');
        var totalVoices = inputInfo.data('total').replace(/\u00a0/g, ''); // Удаляем спецсимвол пробела
        var input = $(this).closest('.string').find('.cumulative-voting__input');
        var _this = $(this);
        $.ajax({
            url: '/FractionCalculator/Divide',
            type: 'get',
            data: {
                value1: totalVoices,
                value2: amountCandidates
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                    cumulativeButtonClickEmit(_this)
                } else {
                    input.val(request);
                    cumulativeButtonClickEmit(_this);
                    sumOfEnterFraction(_this).done(function (data) {
                        var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
                        comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                            // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                            con.runSave();
                            if (result.result === 'false') {
                                parent.find('.cumulative-voting-warning').remove();
                                parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                            } else if (result.result === 'true') {
                                parent.find('.cumulative-voting-warning').remove();
                            }
                        })
                        // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
                        if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
                        } else {
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
                        }
                    });
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
        })
    });
    $(document).on('click', '.remaining-voices-btn', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var thisInput = $(this).closest('.string').find('.cumulative-voting__input').val();
        var arrOfInputs = parent.find('.cumulative-voting__input');
        var arrOfInputsValWithoutThis = [];
        arrOfInputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsValWithoutThis.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        arrOfInputsValWithoutThis.splice(arrOfInputsValWithoutThis.indexOf(thisInput), 1); // удаляем из массива значение инпута, по кнопке которого кликнули
        fractionMinusListOfFraction(arrOfInputsValWithoutThis, $(this)).done(function () {
            con.runSave();
        });
    });
    $(document).on('focus', '.cumulative-voting__input', function () {
        $(this).closest('.cumulative-voting__block').find('.help-hidden-block').removeClass('help-hidden-block--is-visible');
        $(this).closest('.string').find('.help-hidden-block').addClass('help-hidden-block--is-visible')
    });
    $(document).on('keydown', '.cumulative-voting__input', function (e) {
        cumulativeButtonClickEmit($(this));
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('blur', '.cumulative-voting__input', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        sumOfEnterFraction($(this)).done(function (data) {
            var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
            comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                if (result.result === 'false') {
                    parent.find('.cumulative-voting-warning').remove();
                    parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                } else if (result.result === 'true') {
                    parent.find('.cumulative-voting-warning').remove();
                }

            })
            // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
            if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
            } else {
                parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
            }
        });
    });
    $(document).on('click', '.cumulative-voting__block .voting-actions__choice--item', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        if ($(this).hasClass('voting-false') || $(this).hasClass('voting-abstained')) {
            // Если нажаты против или возжерживаюсь - запрещаем ввод голосов и отдаем все голоса
            var total = parent.find('.dataCumulativeInput').data('total');
            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
            parent.find('.noborder').attr('readonly', '').css({
                pointerEvents: 'none'
            });
            parent.find('.cumulative-voting__sum').text(total);
            inputs.each(function () {
                $(this).val('0')
            });
            parent.find('.cumulative-voting-warning').remove();
        } else {
            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
            parent.find('.cumulative-voting__sum').text('0');
            inputs.each(function () {
                $(this).val('0')
            });
            parent.find('.noborder').removeAttr('readonly').css({
                pointerEvents: 'auto'
            });
        }
    })
});
function Hotkeys() {

    var keysObj = [
        {
            //test
            func: function () {
            },
            keys: [90, 88]
        },
        {
            //фокус на инпутпоиска
            func: function () {
                $('.hotkeys').find('.t-search').focus();
            },
            keys: [113]
        },
        {
            //фокус на инпутпоиска
            func: function () {
                $('.hotkeys').find('.mass-entry-search').focus();
            },
            keys: [113]
        },
        {
            //клик по сабмит
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.send-hotkey').click()
            },
            keys: [18, 83]
        },
        {
            //клик по кнопке "не дейтвительно"
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.not-valid-hotkey').click()
            },
            keys: [18, 8]
        },
        {
            //клик по кнопке "отмена"
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.cancel-hotkey').click()
            },
            keys: [27]
        },
        {
            // alt + 1
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[0].click()
            },
            keys: [18, 49]
        },
        {
            // alt + 2
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[1].click()
            },
            keys: [18, 50]
        },
        {
            // alt + 3
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[2].click()
            },
            keys: [18, 51]
        },
        {
            // alt + 4
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[3].click()
            },
            keys: [18, 52]
        },
        {
            // alt + 5
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[4].click()
            },
            keys: [18, 53]
        },
        {
            // alt + 6
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[5].click()
            },
            keys: [18, 54]
        },

        {
            // alt + 7
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[6].click()
            },
            keys: [18, 55]
        },
        {
            // ctrl + 8
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[7].click()
            },
            keys: [18, 56]
        },
        {
            // ctrl + 9
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[8].click()
            },
            keys: [18, 57]
        },
        {
            // alt + 0 выбор всех бюллетеней
            func: function (e) {
                e.preventDefault();
                $('.bullet-numbers-hotkey').find('.bullet-number-all').trigger('change');
            },
            keys: [18, 48]
        },
        {
            func: function (e) {
                e.preventDefault();
                findNextInput($(e.target), $(e.target).closest('.voting-actions__choice-btn'));
                findNextInputAcumulative($(e.target), $(e.target).closest('.cumulative-voting-input'));
            },
            keys: [9]
        },
        {
            func: function (e) {
                e.preventDefault();
                findPrevInput($(e.target), $(e.target).closest('.voting-actions__choice-btn'));
                findPrevInputAcumulative($(e.target), $(e.target).closest('.cumulative-voting-input'));
            },
            keys: [16, 9]
        },
        {
            // space
            func: function () {
                var nextBtn = $(event.target).closest('.voting-enter__tr').next().find('.voting-true');
                if (nextBtn.length === 0) {
                    nextBtn = $(event.target).closest('.voting-enter__tr-parent').next().find('.voting-true').first();
                    if (nextBtn.length === 0) {
                        nextBtn = $('.send-hotkey');
                    }
                }
                event.target.click();
                nextBtn.focus();
            },
            keys: [32]
        },
        {
            //фокус на инпутпоиска  при нажатиеf2 в форме массового ввода
            func: function () {
                $('.hotkeys').find('.t-search').focus();
            },
            keys: [113]
        },
        {
            //фокус на инпутпоиска  при нажатиеf2 в форме массового ввода
            func: function () {
                var hotkeys = $('.hotkeys');
                hotkeys.find('.t-search').blur();
                hotkeys.find('.search-select').hide();
            },
            keys: [27]
        }
        // {
        //    //убираем фокус с инпута
        //     func: function () {
        //         $('.hotkeys').find('.t-search').blur();
        //     },
        //     keys: [113]
        // }
    ];

    this.run = function () {
        var pressed = [];

        $(document).on('keydown', function (e) {
            e = e || window.event;
            pressed.push(e.keyCode);
            for (var j = 0; j < keysObj.length; j++) {
                if (pressed.length !== keysObj[j]["keys"].length) continue;
                var on = 0;
                for (var i = 0; i < keysObj[j]["keys"].length; i++) {
                    for (var k = 0; k < pressed.length; k++) {
                        if (pressed[k] === keysObj[j]["keys"][i]) {
                            on++;
                            break
                        }
                    }
                    if (on === pressed.length) {
                        keysObj[j].func(e)
                    }
                }
            }
        })
        $(document).on('keyup', function () {
            if (pressed.length === 2) {
                pressed.splice(1, 1);
            }
            else {
                pressed = []
            }
        })
    }

}

var hotheys = new Hotkeys();


$(function () {
    if ($('.hotkeys').length > 0) {
        if ($('.voting-enter__table').length > 0) {
            var i = 1;
            $('.voting-enter__table .voting-actions__choice--item').each(function () {
                $(this).attr('tabindex', i);
                i++;
            })

        }
        hotheys.run();

        // var keysObj = [
        //     {
        //         //test
        //         func:function () {
        //             console.log('first function')
        //         },
        //         keys: [90, 88]
        //     },
        //     {
        //         //фокус на инпутпоиска
        //         func:function () {
        //             $('.hotkeys').find('.t-search').focus();
        //         },
        //         keys: [113]
        //     },
        //     {
        //         //клик по сабмит
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.send-hotkey').click()
        //         },
        //         keys: [18, 83]
        //     },
        //     {
        //         //клик по кнопке "не дейтвительно"
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.not-valid-hotkey').click()
        //         },
        //         keys: [18, 8]
        //     },
        //     {
        //         //клик по кнопке "отмена"
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.cancel-hotkey').click()
        //         },
        //         keys: [27]
        //     },
        //     {
        //         // ctrl + 1
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[0].click()
        //         },
        //         keys: [18, 49]
        //     },
        //     {
        //         // ctrl + 2
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[1].click()
        //         },
        //         keys: [18, 50]
        //     },
        //     {
        //         // ctrl + 3
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[2].click()
        //         },
        //         keys: [18, 51]
        //     },
        //     {
        //         // ctrl + 4
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[3].click()
        //         },
        //         keys: [18, 52]
        //     },
        //     {
        //         // ctrl + 5
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[4].click()
        //         },
        //         keys: [18, 53]
        //     },
        //     {
        //         // ctrl + 6
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[5].click()
        //         },
        //         keys: [18, 54]
        //     },
        //     {
        //         // ctrl + 7
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[6].click()
        //         },
        //         keys: [18, 55]
        //     },
        //     {
        //         // ctrl + 8
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[7].click()
        //         },
        //         keys: [18, 56]
        //     },
        //     {
        //         // ctrl + 9
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[8].click()
        //         },
        //         keys: [18, 57]
        //     },
        //     {
        //         // space
        //         func: function () {
        //             var nextBtn = $(event.target).closest('.voting-enter__tr').next().find('.voting-true');
        //             if (nextBtn.length === 0) {
        //                 nextBtn = $(event.target).closest('.voting-enter__tr-parent').next().find('.voting-true').first();
        //                 if (nextBtn.length === 0) {
        //                     nextBtn = $('.send-hotkey');
        //                 }
        //             }
        //             event.target.click();
        //             nextBtn.focus();
        //         },
        //         keys: [32]
        //     }
        // ];
        //
        //
        // (function runOnKeys() {
        //     var pressed = [];
        //
        //     document.onkeydown = function (e) {
        //         e = e || window.event;
        //         pressed.push(e.keyCode);
        //         for (var j=0; j<keysObj.length; j++) {
        //             if(pressed.length !== keysObj[j]["keys"].length) continue;
        //             var on = 0;
        //             for( var i = 0; i < keysObj[j]["keys"].length; i++ ) {
        //                 for( var k = 0; k < pressed.length; k++ ) {
        //                     if(pressed[k] === keysObj[j]["keys"][i]) {
        //                         on++;
        //                         break
        //                     }
        //                 }
        //                 if (on === pressed.length) {
        //                     keysObj[j].func()
        //                 }
        //             }
        //         }
        //     };
        //
        //     document.onkeyup = function () {
        //         if (pressed.length === 2) {
        //             pressed.splice(1, 1);
        //         }
        //         else {
        //             pressed = []
        //         }
        //     };
        //
        // })()
    }

    //for  close modal
    document.onkeydown = function (e) {
        // e.stopPropagation();
        e = e || window.event;
        var modal = $('.overlay');
        modal.each(function () {
            if ($(this).is(':visible') && e.keyCode === 27) {
                $(this).hide()
            }
            if ($(this).is(':visible') && e.keyCode === 13) {
                // console.log($(this)[0].querySelector('.modal__footer button'))
                $(this)[0].querySelector('.modal__footer button').click();
            }
        });
    }
});
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
            if ($('.content__block--photo.user').data("forself")) {
                $('.header__user img')[0].src = e.target.result;
            }
            if ($('.content__block--photo.user').data("autoLoad")) {
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
    success: function (result) {
      $('#avatar-reg').text(f_name_reg);
      $('#avatar-name').val(f_name_reg);
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

$(function () {

    function subtractionTotalNumber(obj, callback) {

        return $.ajax({
            url: '/FractionCalculator/FractionMinusListOfFraction',
            type: 'get',
            data: {
                value1: obj.total.replace(/\u00a0/g, '').trim(),
                listOfFraction: obj.arrOfInputsValWithoutThis.join(';')
            },
            dataType: 'json',
            success: function (html) {
                callback(html)
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        })
    }

    $(document).on('click', '.balance-total', function () {

        var parent = $(this).closest('.separation-votes'),
            inputs = parent.find('.votes-cast'),
            total = parent.find('.voting-votes-all input').val(),
            arrOfInputsValWithoutThis = [],
            _this = $(this);
            thisInput = $(this).closest('.voting-actions__choice-wrap').find('.votes-cast').val();
        // Заполняем массив arrOfInputsValWithoutThis значениями инпутов
        inputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsValWithoutThis.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        arrOfInputsValWithoutThis.splice(arrOfInputsValWithoutThis.indexOf(thisInput), 1); // удаляем из массива значение инпута, по кнопке которого кликнули

        subtractionTotalNumber({
            parent: parent,
            total: total,
            arrOfInputsValWithoutThis: arrOfInputsValWithoutThis
        }, function (data) {
            _this.closest('.voting-actions__choice-wrap').find('.votes-cast').val(data.result);
        })
    })

});
$('#removeButtonIssuer').click(function() {
  //вызов функции удаления Model.DateOfElectionExecutiveBody и @Model.ElectionExecutiveBodyReason
  submitAjaxForm("/Manager/Issuer/ExecElectionDataToNull");
  //перезагрузить этот контрол
  if (!$(this).parent().hasClass("swap-control-edit")) {
    $(".swap-control-edit").each(function () {
      var elem = $('#execBodyDate').first();
      returnControlInEditMode(elem, false);
    });
  }
});
$('#linkButtonIssuer').click(function () {
  ////вызов функции обновления Model.DateOfElectionExecutiveBody, @Model.ElectionExecutiveBodyReason, Model.TermOfOfficeExecutiveBody, Model.TermOfEndOfficeExecutiveBody
  //submitAjaxForm("/Manager/Issuer/ExecElectionFieldsUpdate");
  ////перезагрузить этот контрол
  //if (!$(this).parent().hasClass("swap-control-edit")) {
  //  $(".swap-control-edit").each(function () {
  //    var elem = $('#execBodyDate').first();
  //    returnControlInEditMode(elem, false);
  //  });
  //}
});
$("#execBodyName input[type='radio']").change(function () {
  var selection = $(this).val();
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "Копировать данные из системы ведения реестра") {
    var bodyNameZenith = $("#execBodyName p").text();
    // вызов функции, которая устанавливает ExecutiveBodyName в значение ExecutiveBodyNameZenith
    submitAjaxForm("/Manager/Issuer/ExecBodyNameToZenithValue");
    // перезагрузить этот контрол
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyName').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
$("#execBodyTerm input[type='radio']").change(function () {
  var selection = $(this).attr('id');
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "bodyTermZenit") {
    // вызов функции, которая устанавливает TermOfOfficeExecutiveBody & TermOfEndOfOfficeExecutiveBody в значения из Zenith
    submitAjaxForm("/Manager/Issuer/ExecTermToZenithValue");
    // перезагрузить этот контрол
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyTerm').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
$("#execBodyDate input[type='radio']").change(function () {
  var selection = $(this).val();
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "Копировать данные из системы ведения реестра") {
    // вызов функции, которая устанавливает DateOfElectionExecutiveBody & ElectionExecutiveBodyReason в значения из Zenith
    submitAjaxForm("/Manager/Issuer/ExecElectionDataToZenithValue");
    // перезагрузить эти контролы
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyDate').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
function submitAjaxForm(url) {
  var urlString = url;
  var ajaxForm = $('.ajax-form');

    $.ajax({
      type: "POST",
      url: urlString,
      data: { issuerId: $('#EntityID').val() }, // serializes the form's elements.
      success: function (data) {
        ajaxForm[0].outerHTML = data;
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
/*
== malihu jquery custom scrollbar plugin == 
Version: 3.1.5 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

(function(factory){
	if(typeof define==="function" && define.amd){
		define(["jquery"],factory);
	}else if(typeof module!=="undefined" && module.exports){
		module.exports=factory;
	}else{
		factory(jQuery,window,document);
	}
}(function($){
(function(init){
	var _rjs=typeof define==="function" && define.amd, /* RequireJS */
		_njs=typeof module !== "undefined" && module.exports, /* NodeJS */
		_dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
		_url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
	if(!_rjs){
		if(_njs){
			require("jquery-mousewheel")($);
		}else{
			/* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
			(works when mCustomScrollbar fn is called on window load) */
			$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
		}
	}
	init();
}(function(){
	
	/* 
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
	----------------------------------------
	*/
	
	var pluginNS="mCustomScrollbar",
		pluginPfx="mCS",
		defaultSelector=".mCustomScrollbar",
	
	
		
	
	
	/* 
	----------------------------------------
	DEFAULT OPTIONS 
	----------------------------------------
	*/
	
		defaults={
			/*
			set element/content width/height programmatically 
			values: boolean, pixels, percentage 
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
			/*
			set the initial css top property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setTop:0,
			/*
			set the initial css left property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setLeft:0,
			/* 
			scrollbar axis (vertical and/or horizontal scrollbars) 
			values (string): "y", "x", "yx"
			*/
			axis:"y",
			/*
			position of scrollbar relative to content  
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
			scrollbarPosition:"inside",
			/*
			scrolling inertia
			values: integer (milliseconds)
			*/
			scrollInertia:950,
			/* 
			auto-adjust scrollbar dragger length
			values: boolean
			*/
			autoDraggerLength:true,
			/*
			auto-hide scrollbar when idle 
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
			/*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
			/*
			always show scrollbar, even when there's nothing to scroll 
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
			alwaysShowScrollbar:0,
			/*
			scrolling always snaps to a multiple of this number in pixels
			values: integer, array ([y,x])
				option						default
				-------------------------------------
				snapAmount					null
			*/
			/*
			when snapping, snap with this number in pixels as an offset 
			values: integer
			*/
			snapOffset:0,
			/* 
			mouse-wheel scrolling
			*/
			mouseWheel:{
				/* 
				enable mouse-wheel scrolling
				values: boolean
				*/
				enable:true,
				/* 
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto",
				/* 
				mouse-wheel scrolling axis 
				the default scrolling direction when both vertical and horizontal scrollbars are present 
				values (string): "y", "x" 
				*/
				axis:"y",
				/* 
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
				/*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
				values: "auto", integer 
				"auto" uses the default OS/browser value 
				*/
				deltaFactor:"auto",
				/*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
				/*
				invert mouse-wheel scrolling direction 
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
				/*
				the tags that disable mouse-wheel when cursor is over them
				*/
				disableOver:["select","option","keygen","datalist","textarea"]
			},
			/* 
			scrollbar buttons
			*/
			scrollButtons:{ 
				/*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
				/*
				scrollbar buttons scrolling type 
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto"
				/*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
			},
			/* 
			keyboard scrolling
			*/
			keyboard:{ 
				/*
				enable scrolling via keyboard
				values: boolean
				*/
				enable:true,
				/*
				keyboard scrolling type 
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto"
			},
			/*
			enable content touch-swipe scrolling 
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
			contentTouchScroll:25,
			/*
			enable/disable document (default) touch-swipe scrolling 
			*/
			documentTouchScroll:true,
			/*
			advanced option parameters
			*/
			advanced:{
				/*
				auto-expand content horizontally (for "x" or "yx" axis) 
				values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
				/*
				auto-scroll to elements with focus
				*/
				autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
				/*
				auto-update scrollbars on content, element or viewport resize 
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
				values: boolean
				*/
				updateOnContentResize:true,
				/*
				auto-update scrollbars each time each image inside the element is fully loaded 
				values: "auto", boolean
				*/
				updateOnImageLoad:"auto",
				/*
				auto-update scrollbars based on the amount and size changes of specific selectors 
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
				/*
				extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					extraDraggableSelectors		null
				*/
				/*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
				/*
				auto-update timeout 
				values: integer (milliseconds)
				*/
				autoUpdateTimeout:60
			},
			/* 
			scrollbar theme 
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
			theme:"light",
			/*
			user defined callback functions
			*/
			callbacks:{
				/*
				Available callbacks: 
					callback					default
					-------------------------------------
					onCreate					null
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onBeforeUpdate				null
					onUpdate					null
				*/
				onTotalScrollOffset:0,
				onTotalScrollBackOffset:0,
				alwaysTriggerOffsets:true
			}
			/*
			add scrollbar(s) on all elements matching the current selector, now and in the future 
			values: boolean, string 
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
		},
	
	
	
	
	
	/* 
	----------------------------------------
	VARS, CONSTANTS 
	----------------------------------------
	*/
	
		totalInstances=0, /* plugin instances amount */
		liveTimers={}, /* live option timers */
		oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
		touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
		/* general plugin classes */
		classes=[
			"mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
			"mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
			"mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
		],
		
	
	
	
	
	/* 
	----------------------------------------
	METHODS 
	----------------------------------------
	*/
	
		methods={
			
			/* 
			plugin initialization method 
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/
			
			init:function(options){
				
				var options=$.extend(true,{},defaults,options),
					selector=_selector.call(this); /* validate selector */
				
				/* 
				if live option is enabled, monitor for elements matching the current selector and 
				apply scrollbar(s) when found (now and in the future) 
				*/
				if(options.live){
					var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
						$liveSelector=$(liveSelector); /* live selector(s) as jquery object */
					if(options.live==="off"){
						/* 
						disable live if requested 
						usage: $(selector).mCustomScrollbar({live:"off"}); 
						*/
						removeLiveTimers(liveSelector);
						return;
					}
					liveTimers[liveSelector]=setTimeout(function(){
						/* call mCustomScrollbar fn on live selector(s) every half-second */
						$liveSelector.mCustomScrollbar(options);
						if(options.live==="once" && $liveSelector.length){
							/* disable live after first invocation */
							removeLiveTimers(liveSelector);
						}
					},500);
				}else{
					removeLiveTimers(liveSelector);
				}
				
				/* options backward compatibility (for versions < 3.0.0) and normalization */
				options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
				options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
				options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
				options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
				if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
					options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
				}
				options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
				options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
				options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType); 
				
				_theme(options); /* theme-specific options */
				
				/* plugin constructor */
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */
					
						/* store options and create objects in jquery data */
						$this.data(pluginPfx,{
							idx:++totalInstances, /* instance index */
							opt:options, /* options */
							scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
							overflowed:null, /* overflowed axis */
							contentReset:{y:null,x:null}, /* object to check when content resets */
							bindEvents:false, /* object to check if events are bound */
							tweenRunning:false, /* object to check if tween is running */
							sequential:{}, /* sequential scrolling object */
							langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
							cbOffsets:null, /* object to check whether callback offsets always trigger */
							/* 
							object to check how scrolling events where last triggered 
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
							usage: object.data("mCS").trigger
							*/
							trigger:null,
							/* 
							object to check for changes in elements in order to call the update method automatically 
							*/
							poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}
						});
						
						var d=$this.data(pluginPfx),o=d.opt,
							/* HTML data attributes */
							htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
						 
						if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
						if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
						if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
							o.theme=htmlDataTheme;
							_theme(o); /* theme-specific options */
						}
						
						_pluginMarkup.call(this); /* add plugin markup */
						
						if(d && o.callbacks.onCreate && typeof o.callbacks.onCreate==="function"){o.callbacks.onCreate.call(this);} /* callbacks: onCreate */
						
						$("#mCSB_"+d.idx+"_container images:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */
						
						methods.update.call(null,$this); /* call the update method */
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/* 
			plugin update method 
			updates content and scrollbar(s) values, events and status 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/
			
			update:function(el,cb){
				
				var selector=el || _selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
						var d=$this.data(pluginPfx),o=d.opt,
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							mCustomScrollBox=$("#mCSB_"+d.idx),
							mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
						
						if(!mCSB_container.length){return;}
						
						if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */
						
						if(cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate==="function"){o.callbacks.onBeforeUpdate.call(this);} /* callbacks: onBeforeUpdate */
						
						/* if element was disabled or destroyed, remove class(es) */
						if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
						if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}
						
						/* css flexbox fix, detect/set max-height */
						mCustomScrollBox.css("max-height","none");
						if(mCustomScrollBox.height()!==$this.height()){mCustomScrollBox.css("max-height",$this.height());}
						
						_expandContentHorizontally.call(this); /* expand content horizontally */
						
						if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
							mCSB_container.css("width",_contentWidth(mCSB_container));
						}
						
						d.overflowed=_overflowed.call(this); /* determine if scrolling is required */
						
						_scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
						
						/* auto-adjust scrollbar dragger length analogous to content */
						if(o.autoDraggerLength){_setDraggerLength.call(this);}
						
						_scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
						
						_bindEvents.call(this); /* bind scrollbar events */
						
						/* reset scrolling position and/or events */
						var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
						if(o.axis!=="x"){ /* y/yx axis */
							if(!d.overflowed[0]){ /* y scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="y"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[1]){
									_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* y scrolling is required */
								_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								d.contentReset.y=null;
							}
						}
						if(o.axis!=="y"){ /* x/yx axis */
							if(!d.overflowed[1]){ /* x scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="x"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[0]){
									_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* x scrolling is required */
								_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								d.contentReset.x=null;
							}
						}
						
						/* callbacks: onImageLoad, onSelectorChange, onUpdate */
						if(cb && d){
							if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
								o.callbacks.onImageLoad.call(this);
							}else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
								o.callbacks.onSelectorChange.call(this);
							}else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
								o.callbacks.onUpdate.call(this);
							}
						}
						
						_autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
						
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/* 
			plugin scrollTo method 
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/
		
			scrollTo:function(val,options){
				
				/* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
				if(typeof val=="undefined" || val==null){return;}
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
					
						var d=$this.data(pluginPfx),o=d.opt,
							/* method default options */
							methodDefaults={
								trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
								scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
								scrollEasing:"mcsEaseInOut", /* animation easing */
								moveDragger:false, /* move dragger instead of content */
								timeout:60, /* scroll-to delay */
								callbacks:true, /* enable/disable callbacks */
								onStart:true,
								onUpdate:true,
								onComplete:true
							},
							methodOptions=$.extend(true,{},methodDefaults,options),
							to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
						
						/* translate yx values to actual scroll-to positions */
						to[0]=_to.call(this,to[0],"y");
						to[1]=_to.call(this,to[1],"x");
						
						/* 
						check if scroll-to value moves the dragger instead of content. 
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
						*/
						if(methodOptions.moveDragger){
							to[0]*=d.scrollRatio.y;
							to[1]*=d.scrollRatio.x;
						}
						
						methodOptions.dur=_isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden
						
						setTimeout(function(){ 
							/* do the scrolling */
							if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
								methodOptions.dir="y";
								methodOptions.overwrite="all";
								_scrollTo($this,to[0].toString(),methodOptions);
							}
							if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
								methodOptions.dir="x";
								methodOptions.overwrite="none";
								_scrollTo($this,to[1].toString(),methodOptions);
							}
						},methodOptions.timeout);
						
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin stop method 
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
			stop:function(){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
										
						_stop($this);
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin disable method 
			temporarily disables the scrollbar(s) 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset); 
			reset (boolean): resets content position to 0 
			*/
			disable:function(r){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
						var d=$this.data(pluginPfx);
						
						_autoUpdate.call(this,"remove"); /* remove automatic updating */
						
						_unbindEvents.call(this); /* unbind events */
						
						if(r){_resetContentPosition.call(this);} /* reset content position */
						
						_scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */
						
						$this.addClass(classes[3]); /* add disable class */
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin destroy method 
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy"); 
			*/
			destroy:function(){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
					
						var d=$this.data(pluginPfx),o=d.opt,
							mCustomScrollBox=$("#mCSB_"+d.idx),
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
					
						if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */
						
						_autoUpdate.call(this,"remove"); /* remove automatic updating */
						
						_unbindEvents.call(this); /* unbind events */
						
						_resetContentPosition.call(this); /* reset content position */
						
						$this.removeData(pluginPfx); /* remove plugin data object */
						
						_delete(this,"mcs"); /* delete callbacks object */
						
						/* remove plugin markup */
						scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
						mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
						mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
						/* remove plugin classes from the element and add destroy class */
						$this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);
					
					}
					
				});
				
			}
			/* ---------------------------------------- */
			
		},
	
	
	
	
		
	/* 
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/
	
		/* validates selector (if selector is invalid or undefined uses the default one) */
		_selector=function(){
			return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
		},
		/* -------------------- */
		
		
		/* changes options according to theme */
		_theme=function(obj){
			var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
				nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
				disabledScrollButtonsThemes=["minimal","minimal-dark"],
				enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
				scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
			obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
			obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
			obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
			obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
			obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
		},
		/* -------------------- */
		
		
		/* live option timers removal */
		removeLiveTimers=function(selector){
			if(liveTimers[selector]){
				clearTimeout(liveTimers[selector]);
				_delete(liveTimers,selector);
			}
		},
		/* -------------------- */
		
		
		/* normalizes axis option to valid values: "y", "x", "yx" */
		_findAxis=function(val){
			return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
		},
		/* -------------------- */
		
		
		/* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
		_findScrollButtonsType=function(val){
			return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
		},
		/* -------------------- */
		
		
		/* generates plugin markup */
		_pluginMarkup=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
				scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
				wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
				scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
				contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
				autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
				scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
			if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
			if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
			o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
			$this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir='"+d.langDir+"' /></div>");
			var mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
				mCSB_container.css("width",_contentWidth(mCSB_container));
			}
			if(o.scrollbarPosition==="outside"){
				if($this.css("position")==="static"){ /* requires elements with non-static position */
					$this.css("position","relative");
				}
				$this.css("overflow","visible");
				mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
			}else{
				mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
				mCSB_container.wrap(contentWrapper);
			}
			_scrollButtons.call(this); /* add scrollbar buttons */
			/* minimum dragger length */
			var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
			mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
		},
		/* -------------------- */
		
		
		/* calculates content width */
		_contentWidth=function(el){
			var val=[el[0].scrollWidth,Math.max.apply(Math,el.children().map(function(){return $(this).outerWidth(true);}).get())],w=el.parent().width();
			return val[0]>w ? val[0] : val[1]>w ? val[1] : "100%";
		},
		/* -------------------- */
		
		
		/* expands content horizontally */
		_expandContentHorizontally=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
				/* calculate scrollWidth */
				mCSB_container.css({"width":"auto","min-width":0,"overflow-x":"scroll"});
				var w=Math.ceil(mCSB_container[0].scrollWidth);
				if(o.advanced.autoExpandHorizontalScroll===3 || (o.advanced.autoExpandHorizontalScroll!==2 && w>mCSB_container.parent().width())){
					mCSB_container.css({"width":w,"min-width":"100%","overflow-x":"inherit"});
				}else{
					/* 
					wrap content with an infinite width div and set its position to absolute and width to auto. 
					Setting width to auto before calculating the actual width is important! 
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
					mCSB_container.css({"overflow-x":"inherit","position":"absolute"})
						.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
						.css({ /* set actual width, original position and un-wrap */
							/* 
							get the exact width (with decimals) and then round-up. 
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
							"width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
							"min-width":"100%",
							"position":"relative"
						}).unwrap();
				}
			}
		},
		/* -------------------- */
		
		
		/* adds scrollbar buttons */
		_scrollButtons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
				tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
				btnHTML=[
					"<a href='#' class='"+classes[13]+"' "+tabindex+" />",
					"<a href='#' class='"+classes[14]+"' "+tabindex+" />",
					"<a href='#' class='"+classes[15]+"' "+tabindex+" />",
					"<a href='#' class='"+classes[16]+"' "+tabindex+" />"
				],
				btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
			if(o.scrollButtons.enable){
				mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
			}
		},
		/* -------------------- */
		
		
		/* auto-adjusts scrollbar dragger length */
		_setDraggerLength=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
				l=[
					parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
					parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
				],
				h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
			mCSB_dragger[0].css({
				"height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
			}).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
			mCSB_dragger[1].css({
				"width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
			});
		},
		/* -------------------- */
		
		
		/* calculates scrollbar to content ratio */
		_scrollRatio=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
				ratio=[
					scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
					scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
				];
			d.scrollRatio={y:ratio[0],x:ratio[1]};
		},
		/* -------------------- */
		
		
		/* toggles scrolling classes */
		_onDragClasses=function(el,action,xpnd){
			var expandClass=xpnd ? classes[0]+"_expanded" : "",
				scrollbar=el.closest(".mCSB_scrollTools");
			if(action==="active"){
				el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
				el[0]._draggable=el[0]._draggable ? 0 : 1;
			}else{
				if(!el[0]._draggable){
					if(action==="hide"){
						el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
					}else{
						el.addClass(classes[0]); scrollbar.addClass(classes[1]);
					}
				}
			}
		},
		/* -------------------- */
		
		
		/* checks if content overflows its container to determine if scrolling is required */
		_overflowed=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
				contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false),
				h=mCSB_container[0].scrollHeight,w=mCSB_container[0].scrollWidth;
			if(h>contentHeight){contentHeight=h;}
			if(w>contentWidth){contentWidth=w;}
			return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
		},
		/* -------------------- */
		
		
		/* resets content position to 0 */
		_resetContentPosition=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			_stop($this); /* stop any current scrolling before resetting */
			if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
				mCSB_dragger[0].add(mCSB_container).css("top",0);
				_scrollTo($this,"_resetY");
			}
			if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
				var cx=dx=0;
				if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
					cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
					dx=Math.abs(cx/d.scrollRatio.x);
				}
				mCSB_container.css("left",cx);
				mCSB_dragger[1].css("left",dx);
				_scrollTo($this,"_resetX");
			}
		},
		/* -------------------- */
		
		
		/* binds scrollbar events */
		_bindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
			if(!d.bindEvents){ /* check if events are already bound */
				_draggable.call(this);
				if(o.contentTouchScroll){_contentDraggable.call(this);}
				_selectable.call(this);
				if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
					function _mwt(){
						mousewheelTimeout=setTimeout(function(){
							if(!$.event.special.mousewheel){
								_mwt();
							}else{
								clearTimeout(mousewheelTimeout);
								_mousewheel.call($this[0]);
							}
						},100);
					}
					var mousewheelTimeout;
					_mwt();
				}
				_draggerRail.call(this);
				_wrapperScroll.call(this);
				if(o.advanced.autoScrollOnFocus){_focus.call(this);}
				if(o.scrollButtons.enable){_buttons.call(this);}
				if(o.keyboard.enable){_keyboard.call(this);}
				d.bindEvents=true;
			}
		},
		/* -------------------- */
		
		
		/* unbinds scrollbar events */
		_unbindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				sb=".mCSB_"+d.idx+"_scrollbar",
				sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
			if(o.advanced.extraDraggableSelectors){sel.add($(o.advanced.extraDraggableSelectors));}
			if(d.bindEvents){ /* check if events are bound */
				/* unbind namespaced events from document/selectors */
				$(document).add($(!_canAccessIFrame() || top.document)).unbind("."+namespace);
				sel.each(function(){
					$(this).unbind("."+namespace);
				});
				/* clear and delete timeouts/objects */
				clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
				clearTimeout(d.sequential.step); _delete(d.sequential,"step");
				clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
				d.bindEvents=false;
			}
		},
		/* -------------------- */
		
		
		/* toggles scrollbar visibility */
		_scrollbarVisibility=function(disabled){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
				content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
				scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
				mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
			if(o.axis!=="x"){
				if(d.overflowed[0] && !disabled){
					scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
					content.removeClass(classes[8]+" "+classes[10]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
						content.removeClass(classes[10]);
					}else{
						scrollbar[0].css("display","none");
						content.addClass(classes[10]);
					}
					content.addClass(classes[8]);
				}
			}
			if(o.axis!=="y"){
				if(d.overflowed[1] && !disabled){
					scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
					content.removeClass(classes[9]+" "+classes[11]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
						content.removeClass(classes[11]);
					}else{
						scrollbar[1].css("display","none");
						content.addClass(classes[11]);
					}
					content.addClass(classes[9]);
				}
			}
			if(!d.overflowed[0] && !d.overflowed[1]){
				$this.addClass(classes[5]);
			}else{
				$this.removeClass(classes[5]);
			}
		},
		/* -------------------- */
		
		
		/* returns input coordinates of pointer, touch and mouse events (relative to document) */
		_coordinates=function(e){
			var t=e.type,o=e.target.ownerDocument!==document && frameElement!==null ? [$(frameElement).offset().top,$(frameElement).offset().left] : null,
				io=_canAccessIFrame() && e.target.ownerDocument!==top.document && frameElement!==null ? [$(e.view.frameElement).offset().top,$(e.view.frameElement).offset().left] : [0,0];
			switch(t){
				case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
					return o ? [e.originalEvent.pageY-o[0]+io[0],e.originalEvent.pageX-o[1]+io[1],false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
					break;
				case "touchstart": case "touchmove": case "touchend":
					var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
						touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
					return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
					break;
				default:
					return o ? [e.pageY-o[0]+io[0],e.pageX-o[1]+io[1],false] : [e.pageY,e.pageX,false];
			}
		},
		/* -------------------- */
		
		
		/* 
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging 
		*/
		_draggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
				draggable,dragY,dragX,
				rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
				eds=o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
			mCSB_dragger.bind("contextmenu."+namespace,function(e){
				e.preventDefault(); //prevent right click
			}).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				touchActive=true;
				if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
				_iframe.call(mCSB_container,false); /* enable scrollbar dragging over iframes by disabling their events */
				_stop($this);
				draggable=$(this);
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
					h=draggable.height()+offset.top,w=draggable.width()+offset.left;
				if(y<h && y>0 && x<w && x>0){
					dragY=y; 
					dragX=x;
				}
				_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
			}).bind("touchmove."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				_drag(dragY,dragX,y,x);
			});
			$(document).add(eds).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
				if(draggable){
					var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
					if(dragY===y && dragX===x){return;} /* has it really moved? */
					_drag(dragY,dragX,y,x);
				}
			}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				if(draggable){
					_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
					draggable=null;
				}
				touchActive=false;
				if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
				_iframe.call(mCSB_container,true); /* enable iframes events */
			});
			function _drag(dragY,dragX,y,x){
				mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
				if(draggable.attr("id")===draggerId[1]){
					var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
				}else{
					var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
				}
				_scrollTo($this,to.toString(),{dir:dir,drag:true});
			}
		},
		/* -------------------- */
		
		
		/* 
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe 
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
		*/
		_contentDraggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				draggable,dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
				durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
				iframe=mCSB_container.find("iframe"),
				events=[
					"touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
					"touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
					"touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
				],
				touchAction=document.body.style.touchAction!==undefined && document.body.style.touchAction!=="";
			mCSB_container.bind(events[0],function(e){
				_onTouchstart(e);
			}).bind(events[1],function(e){
				_onTouchmove(e);
			});
			mCustomScrollBox.bind(events[0],function(e){
				_onTouchstart2(e);
			}).bind(events[2],function(e){
				_onTouchend(e);
			});
			if(iframe.length){
				iframe.each(function(){
					$(this).bind("load",function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
								_onTouchstart(e);
								_onTouchstart2(e);
							}).bind(events[1],function(e){
								_onTouchmove(e);
							}).bind(events[2],function(e){
								_onTouchend(e);
							});
						}
					});
				});
			}
			function _onTouchstart(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
				touchable=1; touchDrag=0; docDrag=0; draggable=1;
				$this.removeClass("mCS_touch_action");
				var offset=mCSB_container.offset();
				dragY=_coordinates(e)[0]-offset.top;
				dragX=_coordinates(e)[1]-offset.left;
				touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
			}
			function _onTouchmove(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				if(!o.documentTouchScroll){e.preventDefault();} 
				e.stopImmediatePropagation();
				if(docDrag && !touchDrag){return;}
				if(draggable){
					runningTime=_getTime();
					var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
						easing="mcsLinearOut";
					touchMoveY.push(y);
					touchMoveX.push(x);
					touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
					if(d.overflowed[0]){
						var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
							prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
					}
					if(d.overflowed[1]){
						var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
							preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
					}
					if(prevent || preventX){ /* prevent native document scrolling */
						if(!touchAction){e.preventDefault();} 
						touchDrag=1;
					}else{
						docDrag=1;
						$this.addClass("mCS_touch_action");
					}
					if(touchAction){e.preventDefault();} 
					amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
					mCSB_container[0].idleTimer=250;
					if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
					if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
				}
			}
			function _onTouchstart2(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
				touchable=1;
				e.stopImmediatePropagation();
				_stop($this);
				startTime=_getTime();
				var offset=mCustomScrollBox.offset();
				touchStartY=_coordinates(e)[0]-offset.top;
				touchStartX=_coordinates(e)[1]-offset.left;
				touchMoveY=[]; touchMoveX=[];
			}
			function _onTouchend(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				draggable=0;
				e.stopImmediatePropagation();
				touchDrag=0; docDrag=0;
				endTime=_getTime();
				var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				if((endTime-runningTime)>30){return;}
				speed=1000/(endTime-startTime);
				var easing="mcsEaseOut",slow=speed<2.5,
					diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
				distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
				var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
				speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
				var a=[
					Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
					Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
				];
				amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
				durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
				var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
				amount[0]=absDistance[0]>md ? amount[0] : 0;
				amount[1]=absDistance[1]>md ? amount[1] : 0;
				if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
				if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
			}
			function _m(ds,s){
				var r=[s*1.5,s*2,s/1.5,s/2];
				if(ds>90){
					return s>4 ? r[0] : r[3];
				}else if(ds>60){
					return s>3 ? r[3] : r[2];
				}else if(ds>30){
					return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
				}else{
					return s>8 ? s : r[3];
				}
			}
			function _drag(amount,dur,easing,dir,overwrite,drag){
				if(!amount){return;}
				_scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
			}
		},
		/* -------------------- */
		
		
		/* 
		SELECT TEXT EVENTS 
		scrolls content when text is selected 
		*/
		_selectable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				action;
			mCSB_container.bind("mousedown."+namespace,function(e){
				if(touchable){return;}
				if(!action){action=1; touchActive=true;}
			}).add(document).bind("mousemove."+namespace,function(e){
				if(!touchable && action && _sel()){
					var offset=mCSB_container.offset(),
						y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
					if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
						if(seq.step){_seq("off",null,"stepped");}
					}else{
						if(o.axis!=="x" && d.overflowed[0]){
							if(y<0){
								_seq("on",38);
							}else if(y>wrapper.height()){
								_seq("on",40);
							}
						}
						if(o.axis!=="y" && d.overflowed[1]){
							if(x<0){
								_seq("on",37);
							}else if(x>wrapper.width()){
								_seq("on",39);
							}
						}
					}
				}
			}).bind("mouseup."+namespace+" dragend."+namespace,function(e){
				if(touchable){return;}
				if(action){action=0; _seq("off",null);}
				touchActive=false;
			});
			function _sel(){
				return 	window.getSelection ? window.getSelection().toString() : 
						document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
			}
			function _seq(a,c,s){
				seq.type=s && action ? "stepped" : "stepless";
				seq.scrollAmount=10;
				_sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
			}
		},
		/* -------------------- */
		
		
		/* 
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel 
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
		_mousewheel=function(){
			if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
			if(iframe.length){
				iframe.each(function(){
					$(this).bind("load",function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
								_onMousewheel(e,delta);
							});
						}
					});
				});
			}
			mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
				_onMousewheel(e,delta);
			});
			function _onMousewheel(e,delta){
				_stop($this);
				if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
				var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100,
					dur=o.scrollInertia;
				if(o.axis==="x" || o.mouseWheel.axis==="x"){
					var dir="x",
						px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
						amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
						contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
						draggerPos=mCSB_dragger[1][0].offsetLeft,
						limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
						dlt=o.mouseWheel.axis==="y" ? (e.deltaY || delta) : e.deltaX;
				}else{
					var dir="y",
						px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
						amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
						contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
						draggerPos=mCSB_dragger[0][0].offsetTop,
						limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
						dlt=e.deltaY || delta;
				}
				if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
				if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
				if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
				if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
					e.stopImmediatePropagation();
					e.preventDefault();
				}
				if(e.deltaFactor<5 && !o.mouseWheel.normalizeDelta){
					//very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
					amount=e.deltaFactor; dur=17;
				}
				_scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir,dur:dur});
			}
		},
		/* -------------------- */
		
		
		/* checks if iframe can be accessed */
		_canAccessIFrameCache=new Object(),
		_canAccessIFrame=function(iframe){
		    var result=false,cacheKey=false,html=null;
		    if(iframe===undefined){
				cacheKey="#empty";
		    }else if($(iframe).attr("id")!==undefined){
				cacheKey=$(iframe).attr("id");
		    }
			if(cacheKey!==false && _canAccessIFrameCache[cacheKey]!==undefined){
				return _canAccessIFrameCache[cacheKey];
			}
			if(!iframe){
				try{
					var doc=top.document;
					html=doc.body.innerHTML;
				}catch(err){/* do nothing */}
				result=(html!==null);
			}else{
				try{
					var doc=iframe.contentDocument || iframe.contentWindow.document;
					html=doc.body.innerHTML;
				}catch(err){/* do nothing */}
				result=(html!==null);
			}
			if(cacheKey!==false){_canAccessIFrameCache[cacheKey]=result;}
			return result;
		},
		/* -------------------- */
		
		
		/* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
		_iframe=function(evt){
			var el=this.find("iframe");
			if(!el.length){return;} /* check if content contains iframes */
			var val=!evt ? "none" : "auto";
			el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
		},
		/* -------------------- */
		
		
		/* disables mouse-wheel when hovering specific elements like select, datalist etc. */
		_disableMousewheel=function(el,target){
			var tag=target.nodeName.toLowerCase(),
				tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
				/* elements that require focus */
				focusTags=["select","textarea"];
			return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
		},
		/* -------------------- */
		
		
		/* 
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail 
		*/
		_draggerRail=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]),
				clickable;
			mCSB_draggerContainer.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				touchActive=true;
				if(!$(e.target).hasClass("mCSB_dragger")){clickable=1;}
			}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				touchActive=false;
			}).bind("click."+namespace,function(e){
				if(!clickable){return;}
				clickable=0;
				if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
					_stop($this);
					var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
					if(el.parent(".mCSB_scrollTools_horizontal").length>0){
						if(!d.overflowed[1]){return;}
						var dir="x",
							clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
					}else{
						if(!d.overflowed[0]){return;}
						var dir="y",
							clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
					}
					_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
		_focus=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent();
			mCSB_container.bind("focusin."+namespace,function(e){
				var el=$(document.activeElement),
					nested=mCSB_container.find(".mCustomScrollBox").length,
					dur=0;
				if(!el.is(o.advanced.autoScrollOnFocus)){return;}
				_stop($this);
				clearTimeout($this[0]._focusTimeout);
				$this[0]._focusTimer=nested ? (dur+17)*nested : 0;
				$this[0]._focusTimeout=setTimeout(function(){
					var	to=[_childPos(el)[0],_childPos(el)[1]],
						contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
						isVisible=[
							(contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
							(contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
						],
						overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
					if(o.axis!=="x" && !isVisible[0]){
						_scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
					if(o.axis!=="y" && !isVisible[1]){
						_scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
				},$this[0]._focusTimer);
			});
		},
		/* -------------------- */
		
		
		/* sets content wrapper scrollTop/scrollLeft always to 0 */
		_wrapperScroll=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				wrapper=$("#mCSB_"+d.idx+"_container").parent();
			wrapper.bind("scroll."+namespace,function(e){
				if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
					$(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons 
		*/
		_buttons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				sel=".mCSB_"+d.idx+"_scrollbar",
				btn=$(sel+">a");
			btn.bind("contextmenu."+namespace,function(e){
				e.preventDefault(); //prevent right click
			}).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				var btnClass=$(this).attr("class");
				seq.type=o.scrollButtons.scrollType;
				switch(e.type){
					case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
						if(seq.type==="stepped"){return;}
						touchActive=true;
						d.tweenRunning=false;
						_seq("on",btnClass);
						break;
					case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
					case "mouseout": case "pointerout": case "MSPointerOut":
						if(seq.type==="stepped"){return;}
						touchActive=false;
						if(seq.dir){_seq("off",btnClass);}
						break;
					case "click":
						if(seq.type!=="stepped" || d.tweenRunning){return;}
						_seq("on",btnClass);
						break;
				}
				function _seq(a,c){
					seq.scrollAmount=o.scrollButtons.scrollAmount;
					_sequentialScroll($this,a,c);
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		KEYBOARD EVENTS
		scrolls content via keyboard 
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
		_keyboard=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
				iframe=mCSB_container.find("iframe"),
				events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
			if(iframe.length){
				iframe.each(function(){
					$(this).bind("load",function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
								_onKeyboard(e);
							});
						}
					});
				});
			}
			mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
				_onKeyboard(e);
			});
			function _onKeyboard(e){
				switch(e.type){
					case "blur":
						if(d.tweenRunning && seq.dir){_seq("off",null);}
						break;
					case "keydown": case "keyup":
						var code=e.keyCode ? e.keyCode : e.which,action="on";
						if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
							/* up (38), down (40), left (37), right (39) arrows */
							if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
							if(e.type==="keyup"){action="off";}
							if(!$(document.activeElement).is(editables)){
								e.preventDefault();
								e.stopImmediatePropagation();
								_seq(action,code);
							}
						}else if(code===33 || code===34){
							/* PgUp (33), PgDn (34) */
							if(d.overflowed[0] || d.overflowed[1]){
								e.preventDefault();
								e.stopImmediatePropagation();
							}
							if(e.type==="keyup"){
								_stop($this);
								var keyboardDir=code===34 ? -1 : 1;
								if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
									var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
								}else{
									var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
								}
								_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
							}
						}else if(code===35 || code===36){
							/* End (35), Home (36) */
							if(!$(document.activeElement).is(editables)){
								if(d.overflowed[0] || d.overflowed[1]){
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if(e.type==="keyup"){
									if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
										var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
									}else{
										var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
									}
									_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
								}
							}
						}
						break;
				}
				function _seq(a,c){
					seq.type=o.keyboard.scrollType;
					seq.scrollAmount=o.keyboard.scrollAmount;
					if(seq.type==="stepped" && d.tweenRunning){return;}
					_sequentialScroll($this,a,c);
				}
			}
		},
		/* -------------------- */
		
		
		/* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
		_sequentialScroll=function(el,action,trigger,e,s){
			var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				once=seq.type==="stepped" ? true : false,
				steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
				steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
			switch(action){
				case "on":
					seq.dir=[
						(trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
						(trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
					];
					_stop(el);
					if(_isNumeric(trigger) && seq.type==="stepped"){return;}
					_on(once);
					break;
				case "off":
					_off();
					if(once || (d.tweenRunning && seq.dir)){
						_on(true);
					}
					break;
			}
			
			/* starts sequence */
			function _on(once){
				if(o.snapAmount){seq.scrollAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0]==="x" ? o.snapAmount[1] : o.snapAmount[0];} /* scrolling snapping */
				var c=seq.type!=="stepped", /* continuous scrolling */
					t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
					m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
					contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
					ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
					amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
					px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
					to=seq.scrollAmount!=="auto" ? px : amount,
					easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
					onComplete=!once ? false : true;
				if(once && t<17){
					to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
				}
				_scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
				if(once){
					seq.dir=false;
					return;
				}
				clearTimeout(seq.step);
				seq.step=setTimeout(function(){
					_on();
				},t);
			}
			/* stops sequence */
			function _off(){
				clearTimeout(seq.step);
				_delete(seq,"step");
				_stop(el);
			}
		},
		/* -------------------- */
		
		
		/* returns a yx array from value */
		_arr=function(val){
			var o=$(this).data(pluginPfx).opt,vals=[];
			if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
			/* check if value is object or array, its length and create an array with yx values */
			if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
				vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
				vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
			}else{ /* array value (e.g. [100,100]) */
				vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
			}
			/* check if array values are anonymous functions */
			if(typeof vals[0]==="function"){vals[0]=vals[0]();}
			if(typeof vals[1]==="function"){vals[1]=vals[1]();}
			return vals;
		},
		/* -------------------- */
		
		
		/* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
		_to=function(val,dir){
			if(val==null || typeof val=="undefined"){return;}
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				t=typeof val;
			if(!dir){dir=o.axis==="x" ? "x" : "y";}
			var contentLength=dir==="x" ? mCSB_container.outerWidth(false)-wrapper.width() : mCSB_container.outerHeight(false)-wrapper.height(),
				contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
				cssProp=dir==="x" ? "left" : "top";
			switch(t){
				case "function": /* this currently is not used. Consider removing it */
					return val();
					break;
				case "object": /* js/jquery object */
					var obj=val.jquery ? val : $(val);
					if(!obj.length){return;}
					return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
					break;
				case "string": case "number":
					if(_isNumeric(val)){ /* numeric value */
						return Math.abs(val);
					}else if(val.indexOf("%")!==-1){ /* percentage value */
						return Math.abs(contentLength*parseInt(val)/100);
					}else if(val.indexOf("-=")!==-1){ /* decrease value */
						return Math.abs(contentPos-parseInt(val.split("-=")[1]));
					}else if(val.indexOf("+=")!==-1){ /* inrease value */
						var p=(contentPos+parseInt(val.split("+=")[1]));
						return p>=0 ? 0 : Math.abs(p);
					}else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
						return Math.abs(val.split("px")[0]);
					}else{
						if(val==="top" || val==="left"){ /* special strings */
							return 0;
						}else if(val==="bottom"){
							return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
						}else if(val==="right"){
							return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
						}else if(val==="first" || val==="last"){
							var obj=mCSB_container.find(":"+val);
							return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
						}else{
							if($(val).length){ /* jquery selector */
								return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
							}else{ /* other values (e.g. "100em") */
								mCSB_container.css(cssProp,val);
								methods.update.call(null,$this[0]);
								return;
							}
						}
					}
					break;
			}
		},
		/* -------------------- */
		
		
		/* calls the update method automatically */
		_autoUpdate=function(rem){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(rem){
				/* 
				removes autoUpdate timer 
				usage: _autoUpdate.call(this,"remove");
				*/
				clearTimeout(mCSB_container[0].autoUpdate);
				_delete(mCSB_container[0],"autoUpdate");
				return;
			}
			upd();
			function upd(){
				clearTimeout(mCSB_container[0].autoUpdate);
				if($this.parents("html").length===0){
					/* check element in dom tree */
					$this=null;
					return;
				}
				mCSB_container[0].autoUpdate=setTimeout(function(){
					/* update on specific selector(s) length and size change */
					if(o.advanced.updateOnSelectorChange){
						d.poll.change.n=sizesSum();
						if(d.poll.change.n!==d.poll.change.o){
							d.poll.change.o=d.poll.change.n;
							doUpd(3);
							return;
						}
					}
					/* update on main element and scrollbar size changes */
					if(o.advanced.updateOnContentResize){
						d.poll.size.n=$this[0].scrollHeight+$this[0].scrollWidth+mCSB_container[0].offsetHeight+$this[0].offsetHeight+$this[0].offsetWidth;
						if(d.poll.size.n!==d.poll.size.o){
							d.poll.size.o=d.poll.size.n;
							doUpd(1);
							return;
						}
					}
					/* update on image load */
					if(o.advanced.updateOnImageLoad){
						if(!(o.advanced.updateOnImageLoad==="auto" && o.axis==="y")){ //by default, it doesn't run on vertical content
							d.poll.img.n=mCSB_container.find("img").length;
							if(d.poll.img.n!==d.poll.img.o){
								d.poll.img.o=d.poll.img.n;
								mCSB_container.find("img").each(function(){
									imgLoader(this);
								});
								return;
							}
						}
					}
					if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
				},o.advanced.autoUpdateTimeout);
			}
			/* a tiny image loader */
			function imgLoader(el){
				if($(el).hasClass(classes[2])){doUpd(); return;}
				var img=new Image();
				function createDelegate(contextObject,delegateMethod){
					return function(){return delegateMethod.apply(contextObject,arguments);}
				}
				function imgOnLoad(){
					this.onload=null;
					$(el).addClass(classes[2]);
					doUpd(2);
				}
				img.onload=createDelegate(img,imgOnLoad);
				img.src=el.src;
			}
			/* returns the total height and width sum of all elements matching the selector */
			function sizesSum(){
				if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
				var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
				if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=this.offsetHeight+this.offsetWidth;});}
				return total;
			}
			/* calls the update method */
			function doUpd(cb){
				clearTimeout(mCSB_container[0].autoUpdate);
				methods.update.call(null,$this[0],cb);
			}
		},
		/* -------------------- */
		
		
		/* snaps scrolling to a multiple of a pixels number */
		_snapAmount=function(to,amount,offset){
			return (Math.round(to/amount)*amount-offset); 
		},
		/* -------------------- */
		
		
		/* stops content and scrollbar animations */
		_stop=function(el){
			var d=el.data(pluginPfx),
				sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
			sel.each(function(){
				_stopTween.call(this);
			});
		},
		/* -------------------- */
		
		
		/* 
		ANIMATES CONTENT 
		This is where the actual scrolling happens
		*/
		_scrollTo=function(el,to,options){
			var d=el.data(pluginPfx),o=d.opt,
				defaults={
					trigger:"internal",
					dir:"y",
					scrollEasing:"mcsEaseOut",
					drag:false,
					dur:o.scrollInertia,
					overwrite:"all",
					callbacks:true,
					onStart:true,
					onUpdate:true,
					onComplete:true
				},
				options=$.extend(defaults,options),
				dur=[options.dur,(options.drag ? 0 : options.dur)],
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
				totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
			d.trigger=options.trigger;
			if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
				$(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
				wrapper.scrollTop(0).scrollLeft(0);
			}
			if(to==="_resetY" && !d.contentReset.y){
				/* callbacks: onOverflowYNone */
				if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
				d.contentReset.y=1;
			}
			if(to==="_resetX" && !d.contentReset.x){
				/* callbacks: onOverflowXNone */
				if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
				d.contentReset.x=1;
			}
			if(to==="_resetY" || to==="_resetX"){return;}
			if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
				/* callbacks: onOverflowY */
				if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
				d.contentReset.x=null;
			}
			if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
				/* callbacks: onOverflowX */
				if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
				d.contentReset.x=null;
			}
			if(o.snapAmount){ /* scrolling snapping */
				var snapAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : options.dir==="x" ? o.snapAmount[1] : o.snapAmount[0];
				to=_snapAmount(to,snapAmount,o.snapOffset);
			}
			switch(options.dir){
				case "x":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
						property="left",
						contentPos=mCSB_container[0].offsetLeft,
						limit=[
							mCustomScrollBox.width()-mCSB_container.outerWidth(false),
							mCSB_dragger.parent().width()-mCSB_dragger.width()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
						tso=totalScrollOffsets[1],
						tsbo=totalScrollBackOffsets[1],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
					break;
				case "y":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
						property="top",
						contentPos=mCSB_container[0].offsetTop,
						limit=[
							mCustomScrollBox.height()-mCSB_container.outerHeight(false),
							mCSB_dragger.parent().height()-mCSB_dragger.height()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
						tso=totalScrollOffsets[0],
						tsbo=totalScrollBackOffsets[0],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
					break;
			}
			if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
				scrollTo=[0,0];
			}else if(scrollTo[1]>=limit[1]){
				scrollTo=[limit[0],limit[1]];
			}else{
				scrollTo[0]=-scrollTo[0];
			}
			if(!el[0].mcs){
				_mcs();  /* init mcs object (once) to make it available before callbacks */
				if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
			}
			clearTimeout(mCSB_container[0].onCompleteTimeout);
			_tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
			if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
			_tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
				onStart:function(){
					if(options.callbacks && options.onStart && !d.tweenRunning){
						/* callbacks: onScrollStart */
						if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
						d.tweenRunning=true;
						_onDragClasses(mCSB_dragger);
						d.cbOffsets=_cbOffsets();
					}
				},onUpdate:function(){
					if(options.callbacks && options.onUpdate){
						/* callbacks: whileScrolling */
						if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
					}
				},onComplete:function(){
					if(options.callbacks && options.onComplete){
						if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
						var t=mCSB_container[0].idleTimer || 0;
						mCSB_container[0].onCompleteTimeout=setTimeout(function(){
							/* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
							if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
							if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
							if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
							d.tweenRunning=false;
							mCSB_container[0].idleTimer=0;
							_onDragClasses(mCSB_dragger,"hide");
						},t);
					}
				}
			});
			/* checks if callback function exists */
			function _cb(cb){
				return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
			}
			/* checks whether callback offsets always trigger */
			function _cbOffsets(){
				return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
			}
			/* 
			populates object with useful values for the user 
			values: 
				content: this.mcs.content
				content top position: this.mcs.top 
				content left position: this.mcs.left 
				dragger top position: this.mcs.draggerTop 
				dragger left position: this.mcs.draggerLeft 
				scrolling y percentage: this.mcs.topPct 
				scrolling x percentage: this.mcs.leftPct 
				scrolling direction: this.mcs.direction
			*/
			function _mcs(){
				var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
					dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
					cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
					pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
				el[0].mcs={
					content:mCSB_container, /* original content wrapper as jquery object */
					top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
					topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
					direction:options.dir
				};
				/* 
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc. 
				*/
			}
		},
		/* -------------------- */
		
		
		/* 
		CUSTOM JAVASCRIPT ANIMATION TWEEN 
		Lighter and faster than jquery animate() and css transitions 
		Animates top/left properties and includes easings 
		*/
		_tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var callbacks=callbacks || {},
				onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
				startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
			if(prop==="left"){from=el.offsetLeft;}
			var diff=to-from;
			tobj.stop=0;
			if(overwrite!=="none"){_cancelTween();}
			_startTween();
			function _step(){
				if(tobj.stop){return;}
				if(!progress){onStart.call();}
				progress=_getTime()-startTime;
				_tween();
				if(progress>=tobj.time){
					tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
					if(tobj.time<progress+1){tobj.time=progress+1;}
				}
				if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
			}
			function _tween(){
				if(duration>0){
					tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
					elStyle[prop]=Math.round(tobj.currVal)+"px";
				}else{
					elStyle[prop]=to+"px";
				}
				onUpdate.call();
			}
			function _startTween(){
				_delay=1000/60;
				tobj.time=progress+_delay;
				_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
				tobj.id=_request(_step);
			}
			function _cancelTween(){
				if(tobj.id==null){return;}
				if(!window.requestAnimationFrame){clearTimeout(tobj.id);
				}else{window.cancelAnimationFrame(tobj.id);}
				tobj.id=null;
			}
			function _ease(t,b,c,d,type){
				switch(type){
					case "linear": case "mcsLinear":
						return c*t/d + b;
						break;
					case "mcsLinearOut":
						t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
						break;
					case "easeInOutSmooth":
						t/=d/2;
						if(t<1) return c/2*t*t + b;
						t--;
						return -c/2 * (t*(t-2) - 1) + b;
						break;
					case "easeInOutStrong":
						t/=d/2;
						if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
						t--;
						return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
						break;
					case "easeInOut": case "mcsEaseInOut":
						t/=d/2;
						if(t<1) return c/2*t*t*t + b;
						t-=2;
						return c/2*(t*t*t + 2) + b;
						break;
					case "easeOutSmooth":
						t/=d; t--;
						return -c * (t*t*t*t - 1) + b;
						break;
					case "easeOutStrong":
						return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
						break;
					case "easeOut": case "mcsEaseOut": default:
						var ts=(t/=d)*t,tc=ts*t;
						return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
				}
			}
		},
		/* -------------------- */
		
		
		/* returns current time */
		_getTime=function(){
			if(window.performance && window.performance.now){
				return window.performance.now();
			}else{
				if(window.performance && window.performance.webkitNow){
					return window.performance.webkitNow();
				}else{
					if(Date.now){return Date.now();}else{return new Date().getTime();}
				}
			}
		},
		/* -------------------- */
		
		
		/* stops a tween */
		_stopTween=function(){
			var el=this;
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var props=["top","left"];
			for(var i=0; i<props.length; i++){
				var prop=props[i];
				if(el._mTween[prop].id){
					if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
					}else{window.cancelAnimationFrame(el._mTween[prop].id);}
					el._mTween[prop].id=null;
					el._mTween[prop].stop=1;
				}
			}
		},
		/* -------------------- */
		
		
		/* deletes a property (avoiding the exception thrown by IE) */
		_delete=function(c,m){
			try{delete c[m];}catch(e){c[m]=null;}
		},
		/* -------------------- */
		
		
		/* detects left mouse button */
		_mouseBtnLeft=function(e){
			return !(e.which && e.which!==1);
		},
		/* -------------------- */
		
		
		/* detects if pointer type event is touch */
		_pointerTouch=function(e){
			var t=e.originalEvent.pointerType;
			return !(t && t!=="touch" && t!==2);
		},
		/* -------------------- */
		
		
		/* checks if value is numeric */
		_isNumeric=function(val){
			return !isNaN(parseFloat(val)) && isFinite(val);
		},
		/* -------------------- */
		
		
		/* returns element position according to content */
		_childPos=function(el){
			var p=el.parents(".mCSB_container");
			return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
		},
		/* -------------------- */
		
		
		/* checks if browser tab is hidden/inactive via Page Visibility API */
		_isTabHidden=function(){
			var prop=_getHiddenProp();
			if(!prop) return false;
			return document[prop];
			function _getHiddenProp(){
				var pfx=["webkit","moz","ms","o"];
				if("hidden" in document) return "hidden"; //natively supported
				for(var i=0; i<pfx.length; i++){ //prefixed
				    if((pfx[i]+"Hidden") in document) 
				        return pfx[i]+"Hidden";
				}
				return null; //not supported
			}
		};
		/* -------------------- */
		
	
	
	
	
	/* 
	----------------------------------------
	PLUGIN SETUP 
	----------------------------------------
	*/
	
	/* plugin constructor functions */
	$.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	$[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	
	/* 
	allow setting plugin default options. 
	usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
	to apply any changed default options on default selectors (below), use inside document ready fn 
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
	$[pluginNS].defaults=defaults;
	
	/* 
	add window object (window.mCustomScrollbar) 
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
	window[pluginNS]=true;
	
	$(window).bind("load",function(){
		
		$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
		
		/* extend jQuery expressions */
		$.extend($.expr[":"],{
			/* checks if element is within scrollable viewport */
			mcsInView:$.expr[":"].mcsInView || function(el){
				var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
				if(!content.length){return;}
				wrapper=content.parent();
				cPos=[content[0].offsetTop,content[0].offsetLeft];
				return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) && 
						cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
			},
			/* checks if element or part of element is in view of scrollable viewport */
			mcsInSight:$.expr[":"].mcsInSight || function(el,i,m){
				var $el=$(el),elD,content=$el.parents(".mCSB_container"),wrapperView,pos,wrapperViewPct,
					pctVals=m[3]==="exact" ? [[1,0],[1,0]] : [[0.9,0.1],[0.6,0.4]];
				if(!content.length){return;}
				elD=[$el.outerHeight(false),$el.outerWidth(false)];
				pos=[content[0].offsetTop+_childPos($el)[0],content[0].offsetLeft+_childPos($el)[1]];
				wrapperView=[content.parent()[0].offsetHeight,content.parent()[0].offsetWidth];
				wrapperViewPct=[elD[0]<wrapperView[0] ? pctVals[0] : pctVals[1],elD[1]<wrapperView[1] ? pctVals[0] : pctVals[1]];
				return 	pos[0]-(wrapperView[0]*wrapperViewPct[0][0])<0 && pos[0]+elD[0]-(wrapperView[0]*wrapperViewPct[0][1])>=0 && 
						pos[1]-(wrapperView[1]*wrapperViewPct[1][0])<0 && pos[1]+elD[1]-(wrapperView[1]*wrapperViewPct[1][1])>=0;
			},
			/* checks if element is overflowed having visible scrollbar(s) */
			mcsOverflow:$.expr[":"].mcsOverflow || function(el){
				var d=$(el).data(pluginPfx);
				if(!d){return;}
				return d.overflowed[0] || d.overflowed[1];
			}
		});
	
	});

}))}));
$(function() {

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.querySelector(".users-list");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.querySelectorAll("tbody tr");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 0; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].querySelectorAll("td")[n];
                y = rows[i + 1].querySelectorAll("td")[n];
                console.log(x);
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    $(document).on('click', 'th.t-login', function () {
        sortTable(0);
    });
    $(document).on('click', 'th.t-rol', function () {
        sortTable(1);
    });
    $(document).on('click', 'th.t-name', function () {
        sortTable(2);
    });
    $(document).on('click', 'th.t-status', function () {
        sortTable(3);
    });
    $(document).on('click', 'th.t-visited', function () {
        sortTable(4);
    });
    $(document).on('click', 'th.t-online-status', function () {
        sortTable(5);
    });


});
$(function () {
    $('.main__form--content').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.main__form--buttons a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.main__form--buttons a').removeClass('active');
        $(this).addClass('active');
        $('.main__form--content').hide(0);
        $(tabId).fadeIn();
    });
});
$(function () {

    $(document).on('click', '.voting-actions-all-btn', function (e) {

        if ($(this).hasClass('input-selected')) {

            $('li.input-selected input').removeAttr('checked', 'checked');
            $('li.input-selected').removeClass('input-selected');
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
            $('.voting-true input').attr('checked', 'checked');
        }
        else {
            $('.voting-true').removeClass('input-selected');
            $('.voting-true input').removeAttr('checked', 'checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close input').attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close input').removeAttr('checked', 'checked');
        }

        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
            $('.voting-false input').attr('checked', 'checked');
        }
        else {
            $('.voting-false').removeClass('input-selected');
            $('.voting-false input').removeAttr('checked', 'checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close a').attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close a').removeAttr('checked', 'checked');
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
            $('.voting-abstained input').attr('checked', 'checked');
        }
        else {
            $('.voting-abstained').removeClass('input-selected');
            $('.voting-abstained input').removeAttr('checked', 'checked');
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
            $('.voting-veto input').attr('checked', 'checked');
        }
        else {
            $('.voting-veto').removeClass('input-selected');
            $('.voting-veto input').removeAttr('checked', 'checked');
        }
        return false;


    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        $('.voting-actions-all-btn').removeClass('input-selected');
        $('.voting-actions-all-btn input').removeAttr('checked', 'checked');
        if ($(this).hasClass('input-selected')) {
            console.log(111);
            $(this).removeClass('input-selected').find('input').removeAttr('checked', 'checked');
        }
        else {
            $(this).closest('.voting-inputs__choice').find('.input-selected').removeClass('input-selected');
            $(this).closest('.voting-inputs__choice').find('input').removeAttr('checked', 'checked');
            $(this).addClass('input-selected').find('input').attr('checked', 'checked');
        }


        return false;


    });
});



$(function () {

    /* кнопки разделения голосов формы ввода */

    $(document).on('click', '.separation-votes .voting-actions-btn', function () {
        if ($(this).hasClass('voting-active')) {
            $(this).removeClass('voting-active');
        }
        else {
            $(this).addClass('voting-active');
            $(this).closest('.voting-actions__choice-wrap').find('.change-span').click();
        }
        var parent = $(this).closest('.voting-actions__choice-wrap');
        var changeSpan = parent.find('.change-span');
        var inputHide = parent.find('.input-hide');
        changeSpan.text('0');
        inputHide.val('0');

        return false;
    });
    $(document).on('click', '.separation-votes .voting-btn-cumulative', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputHide = parent.find('.separation-cumulative-za');
        var changeSpan = parent.find('.change-span-candidate');
        var totaLeft = parent.find('.votes-left .total-left');
        var totalMax = parent.find('.votes-left .total-max').text();
        var totalVotes = parent.find('.voting-actions__wrap-input .totals-votes');
        if ($(this).hasClass('voting-active')) {
            $(this).removeClass('voting-active');
        }
        else {
            $(this).addClass('voting-active').removeClass('voting-not-active');
            // $(this).closest('.voting-actions__choice-wrap').find('.change-span').click();
        }
        if (!$(this).hasClass('voting-active')) {
            changeSpan.text('0');
            inputHide.val('0');
            totalVotes.text('0');
            totaLeft.text(totalMax);
        }
        // var changeSpan = $('.change-span-candidate');
        // var inputHide = $('.separation-cumulative-za');
        // changeSpan.text('0');
        // inputHide.val('0');

        return false;
    });

    // перезаписываем значение в change-span, если в инпут были введены цифры. + обрабатываем введенные цифры и добавляем разряды числам.
    $(document).on(' change ', '.input-hide', function () {
        var number = $(this).val().replace(/^0+/, '');
        $(this).val(number);
        var changeSpan = $(this).closest('.voting-actions__wrap-input').find('.change-span');
        var convert = convertFraction(number);
        changeSpan.html(convert.replace('0',''));
        HtmlEncode(convert, changeSpan);
    });


    $(document).on('keydown', '.input-hide', function (e) {
        if ($(this).val().indexOf(' ') !== -1 && e.keyCode === 32) return false;
        var container = $(this).closest('.input-hide-wrap');
        var changleSpan = $(".change-span");
        var validFraction = $('.validation-fraction');
        // если во время ввода в контроле ввода был нажат Enter, сохраняем значения в change-span
        if (e.key === 'Enter') {
            if (validFraction.is(':visible')) {
            }
            else {
                $(this).trigger('blur');
                container.hide();
                changleSpan.show();
                inputCheckValForBtnActive();
            }
        }

        // если во время ввода в контроле ввода был нажат ESC закрываем контрол вввода и обнуляем значение
        if (e.keyCode === 27) {
            $(this).val('0');
            container.siblings('.change-span').show().text('0');
            container.hide();
            calculateTotalVoises($(this));
        }
        // делаем запрет ввода символов и разрешаем ввод только чисел и дроби
        return isAllowedKeyCode(e.originalEvent.key);
    });

    $(document).on('click', '.change-span', function () {

        var parent = $(this).closest('.voting-actions__choice-wrap');
        var btn = parent.find('.voting-actions-btn');
        var btnVotesZa = parent.find('.voting-btn-cumulative');
        var inputHide = parent.find('.input-hide');
        if (parent.hasClass('voting-parent-active')) {
            parent.removeClass('voting-parent-active');
        }
        else {
            parent.addClass('voting-parent-active');
            if (!btn.hasClass('voting-active')) {
                btn.trigger('click');
            }
            if (!btnVotesZa.hasClass('voting-active')) {
                btnVotesZa.addClass('voting-active').removeClass('voting-not-active');
            }

        }
        $(this).hide();

        $(this).siblings('.input-hide-wrap').show().addClass('input-hide-visible');
        inputHide.val(inputHide.val().trim());
        inputHide.select();

    });

    $(document).mouseup(function (e) {
        var container = $(".input-hide-wrap");
        var changleSpan = $(".change-span");
        var validFraction = $('.validation-fraction');
        var wrap = $('.wrap');
        if (validFraction.is(':visible')) {
            wrap.css({
                pointerEvents: 'none'
            })
        }
        else {
            if (container.has(e.target).length === 0) {
                container.hide();
                changleSpan.show();
                inputCheckValForBtnActive();
                wrap.css({
                    pointerEvents: 'auto'
                })
            }
        }

    });

//Функция проверки на введеные данные, если голосов 0 то кнопка неактивна по закрытию контролла ввода
    function inputCheckValForBtnActive() {
        var parent = $('.separation-votes .voting-actions__choice-wrap');
        parent.each(function () {
            var btn = $(this).find('.voting-actions-btn');
            var inputHide = $(this).find('.input-hide');
            if (inputHide.val() === '0') {
                btn.removeClass('voting-active');
            }
        });

    }

    function calculateTotalVoises(_this) {
        // var changeSpan = $('.separation-votes .cum-change-span');
        // var votingClose = $('.voting-close');
        var parent = _this.closest('.separation-votes  .voting-actions__choice-btn');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeftMassEntry = parent.find('.total-left');
        var btnNotActive = parent.find('.voting-actions-btn');
        var btnNotZa = parent.find('.voting-btn-cumulative');
        var btnInvalid = parent.find('.voting-close');
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (result) {
            if (result['status'] === "success") {
                totalLeftMassEntry.text(result.result);
                $(this).closest('.voting-actions__choice-wrap').removeClass('.voting-parent-active');
                if (result.result[0] === '-') {
                    btnNotActive.addClass('voting-not-active');
                    btnNotZa.addClass('voting-not-active');
                    btnInvalid.addClass('voting-active');
                    checkMinusColor();
                }
                else {
                    btnNotActive.removeClass('voting-not-active');
                    btnInvalid.removeClass('voting-active');
                    checkMinusColor();
                }
            }

        });
        if (_this.val() === '') {
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(0);

        }
    }

    // Функция которая проверяет после голосования "Total-left/Голосов осталось" на первый знак минус, если он есть тогда данные красного цвета
    function checkMinusColor() {
        var totalLeft = $('.separation-votes .votes-left .total-left');
        if (totalLeft.text().trim()[0] === '-') {
            totalLeft.css({
                color: 'red'
            })
        }
        else {
            totalLeft.css({
                color: '#141414'
            })
        }
    }

    checkMinusColor();


    function convertFraction(_number) {
        var fractionArray = [
            {originalFrac: '1/2', convertedFrac: '&frac12;'},
            {originalFrac: '1/3', convertedFrac: '&frac13;'},
            {originalFrac: '1/4', convertedFrac: '&frac14;'},
            {originalFrac: '1/5', convertedFrac: '&frac15;'},
            {originalFrac: '1/6', convertedFrac: '&frac16;'},
            {originalFrac: '1/8', convertedFrac: '&frac18;'},
            {originalFrac: '2/3', convertedFrac: '&frac23;'},
            {originalFrac: '2/5', convertedFrac: '&frac25;'},
            {originalFrac: '3/4', convertedFrac: '&frac34;'},
            {originalFrac: '3/5', convertedFrac: '&frac35;'},
            {originalFrac: '3/8', convertedFrac: '&frac38;'},
            {originalFrac: '4/5', convertedFrac: '&frac45;'},
            {originalFrac: '5/6', convertedFrac: '&frac56;'},
            {originalFrac: '5/8', convertedFrac: '&frac58;'},
            {originalFrac: '7/8', convertedFrac: '&frac78;'}
        ];
        var number = _number.replace(' ', '');
        var convertedFrac;
        // Если _number - это число без дроби
        if (!isNaN(number)) {
            return number.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        }
        // Если _number - это дробь без целой части
        if (_number.indexOf(' ') === -1) {
            convertedFrac = findFraction(number);
            return convertedFrac
        }
        // Если _number - это дробь с целой частью
        else {
            var fraction = _number.slice(_number.indexOf(' ') + 1);
            var integer = _number.slice(0, _number.indexOf(' ')).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            convertedFrac = findFraction(fraction);
            return integer + ' ' + convertedFrac
        }

        function findFraction(number_) {
            for (var i = 0; i < fractionArray.length; i++) {
                if (fractionArray[i].originalFrac === number_) {
                    return fractionArray[i].convertedFrac;
                }
            }
            return number_;
        }
    }

    //функция обработки спец символа дроби принимает параметыр s-символ и selector - селектор по которому нужно обрабатывать
    function HtmlEncode(s, selector) {
        return selector.html(s);
    }


    $(document).on('keyup', '.separation-votes .input-hide', function () {
        calculateTotalVoises($(this));
    });

    // Событие на кнопки с разделенным голосованием, если в поле инпут было введено значение, а потом отжали кнопку ЗА ПРОТИВ или ВОЗДЕРЖАЛСЯ, то значение в инпуте сбрасывается и пересчитывается счетчик "Голосов осталось"
    $(document).on('click', '.voting-actions-btn', function () {
        var _this = $(this);
        var parent = _this.closest('.voting-actions__choice-wrap');
        var inputHide = parent.find('.input-hide');
        calculateTotalVoises(inputHide);
    });

    $(document).on('blur', '.separation-votes .input-hide', function () {
        var parent = $(this).closest('.voting-actions__wrap-input');
        var inputsForClear = parent.find('.input-hide');
        var spansForClear = parent.find('.change-span');
        clearInputs(inputsForClear, spansForClear);
        $(this).trigger('focus');
    });


    // функция проверки если кнопка ЗА
    $(document).on('click', '.cumulative-voting-input .voting-false', function () {
        var parent = $(this).closest('.voting-inputs__choice');
        var btnZa = parent.find('.voting-true');
        if ($(this).hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }

    });
    $(document).on('click', '.cumulative-voting-input  .voting-abstain', function () {
        var parent = $(this).closest('.voting-inputs__choice');
        var btnZa = parent.find('.voting-true');
        if ($(this).hasClass('input-selected')) {
            btnZa.removeClass('input-not-selected');
        }
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-true', function () {

        var parent = $(this).closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        var inputHide = $('.cumulative-voting-input .input-hide');
        var changeSpan = $('.cumulative-voting-input  .change-span');
        var totalLeft = parent.find('.total-left');
        var totalMax = parent.find('.total-max').text();
        if ($(this).hasClass('input-selected')) {
            votesLeft.css('display', 'flex');
            votes.hide();
        }
        else {
            votesLeft.hide();
            votes.show();
        }
        if (!$(this).hasClass('input-selected')) {
            changeSpan.text('0');
            inputHide.val('0');
            totalLeft.text(totalMax);
        }

    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-false', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-abstained', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-close', function () {
        $('.separation-cumulative .input-hide').val(0);
        $('.separation-cumulative .change-span').text('0');
    });
    $(document).on('click', '.change-span-candidate', function () {
        $('.cum-not-dividing .votes').hide();
        $('.cum-not-dividing .votes-left').show();
        var inputHideWrap = $(this).siblings('.input-hide-wrap');
        var parent = $(this).closest('.cumulative-voting-input');
        if (inputHideWrap.css('display', 'block')) {
            if (!parent.find('.voting-actions-sing-btn.voting-true').hasClass('input-selected')) {
                parent.find('.voting-actions-sing-btn.voting-true').click();
            }
            if (!parent.find('.voting-btn-cumulative.voting-true').hasClass('input-selected')) {
                parent.find('.voting-btn-cumulative.voting-true').addClass('voting-active').removeClass('voting-not-active');
            }
        }
    });

    // Очистка инпутов и спанов в кумулятивном не разделенном голосовании
    function cumNotSeparVotingClearInput(_this) {
        var parent = _this.closest('.voting-enter__td.margin-left-auto');
        var votes = parent.find('.votes');
        var votesLeft = parent.find('.votes-left');
        parent.find('.total-left').css('color', '#141414');
        parent.find('.voting-true').removeClass('disable-votin-btn');
        votesLeft.hide();
        votes.show();
        clearInputs(parent.find('.input-hide'), parent.find('.change-span'))
    }

    $(document).on('click', '.cumulative-voting-input .not-separation .voting-false', function () {
        cumNotSeparVotingClearInput($(this))
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-abstained', function () {
        cumNotSeparVotingClearInput($(this))
    });
    $(document).on('click', '.cumulative-voting-input .not-separation .voting-close', function () {
        cumNotSeparVotingClearInput($(this));
    });

    $(document).on('click', '.separation-votes .voting-close', function () {
        var parent = $(this).closest('.voting-enter__tr');
        ajaxForSeparationBtn($(this)).done(function () {
            parent.find('.voting-close').click()
        });
    });


    $(document).on('click', '.input-balance', function () {
        var parent = $(this).closest('.separation-votes');
        var votesLeft = parent.find('.total-left');
        var inputHide = $(this).closest('.voting-actions__choice-wrap').find('.input-hide');
        var changeSpan = $(this).closest('.voting-actions__choice-wrap').find('.change-span');
        var inputMassEntry = parent.find('.input-hide');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        massEntryArray.splice(massEntryArray.indexOf($(this).siblings('input').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (data) {
            if (votesLeft.text() === '0') {
                return false;
            }
            else {
                inputHide.val(data.result.replace(/\u00a0/g, ''));
                changeSpan.text(data.result);
                votesLeft.text(0);
            }
        })

    });

    // ajax запрос для кнопки разделения голосов в форме ввода
    function ajaxForSeparationBtn($this) {
        var meetingId = $('.meeting-id').val();
        var decisionIdInput = $this.closest('.voting-enter__td.margin-left-auto').find('.decision-id').val();
        var url = new URL(window.location.href);
        var registerAccountId = url.searchParams.get('registerAccountId');
        var _this = $this;
        var parent = _this.closest('.voting-multiple-candidates');
        if (_this.closest('.voting-multiple-candidates').length) {
            _this.closest('.voting-inputs__choice').find('.voting-actions-sing-btn.voting-true.input-selected').click();
        }
        return $.ajax({
            url: '/Manager/Input/SplitVoicesAjax/' + meetingId,
            type: 'post',
            data: {
                decisionID: decisionIdInput,
                registerAccountId: registerAccountId,
            },
            success: function (data) {
                var content = _this.closest('.voting-enter__tr').find('.voting-enter__td.margin-left-auto');
                setTimeout(function () {
                    content[0].outerHTML = data;
                    toggleVotesZaCandidate(parent);
                    disabledAllBtnSeparation();
                    separationVotesBtnSubstitution();
                    vetoCheckBtn();
                }, 0);
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href = '/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }

        });


    }


    // Если в простом голосование разделены голоса, то верхний ряд кнопок disabled
    function disabledAllBtnSeparation() {
        if ($('.separation-votes').length > 0) {
            $('.voting-enter__select-all .voting-inputs').addClass('input-sent-candidate');
        }
        else {
            $('.voting-enter__select-all .voting-inputs').removeClass('input-sent-candidate');
        }
    }

    disabledAllBtnSeparation();

    $(document).on('click', '.voting-divide', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = _this.closest('.voting-multiple-candidates');
        var parentSepar = _this.closest('.cumulative-voting-input');
        ajaxForSeparationBtn(_this).done(function () {
            toggleVotesZaCandidate(parent);

            var changeSpanCandidate = parentSepar.find('.change-span-candidate');
            var inputHideCumulative = parentSepar.find('.separation-cumulative-za');
            changeSpanCandidate.text('0');
            inputHideCumulative.val('0');
        })


    });

    function separationVotesBtnSubstitution() {
        var parentCum = $('.cumulative-voting-input');
        var separationBlockCumulative = parentCum.find('.separation-votes.voting-sent');
        var btnZaCumSeparationZa = separationBlockCumulative.find('.voting-true');
        btnZaCumSeparationZa.removeClass('voting-actions-btn').addClass('voting-btn-cumulative voting-not-active');

    }

    separationVotesBtnSubstitution();
    // сворачиваем разделение голосов
    $(document).on('click', '.voting-clear-division', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = _this.closest('.voting-multiple-candidates');
        var parentSepar = _this.closest('.cumulative-voting-input');
        var btnAllVotingClose = $('.voting-actions-all-btn.voting-close');
        ajaxForSeparationBtn($(this)).done(function () {
            var changeSpanCandidate = parentSepar.find('.change-span-candidate');
            var inputHideCumulative = parentSepar.find('.separation-cumulative-za');
            changeSpanCandidate.text('0');
            inputHideCumulative.val('0');
            if (parent.length) {
                disabledAllBtn();
                toggleVotesZaCandidate(parent);
                votesZaSimpleMultiplySum(parent.find('.voting-clear-division'))
            }
            // после сворачивания голосов делаем проверку на кнопку "Х" всего бюллетеня. если есть ненажатые кнопки "Х" по вопросу, тогда отжимаем кнопку у всего бюллетеня
            if (btnAllVotingClose.hasClass('input-selected')) {
                btnAllVotingClose.removeClass('input-selected');
            }
        });

    });

    function toggleVotesZaCandidateInit() {
        var parents = $('.voting-multiple-candidates');
        parents.each(function () {
            toggleVotesZaCandidate($(this));
        });

    }

    toggleVotesZaCandidateInit();

    function toggleVotesZaCandidate(parent) {
        if (parent.length) {
            if (parent.find('.separation-votes').length) {
                parent.find('.votes-za-candidate').css('display', 'flex');
            }
            else {
                parent.find('.votes-za-candidate').hide().find('.total-left').text('0');
            }
        }
    }

    function votesZaSimpleMultiplySum(_this) {
        var parent = _this.closest('.voting-multiple-candidates');
        var blocks = parent.find('.separation-votes');
        var arrForSnd = [];
        var clickedNotSeparatedBtn = parent.find('.voting-actions-sing-btn.voting-true.input-selected');
        blocks.each(function () {
            if ($(this).find('.input-hide').val() === '') {
                arrForSnd.push(0);
                return true;
            }
            arrForSnd.push($(this).find('.input-hide:first').val());
        });
        clickedNotSeparatedBtn.each(function () {
            arrForSnd.push($(this).closest('.voting-inputs').find('.votes-per-candidate').val().replace(/\u00a0/g, ''));
        });

        additionFraction(arrForSnd.join(';')).done(function (data) {
            if (blocks.length) {
                parent.find('.votes-za-candidate .total-left').text(data.result);
            } else {
                parent.find('.votes-za-candidate .total-left:first').text(0)
            }
        })

    }

    $(document).on('keyup blur change', '.voting-multiple-candidates .separation-votes .input-hide', function (e) {

        if ($(this).closest('.voting-actions__choice-wrap').find('.voting-true').length) {
            // if ($(this).val() === '' && e.type === 'keyup') return false;
            votesZaSimpleMultiplySum($(this));
        }
    });
    $(document).on('click', '.voting-multiple-candidates .voting-clear-division', function (e) {
        if ($(this).closest('.voting-actions__choice-wrap').find('.voting-true').length) {
            // if ($(this).val() === '' && e.type === 'keyup') return false;
            votesZaSimpleMultiplySum($(this));
        }
    });
    $(document).on('click', '.voting-multiple-candidates .voting-divide', function (e) {
        $(this).closest('.voting-actions__choice-wrap').find('.voting-true').click();
    });

    $(document).on('click', '.voting-multiple-candidates .separation-votes .input-balance', function () {
        $(this).trigger('blur');
    });
    // Кумулятивное голосование!

    $(document).on('blur', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var givenZa = parent.find('.totals-votes');
        var arrOfInputsYes = parent.find('.separation-cumulative-za');
        var arrOfInputsYesVal = [];
        arrOfInputsYes.each(function () {
            //Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }

            arrOfInputsYesVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });

        additionFraction(arrOfInputsYesVal.join(';')).done(function (res) {
            givenZa.text(res.result);
            givenZa.closest('.separation-cumulative-wrap-input').find('.input-hide').val(res.result.replace(/\s+/g, ''));
            calculateTotalVoises(givenZa)
        });

    });
    $(document).on('keyup', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var givenZa = parent.find('.totals-votes');
        var arrOfInputsYes = parent.find('.separation-cumulative-za');
        var arrOfInputsYesVal = [];
        arrOfInputsYes.each(function () {
            //Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            arrOfInputsYesVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });
        additionFraction(arrOfInputsYesVal.join(';')).done(function (res) {
            givenZa.text(res.result);
            givenZa.closest('.separation-cumulative-wrap-input').find('.input-hide').val(res.result.replace(/\s+/g, ''));
            calculateTotalVoises(givenZa);
            var votingTrue = parent.find('.voting-true.voting-btn-cumulative');
            if (givenZa.text() === "0") {
                votingTrue.addClass('voting-not-active');
            }

        });

    });
    $(document).on('change', '.cumulative-voting-input .separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var zaBtn = parent.find('.voting-true');


        if (zaBtn.hasClass('voting-active')) {
            return false
        }
        if (zaBtn.hasClass('input-selected')) {
            return false
        }
        zaBtn.click();
        checkSeparationInputHideFocus();
    });

    $(document).on('click', '.input-cum-balance', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputMassEntry = parent.find('.separation-cumulative-za');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeft = parent.find('.total-left');
        var _this = $(this);
        inputMassEntry.each(function () {
            massEntryArray.push($(this).val());
        });
        massEntryArray.splice(massEntryArray.indexOf($(this).closest('.input-hide-wrap').find('.separation-cumulative-za').val()), 1);
        fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (res) {
            totalLeft.text(0);
            if (!parent.find('.voting-true').hasClass('input-selected')) {
                parent.find('.voting-true').click();
            }
            _this.closest('.input-hide-wrap').find('.separation-cumulative-za').val(res.result.replace(/\u00a0/g, ''));
            _this.closest('.voting-actions__wrap-input').find('.change-span').text(res.result);
            var zaBtn = parent.find('.voting-true');
            if (res['status'] === "success") {
                if (res.result[0] === '-') {
                    zaBtn.addClass('disable-votin-btn');
                    parent.find('.voting-close').addClass('input-selected');
                    totalLeft.css({
                        color: 'red'
                    })
                }
                else {
                    zaBtn.removeClass('disable-votin-btn');
                    parent.find('.voting-close').removeClass('input-selected');
                    totalLeft.css({
                        color: '#141414'
                    })
                }
            }
        })

    });

    // Кумулятивное голосование, кандидаты
    $(document).on('keyup', '.separation-cumulative-za', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var isDividing = parent.find('.cum-not-dividing').length > 0;
        var inputMassEntry = parent.find('.separation-cumulative-za');
        var massEntryArray = [];
        var massEntryTotal = parent.find('.total-max').text();
        var totalLeft = parent.find('.votes-left .total-left');
        if (isDividing) {
            inputMassEntry.each(function () {
                massEntryArray.push($(this).val());
            });
            fractionMinusArrayFraction(massEntryArray, massEntryTotal).done(function (result) {
                totalLeft.text(result.result);
                var zaBtn = parent.find('.voting-true');
                if (result['status'] === "success") {
                    totalLeft.text(result.result);
                    if (result.result[0] === '-') {
                        zaBtn.addClass('disable-votin-btn');
                        parent.find('.voting-close').addClass('input-selected');
                        totalLeft.css({
                            color: 'red'
                        })
                    }
                    else {
                        zaBtn.removeClass('disable-votin-btn');
                        parent.find('.voting-close').removeClass('input-selected');
                        totalLeft.css({
                            color: '#141414'
                        })
                    }
                }
            })
        }

    });

    $(document).on('keydown keyup', '.separation-cumulative-za', function (e) {
        var parent = $(this).closest('.cumulative-voting-input');
        var flag = 0;
        var arrayInput = parent.find('.input-hide');
        var validError = parent.find('.input-hide-wrap .validation-fraction');
        arrayInput.each(function () {
            if (isNaN($(this).val().trim())) {
                flag++
            }
        });
        if (flag > 1) {
            // add error
            validError.show();
            arrayInput.addClass('error-fraction');
            return validationFraction(e.originalEvent.key);
        }
        if (flag <= 1) {
            //remove error
            validError.hide();
            arrayInput.removeClass('error-fraction');
        }

    });

    // очистка инпутов в кумулятивном не разделенном голосовании
    $(document).on('click', '.cum-not-dividing .voting-false', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputsForClear = parent.find('.separation-cumulative-za');
        var spansForClear = parent.find('.change-span');
        var totalMax = parent.find('.total-max:first');
        var totalLeft = parent.find('.total-left');
        totalLeft.text(totalMax.text());
        clearInputs(inputsForClear, spansForClear);

    });
    $(document).on('click', '.cum-not-dividing .voting-abstained', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var inputsForClear = parent.find('.separation-cumulative-za');
        var spansForClear = parent.find('.change-span');
        var totalMax = parent.find('.total-max:first');
        var totalLeft = parent.find('.total-left');
        totalLeft.text(totalMax.text());
        clearInputs(inputsForClear, spansForClear);
    });

//  Проверка change-span, если пустой, то добавляем 0 по умолчаниюа
    function clearInputs(inputs, spans) {
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                $(this).val(0);
            }
        });
        spans.each(function () {
            if ($(this).text().trim() === '') {
                $(this).text(0)
            }

        })
    }

    var inputHideValid = $('.input-hide');
    var changeSpanValid = $('.change-span');
    clearInputs(inputHideValid, changeSpanValid);
    // Клики по кнопке 1/* голосов
    $(document).on('click', '.cumulative-voting-input .division-votes', function () {
        var parent = $(this).closest('.cumulative-voting-input');
        var amountCandidates = parent.find('.candidateQuota').val().trim();
        var totalVoices = parent.find('.total-max').text().replace(/\u00a0/g, ''); // Удаляем спецсимвол пробела
        var totalLeft = parent.find('.total-left');
        var input = $(this).closest('.voting-actions__wrap-input').find('.separation-cumulative-za');
        var span = $(this).closest('.voting-actions__wrap-input').find('.change-span');
        var _this = $(this);

        $.ajax({
            url: '/FractionCalculator/Divide',
            type: 'get',
            data: {
                value1: totalVoices,
                value2: amountCandidates
            },
            dataType: 'json',
            success: function (html) {
                if (!parent.find('.voting-true').hasClass('input-selected')) {
                    parent.find('.voting-true').click();
                }
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                }
                else {
                    var saveFraction = request.slice(-1);
                    input.val(request);
                    span.text(request.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + saveFraction);
                    var arrOfInputs = parent.find('.separation-cumulative-za');
                    var arrOfInputsVal = [];
                    arrOfInputs.each(function () {
                        // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
                        if ($(this).val().trim() === '') {
                            $(this).val(0)
                        }
                        arrOfInputsVal.push($(this).val()); // Значение каждого инпута заносим в массив
                    });
                    additionFraction(arrOfInputsVal.join(';')).done(function () {
                        fractionMinusArrayFraction(arrOfInputsVal, totalVoices).done(function (result) {
                            var zaBtn = parent.find('.voting-true');
                            if (result['status'] === "success") {
                                totalLeft.text(result.result);
                                if (result.result[0] === '-') {
                                    zaBtn.addClass('disable-votin-btn');
                                    parent.find('.voting-close').addClass('input-selected');
                                    totalLeft.css({
                                        color: 'red'
                                    })
                                }
                            }
                        })
                    });
                }
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href = '/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        })
    });

// Если есть количество кандидатов в голосовании, то кнопки: за, против, воздержался не активные
    function disabledAllBtn() {
        var candidates = $('.candidateQuota').val();
        if (candidates > 0) {
            $('.voting-enter__select-all .voting-inputs').addClass('input-sent-candidate');
        }
    }

    disabledAllBtn();

// функция проверки  если выбран один ряд кнопок за/против/воздержался, тогда кнопка в верхнем ряду становится активной.

    function autoButtonPressAbstained() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnAbstained = parentAllBtn.find('.voting-abstained'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnAbstained = parentSingBtn.find('.voting-abstained').length,
            inputSelected = parentSingBtn.find('.voting-abstained.input-selected').length;

        if (singBtnAbstained === inputSelected) {
            btnAbstained.addClass('input-selected');
            if (candidates > 0) {
                btnAbstained.removeClass('input-selected');
            }
        }

    }

    function autoButtonPressFalse() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnFalse = parentAllBtn.find('.voting-false'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnFalse = parentSingBtn.find('.voting-false').length,
            inputSelected = parentSingBtn.find('.voting-false.input-selected').length;

        if (singBtnFalse === inputSelected) {
            btnFalse.addClass('input-selected');
            if (candidates > 0) {
                btnFalse.removeClass('input-selected');
            }
        }
    }

    function autoButtonPressTrue() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnTrue = parentAllBtn.find('.voting-true'),
            candidates = $('.candidateQuota').val(),

            parentSingBtn = $('.disabled-form'),
            singBtnTrue = parentSingBtn.find('.voting-true').length,
            inputSelected = parentSingBtn.find('.voting-true.input-selected').length;

        if (singBtnTrue === inputSelected) {
            btnTrue.addClass('input-selected');
            if (candidates > 0) {
                btnTrue.removeClass('input-selected');
            }
        }
        disabledAllBtn();
    }

    function autoBtnPressClose() {

        var parentAllBtn = $('.voting-enter__select-all .voting-inputs__choice'),
            btnClose = parentAllBtn.find('.voting-close'),

            parentSingBtn = $('.disabled-form'),
            singBtnClose = parentSingBtn.find('.voting-close').length,
            inputSelected = parentSingBtn.find('.voting-close.input-selected').length;

        if (singBtnClose === inputSelected) {
            btnClose.addClass('input-selected');
        }
        disabledAllBtn();
    }

    autoBtnPressClose();

    $(document).on('click', '.disabled-form .voting-abstained', function () {
        autoButtonPressAbstained();
    });
    $(document).on('click', '.disabled-form .voting-false', function () {
        autoButtonPressFalse();
    });
    $(document).on('click', '.disabled-form .voting-close', function () {
        autoBtnPressClose();
    });
    $(document).on('click', '.disabled-form .voting-true', function () {
        autoButtonPressTrue();
    });

    // Функция проверки количества голосов, если голосов ноль, то кнопки disabled
    function numberCheckVotes() {
        var parents = $('.voting-enter__td.margin-left-auto');
        parents.each(function () {
            var btnDisabled = $(this).find('.voting-inputs'),
                total = $(this).find('.total-left'),
                btn = $(this).find('.voting-actions-sing-btn');

            if (total.text().trim() === '0') {
                btnDisabled.addClass('input-sent');
                if (btn.hasClass('input-selected')) {
                    btn.removeClass('input-selected');
                }
            }

        });

    }

    $(document).on('click', '.voting-actions-all-btn', function () {
        numberCheckVotes();
    });
    numberCheckVotes();

    // функция проверки кнопки ВЕТО в блоке с кнопками ЗА ПРОТИВ ВОЗДЕРЖАЛСЯ, если есть ВЕТО расширяем блок, чтобы все кнопки помещались
    function vetoCheckBtn() {
        var votingInputs = $('.voting-inputs');
        votingInputs.each(function () {
            if ($(this).find('.voting-veto').length) {
                $(this).css({
                    width: '504px'
                })

            }
            else {
                $(this).css({
                    width: '418px'
                })
            }
        });
    }

    vetoCheckBtn();

    $(document).on('click', '.voting-multiple-candidates .voting-true', function () {
        var parent = $(this).closest('.voting-multiple-candidates');
        var activeZa = parent.find('.voting-actions-sing-btn.voting-true.input-selected');
        var votesPerCandidate = parent.find('.votes-per-candidate').val();
        var votesSum = parent.find('.voices-sum');
        var total = parent.find('.max-sum-votes').text();
        var votesMax = parent.find('.votes-max');
        var arrForSend = [];
        var totalZa = $('.votes-za');
        var votingClose = $('.voting-actions-sing-btn.voting-close');
        var separetionValZa = parent.find('.separation-votes');

        activeZa.each(function () {
            arrForSend.push(votesPerCandidate);
        });
        separetionValZa.each(function () {
            arrForSend.push($(this).find('.voting-actions__choice-wrap:first .input-hide').val());
        });

        if (arrForSend.length) {
            additionFraction(arrForSend.join(';')).done(function (data) {
                votesSum.text(data.result);
                parent.find('.votes-za-candidate .total-left').text(data.result);

                comparingIsLager(total, data.result).done(function (res) {
                    if (res.result === 'false') {
                        // если тотал меньше, чем мы отдаем (значит показываем строку с голосами, добавляем тексту красный цвет, и делаем голосование недейтвительным)
                        votesSum.css({
                            color: '#e73b3b'
                        });
                        votesMax.hide();
                        totalZa.show();
                        activeZa.removeClass('input-selected').find('input').removeAttr('checked');
                        votingClose.addClass('input-selected')

                    } else {
                        // если тотал больше, чем мы отдаем (значит все норм, скрываем строку с голосами, и убираем красный цвет у текста)
                        totalZa.hide();
                        votesMax.show();
                    }
                })
            })
        } else {
            votesSum.text(0)
        }

    });

    // функция проверки всего бюлетеня, если голосов === 0, тогда кнопки disabled
    function disabledBtnTotal() {
        var parent = $('.voting-inputs');
        var totalVotesInput = $('.can-veto');
        var cumulativeChange = $('.separation-cumulative .change-span');
        if (totalVotesInput.text().trim() === 'Владелец имеет право вето') {
            cumulativeChange.addClass('voting-not-active');
            parent.each(function () {
                if (!$(this).find('.voting-veto').length) {
                    $(this).addClass('input-sent');
                }
                if ($(this).find('.voting-veto').length) {
                    $(this).removeClass('input-sent').addClass('veto-disabled-list-btn');
                }

            });
        }
    }

    disabledBtnTotal();
    function checkSeparationInputHideFocus(){

        var separationCumulative = $('.cumulative-voting-input');
        var btnZaCumSeparationZa = separationCumulative.find('.separation-votes .voting-true');
        if(separationCumulative.find('.separation-cumulative-za').is( ":focus" )){
            btnZaCumSeparationZa.removeClass('voting-not-active').addClass('voting-active');
        }
    }
    checkSeparationInputHideFocus();

//    Инкремент Декремент для контролла ввода/ стелочки вверх/низ

    $(document).on('click', '.input-hide-plus', function () {
        var parent = $(this).closest('.input-hide-wrap'),
            count = parent.find('.input-hide'),
            saveFraction = count.val().slice(count.val().indexOf(' ')),
            replaceVal = count.val();

        if (isNaN(saveFraction)) {
            replaceVal = count.val().slice(0, count.val().indexOf(' '));
            count.val(+replaceVal + 1 + saveFraction).change().trigger('keyup').change().focus();
        }
        else {
            count.val(+replaceVal + 1).change().trigger('keyup').change().focus();
        }
        checkSeparationInputHideFocus();

        return false;



    });


    $(document).on('click', '.input-hide-minus', function () {
        var parent = $(this).closest('.input-hide-wrap');
        var count = parent.find('.input-hide'),

            replaceVal = parseInt(count.val()) || parseInt(count.val().slice(0, count.val().indexOf(' '))),

            saveFraction = count.val().slice(count.val().indexOf(' '));
        if (isNaN(Number(saveFraction))) {
            replaceVal = replaceVal === 0 ? 0 + saveFraction : replaceVal - 1 + saveFraction;
        } else {
            replaceVal = replaceVal === 0 ? 0 : replaceVal - 1;
        }
        count.val(replaceVal).trigger('keyup').change().focus();
        $('.js-single-addtocart').attr('data-quantity', replaceVal);
        $('.js-single-favorites').attr('data-quantity', replaceVal);
        calculateTotalVoises(parent.find('.input-hide'));
        checkSeparationInputHideFocus();

        return false;
    });

    //Событие на кнопку "X" для всего бюллетеня
    $(document).on('click', '.voting-actions-all-btn.voting-close', function () {
        if ($(this).hasClass('input-selected')) { //  Делаем проверку, если бала нажата кнопка "Х" для всего бюллетеня - идем далее.. Если нет, ничего не делаем
            var parent = $('.disabled-form'), // Находим родительский класс для всего бюллетеня
                allSeparationBtnClose = parent.find('.separation-votes .voting-close'); // Находим все кнопки "X" в раделенном голосовании
            allSeparationBtnClose.click(); // делаем по ним клик тем самым вызывая ajax запрос на сворачивание разделенного голосования
        }
    });

});

/*
* функция горячей клавиши TAB в разделенном голосование для переключения к следующему контролу
* */
function findNextInput(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + ++currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.wrap-input-hotkey');
    var changeSpan = wrapInputHide.siblings('.separation-hot-btn');
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="1"]').click().select();
    }
}

/*
* функция горячей клавиши TAB в разделенном голосование для переключения к предыдущему контролу
* */
function findPrevInput(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + --currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.wrap-input-hotkey');
    var changeSpan = wrapInputHide.siblings('.separation-hot-btn');
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="3"]').click().select();
    }
}

//Функция добавляет data-атрибуты для change-span-candidate  и  input-hide в кумулятивном голосовании
function changeSpanCandidateAddAttr() {
    var parent = $('.cumulative-voting-input');
    var changeSpan = parent.find('.change-span-candidate');
    var separationCumulativeZa = parent.find('.separation-cumulative-za');
    var i = 1;
    var j = 1;
    changeSpan.each(function () {
        $(this).attr('data-span-num', i);
        i++;
    });
    separationCumulativeZa.each(function () {
        $(this).attr('data-inp-num', j);
        j++;
    });
}

changeSpanCandidateAddAttr();

function findPrevInputAcumulative(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + --currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.cumulative-hotkey');
    var changeSpan = wrapInputHide.siblings('.change-span-candidate');
    var btnParent = _this.closest('.separation-votes .voting-actions__choice-wrap');
    btnParent.each(function () {
        var btn = $(this).find('.voting-actions-btn');
        var inputHide = $(this).find('.input-hide');
        if (inputHide.val() === '0') {
            btn.removeClass('voting-active');
        }
    });
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();
    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="3"]').click().select();
    }


}

function findNextInputAcumulative(_this, parent) {
    var currentInputNumber = _this.attr('data-inp-num');
    var nextSpan = parent.find('[data-span-num="' + ++currentInputNumber + '"]');
    var wrapInputHide = _this.closest('.cumulative-hotkey');
    var changeSpan = wrapInputHide.siblings('.change-span-candidate');
    var btnParent = _this.closest('.separation-votes .voting-actions__choice-wrap');
    btnParent.each(function () {
        var btn = $(this).find('.voting-actions-btn');
        var inputHide = $(this).find('.input-hide');
        if (inputHide.val() === '0') {
            btn.removeClass('voting-active');
        }
    });
    if (nextSpan.length) {
        wrapInputHide.hide();
        changeSpan.show();
        nextSpan.click().select();

    } else {
        wrapInputHide.hide();
        changeSpan.show();
        parent.find('[data-span-num="1"]').click().select();
    }

}

$(function () {

    var modal = $('.modal-delete');

    $(document).on('click', '.modal__header>.t-delete', function () {
        modal.hide()
    });
    $(document).on('click', '.modal__footer>.cancel', function () {
        modal.hide();
        return false;
    });
    $(document).on('click', '.modal__footer>.delete-btn', function () {
        modal.hide();
    });

    $(document).on('click', '.questionModal .submit', function () {
        $(this).closest('.overlay').hide();
    });
    $(document).on('click', '.modal-registration .close', function () {
        $(this).closest('.overlay').hide();
    });

    $(document).mouseup(function (e) {
        var overlayModal = $(".overlay");
        if (overlayModal.has(e.target).length === 0){
            overlayModal.fadeOut();
        }
    });




});

$(document).ready(function() { // зaпускaем скрипт пoсле зaгрузки всех элементoв
    /* зaсунем срaзу все элементы в переменные, чтoбы скрипту не прихoдилoсь их кaждый рaз искaть при кликaх */
    var overlay = $('#overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal_div'); // все скрытые мoдaльные oкнa

    open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
        event.preventDefault(); // вырубaем стaндaртнoе пoведение
        var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
        overlay.fadeIn(400, //пoкaзывaем oверлэй
            function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
                $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем
            });
    });

    close.click( function(){ // лoвим клик пo крестику или oверлэю
        modal // все мoдaльные oкнa
            .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
                function(){ // пoсле этoгo
                    $(this).css('display', 'none');
                    overlay.fadeOut(400); // прячем пoдлoжку
                }
            );
    });
});
// $(function () {
//
//     var modal = $('.modal');
//
//     modal.wrap('<div class="overlay"></div>');
//
//     $(document).on('click', '.overlay', function () {
//         $(this).fadeOut()
//     })
//
// });
function transliterate(word) {
    var answer = ""
        , a = {};

    a["Ё"] = "YO"; a["Й"] = "I"; a["Ц"] = "TS"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "SH"; a["Щ"] = "SCH"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "'";
    a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "ts"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "'";
    a["Ф"] = "F"; a["Ы"] = "I"; a["В"] = "V"; a["А"] = "A"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "ZH"; a["Э"] = "E";
    a["ф"] = "f"; a["ы"] = "i"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e";
    a["Я"] = "Ya"; a["Ч"] = "CH"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = "'"; a["Б"] = "B"; a["Ю"] = "YU";
    a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = "'"; a["б"] = "b"; a["ю"] = "yu";

    for (i in word) {
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined) {
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer;
}
$(function () {

    /*-------------------start action-btn---------------------*/

    $(document).on('click', '.action-btn--arrow', function () {
        $(this).toggleClass('action-btn--active');
        $(this).parent().find('ul').fadeToggle('fast');
    });

    $(document).on('click', '.action-btn ul li a', function () {
        $('.action-btn--arrow').removeClass('action-btn--active');
        $('.action-btn ul').fadeToggle('fast')
    });

    $(document).click(function (event) {
        if ($(event.target).closest(".action-btn").length) return;
        $(".action-btn ul").fadeOut("fast");
        $('.action-btn--arrow').removeClass('action-btn--active');
    });

    /*---------------------end action-btn---------------------*/


    /*------------------------start edit password btn--------------------*/

    $(document).on('click', '.edit-pass', function () {
        var input = $(this).parent().find('input[type=password]');
        input.removeAttr('disabled').focus();
    });

    /*------------------------end edit password btn--------------------*/


    /*-------------------SET LOCATION FOR CLASS "SOMEONE"-------------------------*/

    $(document).on('click', '.someone', function () {
        window.location = "../html/admin_pages/admin-user-cabinet-account-main.html";
    });
    $(document).on('click', '.someone-group', function () {
        window.location = "../html/pages/admin-groups-cabinet-group-main.html";
    });
    $(document).on('click', '.iss-bills-list tbody .bill-num', function () {
        window.location = "issuer-bills-cabinet-bill.html";
    });
    $(document).on('click', '.own-bills-list tbody .bill-num', function () {
        window.location = "owner-bills-cabinet-bill.html";
    });
    $(document).on('click', '.manager-issuers-list tbody .mi-register', function () {
        window.location = "manager-issuer-cabinet.html";
    });
    $(document).on('click', '.own-issuers-list tbody .mi-register', function () {
        window.location = "owner-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .mv-register', function () {
        window.location = "manager-voting-issuer-list.html";
    });
    $(document).on('click', 'tbody .vil-bill', function () {
        window.location = "manager-voting-form.html";
    });
    $(document).on('click', 'tbody .ai-register', function () {
        window.location = "../html/admin_pages/admin-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .iml-number', function () {
        window.location = "issuer-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .mml-number', function () {
        window.location = "manager-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .ov-register', function () {
        window.location = "owner-voting-cabinet-info.html";
    });

    /*-------------------!SET LOCATION FOR CLASS "SOMEONE"-------------------------*/


    $(document).on('click', '.filter--icon', function () {
        $('.header__filter>.filter').fadeToggle('fast');
    });


    /*----------filter in new user-----------*/


    $(document).on('click', '.filter .cancel', function () {
        $('.filter', this).hide();
    });
    $(document).on('click', '.filter__header .t-delete', function () {
        $('.filter').hide();
    });

    /*----------!filter in new user-----------*/

    /*filter in user-groups*/
    $(document).on('click', '.filter tr', function () {
        $('.filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });

    function createCross(input) {
        var cross = $('<span class="act_t-search"></span>');
        input.after(cross);
        var crossLeft = cross[0].getBoundingClientRect().right;
        var inputLeft = input[0].getBoundingClientRect().right;
        cross.css({
            'left': inputLeft - crossLeft + 300 - 30
        });
    }

    $(document).on('click', '.filter .submit', function () {
        var filter = $(this).closest('.filter');
        var input = filter.parent().find('.t-search');
        var btn = filter.parent().find('.insert');
        if ($('.activeTr').length > 0) {
            input.val($('.activeTr').text());
            filter.hide();
            if (input.hasClass('t-search--disabled')) {
                return false
            } else {
                btn.addClass('insert-active').removeAttr('disabled');
                input.addClass('t-search--disabled').attr('readonly', '');
                createCross(input)
            }
        }
    });
    $(document).on('keyup', '.t-search', function () {
        if ($(this).val() !== '') {
            if ($(this).siblings('.act_t-search').length > 0) {
                return false
            }
            createCross($(this));
            $(this).addClass('t-search--cross')
        } else {
            $(this).removeClass('t-search--cross');
            $(this).siblings('.act_t-search').remove();
        }
    })
    $(document).on('click', '.act_t-search', function () {
        $(this).parent().find('.t-search').removeClass('t-search--disabled').removeAttr('readonly').val('').removeClass('t-search--cross');
        $(this).parent().find('.insert').removeClass('insert-active');
        $(this).remove();
    });
    $(document).on('click', '.filter .cancel', function () {
        $(this).closest('.filter').hide();
    });


    $(document).on('click', '.admin-groups .filter tr', function () {
        $('.admin-groups .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.admin-groups .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('.admin-groups .t-search').val($('.activeTr').text());
            $('.admin-groups .filter').hide();
            $('.admin-groups .insert').addClass('insert-active').removeAttr('disabled')
        }
    });


    $(document).on('click', '.sidebar__item .users_inside', function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter[data-id="user_inside"]').css('display', 'flex');
        } else {
            window.location = "/app/html/pages/admin-users-list.html"
        }

    });
    $(document).on('click', '.sidebar__item .users_outside', function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter').hide();
            $('.autofilter[data-id="user_outside"]').css({ 'display': 'flex' });
        } else {
            window.location = "/app/html/pages/admin-users-list.html"
        }

    });
    $(document).on('click', '.autofilter .t-delete', function () {
        $(this).parent().hide();
        $('.header__filter--field .filter--input').show();
    });


    $(document).on('click', '.sidebar__item .active-now', function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="active-now"]').css('display', 'flex');

    });
    $(document).on('click', '.sidebar__item .meeting', function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="meeting"]').css({ 'display': 'flex' });

    });


    $(document).on('click', '.filter .filter tr', function () {
        $('.filter .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.filter .filter .submit', function () {
        if ($('.filter .filter .activeTr').length > 0) {
            $(this).closest('.filter__body--item').find('.t-search').val($('.activeTr').text());
            $('.header__filter .filter .filter').hide();
        }
    })


    //dropdown-----------------------------------------------
    $(document).on('click', '.drop', function () {
        if ($(this).find('ul').hasClass('visible-drop')) {
            $(this).find('ul').removeClass('visible-drop');
        } else {
            $('.drop ul').removeClass('visible-drop');
            $(this).find('ul').addClass('visible-drop')
        }
    });
    $(document).on('click', '.drop li', function () {
        $(this).parent().parent().find('span.blue-bold').text($(this).text())
    });
    //dropdown-----------------------------------------------


    /*------------gropdown-user-icon---------------*/
    $(document).on('click', '.header__user', function () {
        $(this).find('.header__user--menu').fadeToggle('fast')
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".header__user").length) return;
        $(".header__user--menu").fadeOut("fast");
    });
    $(document).on('click', '.header__user .user-icon', function (e) {
        e.preventDefault()
    });
    /*------------gropdown-user-icon---------------*/

    
    $(document).on('click',
        '.issuer-bills-statement .period',
        function() {
          $('.issuer-bills-statement .period').removeClass('active-period');
          $(this).addClass('active-period');
    });

    $(document).on('click',
        '.mutual-settlements .period',
        function () {
          $('.mutual-settlements .period').removeClass('active-period');
          $(this).addClass('active-period');
    });


    $(document).on('change', '.add-files input[type="file"]', function () {
        var parent = $(this).parent();
        var chosenFiles = $(this)[0].files;
        for (var i = 0; i < chosenFiles.length; i++) {
            $('.selected-file').remove();
            $('<p>', { text: chosenFiles[i].name }).addClass('selected-file').appendTo(parent)
        }
    });
    $(document).on('click',
        '.add-files .cancel',
        function() {
          var parent = $(this).closest('.add-files')
          parent.find('.selected-file').remove()
    });


    $(document).on('click', '.bullet-number', function () {
        $(this).closest('.bullet-numbers').find('.bullet-number').removeClass('activeBullet');
        $(this).addClass('activeBullet');
    });
    // $(document).on('click', '.show-condition', function () {
    //     $('.condition-hidden').addClass('show-condition-hidden');
    //     $(this).hide();
    // });
    // $(document).on('click', '.hide-condition', function () {
    //     $('.condition-hidden').removeClass('show-condition-hidden');
    //     $('.show-condition').show();
    // });
    $(document).on('click', '.hide-voting-settings', function () {

        var concrete = $(this).closest('.content__block');

        if (concrete.find('.agenda-settings__hidden').hasClass('is-hidden')) {
            concrete.find('.hide-voting-settings').text('Скрыть настройки голосования')
            concrete.find('.agenda-settings__hidden').removeClass('is-hidden').slideDown('fast')
        } else {
            concrete.find('.agenda-settings__hidden').addClass('is-hidden').slideUp('fast')
            concrete.find('.hide-voting-settings').text('Показать настройки голосования')
        }

    });


    $(document).on('click', '.load-list', function () {
        var _this_ = $(this);
        if ($(this).hasClass('grey')) return false;
        var meetId = $(this).siblings('input[name="meetId"]').val();
        $(this).attr('data-btn-text', 'Список загружается...').addClass('orange');
        $.ajax({
            url: '/Manager/Meeting/GetRegistry',
            type: 'post',
            data: {
                meetId: meetId
            },
            success: function (html) {
                console.log('html', html)
                _this_.attr('data-btn-text', 'Список получен ' + html).removeClass('orange').addClass('grey');
            },
            error: function (err) {
                console.log(err)
                var modal = _this_.siblings('.overlay')
                modal.find('.modal__header h2').text('Ошибка №' + err.status);
                modal.find('.modal__body').html('<div style="margin-bottom: 10px">' + err.statusText + '</div>' + '<div>' + err.responseText + '</div>');
                modal.show();
                _this_.attr('data-btn-text', 'Получить список...').removeClass('orange');
            }
        })
    });

    $(document).on('click', 'label[for="applies"]', function () {
        if ($('#applies').is(':checked')) {
            $(this).closest('.content__block').find('.voting-date').addClass('voting-date-hidden')
        } else {
            $(this).closest('.content__block').find('.voting-date').removeClass('voting-date-hidden')
        }
    });

    $(document).on('click', '.show-constraints', function () {
        $('.constraints').toggleClass('constraints-hidden');
    });

    $(document).on('click', '.show-meetings', function () {
        if ($('.meetings').hasClass('meetings-hidden')) {
            $('.meetings').removeClass('meetings-hidden');
            $(this).text('Скрыть ход собрания')
        } else {
            $('.meetings').addClass('meetings-hidden');
            $(this).text('Показать ход собрания')
        }
    });

    $(document).on('click', '.info-affix', function () {
        $(this).parent().siblings('.add-files').fadeIn('fast')
    });
    $(document).on('click', '.materials-list__btn', function () {
        $(this).siblings('.add-files').fadeIn('fast')
    });
    $(document).on('click', '.active-question__sign', function () {
        $(this).siblings('.overlay').show()
    });
    // $(document).on('click', '.active-question .cancel', function () {
    //     $(this).closest('.active-question__content').fadeOut('fast')
    // });
    // $(document).click(function (event) {
    //     if ($(event.target).closest(".active-question").length) return;
    //     $(".active-question__content").fadeOut("fast");
    // });

    $(document).on('click', '.show-all-state', function () {
        var parent = $(this).closest('tr');
        var row = $('.hidden-row');
        if (parent.find(row).hasClass('hidden')) {
            parent.find(row).removeClass('hidden');
            $(this).text('Всего (скрыть)')
        } else {
            parent.find(row).addClass('hidden');
            $(this).text('Всего (показать)')
        }
    });

    $(document).on('click', '.agenda-btn-new-question', function () {
        $(this).closest('.content__block').find('.modal-add-question').closest('.overlay').show();
    });

    if ($('.write-msg')) {
        $(document).on('click', '.show-write-msg', function () {
            $('.write-msg').fadeIn('fast');
        });
        $(document).on('click', '.write-msg .cancel', function () {
            $('.write-msg').fadeOut('fast');
        });
    }

    $(document).on('click', '.modal', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.modal__header .t-delete', function () {
        $(this).closest('.overlay').fadeOut('fast');
    });
    $(document).on('click', '.modal .cancel', function () {
        $(this).closest('.overlay').fadeOut('fast');
        return false;
    });

    $(document).on('click', '.edit-status-meeting', function () {
        $(this).siblings('.overlay').show()
    });


    $(document).on('click', '.show-divide-voting>span', function () {
        $(this).closest('.voting__block').find('.voting-actions__divide').css('display', 'flex');
        $(this).closest('.voting__block').find('.voting-actions-hidden').css('display', 'flex');
    });
    $(document).on('click', '.del-divide-voting', function () {
        $(this).closest('.voting__block').find('.voting-actions__divide').css('display', 'none');
        $(this).closest('.voting__block').find('.voting-actions-hidden').css('display', 'none');
    });


    $(document).on('click', '.voting-order', function () {
        var text = $(this).closest('.content__block').find('.voting-order__text');
        if (text.hasClass('j-invisible')) {
            text.removeClass('j-invisible')
        } else {
            text.addClass('j-invisible')
        }
    });

    $(document).on('click', '.sign-up', function () {
        $(this).val('Зарегистрироваться')
            .removeClass('bg-blue')
            .addClass('bg-grey')
            .attr('disabled', 'true');
    });


    $(document).on('click', '.voting-bill', function () {
        $(this).siblings('.voting-bill').removeClass('voting-bill--active');
        $(this).addClass('voting-bill--active')
    });

    $(document).on('change', '.content__block--photo input[type="file"]', function () {
        var span = $(this).closest('.content__block--photo').find('.content__block--photo-selected');
        var chosenFiles = $(this)[0].files;
        span.text(chosenFiles[0].name);
    });

    $('.select2-docs').select2({
        width: 'resolve',
        dropdownParent: $('.select2-docs').parent()
    });


    if ($('.contenteditable')) {
        $('.contenteditable').first().focus()
    }

    $(document).on('click', '.create-new__modal label', function () {
        var inputRemeeting = $(this).parent().find('input[value="Remeeting"]');
        var inputCopy = $(this).parent().find('input[value="Copyof"]');
        var allSelect = $(this).siblings('.sub-select');
        var select = $(this).next('.select');

        if (inputCopy.is(':checked') || inputRemeeting.is(':checked')) {
            allSelect.hide();
            select.show()
        } else {
            allSelect.hide();
        }
    });

    function selectAllVoting(e) {
        var items = $('.voting-enter__table').find('.voting-actions__choice--item');
        var votingTrue = $('.voting-enter__table').find('.voting-true');
        var votingFalse = $('.voting-enter__table').find('.voting-false');
        var votingAbstained = $('.voting-enter__table').find('.voting-abstained');
        var votingNotValid = $('.voting-enter__table').find('.voting-not-valid');
        if (e.hasClass('voting-true')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingTrue.addClass('voting-selected');
            votingTrue.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-false')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingFalse.addClass('voting-selected');
            votingFalse.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-abstained')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingAbstained.addClass('voting-selected');
            votingAbstained.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-not-valid')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingNotValid.addClass('voting-selected');
            votingNotValid.find('input').attr('checked', 'checked');
        }
    }

    $(document).on('click', 'label[for="select-all-question"]', function () {
        var items = $('.voting-enter__table').find('.voting-actions__choice--item');
        var votingForAll = $('.voting-for-all');
        if ($(this).prev().is(':checked')) {
            console.log('not checked');
            items.find('input').removeAttr('readonly');
            items.removeAttr('style');
            votingForAll.removeClass('voting-for-all--active').find('.voting-actions__choice--item').removeClass('voting-selected').find('input').removeAttr('checked')
        } else {
            console.log('checked');
            items.css({
                pointerEvents: 'none'
            });
            items.find('input').attr('readonly', 'true');
            items.removeClass('voting-selected');
            votingForAll.addClass('voting-for-all--active')
        }
    });
    $(document).on('click', '.voting-for-all .voting-actions__choice--item', function () {
        if ($('.voting-enter__select-all__label input').is(':checked')) {
            selectAllVoting($(this))
        }
    });


    (function () {
        var text = $('.voting-enter__td-text');
        text.each(function () {
            if ($(this).height() > 30) {
                $(this).addClass('voting-enter__td-text--hidden')
            }
        })
    })();
    $(document).on('click', '.voting-enter__td-text--hidden', function () {
        $(this).toggleClass('voting-enter__td-text--visible')
    });


    $('.overlay').bind('mousewheel', function () {
        return false
    });

    if ($('.modal-show-on-load').length > 0) {
        $('.modal-show-on-load').closest('.overlay').show();
    }

    $(document).on('click', '.calculationMethod', function () {
        if ($(this).val() === 'DEALING_OVER50') {
            $('.calculationAdd').slideDown("fast");
        } else {
            $('.calculationAdd').slideUp("fast");
        }
    });


    $(document).on('click', '.select2-take-all', function () {
        if ($('.select2-take-all').hasClass('select2-take-all--checked')) {
            $('.select2-docs > option').removeAttr('selected');
            $('.select2-take-all').toggleClass('select2-take-all--checked');
            $('.select2-docs').trigger("change");
        } else {
            $('.select2-docs > option').prop('selected', 'selected');
            $('.select2-take-all').toggleClass('select2-take-all--checked');
            $('.select2-docs').trigger("change");
        }
    });
    $(document).on('click', '.select2-selection__choice__remove', function () {
        $('.select2-take-all').removeClass('select2-take-all--checked');
    });

    $(document).on('click', '.voting_auth', function (event) {
        var _this = $(this);
        var testDiv = $("<div class='testDiv'></div>");
        var _id = $(this).attr('data-votingBtnId');
        event.preventDefault();
        $.ajax({
            url: $(this).parents('form').attr('action').toString(),
            type: 'post',
            success: function (html) {
                var parent = _this.parents('.parentRow');
                testDiv.html(html);
                var _row = testDiv.find('.voting_auth[data-votingBtnId=' + _id + ']').parents('.parentRow');
                parent.html(_row.html());
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href = '/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        })
    });


    $(document).on('blur', '.input-meeting-date', function () {
        if ($(this).val() === '') {
            $('.input-meeting-time').val('')
        }
    });
    $(document).on('change', '.formOfConduct', function () {
        if ($(this).val() === 'ABSENT') {
            $(this).closest('.meeting__info').find('.hide-if-absent').hide()
        } else {
            $(this).closest('.meeting__info').find('.hide-if-absent').show()
        }
    })

    $(document).on('click', '.modalBtnOk', function () {
        $(this).closest('.overlay').hide();
    })

    $(document).on('change', '.event-change', function () {
        var parent = $(this).closest('tr');
        if ($(this).val() === 2) {
            parent.find('.ast-voting .noborder').val(0).attr('disabled', 'disabled');
        }
        else {
            parent.find('.ast-voting .noborder').removeAttr('disabled');
        }
    });

    $(document).on('change', '.input-meeting-date', function () {
        $('.reg-start-date').val($(this).val());
    });

    $(document).on('keydown', '.vote-limit', function (e) {
        return isAllowedKeyCode(e.originalEvent.key);
    });

    //    ридерект формы двухфакторного входа
    function redirect() {
        var smSTokenId = $('#SMSToken'),
            locationForm = window.location;
        if (smSTokenId.length > 0) {
            $(document).on('keyup', '.redirect', function () {
                window.location.href = locationForm;
            });
        }
    }

    redirect();


    //    Удаление пробелов

    var inputDeleteSpace = $('.vote-limit');
    if (inputDeleteSpace.length > 0) {
        inputDeleteSpace.each(function () {
            $(this).val($(this).val().trim())
        });
    }

    //    проверка checked
    if ('.bullet-number-all'.length > 0) {
        $('.bullet-number-all input').on('change', function () {
            if ($('.bullet-number-all input').prop('checked')) {
                $('#allBulletins').val('true');
            } else {
                $('#allBulletins').val('false');
            }
        });
    }



    $(document).on('click', '.t-search', function () {
        $('.search-select').show();

    });
    $(document).on('keyup', '.t-search', function () {
        $('.search-select').show();

    });

    $(document).on('click', '.search-select li', function () {
        $('.t-search').val($(this).text());
        $(this).closest('form').submit();
        $('.search-select').hide();
    });

    $(document).mouseup(function (e) {
        var container = $(".search-select");
        if (container.has(e.target).length === 0) {
            container.hide();
        }
    });

    //disabled кнопки сохранить, если в форме бюлетеня не было изменений
    function disableSaveBTn() {
        if ($('.form-save-btn').length > 0) {
            $(document).on("change", '.disabled-form', function () {
                $('.form-save-btn').removeAttr('disabled');
            });
            $(document).on("click", '.voting-actions__choice--item ', function () {
                $('.form-save-btn').removeAttr('disabled');
            });
        }
    }

    disableSaveBTn();


    //    Выпадалка радио кнопок по нажатию на иконку view

    $(document).on('click', '.title-view', function () {
        $('.title-dropdown').fadeToggle().addClass('title-dropdown-active');
    });
    $(document).on('click', '.history-view', function () {
        $('.history-dropdown').fadeToggle().addClass('history-dropdown-active');
    });
    //модальное окно История голосования в форме массового ввода
    $(document).on('click', function (e) {
        //    Выпадалка радио кнопок по нажатию на иконку view
        if (!$(e.target).closest(".title-dropdown-wrap").length) {
            if ($('.title-dropdown-active').length > 0) {
                $('.title-dropdown-wrap form').submit();
            }
            $('.title-dropdown').fadeOut().removeClass('title-dropdown-active');
        }
        //модальное окно История голосования в форме массового ввода
        if (!$(e.target).closest(".history-dropdown-wrap").length) {
            $('.history-dropdown').fadeOut().removeClass('history-dropdown-active');
        }
        e.stopPropagation();
    });
    $(document).on('submit', '.title-dropdown-wrap form', function (e) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        $.ajax({
            url: '/Helper/UpdatePageParameters',
            type: 'post',
            data: formData,
            success: function (data) {
                $('.title-wrap').html($(data).html());
                console.log(data)
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href = '/User/SignIn';
                }
                else {
                    if (err.status) {
                        alert('Ошибка! Ответ сервера: ' + err.status);
                    }
                }
            }
        })
    });
    //    мульти селект
    var multiSelect = $('.multi-select-wrap');
    $(".toggle-multi").click(function () {
        $('.multi-select-list').fadeToggle();
        multiSelect.toggleClass('active');
        if (multiSelect.hasClass('active')) {
            multiSelect.css({
                border: '1px solid #909090',
                backgroundColor: '#FAFAFA',
                transition: '400ms ease'
            })
        }
        if (!multiSelect.hasClass('active')) {
            multiSelect.css({
                border: '1px solid transparent',
                backgroundColor: '#fff',
                transition: '400ms ease'
            })
        }
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(multiSelect).length) {
            $('.multi-select-list').fadeOut();
            $(multiSelect).removeClass('active');
            if (!$(multiSelect).hasClass('active')) {
                $(multiSelect).css({
                    border: '1px solid transparent',
                    backgroundColor: '#fff',
                    transition: '400ms ease'
                })
            }
        }
        e.stopPropagation();
    });

    $(document).on('click', '.multi-select-list .checkbox input', function (e) {
        var selectedItems = $(this).closest('.multi-select-wrap').find('.toggle-multi');
        var id = $(this).attr('id');
        var text = $(this).siblings('label').text();
        if (!$(this).is(':checked')) {
            $('[data-id="' + id + '"]').remove();
        }
        else {
            selectedItems.append('<span data-id="' + id + '">' + text + '</span>')
        }
    });


    // slick slider для сайдбара
    $('.initialization-slide').slick({
        infinite: true,
        dots: true,
        nextArrow: false,
        prevArrow: false,
        dotsClass: 'sidebar-dots'
    });

    //    Модальное окно регистрации
    //     var inputRegistration = $('.input-hide');
    //     inputRegistration.hide();
    //     $(document).on('click', '.change-span', function () {
    //
    //     });



    $(document).on('click', '.filter__footer .add', function () {
        $('#represent-modal-filter').show().css({
            top: '0',
            left: '9%'
        });
    });

    // тултип для подсказки с иконкой вопроса 
    $(document).on('click', '.question-tooltip', function () {
        var parent = $(this).closest('.question-tooltip');
        var questionModal = parent.find('.question-tooltip__modal');
        questionModal.fadeToggle();
    });
    // тултип для подсказки с иконкой восклицательного знака
    $(document).on('click', '.attention-tooltip', function () {
        var parent = $(this).closest('.attention-tooltip');
        var questionModal = parent.find('.attention-tooltip__modal');

        questionModal.fadeToggle();
    });



});
$(function () {

    $('.content__section').mCustomScrollbar({
        theme: "my-theme",
        mouseWheel: {
            deltaFactor: 20,
            normalizeDelta: false
        },
        scrollInertia: 300
    });
    $('.content__aside').mCustomScrollbar({
        theme: "my-theme",
        mouseWheel: {
            deltaFactor: 20,
            normalizeDelta: false
        },
        scrollInertia: 300
    });
    $('.filter__body').mCustomScrollbar({theme: "my-theme"});
    $('.filter .filter .filter__body').mCustomScrollbar({theme: "my-theme"});
    $('.modal__body').mCustomScrollbar({theme: "my-theme"});
    $('.search-select').mCustomScrollbar({theme: "my-theme"});
    $('.history-dropdown').mCustomScrollbar({theme: "my-theme"});
    $('.question-tooltip__modal').mCustomScrollbar({theme: "my-theme"});
    $('.attention-tooltip__modal').mCustomScrollbar({theme: "my-theme"});

    var window_href = window.location.href;
    var locationId = window_href.substr(window_href.indexOf('#'));
    if (locationId[0] === '#') {
        $('.content__section').mCustomScrollbar('scrollTo', $(locationId));
    }

});
$(function () {

    /**
     *
     * @param {Object} obj
     * @param {string} obj.selectorForFilter - Селектор по которому будет производится фильрация
     * @param {string} obj.inputSelector - Селектор инпута, в котором производится фильтрация
     * @param {string} obj.selectorForHide - Селектор в который обернуты элементы по которым производится фильтрация. Этот селектор будет скрываться, если не совпадает с введенным значением
     */
    function searchFilter(obj) {
        var items = document.querySelectorAll(obj.selectorForFilter),
            input = document.querySelector(obj.inputSelector);

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.innerHTML.toUpperCase().replace(/\s+/g, '').indexOf(input.value.trim().replace(/[#№0']/g, '').replace(/\s+/g, '').toUpperCase()) > -1) {
                item.closest(obj.selectorForHide).style.display = "";
                item.closest(obj.selectorForHide).classList.add('active-search-item');
            }
            else if (item.innerHTML.toUpperCase().replace(/\s+/g, '').indexOf(input.value.replace(/\s+/g, '').toUpperCase()) > -1) {
                item.closest(obj.selectorForHide).style.display = "";
                item.closest(obj.selectorForHide).classList.add('active-search-item');
            }
            else {
                item.closest(obj.selectorForHide).style.display = "none";
                item.closest(obj.selectorForHide).classList.remove('active-search-item');
            }
        }
    }

    $(document).on('keyup', '.t-search', function (e) {
        e.preventDefault();

        if ($(this).val()[0] === "#" || $(this).val()[0] === "№" ) {
            if( $(this).val()[0] === '0' || $(this).val()[0] === ' ' ){
                searchFilter({
                    selectorForFilter: '.search-select li .account-register',
                    inputSelector: '.t-search',
                    selectorForHide: 'li'
                });
            }
            searchFilter({
                selectorForFilter: '.search-select li .account-register',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        } else if ($.isNumeric($(this).val()[0])) {
            searchFilter({
                selectorForFilter: '.search-select li .account-passport',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        } else {
            searchFilter({
                selectorForFilter: '.search-select li .account-owner',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        }
        if (e.key === 'Enter' &&  $(this).siblings('.search-select')[0].querySelector('.active-search-item') !== null) {
            $(this).siblings('.search-select')[0].querySelector('.active-search-item').click();
        }

    });
    $(document).on('keyup', '.t-search-submit', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $(document).on('click', '.search-select li', function () {
        $('.mass-search').val($(this).text().replace(/\s{2,}/g, " ").replace(/([.!?]+)(?=\S)/g, "$1 "));

        setTimeout(function () {
            $(this).closest('form').submit();
        },100);

    });
});
$(function () {
    /*
Reference: http://jsfiddle.net/BB3JK/47/
*/

    $('.custom-select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select-custom"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();

        });

        $listItems.click(function(e) {
            // e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });



})
/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
} (function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
      var superMethod = superMethods[m];

      DecoratedClass.prototype[superMethod] =
        SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  // Cache objects in Utils.__cache instead of $.data (see #4346)
  Utils.__cache = {};

  var id = 0;
  Utils.GetUniqueElementId = function (element) {
    // Get a unique element Id. If element has no id, 
    // creates a new unique number, stores it in the id 
    // attribute and returns the new id. 
    // If an id already exists, it simply returns it.

    var select2Id = element.getAttribute('data-select2-id');
    if (select2Id == null) {
      // If element has id, use it.
      if (element.id) {
        select2Id = element.id;
        element.setAttribute('data-select2-id', select2Id);
      } else {
        element.setAttribute('data-select2-id', ++id);
        select2Id = id.toString();
      }
    }
    return select2Id;
  };

  Utils.StoreData = function (element, name, value) {
    // Stores an item in the cache for a specified element.
    // name is the cache key.    
    var id = Utils.GetUniqueElementId(element);
    if (!Utils.__cache[id]) {
      Utils.__cache[id] = {};
    }

    Utils.__cache[id][name] = value;
  };

  Utils.GetData = function (element, name) {
    // Retrieves a value from the cache by its key (name)
    // name is optional. If no name specified, return 
    // all cache items for the specified element.
    // and for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (name) {
      if (Utils.__cache[id]) {
        return Utils.__cache[id][name] != null ? 
	      Utils.__cache[id][name]:
	      $(element).data(name); // Fallback to HTML5 data attribs.
      }
      return $(element).data(name); // Fallback to HTML5 data attribs.
    } else {
      return Utils.__cache[id];			   
    }
  };

  Utils.RemoveData = function (element) {
    // Removes all cached items for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (Utils.__cache[id] != null) {
      delete Utils.__cache[id];
    }
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = Utils.GetData(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    Utils.StoreData(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = Utils.GetData($highlighted[0], 'data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      // If no options, currentIndex will be -1
      if (currentIndex <= 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = Utils.GetData(this, 'data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = Utils.GetData(this, 'data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();
      window.setTimeout(function () {
        self.$selection.focus();
      }, 0);

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = Utils.GetData(this, 'element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.focus();
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.attr('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = Utils.GetData($selection[0], 'data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title');
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.attr('title', selection.title || selection.text);

      Utils.StoreData($selection[0], 'data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys',
  '../utils'
], function ($, KEYS, Utils) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = Utils.GetData($clear[0], 'data');

    var previousVal = this.$element.val();
    this.$element.val(this.placeholder.id);

    var unselectData = {
      data: data
    };
    this.trigger('clear', unselectData);
    if (unselectData.prevented) {
      this.$element.val(previousVal);
      return;
    }

    for (var d = 0; d < data.length; d++) {
      unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        this.$element.val(previousVal);
        return;
      }
    }

    this.$element.trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    Utils.StoreData($remove[0], 'data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      self.$search.attr('aria-activedescendant', params.id);
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = Utils.GetData($previousChoice[0], 'data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      var isTagInput = this.$element.find('[data-select2-tag]').length;
      if (isTagInput) {
        // fix IE11 bug where tag input lost focus
        this.$element.focus();
      } else {
        this.$search.focus();
      }
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting',
      'clear', 'clearing'
    ];

    var preventableEvents = [
      'opening', 'closing', 'selecting', 'unselecting', 'clearing'
    ];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      Utils.RemoveData(this);
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    Utils.StoreData(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = Utils.GetData($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    Utils.StoreData($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (item !== Object(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ('status' in $request &&
            ($request.status === 0 || $request.status === '0')) {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var optionText = (option.text || '').toUpperCase();
        var paramsTerm = (params.term || '').toUpperCase();

        var checkText = optionText === paramsTerm;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
      self.$search.blur();
    });

    container.on('focus', function () {
      if (!container.isOpen()) {
        self.$search.focus();
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);


    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      Utils.StoreData(this, 'select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = Utils.GetData(this, 'select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.off(scrollEvent);

        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
      };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    console.log($('.select2-search--inline').position().top);

    var $searchTop = $('.select2-search--inline').position().top;
    var $searchLeft = $('.select2-search--inline').position().left;


    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    // css.top -= parentOffset.top;
    // css.left -= parentOffset.left;
      css.top = $searchTop + 25;
      css.left = $searchLeft;


    // if (!isCurrentlyAbove && !isCurrentlyBelow) {
    //   newDirection = 'below';
    // }
    //
    // if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
    //   newDirection = 'above';
    // } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
    //   newDirection = 'below';
    // }

    // if (newDirection == 'above' ||
    //   (isCurrentlyAbove && newDirection !== 'below')) {
    //   css.top = container.top - parentOffset.top - dropdown.height;
    // }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[
  '../utils'
], function (Utils) {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = Utils.GetData($highlightedResults[0], 'data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(true, this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if (Utils.GetData($e[0], 'select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
      Utils.StoreData($e[0], 'tags', true);
    }

    if (Utils.GetData($e[0], 'ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
	  
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
    } else {
      dataset = Utils.GetData($e[0]);
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if (Utils.GetData($element[0], 'select2') != null) {
      Utils.GetData($element[0], 'select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    Utils.StoreData($element[0], 'old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    Utils.StoreData($element[0], 'select2', this);

    // Ensure backwards compatibility with $element.data('select2').
    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._syncA);
        $.each(mutations, self._syncS);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        childList: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._syncSubtree = function (evt, mutations) {
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) {
      return;
    }

    if (!mutations) {
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          changed = true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      changed = true;
    }

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting',
      'clear': 'clearing'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    }

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex',
    Utils.GetData(this.$element[0], 'old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    Utils.RemoveData(this.$element[0]);
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    Utils.StoreData($container[0], 'element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('select2/compat/utils',[
  'jquery'
], function ($) {
  function syncCssClasses ($dest, $src, adapter) {
    var classes, replacements = [], adapted;

    classes = $.trim($dest.attr('class'));

    if (classes) {
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () {
        // Save all Select2 classes
        if (this.indexOf('select2-') === 0) {
          replacements.push(this);
        }
      });
    }

    classes = $.trim($src.attr('class'));

    if (classes) {
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () {
        // Only adapt non-Select2 classes
        if (this.indexOf('select2-') !== 0) {
          adapted = adapter(this);

          if (adapted != null) {
            replacements.push(adapted);
          }
        }
      });
    }

    $dest.attr('class', replacements.join(' '));
  }

  return {
    syncCssClasses: syncCssClasses
  };
});

S2.define('select2/compat/containerCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _containerAdapter (clazz) {
    return null;
  }

  function ContainerCSS () { }

  ContainerCSS.prototype.render = function (decorated) {
    var $container = decorated.call(this);

    var containerCssClass = this.options.get('containerCssClass') || '';

    if ($.isFunction(containerCssClass)) {
      containerCssClass = containerCssClass(this.$element);
    }

    var containerCssAdapter = this.options.get('adaptContainerCssClass');
    containerCssAdapter = containerCssAdapter || _containerAdapter;

    if (containerCssClass.indexOf(':all:') !== -1) {
      containerCssClass = containerCssClass.replace(':all:', '');

      var _cssAdapter = containerCssAdapter;

      containerCssAdapter = function (clazz) {
        var adapted = _cssAdapter(clazz);

        if (adapted != null) {
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        }

        return clazz;
      };
    }

    var containerCss = this.options.get('containerCss') || {};

    if ($.isFunction(containerCss)) {
      containerCss = containerCss(this.$element);
    }

    CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

    $container.css(containerCss);
    $container.addClass(containerCssClass);

    return $container;
  };

  return ContainerCSS;
});

S2.define('select2/compat/dropdownCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _dropdownAdapter (clazz) {
    return null;
  }

  function DropdownCSS () { }

  DropdownCSS.prototype.render = function (decorated) {
    var $dropdown = decorated.call(this);

    var dropdownCssClass = this.options.get('dropdownCssClass') || '';

    if ($.isFunction(dropdownCssClass)) {
      dropdownCssClass = dropdownCssClass(this.$element);
    }

    var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
    dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

    if (dropdownCssClass.indexOf(':all:') !== -1) {
      dropdownCssClass = dropdownCssClass.replace(':all:', '');

      var _cssAdapter = dropdownCssAdapter;

      dropdownCssAdapter = function (clazz) {
        var adapted = _cssAdapter(clazz);

        if (adapted != null) {
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        }

        return clazz;
      };
    }

    var dropdownCss = this.options.get('dropdownCss') || {};

    if ($.isFunction(dropdownCss)) {
      dropdownCss = dropdownCss(this.$element);
    }

    CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

    $dropdown.css(dropdownCss);
    $dropdown.addClass(dropdownCssClass);

    return $dropdown;
  };

  return DropdownCSS;
});

S2.define('select2/compat/initSelection',[
  'jquery'
], function ($) {
  function InitSelection (decorated, $element, options) {
    if (options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `initSelection` option has been deprecated in favor' +
        ' of a custom data adapter that overrides the `current` method. ' +
        'This method is now called multiple times instead of a single ' +
        'time when the instance is initialized. Support will be removed ' +
        'for the `initSelection` option in future versions of Select2'
      );
    }

    this.initSelection = options.get('initSelection');
    this._isInitialized = false;

    decorated.call(this, $element, options);
  }

  InitSelection.prototype.current = function (decorated, callback) {
    var self = this;

    if (this._isInitialized) {
      decorated.call(this, callback);

      return;
    }

    this.initSelection.call(null, this.$element, function (data) {
      self._isInitialized = true;

      if (!$.isArray(data)) {
        data = [data];
      }

      callback(data);
    });
  };

  return InitSelection;
});

S2.define('select2/compat/inputData',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function InputData (decorated, $element, options) {
    this._currentData = [];
    this._valueSeparator = options.get('valueSeparator') || ',';

    if ($element.prop('type') === 'hidden') {
      if (options.get('debug') && console && console.warn) {
        console.warn(
          'Select2: Using a hidden input with Select2 is no longer ' +
          'supported and may stop working in the future. It is recommended ' +
          'to use a `<select>` element instead.'
        );
      }
    }

    decorated.call(this, $element, options);
  }

  InputData.prototype.current = function (_, callback) {
    function getSelected (data, selectedIds) {
      var selected = [];

      if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
        data.selected = true;
        selected.push(data);
      } else {
        data.selected = false;
      }

      if (data.children) {
        selected.push.apply(selected, getSelected(data.children, selectedIds));
      }

      return selected;
    }

    var selected = [];

    for (var d = 0; d < this._currentData.length; d++) {
      var data = this._currentData[d];

      selected.push.apply(
        selected,
        getSelected(
          data,
          this.$element.val().split(
            this._valueSeparator
          )
        )
      );
    }

    callback(selected);
  };

  InputData.prototype.select = function (_, data) {
    if (!this.options.get('multiple')) {
      this.current(function (allData) {
        $.map(allData, function (data) {
          data.selected = false;
        });
      });

      this.$element.val(data.id);
      this.$element.trigger('change');
    } else {
      var value = this.$element.val();
      value += this._valueSeparator + data.id;

      this.$element.val(value);
      this.$element.trigger('change');
    }
  };

  InputData.prototype.unselect = function (_, data) {
    var self = this;

    data.selected = false;

    this.current(function (allData) {
      var values = [];

      for (var d = 0; d < allData.length; d++) {
        var item = allData[d];

        if (data.id == item.id) {
          continue;
        }

        values.push(item.id);
      }

      self.$element.val(values.join(self._valueSeparator));
      self.$element.trigger('change');
    });
  };

  InputData.prototype.query = function (_, params, callback) {
    var results = [];

    for (var d = 0; d < this._currentData.length; d++) {
      var data = this._currentData[d];

      var matches = this.matches(params, data);

      if (matches !== null) {
        results.push(matches);
      }
    }

    callback({
      results: results
    });
  };

  InputData.prototype.addOptions = function (_, $options) {
    var options = $.map($options, function ($option) {
      return Utils.GetData($option[0], 'data');
    });

    this._currentData.push.apply(this._currentData, options);
  };

  return InputData;
});

S2.define('select2/compat/matcher',[
  'jquery'
], function ($) {
  function oldMatcher (matcher) {
    function wrappedMatcher (params, data) {
      var match = $.extend(true, {}, data);

      if (params.term == null || $.trim(params.term) === '') {
        return match;
      }

      if (data.children) {
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          // Check if the child object matches
          // The old matcher returned a boolean true or false
          var doesMatch = matcher(params.term, child.text, child);

          // If the child didn't match, pop it off
          if (!doesMatch) {
            match.children.splice(c, 1);
          }
        }

        if (match.children.length > 0) {
          return match;
        }
      }

      if (matcher(params.term, data.text, data)) {
        return match;
      }

      return null;
    }

    return wrappedMatcher;
  }

  return oldMatcher;
});

S2.define('select2/compat/query',[

], function () {
  function Query (decorated, $element, options) {
    if (options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `query` option has been deprecated in favor of a ' +
        'custom data adapter that overrides the `query` method. Support ' +
        'will be removed for the `query` option in future versions of ' +
        'Select2.'
      );
    }

    decorated.call(this, $element, options);
  }

  Query.prototype.query = function (_, params, callback) {
    params.callback = callback;

    var query = this.options.get('query');

    query.call(null, params);
  };

  return Query;
});

S2.define('select2/dropdown/attachContainer',[

], function () {
  function AttachContainer (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  AttachContainer.prototype.position =
    function (decorated, $dropdown, $container) {
    var $dropdownContainer = $container.find('.dropdown-wrapper');
    $dropdownContainer.append($dropdown);

    $dropdown.addClass('select2-dropdown--below');
    $container.addClass('select2-container--below');
  };

  return AttachContainer;
});

S2.define('select2/dropdown/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    var stoppedEvents = [
    'blur',
    'change',
    'click',
    'dblclick',
    'focus',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'keypress',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseup',
    'search',
    'touchend',
    'touchstart'
    ];

    this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
      evt.stopPropagation();
    });
  };

  return StopPropagation;
});

S2.define('select2/selection/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    var stoppedEvents = [
      'blur',
      'change',
      'click',
      'dblclick',
      'focus',
      'focusin',
      'focusout',
      'input',
      'keydown',
      'keyup',
      'keypress',
      'mousedown',
      'mouseenter',
      'mouseleave',
      'mousemove',
      'mouseover',
      'mouseup',
      'search',
      'touchend',
      'touchstart'
    ];

    this.$selection.on(stoppedEvents.join(' '), function (evt) {
      evt.stopPropagation();
    });
  };

  return StopPropagation;
});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof S2.define === 'function' && S2.define.amd ) {
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel',['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults',
  './select2/utils'
], function ($, _, Select2, Defaults, Utils) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = Utils.GetData(this, 'select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

$(function () {

    // var meetingBlockText = $('.meeting-text-wrap');
    // if (meetingBlockText.length > 0) {
    //     meetingBlockText.each(function () {
    //         var hiddenText = $(this).find('.fullsize-text').val();
    //         if (hiddenText.length > 51) {
    //             // $(this).append('<button type="button" class="need-hide-btn">больше...</button>');
    //         }
    //     });
    // }

    $(document).on('click', '.need-hide-btn', function () {
        var smallText = $(this).siblings('.small-size-text').html(),
            hiddenText = $(this).siblings('.fullsize-text').html();
        $(this).prev().toggleClass('resize-text');

        if ($(this).prev().hasClass('resize-text')) {
            $(this).text('меньше...');
            $(this).siblings('.need-hide').html(hiddenText);
        } else {
            $(this).text('больше...');
            $(this).siblings('.need-hide').html(smallText)
        }
    })
    $(document).on('click', '.show-full-text-btn', function () {
        var smallText = $(this).siblings('.small-size-text').html(),
            hiddenText = $(this).siblings('.fullsize-text').html(),
            showText = $(this).siblings('.meeting-answer.need-hide');
        if ($(this).hasClass('visible-full-text')) {
            showText.html(smallText);
            $(this).text('Больше...');
            $(this).removeClass('visible-full-text');
        }
        else {
            showText.html(hiddenText);
            $(this).text('Меньше...');
            $(this).addClass('visible-full-text');
        }
        return false
    });

});
function showModal(dopClass) {

   var main = document.querySelector('.modal');
   if (main) {
       if (dopClass === undefined) {
           $(main.parentNode).fadeIn();
       } else {
           main = document.querySelector('.modal' + '.' + dopClass.replace('.', ''));
           $(main.parentNode).fadeIn();
       }
   } else {
       return false
   }
    return false
}

$(function () {
    $(document).on('click', '.sidebar__item--header > a', function () {
        if ($(this).parent().hasClass('sidebar__item--active')) {
            // return false;
        } else {
            $('.sidebar__item--header').removeClass('sidebar__item--active');
            $(this).parent().addClass('sidebar__item--active');
        }
    })
});
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

                  var f_name_reg = $('.content__block--photo.registrar input[type="file"]')[0].files[0].name;
                  $('#avatar-reg').text(f_name_reg);
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
$(function () {

    var p = $('.contenteditable');
    var input = p.siblings('.contenteditable-input');
    for (var i=0; i< input.length; i++) {
        var that = input[i];
        $(that).siblings('.contenteditable').html($(that)[0].value);
    }
    $(document).on('keyup', '.contenteditable', function () {
        $(this).siblings('.contenteditable-input')[0].value = $(this).html();
    })

});
$(function () {

    var array = [];
    var timeList = $('<ul class="timeList"></ul>');
    for (var i=0; i<24; i++) {
        var listItem = $('<li class="timeList__item"></li>');
        if (i < 10) {
            i = '0'+ i;
        }
        listItem.text(i + ':00');
        array.push(listItem[0]);
    }

    $(document).on('click', 'input[type="time"]', function () {
        timeList.empty();
        timeList.append(array);

        $(this).after(timeList);
    });

    $(document).on('click', '.timeList__item', function () {
        var itemVal = $(this).text();
        var timeList = $(this).parent();
        var input = timeList.siblings('input[type="time"]');
        input.attr('value', itemVal);
        input.val(itemVal);
        $('.timeList').remove();
    });

    $(document).click(function(e) {
        if ($(e.target).closest('.timeList').length === 0 && $(e.target).siblings('.timeList').length === 0) {
            $('.timeList').remove();
        }
    });
});