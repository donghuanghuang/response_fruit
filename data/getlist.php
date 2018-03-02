<?php
/*
查询订单信息
SELECT l.*,a.firstname,a.uaddress,a.uphone 
from o_user_list l,o_user_address 
a where l.uid=1 and l.aid=a.aid
根据订单lid查询订单下详细信息
SELECT d.*,pic.lg,p.title,p.price 
FROM o_list_detail d,o_product p,o_piclist pic 
WHERE d.lid=$lid 
and d.fid=p.fid and p.fid=pic.fid GROUP BY did;
*/
session_start();
header("Content-type:application/json;charset=utf-8");

require_once("./init.php");

@$uid=$_SESSION["uid"];
@$pno=$_REQUEST['pno'];
@$pageSize=$_REQUEST['pageSize'];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if($pno=="" || $pno==null || $pno<=0)
	$pno=1;
if($pageSize=="" || $pageSize==null || $pageSize<=0)
	$pageSize=3;

//查询最大页码
$sql="select count(*) maxSize from o_user_list where uid=$uid";

$rs = sql_exec($sql);

$maxSize=$rs[0]['maxSize'];

$maxPage=ceil($maxSize/$pageSize);

if($pno>$maxPage)
	$pno=$maxPage;


$sql="SELECT l.*,a.firstname,a.uaddress,a.uphone 
from o_user_list l,o_user_address 
a where l.uid=$uid and l.aid=a.aid order by l.lDate DESC limit ".($pno-1)*$pageSize.",$pageSize";

$output = sql_exec($sql);

foreach($output as $k=>$v){
	$lid = $v['lid'];
	//$detail=[];
	//echo $lid;
	$sql = "SELECT d.*,pic.lg,p.title,p.price 
FROM o_list_detail d,o_product p,o_piclist pic 
WHERE d.lid=$lid 
and d.fid=p.fid and p.fid=pic.fid GROUP BY did;";
	$result = sql_exec($sql);
	
	$output[$k]['ldetail']=$result;
	
}
$datas=["pno"=>$pno,"maxPage"=>$maxPage,"data"=>$output];

//var_dump($output);
echo json_encode($datas);

?>