// $(function () {
//
//     var con = new Condition();
//     if (con) {
//         con.init({
//             valAttrName: 'data-scv',
//             cookieName: '___rrr___',
//             customLoad: function (item, name, value, type) {
//                 if (type === 'block') {
//                     if (parseInt(value) === 1) {
//                         item.classList.add('block');
//
//                     }
//                 }
//                 if (type === 'input') {
//                     item.value = value;
//                 }
//                 if (type === 'checkbox') {
//                     if (parseInt(value) === 1) {
//                         $(item).closest('.voting-actions__choice--item').addClass('voting-selected');
//                         item.setAttribute('checked', 'checked');
//                     }
//                 }
//             }
//
//         });
//     }
//
//
//     if (con) {
//         con.runLoad();
//
//         $(document).on('click', ".voting-actions__choice--item", function () {
//             var val = parseInt($(this).find('input').attr('data-scv'));
//             var inputs = $(this).closest('.voting-actions__choice').find('input');
//             if (val === 0) {
//                 inputs.each(function () {
//                     $(this).attr('data-scv', 0);
//                 });
//                 $(this).find('input').attr('data-scv', 1)
//             }
//             else {
//                 $(this).find('input').attr('data-scv', 0);
//             }
//             con.runSave();
//         });
//         $(document).on('keyup', '.votes-cast', function () {
//             con.runSave();
//         });
//         $(document).on('click', '.part-of-voices-btn', function () {
//             con.runSave();
//         });
//         $(document).on('keyup', '.cumulative-voting__input', function () {
//             con.runSave();
//         });
//         // $('.ch').on('click', function (e) {
//         //     var val = parseInt($(this).attr('data-scv'));
//         //     if (val === 0) {
//         //         $(this).attr('data-scv', 1)
//         //     }
//         //     else {
//         //         $(this).attr('data-scv', 0);
//         //     }
//         //     con.runSave();
//         // });
//     }
// });