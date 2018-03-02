<?php
session_start();
header("Content-type:application/json");
require_once("./init.php");
@$fid=$_REQUEST["fid"];
@$fcount=$_REQUEST["fcount"];
@$uid=$_SESSION["uid"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"uid error"]));
if(!$fid)
	die(json_encode(["ok"=>0,"msg"=>"fid error"]));
if(!$fcount || $fcount<0 || $fcount>99)
	die(json_encode(["ok"=>0,"msg"=>"fcount error"]));

$sql="update o_user_cart set fcount=$fcount where uid=$uid and fid=$fid";

$result=sql_exec($sql);

if(!$result){
	echo json_encode(["ok"=>0,"msg"=>"sql excute fail"]);
}else{
	echo json_encode(["ok"=>1,"msg"=>"success"]);
}
?>