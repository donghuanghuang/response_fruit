"use strict";

/**
 * Created by web-01 on 2017/11/14.
 */
(function () {
    var lists = new Vue({
        el: '#plist',
        data: {
            pno: 1,
            pageSize: 8,
            maxPage: 1,
            datas: [],
            disabled: false
        },
        created: function created() {
            this.getlistbypno(this.pno);
        },
        methods: {
            getlistbypno: function getlistbypno(pno) {

                $.ajax({
                    url: "data/getlist.php",
                    type: "get",
                    data: {
                        pno: pno,
                        pageSize: 8
                    },
                    success: function success(data) {
                        lists.datas = data.data;
                        lists.pno = parseInt(data.pno);
                        lists.maxPage = parseInt(data.maxPage);
                        console.log(data);
                        lists.bindpageBtn();
                    }
                });
            },
            bindpageBtn: function bindpageBtn() {
                var pages = $("#pagination");
                pages.off().on("click", "a", function (e) {
                    e.preventDefault();
                    if (!$(this).parent().hasClass("disabled")) {
                        var pno = $(this).attr("href");
                        lists.getlistbypno(pno);
                    }
                });
            },
            getdetail: function getdetail(lid) {
                var amsg = $("#alertmsg");
                $.ajax({
                    url: "data/getlistdetail.php",
                    type: "get",
                    data: {
                        lid: lid
                    },
                    success: function success(data) {
                        if (data.code != -1) {
                            var amsg = $("#showinfo");
                            var html = "\n                             <p>\u8BA2\u5355\u7F16\u53F7:" + data.lid + "</p>\n                             <p>\u6536\u8D27\u5730\u5740:" + data.uaddress + "</p>\n                             <p>\u603B\u4EF7:" + data.totalprice + "</p>\n                             <p>\u5907\u6CE8\u4FE1\u606F:" + data.common + "</p>\n                             ";

                            amsg.find('.modal-body').html(html);
                            amsg.modal('show').find(".modal-title").html("订单详情");
                        }
                    }
                });
            },
            changestate: function changestate(lid) {
                var amsg = $('#alertmsg');
                var html = "\n                    <div class=\"form-group\">\n                      <label for=\"state\">\u72B6\u6001:</label>\n                       <select name=\"state\" id=\"state\" class=\"form-control\">\n                       <option value=\"-2\">\n                       \u672A\u4ED8\u6B3E\n                        </option>\n                       <option value=\"-1\">\n                       \u8BA2\u5355\u5DF2\u53D6\u6D88\n                       </option>\n                        \n                        <option value=\"0\">\n                       \u7B49\u5F85\u5904\u7406\n                        </option>\n                        \n                          \n                       <option value=\"1\">\n                       \u7B49\u5F85\u53D1\u8D27\n                       </option>\n                        \n                        <option value=\"2\">\n                       \u7B49\u5F85\u6536\u8D27\n                        </option>\n                        \n                      <option value=\"3\">\n                       \u4EA4\u6613\u6210\u529F\n                        </option>\n                       </select>\n                    </div>";
                amsg.find('.modal-body').html(html);
                amsg.modal('show').find(".modal-title").html("修改订单状态");
                amsg.parent().off().on('submit', function (e) {
                    var state = $("[name='state']").val();
                    $.ajax({
                        url: "data/changeliststate.php",
                        type: "post",
                        data: { lid: lid, state: state },
                        success: function success(data) {
                            if (data.code <= 0) {
                                alert("更新失败");
                            } else {
                                alert("更新成功");
                                amsg.modal('hide').find('.modal-body').html("");
                                tlist.getlistbypno(this.pno);
                            }
                        }
                    });
                });
            }
        },

        filters: { //过滤器
            format: function format(date) {
                date = new Date(parseInt(date));
                var y = date.getFullYear();
                var M = date.getMonth() + 1;

                var d = date.getDate();

                var h = date.getHours();

                var m = date.getMinutes();
                m < 10 && (m = "0" + m);

                var s = date.getSeconds();
                s < 10 && (s = "0" + s);

                return y + "/" + M + "/" + d + " " + h + ":" + m + ":" + s;
            },

            fstate: function fstate(state) {
                var lstate = '未付款';
                switch (parseInt(state)) {
                    case -2:
                        lstate = "未付款";
                        break;
                    case -1:
                        lstate = "订单已取消"; //管理员操作
                        break;
                    case 0:
                        lstate = "等待处理"; //
                        break;
                    case 1:
                        lstate = "等待发货"; //
                        break;
                    case 2:
                        lstate = "等待收货"; //管理员操作
                        break;
                    case 3:
                        lstate = "交易成功"; ////
                        break;
                    default:
                        lstate = "未付款";
                        break;
                }
                return lstate;
            }
        }

    });

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
})();

//# sourceMappingURL=order_list-s.js.map