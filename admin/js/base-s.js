"use strict";

/**
 * 此文件存放公共调用的代码
 */
$(function () {

    //验证是否已经登陆
    $.ajax({
        url: "data/isLogin.php",
        type: "get",
        success: function success(data) {
            var h2 = $(".profile_info>h2");
            var trt = $("#trt");
            if (data.code == -1) location.href = 'index.html';else if (data.code == 1 && data.apower == 0) {
                h2.html('超级管理员');
                trt.html('超级管理员');
            } else if (data.code == 1 && data.apower == 1) {
                h2.html('普通管理员');
                trt.html('普通管理员');
            }
        }
    });

    //为所有页面添加弹框提示..
    var html = "\n    <form id=\"xgform\">\n    <div class=\"modal fade bs-example-modal-sm\" id=\"alertmsg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myalert\">\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myalert\">\u6807\u9898</h4>\n            </div>\n            <div class=\"modal-body\">\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\u5173\u95ED</button>\n                <button type=\"submit\" class=\"btn btn-primary\">\u4FDD\u5B58</button>\n            </div>\n        </div>\n    </div>\n</div>\n</form>";

    html += "<div class=\"modal fade bs-example-modal-sm\" id=\"showinfo\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">\u8BE6\u60C5</h4>\n      </div>\n      <div class=\"modal-body\">\n\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\u5173\u95ED</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";

    $("body").children().last().after(html);
});

//# sourceMappingURL=base-s.js.map