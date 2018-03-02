"use strict";

/**
 * 此文件存放公共调用的js代码
 *包括
 *  加载页头 页尾 顶部购物车
 *  判断是否登录
 *  搜索帮助 顶部购物车数量更新
 *  弹出模态框 等公共代码
 */
/*记录IP访问*/
$.ajax({
    url: "data/vhistory.php",
    type: "get"
});

/*加载页头*/
$.ajax({
    url: "header.html",
    type: "get",
    success: function success(data) {
        $("body>header").html(data);
        $.ajax({
            //判断是否登陆
            url: "data/isLogin.php",
            type: "get",
            success: function success(data) {

                if (data.ok == 1) {
                    //如果已经登录

                    var html = "<li class=\"hidden-xs\"><span>\u7528\u6237\u540D&nbsp;:" + data.uname + "&nbsp;&nbsp;</span><a class=\"logout\" href=\"#\">\u6CE8\u9500</a></li>\n                   <li class=\"hidden-xs\"><a href=\"list.html\">\u4E2A\u4EBA\u4E2D\u5FC3</a></li>\n                    <li class=\"hidden-xs\"><a href=\"checkout.html\">\u6536\u94F6\u53F0</a></li>";
                    $("#user_info>li").before(html);
                    /*加载导航条*/

                    html = "<li><a href=\"index.html\" >\u4E3B\u9875</a></li>\n                    <li><a href=\"list.html\" >\u4E2A\u4EBA\u4E2D\u5FC3</a></li>\n                    <li><a href=\"cart.html\">\u8D2D\u7269\u8F66</a></li>\n                    <li><a class=\"logout\" href=\"#\">\u6CE8\u9500</a></li>\n                    <li><a href=\"about.html\">\u5173\u4E8E</a></li>";

                    $("body>nav .nav_bar").html(html);
                    $("body ul.ulr").html(html);
                } else {
                    //未登录
                    var html = "<li class=\"hidden-xs\"><a href=\"login.html\">\u767B\u5F55</a></li>\n                             <li class=\"hidden-xs\"><a href=\"register.html\">\u6CE8\u518C</a></li>";
                    $("#user_info>li").before(html);

                    html = "<li><a href=\"index.html\" >\u4E3B\u9875</a></li>\n                    <li><a href=\"login.html\" >\u767B\u5F55</a></li>\n                    <li><a href=\"register.html\">\u6CE8\u518C</a></li>\n                    <li><a href=\"about.html\">\u8054\u7CFB\u6211\u4EEC</a></li>\n                    <li><a href=\"about.html\">\u5173\u4E8E</a></li>\n                    ";

                    $("body>nav .nav_bar").html(html);
                    $("body ul.ulr").html(html);
                }
                //注销
                $(".logout").click(function (e) {
                    e.preventDefault();
                    $.ajax({
                        url: "data/logout.php",
                        type: "get",
                        success: function success() {
                            location.reload();
                        }
                    });
                });

                $(".top_cart").on("click", function () {
                    if (!$(this).hasClass('open')) getopcart();
                    upcount();
                });

                upcount();
            }
        });
    }
});

/*加载 页尾 */
$.ajax({
    url: "footer.html",
    type: "get",
    success: function success(data) {
        //将模态框加入到footer 元素后面
        var html = "\n    <div class=\"modal fade\" id=\"alertmsg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myalert\">\n        <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myalert\">\u6807\u9898</h4>\n            </div>\n            <div class=\"modal-body\">\n                ...\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\u5173\u95ED</button>\n                <button type=\"button\" class=\"btn btn-primary\">\u4FDD\u5B58</button>\n            </div>\n        </div>\n    </div>\n</div>";

        $("body>footer").html(data).after(html);
    }
});

/*加载顶部购物车*/
function getopcart() {
    $.ajax({
        url: "data/getcart.php",
        type: "get",
        success: function success(data) {
            var html = "";
            var total = 0;

            if (data.ok == 0 || data.length == 0) {
                html += "\n                        <div class=\"container-fluid\">\n                             <div class=\"row mt-20\">\n                                <div class=\"col-xs-12\">\u60A8\u7684\u8D2D\u7269\u8F66\u6CA1\u6709\u4EFB\u4F55\u5546\u54C1</div>\n                            </div>\n\n                            <div class=\"row mt-20\">\n                                <div class=\"col-xs-6 totaltitle\">\u603B\u4EF7:</div>\n                                <div class=\"col-xs-6 totalprice\"> \uFFE5" + total.toFixed(2) + "</div>\n                            </div>\n                        </div>\n\n                        <div class=\"container-fluid\">\n                            <div class=\"row mt-10\">\n                                <a href=\"checkout.html\" class=\"btn btn-danger\">\u53BB\u7ED3\u7B97</a>\n                                <a href=\"cart.html\" class=\"btn btn-success\">\u8D2D\u7269\u8F66</a>\n                            </div>\n                        </div>";
            } else {
                for (var x in data) {
                    var p = data[x];
                    total += parseFloat(p.price) * p.fcount;
                    html += "<div class=\"media\">\n                             <div class=\"media-left\"><img width=\"50\" src=\"" + p.lg + "\" alt=\"\"/></div>\n                                <div class=\"media-body\">\n                                    <h4 class=\"media-heading\">" + p.title + "</h4>\n                                      <div>\n                                        <span class=\"price\">\uFFE5" + p.price + "</span>\n                                       <span class=\"count\">X " + p.fcount + "</span>\n                                       <a href=\"#\" data-fid=\"" + p.fid + "\" class=\"glyphicon glyphicon-remove fr\"></a>\n                             </div>\n                       </div>\n              </div>";
                }

                html += "\n                        <div class=\"container-fluid\">\n                            <div class=\"row mt-20\">\n                                <div class=\"col-xs-6 totaltitle\">\u603B\u4EF7:</div>\n                                <div class=\"col-xs-6 totalprice\"> \uFFE5" + total.toFixed(2) + "</div>\n                            </div>\n                        </div>\n\n                        <div class=\"container-fluid\">\n                            <div class=\"row mt-10\">\n                                <a href=\"checkout.html\" class=\"btn btn-danger\">\u53BB\u7ED3\u7B97</a>\n                                <a href=\"cart.html\" class=\"btn btn-success\">\u8D2D\u7269\u8F66</a>\n                            </div>\n                        </div>";
            }
            //购物车删除事件
            $(".ocart").html(html).on("click", ".glyphicon-remove", function (e) {
                e.preventDefault();
                $.ajax({
                    url: "data/delcart.php",
                    data: { fid: $(this).data("fid") },
                    type: "post",
                    success: function success(data) {
                        if (data.ok == 0) alert("删除失败");else if (data.ok == 1) {
                            getopcart();
                            upcount();
                        }
                    }
                });
            });
        }
    });
}

/*为搜索框绑定事件  搜索帮助*/

$(".seachtxt>input").on("change focus keyup", function () {
    var kw = $(this).val();
    console.log(kw)
    if (kw == "") {
        $(".seachtxt>ul").addClass('hide').html("");
    } else {
        $.ajax({
            url: "data/search.php",
            data: { kw: kw },
            type: "get",
            success: function success(data) {
                //console.log(data)
                if (data.length == 0 || data == []) return;else {
                    var html = "";
                    for (var x in data) {
                        var d = data[x];
                        html += "<li data-fid=\"" + d.fid + "\">" + d.title + " <span class=\"fr\">" + d.price + " </span></li>";
                    }
                    $(".seachtxt>ul").removeClass('hide').html(html);
                }
            }

        });
    }
});

/*为搜索帮助结果的Li绑定事件*/
$(".seachtxt>ul").on("click", 'li', function () {
    location.href = "product_detail.html?fid=" + $(this).data("fid");
});

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
        dialog.find(".modal-footer>button:eq(0)").html(btn2).on("click", callback);
    } else {
        dialog.find(".modal-footer>button:eq(1)").html(btn2).on("click", callback);
    }

    dialog.modal("show");
}

//# sourceMappingURL=base-s.js.map