/**
 * 此文件存放商品详情页js代码
 * 根据地址栏fid 获取服务器端商品内容
 * 加载图片 加入购物车等事件
 * (加入购物车需要登录)
 * 放大镜功能
 */
$(()=>{
    var fid =location.search.split("fid=")[1];
    console.log(fid);
    var mImg=$("#lg_pic > div > img");
    var sImg= $("#sm_pic");
    if(!fid)
        fid=1;
    $.ajax({
        url:"data/detail.php",
        type:"get",
        data:"fid="+fid,
		success:function(data){
			        //加载图片
        mImg.attr("src",data.pics[0].lg);
        var html="";

        for(var x in  data.pics){
            var pic = data.pics[x];
            html+=` <div class="col-xs-3">
                    <img src="${pic.sm}" alt=""/>
                   </div>`;
        }
        sImg.html(html);

        //加载商品详情

        html  = `<li><span>尺寸:</span>${data.f_size}</li>
                <li><span>成熟期:</span>${data.matures}</li>
                <li><span>植株密度:</span>${data.p_spacing}</li>
                <li><span>植株尺寸:</span>${data.p_size}</li>`;

        $(".product_pare >h1").html(data.title)
            .next().html(html)
            .next().html(data.detail1)
            .next().html(`￥${data.price}`);

        $(".reviews").html(`${data.reviews} 人购买过`);

        $(".detail2").html(data.detail2);

        html=  `<li>卡路里: ${data.calories}</li>
                <li>碳水化合物: ${data.carbohydrates}</li>
                <li>纤维素: ${data.dietary}</li>
                <li>蛋白质: ${data.protein}</li>
                <li>糖类: ${data.Sugars}</li>
                <li>维生素 A: ${data.va}</li>
                <li>维生素 C: ${data.vc}</li>
                <li>维生素 E: ${data.ve}</li>
                <li>维生素 K: ${data.vk}</li>
                <li>维生素 B6: ${data.vb6}</li>`;

        $(".desc > .spec").html(html);



        /*放大镜效果*/
        var lgwrap=$(".lgwrap");

        var smark=lgwrap.find(".smark");
        var supermark=lgwrap.find(".supermark");
        var superpic=lgwrap.find(".superpic");
        sImg.on("click","img", function () {
            mImg.attr("src",$(this)[0].src);
        });

        supermark.on("mouseenter touchstart",function () {
            var oImgsrc=lgwrap.find("img").attr("src");
            smark.removeClass('hide');
            superpic.removeClass('hide').css("backgroundImage","url("+oImgsrc+")");
            superpic.css("backgroundSize",supermark[0].offsetWidth*2+"px "+supermark[0].offsetHeight*2+"px");
        });

        supermark.on("mousemove touchmove",function (e) {
            var ev = e.originalEvent || e || e.event;
            e.preventDefault();
            var x,y,left,top,pleft=0;
            if(ev.touches == undefined){
                x =e.offsetX;
                y =e.offsetY;

            }else{
                x = ev.touches[0].clientX-getTotalleft(supermark[0]);
                y = ev.touches[0].pageY-getTotalTop(supermark[0]);
            }
            left = x-smark[0].offsetWidth/2;

            top = y-smark[0].offsetHeight/2;

            pleft=left;


            left<0&&(left=0);
            top<0&&(top=0);

            left>supermark[0].offsetWidth-smark[0].offsetWidth&&(left=supermark[0].offsetWidth-smark[0].offsetWidth);
            top>supermark[0].offsetHeight-smark[0].offsetHeight&&(top=supermark[0].offsetHeight-smark[0].offsetHeight);

            smark.css({"left":left,"top":top});

            pleft>supermark[0].offsetWidth-superpic[0].offsetWidth&&(pleft=supermark[0].offsetWidth-superpic[0].offsetWidth);

            superpic.css({"left":pleft,"top":"calc("+top+"px - 50%)","backgroundPosition":-2*left+"px "+-2*top+"px"});

        });

        supermark.on("mouseleave touchend",function () {
            smark.addClass('hide');
            superpic.addClass('hide');
        });

















        var addcart =$(".addcart");
        //加入购物车事件
        addcart.click(function(){
            $.ajax({
                url:"data/isLogin.php",
                type:"get",
                success:function(data){
                    if(data.ok==1){

                        $.ajax({
                            url:"data/addcart.php",
                            type:"get",
                            data:{
                                fid:fid,
                                fcount:addcart.prev().find("input").val(),
                                uid:data.uid
                            },
                            success:function(data2){
                                if(data2.ok==1){
                                    alertMsg("添加成功","添加成功",true,"继续购物","去购物车结算",function(){location.href="cart.html"});
                                    //alert("添加成功!!");
                                    upcount();
                                   // location.href="cart.html"
                                }

                            },
                            error:function(){
                                alert("网络故障");
                            }
                        })
                    }else{
                        alertMsg("请先登录","请先登录",false,"关闭","关闭",function(){location.href="login.html"});
                        //location.href="login.html";
                    }
                }
            })



        });
		}
    });

    function getTotalTop(elem){
        var sum=0;
        do{
            sum+=elem.offsetTop;
            elem=elem.offsetParent;
        }while(elem);
        return sum;
    }

    function getTotalleft(elem){
        var sum=0;
        do{
            sum+=elem.offsetLeft;
            elem=elem.offsetParent;
        }while(elem);
        return sum;
    }
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


});