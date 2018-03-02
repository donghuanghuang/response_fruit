/**
 * 此文件存放公共调用的js代码
 *包括
 *  加载页头 页尾 顶部购物车
 *  判断是否登录
 *  搜索帮助 顶部购物车数量更新
 *  弹出模态框 等公共代码
 */
    /*记录IP访问*/
    $.ajax({
        url:"data/vhistory.php",
        type:"get"
    });

    /*加载页头*/
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(data){
            $("body>header").html(data);
            $.ajax({
                    //判断是否登陆
                    url:"data/isLogin.php",
                    type:"get",
                    success:function(data){

                        if(data.ok==1){
                            //如果已经登录

                            var html =`<li class="hidden-xs"><span>用户名&nbsp;:${data.uname}&nbsp;&nbsp;</span><a class="logout" href="#">注销</a></li>
                   <li class="hidden-xs"><a href="list.html">个人中心</a></li>
                    <li class="hidden-xs"><a href="checkout.html">收银台</a></li>`;
                            $("#user_info>li").before(html);
                            /*加载导航条*/

                            html=`<li><a href="index.html" >主页</a></li>
                    <li><a href="list.html" >个人中心</a></li>
                    <li><a href="cart.html">购物车</a></li>
                    <li><a class="logout" href="#">注销</a></li>
                    <li><a href="about.html">关于</a></li>`;


                            $("body>nav .nav_bar").html(html);
                            $("body ul.ulr").html(html);

                        }else{
                            //未登录
                            var html =`<li class="hidden-xs"><a href="login.html">登录</a></li>
                             <li class="hidden-xs"><a href="register.html">注册</a></li>`;
                            $("#user_info>li").before(html);

                            html=`<li><a href="index.html" >主页</a></li>
                    <li><a href="login.html" >登录</a></li>
                    <li><a href="register.html">注册</a></li>
                    <li><a href="about.html">联系我们</a></li>
                    <li><a href="about.html">关于</a></li>
                    `;

                            $("body>nav .nav_bar").html(html);
                            $("body ul.ulr").html(html);
                        }
                        //注销
                        $(".logout").click(e=>{
                            e.preventDefault();
                            $.ajax({
                                url:"data/logout.php",
                                type:"get",
                                success:function(){
                                    location.reload()
                                }
                            });

                        });


                        $(".top_cart").on("click",function(){
                            if(!$(this).hasClass('open'))
                                getopcart();
                            upcount();
                        });

                        upcount();

                    }
                }
            );

        }
    });


    /*加载 页尾 */
    $.ajax({
        url:"footer.html",
        type:"get",
		success:function(data){
            //将模态框加入到footer 元素后面
            var html=`
    <div class="modal fade" id="alertmsg" tabindex="-1" role="dialog" aria-labelledby="myalert">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myalert">标题</h4>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>`;

            $("body>footer").html(data).after(html);
			
		}
    });

    /*加载顶部购物车*/
    function getopcart(){
        $.ajax({
            url:"data/getcart.php",
            type:"get",
            success:function(data){
                var html="";
                var total=0;

                if(data.ok==0 || data.length==0){
                    html+=`
                        <div class="container-fluid">
                             <div class="row mt-20">
                                <div class="col-xs-12">您的购物车没有任何商品</div>
                            </div>

                            <div class="row mt-20">
                                <div class="col-xs-6 totaltitle">总价:</div>
                                <div class="col-xs-6 totalprice"> ￥${total.toFixed(2)}</div>
                            </div>
                        </div>

                        <div class="container-fluid">
                            <div class="row mt-10">
                                <a href="checkout.html" class="btn btn-danger">去结算</a>
                                <a href="cart.html" class="btn btn-success">购物车</a>
                            </div>
                        </div>`;

                }else{
                    for(var x in data){
                        var p =data[x];
                        total+=parseFloat(p.price)*p.fcount;
                        html+=`<div class="media">
                             <div class="media-left"><img width="50" src="${p.lg}" alt=""/></div>
                                <div class="media-body">
                                    <h4 class="media-heading">${p.title}</h4>
                                      <div>
                                        <span class="price">￥${p.price}</span>
                                       <span class="count">X ${p.fcount}</span>
                                       <a href="#" data-fid="${p.fid}" class="glyphicon glyphicon-remove fr"></a>
                             </div>
                       </div>
              </div>`;
                    }

                    html+=`
                        <div class="container-fluid">
                            <div class="row mt-20">
                                <div class="col-xs-6 totaltitle">总价:</div>
                                <div class="col-xs-6 totalprice"> ￥${total.toFixed(2)}</div>
                            </div>
                        </div>

                        <div class="container-fluid">
                            <div class="row mt-10">
                                <a href="checkout.html" class="btn btn-danger">去结算</a>
                                <a href="cart.html" class="btn btn-success">购物车</a>
                            </div>
                        </div>`;


                }
                //购物车删除事件
                $(".ocart").html(html).on("click",".glyphicon-remove",function(e){
                    e.preventDefault();
                    $.ajax({
                        url:"data/delcart.php",
                        data:{fid:$(this).data("fid")},
                        type:"post",
                        success:function(data){
                            if(data.ok==0)
                                alert("删除失败");
                            else if(data.ok==1){
                                getopcart();
                                upcount();
                            }
                        }
                    });

                });
            }
        });
    }

    /*为搜索框绑定事件  搜索帮助*/

    $(".seachtxt>input").on("change focus keyup",function(){
        var kw =$(this).val();
        if(kw==""){
            $(".seachtxt>ul").addClass('hide').html("");
        }else{
            $.ajax({
                url:"data/search.php",
                data:{kw:kw},
                type:"get",
                success:function(data) {
                    console.log(data)
                    if (data.length == 0 || data == [])
                        return;
                    else {
                        var html = "";
                        for (var x in data) {
                            var d = data[x];
                            html += `<li data-fid="${d.fid}">${d.title} <span class="fr">${d.price} </span></li>`;
                        }
                        $(".seachtxt>ul").removeClass('hide').html(html);
                    }
                }

            });


        }

    });

    /*为搜索帮助结果的Li绑定事件*/
    $(".seachtxt>ul").on("click",'li',function(){
        location.href="product_detail.html?fid="+$(this).data("fid");
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

