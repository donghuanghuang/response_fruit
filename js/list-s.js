"use strict";

/**
 * 此文件存放用户订单中心的js代码
 * 包括 获取订单 管理订单
 * 获取收货地址 管理收回地址
 * 密码管理等
 */
(function () {

    function getListByPno(pno) {
        //获取用户订单 依据服务器端session的uid 如果没有 则返回未登录
        $.ajax({
            url: "data/getlist.php",
            type: "get",
            data: { pageSize: 3, pno: pno },
            success: function success(datas) {
                console.log(datas);
                if (datas.ok == 0) {
                    alert("请先登录!");
                    location.href = "login.html";
                } else if (datas.length != 0) {
                    var data = datas.data;
                    var html = "";

                    $(data).each(function (i, data) {

                        var thtml = "";
                        var f = data.ldetail;

                        //console.log(data);
                        var date = format(new Date(parseInt(data.lDate)));

                        var pay = "中国银行";

                        var lstate = "等待发货";
                        var btnstate1 = "";
                        var btnstate2 = "";
                        var btnstate3 = "";

                        switch (parseInt(data.lstate)) {
                            case -2:
                                lstate = "未付款";
                                btnstate1 = "hide";
                                btnstate2 = "";
                                btnstate3 = "";
                                break;
                            case -1:
                                lstate = "订单已取消"; //管理员操作
                                btnstate1 = "hide";
                                btnstate2 = "hide";
                                btnstate3 = "";
                                break;
                            case 0:
                                lstate = "等待管理员处理"; //
                                btnstate1 = "hide";
                                btnstate2 = "hide";
                                btnstate3 = "hide";
                                break;
                            case 1:
                                lstate = "等待发货"; //
                                btnstate1 = "";
                                btnstate2 = "";
                                btnstate3 = "hide";
                                break;
                            case 2:
                                lstate = "等待收货"; //管理员操作
                                btnstate1 = "";
                                btnstate2 = "";
                                btnstate3 = "hide";
                                break;
                            case 3:
                                lstate = "交易成功"; ////
                                btnstate1 = "hide";
                                btnstate2 = "hide";
                                btnstate3 = "";
                                break;
                            default:
                                lstate = "未付款";
                                btnstate1 = "hide";
                                btnstate2 = "";
                                btnstate3 = "";
                                break;
                        }

                        switch (parseInt(data.pay_method)) {
                            case 2:
                                pay = "工商银行";
                                break;
                            case 3:
                                pay = "招商银行";
                                break;

                            case 4:
                                pay = "建设银行";
                                break;
                            case 5:
                                pay = "农业银行";
                                break;
                            default:
                                pay = "中国银行";
                                break;
                        }

                        $(f).each(function (i, obj) {
                            thtml += "<tr>\n                                 <td><a href=\"product_detail.html?fid=" + obj.fid + "\"><img width=\"70\" src=\"" + obj.lg + "\" alt=\"\"/>" + obj.title + "</a></td>\n\n                                  <td>" + obj.price + "</td>\n                                   <td>" + obj.fcount + "</td>\n                              </tr>";
                        });

                        html += "<div class=\"panel panel-success mt-30\">\n                    <div class=\"panel-heading\">\n                        <h3><a href=\"#" + data.lid + "\" data-toggle=\"collapse\" class=\"tpa\" data-parent=\"#pgroup\">\u8BA2\u5355\u7F16\u53F7:" + ("00" + data.lid) + " <span class=\"fr\">\uFFE5" + data.totalprice + "</span></a></h3>\n                    </div>\n                    <div id=\"" + data.lid + "\" class=\"collapse panel-collapse\">\n                        <div class=\"panel-body\">\n                            <h4>\u8BA2\u5355\u72B6\u6001: <span>" + lstate + "<span></h4>\n                            <h4 class=\"mt-30\">\u6536\u8D27\u4EBA: <span>" + data.firstname + "</span></h4>\n                            <h4 class=\"mt-30\">\u8054\u7CFB\u7535\u8BDD: <span>" + data.uphone + "</span></h4>\n                            <h4 class=\"mt-30\">\u6536\u8D27\u5730\u5740: <span>" + data.uaddress + "</span></h4>\n                            <h4 class=\"mt-30\">\u652F\u4ED8\u65B9\u5F0F: <span>" + pay + "</span></h4>\n                            <h4 class=\"mt-30\">\u4E0B\u5355\u65F6\u95F4: " + date + "</h4>\n                            <h4 class=\"mt-30\">\u8BA2\u5355\u8BE6\u60C5:</h4>\n                            <table class=\"table table-hover tcart table-bordered\">\n                                <thead>\n                                <tr>\n                                    <th>\u5546\u54C1</th>\n                                    <th>\u5355\u4EF7</th>\n                                    <th>\u6570\u91CF</th>\n                                </tr>\n                                </thead>\n                                <tbody>\n                                       " + thtml + "\n                                </tbody>\n                            </table>\n                            <h3>\u5907\u6CE8\u4FE1\u606F:</h3>\n\n                            <div class=\"well well-lg\">\n                                " + data.common + "\n                            </div>\n                            <h4>\n                                <button type=\"button\" data-toggle=\"" + data.lid + "\" class=\"clist btn btn-success fr " + btnstate1 + "\">\u786E\u8BA4\u6536\u8D27</button>\n                                <button type=\"button\" data-toggle=\"" + data.lid + "\" class=\"qlist btn btn-warning fr mr-30 " + btnstate2 + "\">\u53D6\u6D88\u8BA2\u5355</button>\n                                <button type=\"button\" data-toggle=\"" + data.lid + "\" class=\"dlist btn btn-danger fr mr-30 " + btnstate3 + "\">\u5220\u9664\u8BA2\u5355</button>\n                            </h4>\n                        </div>\n                    </div>\n                </div>";
                    });

                    var pno = parseInt(datas.pno);
                    var maxPage = parseInt(datas.maxPage);
                    //加载分页条
                    var phtml = "";
                    var pages = $("#listpages");
                    var prev = pno - 1;
                    var next = pno + 1;

                    if (prev <= 0) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                    </li>";else phtml += "<li>\n                        <a href=\"" + (pno - 1) + "\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                        </li>";

                    if (pno - 1 > 0) phtml += " <li><a href=\"" + (pno - 1) + "\">" + (pno - 1) + "</a></li>";

                    phtml += " <li class=\"active\"><a href=\"" + pno + "\">" + pno + "</a></li>";

                    if (pno + 1 <= maxPage) phtml += "<li><a href=\"" + (pno + 1) + "\">" + (pno + 1) + "</a></li>";

                    if (next > maxPage) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";else phtml += " <li>\n                        <a href=\"" + (pno + 1) + "\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";
                    pages.html(phtml);
                    //为分页条按钮添加事件
                    pages.off().on("click", "a", function (e) {
                        e.preventDefault();
                        if (!$(this).parent().hasClass("disabled")) {
                            var pno = $(this).attr("href");
                            getListByPno(pno);
                        }
                    });

                    $("#pgroup").off().html(html).on("click", "button.fr", function () {
                        var lid = $(this).data("toggle");
                        if ($(this).hasClass('clist')) {
                            alertMsg("收货确认", "请确认收到商品后再确认收货!不然您可能钱货两空!", true, "取消", "确认", function () {
                                $.ajax({
                                    url: "data/setlist.php",
                                    type: "post",
                                    data: {
                                        lid: lid,
                                        lstate: 3
                                    },
                                    success: function success(data) {
                                        if (data.ok == 1) {
                                            //alert("操作成功！");
                                            location.reload();
                                        } else {
                                            alert("未知错误请联系管理员");
                                        }
                                    },
                                    error: function error(err) {

                                        console.log(err.message);
                                        //alert("网络故障");
                                    }

                                });
                            });
                        } else if ($(this).hasClass('qlist')) {
                            alertMsg("取消确认", "确定取消订单吗?", true, "取消", "确认", function () {
                                $.ajax({
                                    url: "data/setlist.php",
                                    type: "post",
                                    data: {
                                        lid: lid,
                                        lstate: 0
                                    },
                                    success: function success(data) {
                                        if (data.ok == 1) {
                                            //alert("操作成功！");
                                            location.reload();
                                        } else {
                                            alert("未知错误请联系管理员");
                                        }
                                    },
                                    error: function error() {
                                        console.log(err.message);
                                    }

                                });
                            });
                        } else if ($(this).hasClass('dlist')) {
                            alertMsg("删除确认", "确定删除订单吗?", true, "取消", "确认", function () {
                                $.ajax({
                                    url: "data/dellist.php",
                                    type: "post",
                                    data: {
                                        lid: lid
                                    },
                                    success: function success(data) {
                                        if (data.ok == 1) {
                                            //alert("操作成功！");
                                            location.reload();
                                        } else {
                                            alert("未知错误请联系管理员");
                                        }
                                    },
                                    error: function error() {
                                        console.log(err.message);
                                    }

                                });
                            });
                        }
                    });
                }
            },
            error: function error() {
                console.log(err.message);
            }
        });
    }

    getListByPno(1);

    getadr();
    //根据服务器uid获取收货地址
    function getadr() {
        //异步加载地址内容
        $.ajax({
            url: "data/getadr.php",
            type: "get",
            success: function success(data) {
                var alist = $("#adrlist");
                var html = "";
                if (data.msg == "null") {
                    html = "<tr>\n                         <td align=\"center\" colspan=\"5\">\u60A8\u8FD8\u6CA1\u6709\u6536\u8D27\u5730\u5740\u54E6 \u8D76\u7D27\u6DFB\u52A0\u4E00\u4E2A\u5427~</td>\n                        </tr>";
                    alist.html(html);
                } else if (data.ok == 0) {
                    alert("请先登陆!");
                    location.href = "login.html";
                } else if (data.length != 0) {

                    $(data).each(function (i, d) {

                        var isDefault = "";
                        if (d.isDefault == "1") {
                            isDefault = "<span class=\"badge\">\u9ED8\u8BA4</span>";
                        }

                        html = " <tr>\n                                <td>" + (data.length - i) + " " + isDefault + "</td>\n                                <td>" + d.firstname + "</td>\n                                <td>" + d.uaddress + "</td>\n                                <td>" + d.uphone + "</td>\n                                <td data-aid=\"" + d.aid + "\">\n                                    <a class=\"setadr btn btn-primary\">\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740</a>\n                                    <a class=\"editadr btn btn-success\">\u7F16\u8F91</a>\n                                    <a class=\"deladr btn btn-danger\">\u5220\u9664</a>\n                                </td>\n                            </tr>" + html;
                    });

                    alist.html(html);
                }
            },
            error: function error() {
                alert("网络故障");
                location.href = "index.html";
            }
        });
    }
    //收货地址添加事件 ajax异步提交到服务器
    $("#adrform").off().on("submit", function (e) {
        e.preventDefault();
        var isd = 0;
        //console.log();
        if ($(this).find('[type=checkbox]').is(":checked")) {
            isd = 1;
        }
        $.ajax({
            url: "data/addadr.php",
            type: "post",
            data: $(this).serialize() + "&isd=" + isd,
            success: function success(data) {
                if (data.ok == 1) {
                    getadr();
                    $("#newadr").modal("hide").find("input").val("");
                } else {
                    alert(data.msg);
                }
            },
            error: function error() {
                alert("未知错误");
            }
        });
        return false;
    });
    //冒泡事件绑定收货地址管理的三个按钮
    //分别是设置默认地址  删除 修改
    $("#adrlist").off().on("click", "a", function () {
        var a = $(this);
        if ($(this).hasClass('setadr')) {

            $.ajax({
                url: "data/setadr.php",
                type: "post",
                data: {
                    aid: a.parent().data("aid")
                },
                success: function success(data) {
                    if (data.ok == 1) {
                        getadr();
                    } else {
                        alert(data.msg);
                    }
                },
                error: function error() {
                    alert("未知错误");
                }
            });
        } else if ($(this).hasClass('deladr')) {

            alertMsg("删除确认", "确定要删除吗?", true, "取消", "确认", function () {
                $.ajax({
                    url: "data/deladr.php",
                    type: "post",
                    data: {
                        aid: a.parent().data("aid")
                    },
                    success: function success(data) {
                        if (data.ok == 1) {
                            getadr();
                            $("#alertmsg").modal("hide");
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function error() {
                        alert("未知错误");
                    }
                });
            });
        } else if ($(this).hasClass("editadr")) {
            var aid = $(this).parent().data("aid");
            $.ajax({
                url: "data/getadrbyid.php",
                type: "post",
                data: {
                    aid: aid
                },
                success: function success(data) {
                    if (data.ok == 0) {
                        alert(data.msg);
                    } else {
                        console.log(data);
                        $("#editadr").modal("show").data("aid", aid);
                        $("#efname").val(data.firstname);
                        $("#eadr").val(data.uaddress);
                        $("#ephone").val(data.uphone);
                    }
                },
                error: function error() {
                    alert("未知错误");
                }
            });
        }
    });

    //编辑收货地址提交事件
    $("#edit").off().on("submit", function (e) {
        e.preventDefault();
        var firstname = $("#efname").val();
        var uaddress = $("#eadr").val();
        var uphone = $("#ephone").val();
        $.ajax({
            url: "data/editadr.php",
            type: "post",
            data: {
                aid: $("#editadr").data("aid"),
                firstname: firstname,
                uaddress: uaddress,
                uphone: uphone
            },
            success: function success(data) {
                if (data.ok == 1) {
                    getadr();
                    $("#editadr").modal("hide").find("input").val("");
                } else {
                    alert(data.msg);
                }
            },
            error: function error() {
                alert("未知错误");
            }
        });

        return false;
    });

    //修改密码模块
    /**
     * 必须输入正确原密码
     * 原密码与新密码不能一致
     * 密码长度验证等
     */
    var oInput = $("#oldpwd");
    var nInput = $("#newpwd");
    var cInput = $("#cnewpwd");

    oInput.keyup(function () {
        if ($(this).val() == "") {
            $(this).next().html("原密码不能为空").addClass('text-danger').removeClass("text-info");
        } else {
            $(this).next().html("请输入原密码").addClass('text-info').removeClass("text-danger");
        }
    });

    nInput.keyup(function () {
        if ($(this).val() == "") {
            $(this).next().html("新密码不能为空").addClass('text-danger').removeClass("text-info");
        } else {
            $(this).next().html("新密码长度必须在6到12位").addClass('text-info').removeClass("text-danger");
        }
    });

    cInput.keyup(function () {
        if ($(this).val() == "") {
            $(this).next().html("请确认密码").addClass('text-danger').removeClass("text-info");
        } else {
            $(this).next().html("两次输入密码必须一致").addClass('text-info').removeClass("text-danger");
        }
    });

    $(".changepwd").click(function () {

        if (oInput.val() == "") {
            oInput.next().html("原密码不能为空").addClass('text-danger').removeClass("text-info");
            return;
        }

        if (nInput.val() == "") {
            nInput.next().html("新密码不能为空").addClass('text-danger').removeClass("text-info");
            return;
        }
        if (cInput.val() == "") {
            cInput.next().html("请确认密码").addClass('text-danger').removeClass("text-info");
            return;
        }

        if (nInput.val().length < 6 || nInput.val().length > 12) {
            nInput.next().html("新密码长度必须在6到12位").addClass('text-danger').removeClass("text-info");
            return;
        }

        if (nInput.val() != cInput.val()) {
            cInput.next().html("两次输入密码不一致").addClass('text-danger').removeClass("text-info");
            return;
        }
        //验证成功则异步提交  修改成功必须重新登录
        $.ajax({
            url: "data/changepwd.php",
            type: "post",
            data: {
                opwd: oInput.val(),
                npwd: nInput.val()
            },
            success: function success(data) {
                if (data.ok == 1) {
                    alert("修改成功 请重新登陆");
                    location.href = "login.html";
                } else if (data.ok == -1) {
                    oInput.next().html("原密码不正确").addClass('text-danger').removeClass("text-info");
                } else if (data.ok == -2) {
                    nInput.next().html("原密码和新密码不能相同").addClass('text-danger').removeClass("text-info");
                } else {
                    alert("未知错误");
                }
            },
            error: function error() {
                alert("未知错误");
            }
        });
    });

    //日期格式转换

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

    /*顶部购物车数量加载*/
    function upcount() {
        $.ajax({
            url: "data/getcart.php",
            type: "get",
            success: function success(data) {
                if (data.ok != 0) $(".top_cart>span:eq(0)").html(data.length);else $(".top_cart>span:eq(0)").html(0);
            }
        });
    }

    /*弹出自定义模态框*/

    function alertMsg(title, msg, isConfirm, btn1, btn2, callback) {
        var dialog = $("#alertmsg");
        dialog.find(".modal-title").html(title);
        dialog.find(".modal-body").html(msg);
        dialog.find(".modal-footer>button:eq(0)").html(btn1);

        if (!isConfirm) {
            dialog.find(".modal-footer>button:eq(1)").addClass("hide");
            dialog.find(".modal-footer>button:eq(0)").html(btn2).off().on("click", callback);
        } else {
            dialog.find(".modal-footer>button:eq(1)").html(btn2).off().on("click", callback);
        }

        dialog.modal("show");
    }
})();

//# sourceMappingURL=list-s.js.map