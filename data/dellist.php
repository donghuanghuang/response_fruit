<?php
header("Content-type:application/json;charset=utf-8");
session_start();
require_once("./init.php");
/******************************/
@$uid=$_SESSION['uid'];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
@$lid=$_REQUEST['lid'];
//先删除订单里的内容 再删除订单 
$sql ="delete from o_list_detail where lid=$lid";
sql_exec($sql);

if(mysqli_affected_rows($conn)==0){
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
}else {
	$sql ="delete from o_user_list where lid=$lid and uid=$uid";
	sql_exec($sql);
	if(mysqli_affected_rows($conn)==0){
		die(json_encode(["ok"=>0,"msg"=>"fail"]));
	}else{
		die(json_encode(["ok"=>1,"msg"=>"success"]));
	}
}
?>