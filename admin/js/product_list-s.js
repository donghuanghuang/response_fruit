"use strict";

/**
 * Created by web-01 on 2017/10/31.
 */
$(function () {
    var show = $("#showinfo");

    //加载商品列表
    function getlistbypno(pno) {
        $.ajax({
            url: "data/getproducts.php",
            type: "get",
            data: {
                pno: pno,
                pageSize: 8
            },
            success: function success(data) {
                var html = "";
                var pno = parseInt(data.pno);
                if (data.data.length != 0) {
                    for (var x in data.data) {
                        var ds = data.data[x];
                        html += "<tr>\n                <td>" + ds.fid + "</td>\n                <td><img width=\"30\" src=\"../" + ds.lg + "\" alt=\"\"/></td>\n                <td>" + ds.title + "</td>\n                <td>" + ds.price + "</td>\n                <td>" + ds.reviews + "</td>\n                <td>\n                  <button type=\"button\" data-fid=\"" + ds.fid + "\" class=\"btn btn-primary btn-xs btn-xq\">\u8BE6\u60C5</button>\n                  <button type=\"button\" data-fid=\"" + ds.fid + "\" class=\"btn btn-info btn-xs btn-xg\">\u4FEE\u6539</button>\n                  <button type=\"button\" data-fid=\"" + ds.fid + "\" class=\"btn btn-danger btn-xs btn-sc\">\u5220\u9664</button>\n                </td>\n              </tr>";
                    }
                } else {
                    html += "<tr><td colspan='6'>找不到商品...</td></tr>";
                }

                $("#tblist").off().html(html).on("click", 'button', function () {

                    var fid = $(this).data("fid");
                    if ($(this).hasClass('btn-xq')) {

                        $.ajax({
                            url: "data/getproductbyid.php",
                            type: "get",
                            data: { fid: fid },
                            success: function success(data) {
                                var html = "<p>\u5546\u54C1\u540D\u79F0:" + data.title + "</p>\n                                    <p>\u5546\u54C1\u4EF7\u683C:" + data.price + "</p>\n                                    <p>\u9500\u91CF:" + data.reviews + "</p>\n                                    <p>\u8BE6\u7EC6\u63CF\u8FF0:" + data.detail2 + "</p>";
                                show.find('.modal-title').html("商品详情");
                                show.modal("show").find('.modal-body').html(html);
                            }
                        });
                    } else if ($(this).hasClass('btn-xg')) {
                        var amsg = $("#alertmsg");

                        $.ajax({
                            url: "data/getproductbyid.php",
                            type: "get",
                            data: { fid: fid },
                            success: function success(data) {
                                var html = " <div class=\"form-group\">\n                <label for=\"title\">\u6807\u9898:</label>\n                <input type=\"text\" class=\"form-control\"  required name=\"title\" value=\"" + data.title + "\"/>\n               </div>\n\n               <div class=\"form-group\">\n                <label for=\"price\">\u4EF7\u683C:</label>\n                <input type=\"text\" class=\"form-control\" required name=\"price\" value=\"" + data.price + "\"/>\n               </div>";

                                amsg.find(".modal-title").html("修改");
                                amsg.modal("show").find('.modal-body').html(html);
                                $("#xgform").on("submit", function (e) {
                                    e.preventDefault();
                                    var title = amsg.find("[name='title']").val();
                                    var price = amsg.find("[name='price']").val();

                                    if (!title || title == " ") {
                                        alert("商品名称必须填写");
                                        return;
                                    }
                                    if (!price || price == " " || isNaN(parseFloat(price))) {
                                        alert("价格填写不正确");
                                        return;
                                    }
                                    price = parseFloat(price).toFixed(2);

                                    $.ajax({
                                        url: "data/upproduct.php",
                                        type: "get",
                                        data: { fid: fid, title: title, price: price },
                                        success: function success(data) {
                                            if (data.code == -1) {
                                                alert("修改失败");
                                            }
                                            amsg.modal("hide");
                                            getlistbypno(pno);
                                        }
                                    });
                                });
                            }
                        });
                    } else if ($(this).hasClass("btn-sc")) {
                        if (confirm("确定删除这个商品吗?")) {

                            $.ajax({
                                url: "data/delpro.php",
                                type: "post",
                                data: { fid: fid },
                                success: function success(data) {

                                    if (data.code == -2) {
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('普通管理员无权操作');
                                    } else if (data.code <= 0) {
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('删除失败');
                                    } else if (data.code == 1) {
                                        //alert("删除成功");
                                        //console.log(1);
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('删除成功');
                                        getlistbypno(pno);
                                    }
                                }
                            });
                        }
                    }
                });

                //加载分页条
                var phtml = "";
                var pages = $("#pagination");
                //var pno = parseInt(data.pno);
                var prev = pno - 1;
                var next = pno + 1;
                var maxPage = parseInt(data.maxPage);

                if (prev <= 0) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                    </li>";else phtml += "<li>\n                        <a href=\"" + (pno - 1) + "\" aria-label=\"Previous\">\n                            <span aria-hidden=\"true\">&laquo;</span>\n                        </a>\n                        </li>";

                if (pno - 1 > 0) phtml += " <li><a href=\"" + (pno - 1) + "\">" + (pno - 1) + "</a></li>";

                phtml += " <li class=\"active\"><a href=\"" + pno + "\">" + pno + "</a></li>";

                if (pno + 1 <= maxPage) phtml += "<li><a href=\"" + (pno + 1) + "\">" + (pno + 1) + "</a></li>";

                if (next > maxPage) phtml += "<li class=\"disabled\">\n                        <a href=\"#\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";else phtml += " <li>\n                        <a href=\"" + (pno + 1) + "\" aria-label=\"Next\">\n                            <span aria-hidden=\"true\">&raquo;</span>\n                        </a>\n                    </li>";

                pages.html(phtml);

                //为分页条绑定事件

                pages.off().on("click", "a", function (e) {
                    e.preventDefault();
                    if (!$(this).parent().hasClass("disabled")) {
                        var pno = $(this).attr("href");
                        getlistbypno(pno);
                    }
                });
            }

        });
    }

    getlistbypno(1);
});

//# sourceMappingURL=product_list-s.js.map