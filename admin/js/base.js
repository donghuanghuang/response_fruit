/**
 * 此文件存放公共调用的代码
 */
$(function(){

    //验证是否已经登陆
    $.ajax({
        url:"data/isLogin.php",
        type:"get",
        success:function(data){
            var h2 = $(".profile_info>h2");
            var trt =$("#trt");
            if(data.code==-1)
                location.href='index.html';
            else if(data.code==1 && data.apower==0){
                h2.html('超级管理员');
                trt.html('超级管理员');
            }else if(data.code==1 && data.apower==1){
                h2.html('普通管理员');
                trt.html('普通管理员');
            }
        }
    });

    //为所有页面添加弹框提示..
    var html=`
    <form id="xgform">
    <div class="modal fade bs-example-modal-sm" id="alertmsg" tabindex="-1" role="dialog" aria-labelledby="myalert">
        <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myalert">标题</h4>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>
</form>`;
    
    html+=`<div class="modal fade bs-example-modal-sm" id="showinfo">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">详情</h4>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->`;

    $("body").children().last().after(html);

});