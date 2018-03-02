"use strict";

/**
 * Created by web-01 on 2017/10/30.
 */
$(function () {
    var ipview = $(".ipview");
    function getIplist() {
        var html = "";
        $.ajax({
            url: "data/gethistory.php",
            type: "get",
            success: function success(data) {
                for (var x in data) {
                    var ips = data[x];
                    var vtime = format(new Date(parseInt(ips.vtime)));
                    if (ips.vip == "root") {
                        html += "<h6>" + vtime + ":\u7BA1\u7406\u5458\u767B\u5F55 IP:127.0.0.1</h6>";
                    } else {
                        html += "<h6>" + vtime + ":\u6709\u4E2A\u5927\u4F6C\u8BBF\u95EE\u4E86 IP:" + ips.vip + "</h6>";
                    }
                }
                ipview.html(html);
            }
        });
    }

    getIplist();

    var iptimer = setInterval(getIplist, 3000);

    //获取首页数据
    $.ajax({
        url: "data/getdata.php",
        type: "get",
        success: function success(data) {
            console.log(data);
            $(".p_count").html(data.p_count);
            $(".l_count").html(data.l_count);
            $(".u_count").html(data.u_count);
            $(".l_tcount").html(data.l_tcount);
            $(".l_dcount").html(data.l_dcount);
            $(".l_ccount").html(data.l_ccount);

            //饼状图

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pie'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '饼图统计'
                },
                series: [{
                    name: '访问量',
                    type: 'pie',
                    data: [{ value: data.l_count, name: "已完成订单" }, { value: data.l_dcount, name: "待发货订单" }, { value: data.l_ccount, name: "等待处理订单" }]
                }]
            };
            //注意事项:
            //1:饼图没有x轴y轴,数据绑定采用name和value形式
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
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

        return y + "/" + M + "/" + d + " " + h + ":" + m + ":" + s;
    }
});

//# sourceMappingURL=main-s.js.map