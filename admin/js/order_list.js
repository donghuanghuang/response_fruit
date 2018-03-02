/**
 * Created by web-01 on 2017/11/14.
 */
(function(){
    var lists = new Vue({
        el:'#plist',
        data:{
            pno:1,
            pageSize:8,
            maxPage:1,
            datas:[],
            disabled:false
        },
        created:function(){
            this.getlistbypno(this.pno);
        },
        methods:{
            getlistbypno:function(pno){

                $.ajax({
                    url:"data/getlist.php",
                    type:"get",
                    data:{
                        pno:pno,
                        pageSize:8
                    },
                    success:function(data){
                        lists.datas=data.data;
                        lists.pno=parseInt(data.pno);
                        lists.maxPage=parseInt(data.maxPage);
                        console.log(data);
                        lists.bindpageBtn();
                    }
                });
            },
            bindpageBtn:function(){
                var pages=$("#pagination");
                pages.off().on("click","a",function(e){
                    e.preventDefault();
                    if(!$(this).parent().hasClass("disabled")){
                        var pno = $(this).attr("href");
                        lists.getlistbypno(pno);
                    }

                });
            },
            getdetail:function(lid){
                var amsg =$("#alertmsg");
                $.ajax({
                    url:"data/getlistdetail.php",
                    type:"get",
                    data:{
                        lid
                    },
                    success:function(data){
                        if(data.code!=-1){
                            var amsg =$("#showinfo");
                           var html = `
                             <p>订单编号:${data.lid}</p>
                             <p>收货地址:${data.uaddress}</p>
                             <p>总价:${data.totalprice}</p>
                             <p>备注信息:${data.common}</p>
                             `;

                            amsg.find('.modal-body').html(html);
                            amsg.modal('show').find(".modal-title").html("订单详情");
                        }


                    }
                });

            },
            changestate(lid){
                var amsg = $('#alertmsg');
                var html = `
                    <div class="form-group">
                      <label for="state">状态:</label>
                       <select name="state" id="state" class="form-control">
                       <option value="-2">
                       未付款
                        </option>
                       <option value="-1">
                       订单已取消
                       </option>
                        
                        <option value="0">
                       等待处理
                        </option>
                        
                          
                       <option value="1">
                       等待发货
                       </option>
                        
                        <option value="2">
                       等待收货
                        </option>
                        
                      <option value="3">
                       交易成功
                        </option>
                       </select>
                    </div>`;
                amsg.find('.modal-body').html(html);
                amsg.modal('show').find(".modal-title").html("修改订单状态");
                amsg.parent().off().on('submit',function(e){
                    var state = $("[name='state']").val();
                    $.ajax({
                        url:"data/changeliststate.php",
                        type:"post",
                        data:{lid,state},
                        success:function(data){
                            if(data.code<=0){
                                alert("更新失败");
                            }else{
                                alert("更新成功");
                                amsg.modal('hide').find('.modal-body').html("");
                                tlist.getlistbypno(this.pno);
                            }
                        }
                    });

                });
            }
        },

        filters:{//过滤器
            format:function(date){
                date=new Date(parseInt(date));
                var y = date.getFullYear();
                var M = date.getMonth()+1;

                var d = date.getDate();


                var h = date.getHours();

                var m = date.getMinutes();
                m<10&&(m="0"+m);

                var s = date.getSeconds();
                s<10&&(s="0"+s);

                return y+"/"+M+"/"+d+" "+h+":"+m+":"+s;
            },

            fstate:function(state){
                var lstate = '未付款';
                switch(parseInt(state)){
                    case -2:
                        lstate = "未付款";
                        break;
                    case -1:
                        lstate = "订单已取消";//管理员操作
                        break;
                    case 0:
                        lstate = "等待处理";//
                        break;
                    case 1:
                        lstate = "等待发货";//
                        break;
                    case 2:
                        lstate = "等待收货";//管理员操作
                        break;
                    case 3:
                        lstate = "交易成功";////
                        break;
                    default :
                        lstate="未付款";
                        break;
                }
                return lstate;
            }
        }

    });


    function format(date){

        var y = date.getFullYear();
        var M = date.getMonth()+1;

        var d = date.getDate();


        var h = date.getHours();

        var m = date.getMinutes();
        m<10&&(m="0"+m);

        var s = date.getSeconds();
        s<10&&(s="0"+s);

        return y+"年"+M+"月"+d+"日 "+h+":"+m+":"+s;
    }


})();