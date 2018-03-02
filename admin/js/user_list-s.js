"use strict";

/**
 * Created by web-01 on 2017/11/2.
 */
$(function () {
    function getUserByPno(pno) {
        var tb = $("#tblist");

        $.ajax({
            url: "data/getuser.php",
            type: "get",
            data: {
                pno: pno,
                pageSize: 8
            },
            success: function success(data) {
                var users = data.data;
                var html = "";
                var dis = "";
                var power = data.power;
                if (power != 0) {
                    dis = " disabled";
                }

                if (users.length == 0) {
                    html += "<tr><td colspan='8'>没有更多用户了...</td></tr>";
                } else {
                    for (var x in users) {
                        var user = users[x];
                        var regtime = format(new Date(parseInt(user.regtime)));
                        var btn = user.expire == 0 ? "<button class='btn btn-xs btn-danger btn-fj" + dis + "' data-uid='" + user.id + "' data-exp='1'>封禁</button>" : "<button class='btn btn-success btn-xs btn-fj" + dis + "' data-uid='" + user.id + "' data-exp='0'>解禁</button>";
                        html += "<tr>\n                                    <td>" + user.id + "</td>\n                                    <td>" + user.username + "</td>\n                                    <td>" + user.password + "</td>\n                                    <td>" + user.email + "</td>\n                                    <td>" + user.phone + "</td>\n                                    <td>" + regtime + "</td>\n                                    <td>" + (user.expire == 0 ? "状态正常" : "已封禁") + "</td>\n                                    <td>\n                                        <button class=\"btn btn-info btn-xs btn-xg\" data-uid=\"" + user.id + "\">\u4FEE\u6539</button>\n\n                                        " + btn + "\n                                    </td>\n                            </tr>";
                    }

                    tb.html(html);

                    //分页条生成
                    //加载分页条
                    var pno = parseInt(data.pno);
                    var phtml = "";
                    var pages = $("#pagination");
                    //var pno = parseInt(data.pno);
                    var prev = pno - 1;
                    var next = pno + 1;
                    var maxPage = parseInt(data.maxPage);
                    console.log(pno, maxPage);
                    if (prev <= 0) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                    </li>";else phtml += "<li>\n                        <a href=\"" + (pno - 1) + "\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                        </li>";

                    if (pno - 1 > 0) phtml += " <li><a href=\"" + (pno - 1) + "\">" + (pno - 1) + "</a></li>";

                    phtml += " <li class=\"active\"><a href=\"" + pno + "\">" + pno + "</a></li>";

                    if (pno + 1 <= maxPage) phtml += "<li><a href=\"" + (pno + 1) + "\">" + (pno + 1) + "</a></li>";

                    if (next > maxPage) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";else phtml += " <li>\n                        <a href=\"" + (pno + 1) + "\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";
                    //绑定事件
                    pages.html(phtml).off().on("click", "a", function (e) {
                        e.preventDefault();
                        if (!$(this).parent().hasClass("disabled")) {
                            getUserByPno($(this).attr("href"));
                        }
                    });

                    tb.off().on("click", "button", function () {
                        var amsg = $("#alertmsg");
                        var uid = $(this).data("uid");

                        if ($(this).hasClass("btn-xg")) {

                            var html = " <div class=\"form-group\">\n                                         <label for=\"npwd\">\u8F93\u5165\u7528\u6237\u65B0\u5BC6\u7801:</label>\n                                         <input type=\"password\" class=\"form-control\"  required name=\"npwd\" \"/>\n                                    </div>";
                            amsg.modal("show").find('.modal-body').html(html);
                            amsg.find(".modal-title").html("修改用户");

                            $("#xgform").off().on("submit", function (e) {
                                e.preventDefault();
                                var npwd = $("[name='npwd']").val();

                                if (npwd.length < 6) {
                                    alert("密码必须大于等于6位");
                                    return;
                                }

                                $.ajax({
                                    url: "data/setpwdbyid.php",
                                    type: "post",
                                    data: { uid: uid, npwd: npwd },
                                    success: function success(data) {
                                        if (data.code <= 0) {
                                            alert(data.msg);
                                        } else {
                                            alert("修改成功");
                                            amsg.modal("hide");
                                            getUserByPno(pno);
                                        }
                                    }
                                });
                                return false;
                            });
                        } else if ($(this).hasClass('btn-fj')) {
                            if (!$(this).hasClass("disabled")) {

                                var uid1 = $(this).data("uid");

                                var exp = $(this).data("exp");

                                $.ajax({
                                    url: "data/setuserstate.php",
                                    type: "post",
                                    data: { uid: uid1, expire: exp },
                                    success: function success(data) {
                                        if (data.code == undefined || data.code <= 0) {
                                            alert("操作失败");
                                        } else if (data.code == 1) {
                                            alert("操作成功");
                                            getUserByPno(pno);
                                        }
                                    }

                                });
                            }
                        }
                    });
                }
            }
        });
    }

    $("#adduser").click(function () {
        var amsg = $("#alertmsg");

        var html = " <div class=\"form-group\">\n                      <label for=\"username\">\u8F93\u5165\u7528\u6237\u540D:</label>\n                      <input type=\"text\" class=\"form-control\" required name=\"username\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"password\">\u8F93\u5165\u5BC6\u7801:</label>\n                      <input type=\"password\"  class=\"form-control\"  required name=\"password\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"email\">\u8F93\u5165\u90AE\u7BB1:</label>\n                      <input type=\"email\"  class=\"form-control\" required name=\"email\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"phone\">\u8F93\u5165\u624B\u673A:</label>\n                      <input type=\"text\" class=\"form-control\"   required name=\"phone\" \"/>\n                    </div>\n\n                    ";
        amsg.modal("show").find('.modal-body').html(html);
        amsg.find(".modal-title").html("添加用户");

        $("#xgform").off().on("submit", function (e) {
            e.preventDefault();
            var username = $('[name="username"]').val();
            var password = $('[name="password"]').val();
            var email = $('[name="email"]').val();
            var phone = $('[name="phone"]').val();

            if (username.length < 6 || username.length > 12) {
                alert("用户名长度在6-12位之间");
                return;
            }
            if (password.length < 6 || password.length > 12) {
                alert("密码在6-12位之间");
                return;
            }

            if (!/^((\+86|0086)\s+)?1[34578]\d{9}$/.test(phone)) {
                alert("手机号码格式不正确");
                return;
            }

            $.ajax({
                url: "data/adduser.php",
                type: "post",
                data: {
                    username: username,
                    password: password,
                    email: email,
                    phone: phone
                },
                success: function success(data) {
                    if (data.code <= 0) alert(data.msg);else if (data.code == 1) {
                        alert("添加成功");
                        amsg.modal("hide");
                        getUserByPno(1);
                    }
                }
            });
            return false;
        });
    });

    getUserByPno(1);
    function format(date) {

        var y = date.getFullYear();
        var M = date.getMonth() + 1;

        var d = date.getDate();

        var h = date.getHours();

        var m = date.getMinutes();
        m < 10 && (m = "0" + m);

        var s = date.getSeconds();
        s < 10 && (s = "0" + s);

        return y + "年" + M + "月" + d + "日 " + h + ":" + m + ":" + s;
    }
});

//# sourceMappingURL=user_list-s.js.map