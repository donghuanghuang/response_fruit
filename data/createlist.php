<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");

@$uid=$_SESSION["uid"];
@$common=$_REQUEST["common"];
@$aid=$_REQUEST["aid"];
@$pay_method=$_REQUEST["pay_method"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if(!$aid || $aid==-1)
	die(json_encode(["ok"=>0,"msg"=>"米有选择收货地址"]));
if(!$common)
	$common="没有备注信息";
if(!$pay_method || $pay_method==-1)
	die(json_encode(["ok"=>0,"msg"=>"米有选择支付方式"]));
$nowtime = time()*1000;
/*  获取参数 
	time() 返回时间的秒数 注意*1000再加入数据库
*/

/*获取购物车中的内容计算总价*/
$total=0.00;
$sql="SELECT c.fid,c.fcount,p.price,p.price*c.fcount as total 
FROM o_user_cart as c,o_product as p 
WHERE c.fid=p.fid and c.uid=$uid
GROUP BY fid";

$cresult = sql_exec($sql);

if(count($cresult)==0)
	die(json_encode(["ok"=>0,"msg"=>"订单内容为空!"]));

foreach($cresult as $k=>$v){
	$total+=$cresult[$k]['total'];
}


//var_dump($cresult);
//在list表中创建一个订单 

$sql="insert into o_user_list values(null,$uid,$nowtime,$aid,$pay_method,$total,'$common',1)";

$result=sql_exec($sql);
//var_dump($result);

//mysqli_insert_id()获取自增编号
if(!$result)
	die(json_encode(["ok"=>0,"msg"=>"订单创建失败!",'sql'=>$sql,'total'=>$total]));
else $lid = mysqli_insert_id($conn);

//再用自增编号将fid中每个商品加入到detail表中
foreach($cresult as $k=>$v){
	$f=$cresult[$k];
	$fid=$cresult[$k]['fid'];
	$fcount=$cresult[$k]['fcount'];
	$sql = "insert into o_list_detail values(null,$fid,$fcount,$lid)";
	sql_exec($sql);
	if(mysqli_affected_rows($conn)!=1)
		die(json_encode(["ok"=>0,"msg"=>"订单商品创建失败!"]));
}
//然后清空购物车
$sql="delete from o_user_cart where uid=$uid";

$result=sql_exec($sql);

if(!$result)
	die (json_encode(["ok"=>0,"msg"=>"购物车清空失败"]));
else echo json_encode(["ok"=>1,"msg"=>"success"]);

//返回结果