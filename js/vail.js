

bindvail($("#uname"),/^\w{4,8}$/,"uname","用户名已经存在","用户名必须在4-8位之间");
bindvail($("#phone"),/^((\+86|0086)\s+)?1[34578]\d{9}$/,"phone","手机号码已经存在","请输入正确的手机号码");
bindvail($("#email"),/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,"email","邮箱已经存在","请输入正确的邮箱");

function bindvail(obj,reg,name,msg1,msg2){
    obj.on("focus keyup", function () {
        if(reg.test($(this).val()))
            vailData($(this),name,$(this).val(),msg1);
        else $(this).parent().next().find("span").html(msg2).attr('class','text-info');
    });
}


function vailData(obj,datname,dat,msg){
    $.ajax({
        url:"data/vail.php",
        data:datname+"="+dat,
        type:"get",
        success:function(result){
            console.log(result);
            if(result=="success")
                obj.parent().next().find("span").html("验证通过").attr('class','text-success');
            else obj.parent().next().find("span").html(msg).attr('class','text-danger');
        }
    });
}

$("#pwd").on("focus keyup",function(){
    if(/^\w{6,12}$/.test($(this).val()))
        $(this).parent().next().find("span").html("验证通过").attr('class','text-success');
    else $(this).parent().next().find("span").html("密码必须6-12位").attr('class','text-danger');
});

$("#cpwd").on("focus keyup",function(){
    var pwd = $("#pwd").val();
    if(pwd == $(this).val() && $(this).val()!="")
        $(this).parent().next().find("span").html("验证通过").attr('class','text-success');
    else $(this).parent().next().find("span").html("两次输入密码不一致").attr('class','text-danger');
});


$("#sub").click(function () {

    if($(".text-success").length==5 && $("#checkb").is(':checked')){
        var uname = $("#uname").val();
        var phone = $("#phone").val();
        var upwd = $("#pwd").val();
        var email = $("#email").val();
        $.ajax({
            url:"data/reg.php",
            data:`uname=${uname}&phone=${phone}&upwd=${upwd}&email=${email}`,
            type:"post",
            success:function(data){
                if(data=="success")
                    location.href="login.html";
                else alertMsg("注册失败","注册失败",false,"关闭","关闭",function(){});

            }
       });

    }else{
        alertMsg("注册失败","请完整填写信息并同意用户协议",false,"关闭","关闭",function(){});


    }
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
