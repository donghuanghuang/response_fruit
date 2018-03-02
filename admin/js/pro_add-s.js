"use strict";

/**
 * Created by web-01 on 2017/11/1.
 */
$(function () {
    var pimg = $("#pimg");

    pimg.change(function (e) {
        var files = this.files;
        if (files.length > 4) {
            alert("图片不能超过四张!");
            e.preventDefault();
            this.value = "";
        }

        var html = "";

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.type.indexOf("image") == -1) {
                alert("只能上传图片");
                e.preventDefault();
                this.value = "";
                break;
            } else if (Math.floor(file.size / 1024) > 2048) {
                alert("图片大小不能超过2M");
                e.preventDefault();
                this.value = "";
                break;
            }

            var img = window.URL.createObjectURL(file) || window.webkitURL.createObjectURL(file);

            var str = "<img src='" + img + "' class='img-responsive' /><p>" + file.name + "</p>";

            //var str =`<img src="${img}" class="img-responsive" /><p>${file.name}</p>`;

            /* html+=`<div class="col-xs-6 col-md-2">
                     ${str}
                   </div>`;*/
            html += "<div class='col-xs-6 col-md-2'>" + str + "</div>";

            //fd.append("pic"+i,file);
        }
        $('.previews>.row').html(html);

        /*
        $.ajax({
             url:"data/addpro.php",
             type:"post",
             data:fd,
             contentType:false,
             processData:false,
             success:function(data){
                 console.log(data);
             }
         });
        */
    });

    $("#form-product").on("submit", function (e) {

        e.preventDefault();
        var fd = new FormData();
        //console.log($("#form-product").serialize());

        fd.append("title", $("#title").val());
        fd.append("details1", $("#subtitle").val());
        fd.append("price", $("#price").val());
        fd.append("size", $("#size").val());
        fd.append("sday", $("#sday").val());
        fd.append("smidu", $("#smidu").val());
        fd.append("ssize", $("#ssize").val());
        fd.append("details2", $("#details").val());

        if (pimg[0].files.length == 0) {
            alert("请选择图片");
            return;
        } else {
            for (var i = 0; i < pimg[0].files.length; i++) {
                fd.append("pic" + i, pimg[0].files[i]);
            }
        }

        $(".prog>span").html("正在上传...").parent().removeClass('hide');
        $.ajax({
            url: "data/addpro.php",
            type: "post",
            data: fd,
            contentType: false,
            processData: false,
            success: function success(data) {
                if (data.code != 1) {
                    $(".prog>span").html("上传失败");
                    alert(data.msg);
                } else {
                    $(".prog>span").html("上传成功");
                    alert("添加成功");
                    location.reload();
                }
            }
        });
        return false;
    });
});

//# sourceMappingURL=pro_add-s.js.map