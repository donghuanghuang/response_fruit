"use strict";

/**
 * 此文件存放主页调用的js代码
 * 包括 获取热销商品 推荐商品
 * 首页商品加入购物车事件
 * 底部轮播
 * 滑动事件
 */
(function () {
    //根据类别获取热销商品
    //PHP随机获取八条数据返回
    function getOnsale(ftype) {
        $.ajax({
            url: "data/index_onsale.php",
            type: "get",
            ftype: ftype,
            error: function error() {
                alert("网络故障");
            },
            success: function success(data) {
                var html = "";
                for (var x in data) {

                    html += "<div class=\" col-xs-6  col-md-3 text-center p_list\">\n                            <div class=\"li_ctx\">\n                            <a href=\"product_detail.html?fid=" + data[x].fid + "\">\n                                <img  src=\"" + data[x].lg + "\" alt=\"\">\n                            </a>\n                            <p class=\"title\">" + data[x].title + "</p>\n                            <p class=\"price\">\uFFE5" + data[x].price + "</p>\n                            <p class=\"add_cart\"><a data-fid=\"" + data[x].fid + "\" href=\"#\">\u52A0\u5165\u8D2D\u7269\u8F66</a></p>\n                             </div>\n                      </div>";

                    if (x >= 4) {
                        $(".row2").html(html);
                    } else $(".row1").html(html);
                    if (x == 3) {
                        html = '';
                    }
                }
            }
        });
    }

    getOnsale("");
    //为导航绑定事件
    /*热销导航按钮事件*/
    $(".onsale").off().on("click", "p", function () {
        if (!$(this).parent().hasClass("active")) {
            getOnsale($(this).parent().index());
            $(this).parent().addClass("active").siblings().removeClass("active");
        }
    });

    /*首页加入购物车事件*/
    $(".salelist").off().on("click", "p.add_cart a", function (e) {
        e.preventDefault();
        var a = $(this);
        $.ajax({
            url: "data/addcart.php",
            type: "get",
            data: {
                fid: a.data("fid"),
                fcount: 1
            },
            success: function success(data) {
                console.log(data);
                if (data.ok == 1) {
                    alertMsg("添加成功", "添加成功", true, "继续购物", "去购物车结算", function () {
                        location.href = "cart.html";
                    });
                    upcount();
                } else {
                    alertMsg("请先登录", "请先登录", false, "关闭", "关闭", function () {
                        location.href = "login.html";
                    });
                }
            },
            error: function error() {
                alertMsg("添加失败", "添加失败", false, "关闭", "关闭", function () {});
            }

        });
    });

    /*~底部轮播~ 无限滚动*/
    var box1 = $(".bigbox>.box1");
    var box2 = $(".bigbox>.box2");

    $.ajax({
        url: "data/index_onsale.php",
        type: "get",
        data: "fcount=4",
        success: function success(data) {
            var html = "";
            for (var x in data) {
                var f = data[x];
                html += "<div class=\"text-center p_list\">\n                         <div class=\"li_ctx\">\n                            <a href=\"product_detail.html?fid=" + f.fid + "\">\n                                <img  src=\"" + f.lg + "\" alt=\"\">\n                            </a>\n                            <p class=\"title\">" + f.title + "</p>\n                            <p class=\"price\">\uFFE5" + f.price + "</p>\n                            <p class=\"add_cart\"><a data-fid=\"" + f.fid + "\" href=\"#\">\u52A0\u5165\u8D2D\u7269\u8F66</a></p>\n                         </div>\n                      </div>";
            }
            box1.html(html);
            box2.html(html);
            //滚动定时器
            var sTimer = setInterval(oSlide, 40);
        },
        error: function error() {
            alert("网络故障");
        }

    });

    //获取Left值
    function getLeft(obj) {
        return obj.css('left').replace('px', '');
    }
    //设置Left值
    function setLeft(obj, len) {
        var oLeft = parseInt(obj.css('left').replace('px', ''));
        obj.css('left', oLeft - len + "px");
    }
    //    //滑动事件
    function oSlide() {
        var BOXWIDTH = box2[0].offsetWidth;

        if (getLeft(box1) > -BOXWIDTH) {
            setLeft(box1, 1);
        } else {
            box1.css('left', BOXWIDTH + 'px');
        }

        if (getLeft(box2) > -BOXWIDTH * 2) {
            setLeft(box2, 1);
        } else {
            box2.css('left', BOXWIDTH + 'px');
        }
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
        }

        dialog.find(".modal-footer>button:eq(1)").html(btn2).off().on("click", callback);
        dialog.modal("show");
    }
})();

//# sourceMappingURL=index-s.js.map