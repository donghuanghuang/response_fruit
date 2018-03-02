$(function(){
    var vcount =sessionStorage['vcount'];
    if(!vcount){
        sessionStorage['vcount']=0;
        vcount=0;
    }
    $(".change_vcode").click(function(e){
        e.preventDefault();
        $(".change_img")[0].src='data/code.php';
    });

    $("[name='usubmit']").click(function(){
            var aname=$("[name='uname']").val();
            var apwd=$("[name='upwd']").val();
            var code = $("[name='vcode']").val();
            if(aname=="" || !/^\w{4,8}$/.test(aname)){
                alert("用户名不正确");
                return;
            }

            if(apwd=="" || !/^\w{4,16}$/.test(apwd)){
                alert("密码不正确");
                return;
            }
           if(vcount>4 && !code){
              alert("请输入验证码");
             return;
             }

            vcount++;
            if(vcount>4){
                $("#vcode").removeClass('hidden');
            }


            $.ajax({
                url:"data/login.php",
                type:"post",
                data:{
                    aname:aname,
                    apwd:apwd,
                    vcount:vcount,
                    code:code
                },
                success:function(data){
                    if(data.code==-2){
                        alert("验证码错误");
                    }else if(data.code==-1){
                        alert("登录失败");
                    }else if(data.code==1){
                        location.href="main.html";
                    }

                }
            });
    });

});