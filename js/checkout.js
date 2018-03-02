/**
 *收银台  创建订单
 * 根据服务器端session uid获取收货地址
 * 获取购物车订单内容
 * 计算订单总价格等
 * 提交后 将创建订单
 */
(()=>{

    $(".radio input[value='new']").change(function(){
       $(".new_adress").removeClass("hide");
    });

    $(".radio input[value='existing']").change(function(){
        $(".new_adress").addClass("hide");
    });
    /*获取收货地址*/
    $.ajax({
        url:"data/getadr.php",
        type:"get",
        success:function(data){
            var sad =$("select[name='address_id']");
            console.log(sad);
            if(data.msg=="fail"){

                alert("请先登录!");
                location.href="login.html";

            }else if(data.msg=="null"){
                sad.html('<option value="-1" selected="selected">请先添加收货地址</option>');
                $(".new_adress").removeClass("hide");
                $("input[value='new']").attr("checked","checked");
            }else{
                var html ="";
                for(var x in data){
                    var a =data[x];
                    html+=`<option value="${a.aid}" selected="selected">${a.uaddress},${a.firstname},${a.uphone}</option>`;
                }
                sad.html(html);
            }
        },
        error:function(){
            alert("网络故障");
        }
    });
    /*添加收货地址*/
    $(".addr_form").submit(function(e){
        e.preventDefault();
        var fname=$("#name").val();
        var uphone=$("#phone").val();
        var uaddress=$("#address").val();
        $.ajax({
            url:"data/addadr.php",
            type:"post",
            data:{
                firstname:fname,
                uphone:uphone,
                uaddress:uaddress
            },
            success:function(data){
                if(data.msg=="fail"){
                    alert("请先登录!");
                    location.href="login.html";
                }else if(data.ok==0){
                    alertMsg("提示信息",data.msg,false,"关闭","关闭",function(){});
                    //alert(data.msg);
                }else if(data.ok==1){
                    alertMsg("提示信息",data.msg,false,"关闭","关闭",function(){location.reload();});

                }
            },
            error:function(){
                alertMsg("提示信息","网络故障",false,"关闭","关闭",function(){});
            }
        });

        return false;
    });


    /*获取购物车的订单内容*/
    $.ajax({
        url:"data/getcart.php",
        type:"get",
        success:function(data){
            if(data.ok==0){
                alert("请先登录!");
                location.href="login.html";
            }else if(data.length!=0){
                var $tbody=$("#list_content");
                var html="";
                $(data).each(function(i,d){
                    html+=`  <tr class="cart_item">
                                <td><img src="${d.lg}" width=70 alt=""/> <span>${d.title}</span></td>
                                <td><span>${d.fcount}</span></td>
                                <td class="price">￥<span>${d.price}</span> X <span>${d.fcount}</span></td>
                            </tr>`;
                });

                $tbody.html(html);
                setTotalPrice();
            }else if(!data.length){
                alert("订单列表获取失败!");
                location.href="index.html";
            }
        },
        error:function(){
            alert("网络故障");
            location.href="index.html";
        }
    });


    /*计算总价格*/
    function setTotalPrice(){
        var total=0;
        var prices = $(".cart_item>td.price");
        var totalH= $(".totalprice");

        prices.each(function(i,elem){
            var price = parseFloat($(elem).find("span:eq(0)").html());
            var count = parseInt($(elem).find("span:eq(1)").html());
            total+=price*count;
        });
        totalH.html(total.toFixed(2));
    }
    /*提交订单*/
    $(".sublist").click(function(){
        var aid=$("select[name='address_id']").val();
        var common = $("textarea[name='common']").val();
        var pay_method =$("input[name='pay_ment']:checked").val();

        $.ajax({
            url:"data/createlist.php",
            type:"post",
            data:{
                aid:aid,
                common:common,
                pay_method:pay_method
            },
            success:function(data){
                if(data.ok==1){
                    location.href="list.html";
                }else{
                    alertMsg("提示信息","提交失败",false,"关闭","关闭",function(){});
                }
            },
            error:function(){
                alert("网络故障");
                location.href="index.html";
            }
        })

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



})();