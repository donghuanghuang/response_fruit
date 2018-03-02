/**
/**
 *
 *
 */
$(function(){

    var tlist = new Vue({
        el:'#tlist',
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
        methods: {
            getlistbypno:function(pno){
                $.ajax({
                    url:"data/getadmin.php",
                    type:"get",
                    data:{
                        pno:pno,
                        pageSize:8
                    },
                    success:function(data){
                        if(data.code==-1){
                            console.log(tlist.disabled);
                            tlist.datas=data;
                            tlist.disabled=true;
                             tlist.bindpageBtn();
                            //alert("没有权限..");
                        }else{
                            tlist.datas=data.data;
                            tlist.pno=parseInt(data.pno);
                            tlist.maxPage=parseInt(data.maxPage);
                            tlist.bindpageBtn();
                            tlist.bindaddBtn();
                            //tlist.getpagelist();
                        }
                    }
                })
            },
            bindpageBtn:function(){
                var pages=$("#pagination");
                pages.off().on("click","a",function(e){
                    e.preventDefault();
                    if(!$(this).parent().hasClass("disabled")){
                        var pno = $(this).attr("href");
                        tlist.getlistbypno(pno);
                    }

                });
            },
            bindaddBtn: function () {
                $(".add_admin").click(function(){
                    if(!$(this).hasClass("disabled")){
                        var amsg =$("#alertmsg");

                        var html = `
                    <div class="form-group">
                      <label for="aname">输入管理账户:</label>
                      <input type="text" class="form-control" required name="aname" "/>
                    </div>
                    <div class="form-group">
                      <label for="apwd">输入管理密码:</label>
                      <input type="password"  class="form-control"  required name="apwd" "/>
                    </div>
                    <div class="form-group">
                      <label for="power">权限:</label>
                       <select name="power" id="power" class="form-control">
                        <option value="1">
                        普通管理员
                        </option>
                        <option value="0">
                        超级管理员
                        </option>
                       </select>
                    </div>`;
                        amsg.find('.modal-body').html(html);
                        amsg.modal('show').find(".modal-title").html("添加管理用户");

                        amsg.parent().off().on('submit',function(e){
                            e.preventDefault();
                            var aname=$("[name='aname']").val();
                            var apwd=$("[name='apwd']").val();
                            var power=$("[name='power']").val();
                            $.ajax({
                                url:"data/addadmin.php",
                                type:"post",
                                data:{
                                    aname:aname,
                                    apwd:apwd,
                                    power:power
                                },
                                success:function(data){
                                    if(data.code<=0){
                                        alert(data.msg);
                                    }else{
                                        alert("添加成功");
                                        amsg.modal('hide').find('.modal-body').html("");
                                        tlist.getlistbypno(this.pno);
                                    }

                                }
                            });

                        });
                    }
                });
            },
            changstate:function(exp,e){
                var btn = $(e.target);
                if(!btn.hasClass("disabled")){
                    //console.log(btn);
                    //console.log(btn.data('exp'));
                    $.ajax({
                        url:"data/changestate.php",
                        type:"post",
                        data:{
                            aid:btn.data('id'),
                            exp:exp
                        },
                        success:function(data){
                            if(data.code<=0){
                                alert(data.msg);
                            }else{
                                tlist.getlistbypno(this.pno);
                            }
                        }
                    });
                }

            },
            upAdmin:function(aid,e){
                var btn =$(e.target);
                if(!btn.hasClass("disabled")){
                    var amsg =$("#alertmsg");
                    console.log(aid);
                    var html = `
                    <div class="form-group">
                      <label for="apwd">输入新管理密码:</label>
                      <input type="password"  class="form-control"  required name="apwd" "/>
                    </div>
                    <div class="form-group">
                      <label for="power">权限:</label>
                       <select name="power" id="power" class="form-control">
                        <option value="1">
                        普通管理员
                        </option>
                        <option value="0">
                        超级管理员
                        </option>
                       </select>
                    </div>`;
                    amsg.find('.modal-body').html(html);
                    amsg.modal('show').find(".modal-title").html("修改管理用户");

                    amsg.parent().off().on('submit',function(e){
                        e.preventDefault();
                        var apwd = $("[name='apwd']").val();
                        var power = $("[name='power']").val();

                        $.ajax({
                            url:"data/upadmin.php",
                            type:"post",
                            data:{
                                aid,
                                apwd,
                                power
                            },
                            success:function(data){
                                if(data.code<=0){
                                    alert(data.msg);
                                }else{
                                    alert("修改成功");
                                    amsg.modal('hide').find('.modal-body').html("");
                                    tlist.getlistbypno(this.pno);
                                }

                            }
                        });

                    });
                }
            }

        }
    });


/*

*/
});
