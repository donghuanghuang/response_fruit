/**
 * Created by XiaoBai on 2017/10/7.
 */
$("#login").click(function(){
    var uname = $("#uname").val();
    var upwd = $("#pwd").val();
    if(uname=="" || uname==undefined){
        $("#uname").parent().next().find("span").html("用户名不能为空").removeClass("text-hide");
        return false;
    }
    if(upwd=="" || upwd==undefined){
        $("#pwd").parent().next().find("span").html("密码不能为空").removeClass("text-hide");
        return false;
    }

    $.ajax({
        url:"data/login.php",
        data:`uname=${uname}&upwd=${upwd}`,
        type:"post",
        success:function(data){
            if(data=="success")
                location.href="index.html";
            else alertMsg("登陆失败","登陆失败",false,"关闭","关闭",function(){});

         }
    });
});

$("#uname").on("keyup",function(){
    $("#uname").parent().next().find("span").addClass("text-hide");
});

$("#pwd").on("keyup",function(){
    $("#pwd").parent().next().find("span").addClass("text-hide");
});

/*顶部购物车数量加载*/
function upcount(){
    $.ajax({
        url:"data/getcart.php",
        type:"get",
        success:function(data){
            if(data.ok!=0)
                $(".top_cart>span:eq(0)").html(data.length);
            else  $(".top_cart>span:eq(0)").html(0);
        }
    });
}




/*弹出自定义模态框*/

function alertMsg(title,msg,isConfirm,btn1,btn2,callback){
    var dialog= $("#alertmsg");
    dialog.find(".modal-title").html(title);
    dialog.find(".modal-body").html(msg);
    dialog.find(".modal-footer>button:eq(0)").html(btn1);

    if(!isConfirm){
        dialog.find(".modal-footer>button:eq(1)").addClass("hide");
        dialog.find(".modal-footer>button:eq(0)").html(btn2).on("click",callback);
    }else{
        dialog.find(".modal-footer>button:eq(1)").html(btn2).on("click",callback);
    }


    dialog.modal("show");
}
