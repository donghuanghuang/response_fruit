"use strict";

/*异步请求购物车内容*/
/**
 * uid从服务器端session获取
 *
 * 如果没有登录 则需要先登录
 *
 * 删除购物车
 *
 * 清空购物车 等功能代码
 */

(function () {
    /*获取购物车内容显示在页面中*/
    $.ajax({
        url: "data/getcart.php",
        type: "get",
        success: function success(datas) {
            if (datas.ok == 0) {
                alert("请先登录!");
                location.href = "login.html";
            } else if (datas.length == 0) {
                var html = "<tr><td colspan='4' align='center'>您的购物车空空如也~</td></tr>";
                $("#items").html(html);
                $(".clearcart").parent().hide();
                setTotalprice();
            } else {
                //console.log(datas);

                var html = "";

                for (var x in datas) {
                    var data = datas[x];
                    html += " <tr class=\"cart_item\">\n                        <td class=\"title\"><a href=\"product_detail.html?fid=" + data.fid + "\"><img src=\"" + data.lg + "\" width=70 alt=\"\"/></a> <a href=\"#\">" + data.title + "</a></td>\n                        <td class=\"count\"><input type=\"number\" data-fid=\"" + data.fid + "\" value=\"" + data.fcount + "\" max=\"99\" min=\"1\"/></td>\n                        <td class=\"price\">\uFFE5<span>" + data.price + "</span> X <span>" + data.fcount + "</span></td>\n                        <td><a href=\"#\" data-fid=\"" + data.fid + "\" class=\"btn-danger btn btn-xs\">\u5220\u9664</a></td>\n                    </tr>";
                }

                $("#items").html(html);
                setTotalprice();
            }
            /*为数量填写框添加事件*/
            $("#items td.count>input").each(function (i, elem) {
                elem.onchange = function () {
                    var fcount = this.value;
                    var fid = $(this).data("fid");
                    var oInput = $(this);
                    $.ajax({
                        url: "data/updatecart.php",
                        type: "post",
                        data: {
                            fid: fid,
                            fcount: fcount
                        },
                        success: function success(data) {
                            //console.log(data);
                            if (data.ok == 1) {
                                oInput.parent().next().find("span:eq(1)").html(fcount);
                                setTotalprice();
                            } else if (data.ok == 0) {
                                alertMsg("未知错误", "未知错误,请联系管理员", false, "关闭", "关闭", function () {
                                    location.reload();
                                });
                            }
                        }
                    });
                };
            });

            /*为每个删除按钮添加事件*/
            $(".cart_item td a[data-fid]").each(function (i, elem) {
                var fid = $(elem).data("fid");
                elem.onclick = function (e) {
                    e.preventDefault();
                    alertMsg("删除确认", "确认删除这个商品吗", true, "取消", "确认", function () {
                        // location.href="cart.html";
                        $.ajax({
                            url: "data/delcart.php",
                            type: "post",
                            data: {
                                fid: fid
                            },
                            success: function success(data) {
                                if (data.ok == 1) location.reload();else {
                                    alertMsg("未知错误", "未知错误,请联系管理员", false, "关闭", "关闭", function () {
                                        location.reload();
                                    });
                                }
                            }
                        });
                    });
                    //if(confirm("您确定要删除这件商品吗?")){
                    //
                    //}
                };
            });

            /*清空购物车*/
            $(".clearcart").click(function () {
                alertMsg("删除确认", "您确定要清空购物车吗?", true, "取消", "确认", function () {

                    // location.href="cart.html";
                    $.ajax({
                        url: "data/delcart.php",
                        type: "post",
                        data: { fid: -1 },
                        success: function success(data) {
                            if (data.ok == 1) {
                                //alertMsg("清空购物车成功","清空购物车成功",false,"关闭","关闭",function(){location.reload()});
                                location.reload();
                            }
                        }
                    });
                });

                //if(confirm("您确定要清空购物车吗?")){
                //
                //}
            });
        },
        error: function error() {
            alert("网络故障");
        }
    });

    /*计算购物车总价格价格*/
    function setTotalprice() {
        var prices = $("#items td.price");
        var totalH = $(".total_price h3:eq(0)");

        var total = 0;

        if (prices.length == 0) totalH.html(total + ".00");
        prices.each(function (i, elem) {
            var price = parseFloat($(elem).find("span:eq(0)").html());
            var count = parseInt($(elem).find("span:eq(1)").html());
            total += price * count;
        });
        totalH.html("￥" + total.toFixed(2));
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
            dialog.find(".modal-footer>button:eq(0)").html(btn2).on("click", callback);
        } else {
            dialog.find(".modal-footer>button:eq(1)").html(btn2).on("click", callback);
        }

        dialog.modal("show");
    }
})();

//# sourceMappingURL=cart-s.js.map