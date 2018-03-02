"use strict";

/**
 * 此文件存放banner主页代码
 *      ajax 异步请求服务器端轮播数据
 *      加载到页面中 实现无缝轮播效果
 */

(function () {

    //顶部轮播
    $.ajax({
        url: "data/index_carsouel.php",
        type: "get",
        success: function success(data) {
            var html = "";
            for (var x in data) {
                var item = data[x];
                html += "<div class=\"ban_item\">\n                <a href=\"" + item.href + "\">\n                <div class=\"item_ctx\">\n                    <h3>" + item.title1 + "</h3>\n                    <h1>" + item.title2 + "</h1>\n                    <h2>" + item.title3 + "</h2>\n                </div>\n                <img src=\"" + item.img + "\" class=\"img-responsive\" alt=\"\">\n                </a>\n            </div>";
            }
            html += "<div class=\"ban_item\">\n                <a href=\"" + data[0].href + "\">\n                <div class=\"item_ctx\">\n                    <h3>" + data[0].title1 + "</h3>\n                    <h1>" + data[0].title2 + "</h1>\n                    <h2>" + data[0].title3 + "</h2>\n                </div>\n                <img src=\"" + data[0].img + "\" class=\"img-responsive\" alt=\"\">\n                </a>\n            </div>";

            $("#banner").html(html);

            //自适应字体大小  轮播图文字大小自动调整
            (function () {
                var wid = document.documentElement.clientWidth / 100;
                wid < 7 && (wid = 7);
                wid > 16 && (wid = 16);
                if (wid >= 7 && wid <= 16) {
                    $('.item_ctx').css('fontSize', wid + "px");
                }
            })();
        }
    });

    var x = 0;
    var banner = document.getElementById('banner');
    //图片播放函数
    function show() {

        var wid = banner.querySelectorAll('.ban_item')[0].clientWidth;
        x++;
        if (x === 4) {
            banner.style.transition = "all 0s";
            banner.style.left = "0";
            x = 1;
        }
        setTimeout(function () {
            banner.style.transition = "all 0.8s";
            banner.style.left = -x * wid + "px";
        }, 100);
    }
    //设置轮播
    setInterval(show, 4000);

    //为resize绑定自适应字体大小事件
    window.onresize = function () {
        var wid = document.documentElement.clientWidth / 100;
        wid < 7 && (wid = 7);
        wid > 16 && (wid = 16);
        if (wid >= 7 && wid <= 16) {
            $('.item_ctx').css('fontSize', wid + "px");
        }

        banner.style.transition = "all 0s";
        banner.style.left = "0";
    };
})();

//# sourceMappingURL=banner-s.js.map