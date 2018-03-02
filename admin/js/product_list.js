/**
 * Created by web-01 on 2017/10/31.
 */
$(function(){
    var show = $("#showinfo");

    //加载商品列表
    function getlistbypno(pno){
        $.ajax({
            url:"data/getproducts.php",
            type:"get",
            data:{
                pno:pno,
                pageSize:8
            },
            success:function(data){
                var html="";
                var pno = parseInt(data.pno);
                if(data.data.length!=0){
                    for(var x in data.data){
                        var ds = data.data[x];
                        html+=`<tr>
                <td>${ds.fid}</td>
                <td><img width="30" src="../${ds.lg}" alt=""/></td>
                <td>${ds.title}</td>
                <td>${ds.price}</td>
                <td>${ds.reviews}</td>
                <td>
                  <button type="button" data-fid="${ds.fid}" class="btn btn-primary btn-xs btn-xq">详情</button>
                  <button type="button" data-fid="${ds.fid}" class="btn btn-info btn-xs btn-xg">修改</button>
                  <button type="button" data-fid="${ds.fid}" class="btn btn-danger btn-xs btn-sc">删除</button>
                </td>
              </tr>`;
                    }
                }else{
                    html+="<tr><td colspan='6'>找不到商品...</td></tr>";
                }


                $("#tblist").off().html(html).on("click",'button',function(){

                    var fid = $(this).data("fid");
                    if($(this).hasClass('btn-xq')){

                        $.ajax({
                            url:"data/getproductbyid.php",
                            type:"get",
                            data:{fid},
                            success:function(data){
                                var html = `<p>商品名称:${data.title}</p>
                                    <p>商品价格:${data.price}</p>
                                    <p>销量:${data.reviews}</p>
                                    <p>详细描述:${data.detail2}</p>`;
                                show.find('.modal-title').html("商品详情");
                                show.modal("show").find('.modal-body').html(html);
                            }
                        });

                    }else if($(this).hasClass('btn-xg')){
                        var amsg=$("#alertmsg");

                        $.ajax({
                            url:"data/getproductbyid.php",
                            type:"get",
                            data:{fid},
                            success:function(data){
                                var html =` <div class="form-group">
                <label for="title">标题:</label>
                <input type="text" class="form-control"  required name="title" value="${data.title}"/>
               </div>

               <div class="form-group">
                <label for="price">价格:</label>
                <input type="text" class="form-control" required name="price" value="${data.price}"/>
               </div>`;

                                amsg.find(".modal-title").html("修改");
                                amsg.modal("show").find('.modal-body').html(html);
                                $("#xgform").on("submit",function(e){
                                    e.preventDefault();
                                    var title = amsg.find("[name='title']").val();
                                    var price = amsg.find("[name='price']").val();

                                    if(!title || title==" "){
                                        alert("商品名称必须填写");
                                        return;
                                    }
                                    if(!price || price==" " || isNaN(parseFloat(price))){
                                        alert("价格填写不正确");
                                        return;
                                    }
                                    price = parseFloat(price).toFixed(2);

                                    $.ajax({
                                        url:"data/upproduct.php",
                                        type:"get",
                                        data:{fid,title,price},
                                        success:function(data){
                                            if(data.code==-1){
                                                alert("修改失败");
                                            }
                                            amsg.modal("hide");
                                            getlistbypno(pno);
                                        }
                                    });




                                });
                            }
                        });

                    }else if($(this).hasClass("btn-sc")){
                        if(confirm("确定删除这个商品吗?")){

                            $.ajax({
                                url:"data/delpro.php",
                                type:"post",
                                data:{fid},
                                success:function(data){

                                    if(data.code==-2){
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('普通管理员无权操作');
                                    }else if(data.code<=0){
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('删除失败');
                                    }else if(data.code==1){
                                        //alert("删除成功");
                                        //console.log(1);
                                        show.find('.modal-title').html("提示信息");
                                        show.modal("show").find('.modal-body').html('删除成功');
                                        getlistbypno(pno);
                                    }
                                }
                            })

                        }

                   }
                });


                //加载分页条
                var phtml="";
                var pages=$("#pagination");
                //var pno = parseInt(data.pno);
                var prev = pno-1;
                var next = pno+1;
                var maxPage = parseInt(data.maxPage);

                if(prev<=0)
                    phtml+=`<li class="disabled">
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;
                else
                    phtml+=`<li>
                        <a href="${pno-1}" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>`;

                if(pno-1>0)
                    phtml+=` <li><a href="${pno-1}">${pno-1}</a></li>`;

                phtml+=` <li class="active"><a href="${pno}">${pno}</a></li>`;


                if(pno+1<=maxPage)
                    phtml+=`<li><a href="${pno+1}">${pno+1}</a></li>`;

                if(next>maxPage)
                    phtml+=`<li class="disabled">
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`;
                else
                    phtml+=` <li>
                        <a href="${pno+1}" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`;

                pages.html(phtml);

                //为分页条绑定事件

                pages.off().on("click","a",function(e){
                    e.preventDefault();
                    if(!$(this).parent().hasClass("disabled")){
                        var pno = $(this).attr("href");
                        getlistbypno(pno);
                    }

                });




            }

        });

    }

    getlistbypno(1);


});