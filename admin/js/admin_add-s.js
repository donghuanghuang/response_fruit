"use strict";

/**
 *
 *
 */
$(function () {

    var tlist = new Vue({
        el: '#tlist',
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
                    url: "data/getadmin.php",
                    type: "get",
                    data: {
                        pno: pno,
                        pageSize: 8
                    },
                    success: function success(data) {
                        if (data.code == -1) {
                            console.log(tlist.disabled);
                            tlist.datas = data;
                            tlist.disabled = true;
                            tlist.bindpageBtn();
                            //alert("没有权限..");
                        } else {
                            tlist.datas = data.data;
                            tlist.pno = parseInt(data.pno);
                            tlist.maxPage = parseInt(data.maxPage);
                            tlist.bindpageBtn();
                            tlist.bindaddBtn();
                            //tlist.getpagelist();
                        }
                    }
                });
            },
            bindpageBtn: function bindpageBtn() {
                var pages = $("#pagination");
                pages.off().on("click", "a", function (e) {
                    e.preventDefault();
                    if (!$(this).parent().hasClass("disabled")) {
                        var pno = $(this).attr("href");
                        tlist.getlistbypno(pno);
                    }
                });
            },
            bindaddBtn: function bindaddBtn() {
                $(".add_admin").click(function () {
                    if (!$(this).hasClass("disabled")) {
                        var amsg = $("#alertmsg");

                        var html = "\n                    <div class=\"form-group\">\n                      <label for=\"aname\">\u8F93\u5165\u7BA1\u7406\u8D26\u6237:</label>\n                      <input type=\"text\" class=\"form-control\" required name=\"aname\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"apwd\">\u8F93\u5165\u7BA1\u7406\u5BC6\u7801:</label>\n                      <input type=\"password\"  class=\"form-control\"  required name=\"apwd\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"power\">\u6743\u9650:</label>\n                       <select name=\"power\" id=\"power\" class=\"form-control\">\n                        <option value=\"1\">\n                        \u666E\u901A\u7BA1\u7406\u5458\n                        </option>\n                        <option value=\"0\">\n                        \u8D85\u7EA7\u7BA1\u7406\u5458\n                        </option>\n                       </select>\n                    </div>";
                        amsg.find('.modal-body').html(html);
                        amsg.modal('show').find(".modal-title").html("添加管理用户");

                        amsg.parent().off().on('submit', function (e) {
                            e.preventDefault();
                            var aname = $("[name='aname']").val();
                            var apwd = $("[name='apwd']").val();
                            var power = $("[name='power']").val();
                            $.ajax({
                                url: "data/addadmin.php",
                                type: "post",
                                data: {
                                    aname: aname,
                                    apwd: apwd,
                                    power: power
                                },
                                success: function success(data) {
                                    if (data.code <= 0) {
                                        alert(data.msg);
                                    } else {
                                        alert("添加成功");
                                        amsg.modal('hide').find('.modal-body').html("");
                                        tlist.getlistbypno(this.pno);
                                    }
                                }
                            });
                        });
                    }
                });
            },
            changstate: function changstate(exp, e) {
                var btn = $(e.target);
                if (!btn.hasClass("disabled")) {
                    //console.log(btn);
                    //console.log(btn.data('exp'));
                    $.ajax({
                        url: "data/changestate.php",
                        type: "post",
                        data: {
                            aid: btn.data('id'),
                            exp: exp
                        },
                        success: function success(data) {
                            if (data.code <= 0) {
                                alert(data.msg);
                            } else {
                                tlist.getlistbypno(this.pno);
                            }
                        }
                    });
                }
            },
            upAdmin: function upAdmin(aid, e) {
                var btn = $(e.target);
                if (!btn.hasClass("disabled")) {
                    var amsg = $("#alertmsg");
                    console.log(aid);
                    var html = "\n                    <div class=\"form-group\">\n                      <label for=\"apwd\">\u8F93\u5165\u65B0\u7BA1\u7406\u5BC6\u7801:</label>\n                      <input type=\"password\"  class=\"form-control\"  required name=\"apwd\" \"/>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"power\">\u6743\u9650:</label>\n                       <select name=\"power\" id=\"power\" class=\"form-control\">\n                        <option value=\"1\">\n                        \u666E\u901A\u7BA1\u7406\u5458\n                        </option>\n                        <option value=\"0\">\n                        \u8D85\u7EA7\u7BA1\u7406\u5458\n                        </option>\n                       </select>\n                    </div>";
                    amsg.find('.modal-body').html(html);
                    amsg.modal('show').find(".modal-title").html("修改管理用户");

                    amsg.parent().off().on('submit', function (e) {
                        e.preventDefault();
                        var apwd = $("[name='apwd']").val();
                        var power = $("[name='power']").val();

                        $.ajax({
                            url: "data/upadmin.php",
                            type: "post",
                            data: {
                                aid: aid,
                                apwd: apwd,
                                power: power
                            },
                            success: function success(data) {
                                if (data.code <= 0) {
                                    alert(data.msg);
                                } else {
                                    alert("修改成功");
                                    amsg.modal('hide').find('.modal-body').html("");
                                    tlist.getlistbypno(this.pno);
                                }
                            }
                        });
                    });
                }
            }

        }
    });

    /*
    
    */
});

//# sourceMappingURL=admin_add-s.js.map