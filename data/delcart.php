<?php
session_start();
header("Content-type:application/json");
require_once("./init.php");

@$fid=$_REQUEST["fid"];
@$uid=$_SESSION["uid"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"uid error"]));
if(!$fid)
	die(json_encode(["ok"=>0,"msg"=>"fid error"]));

$sql="delete from o_user_cart where fid=$fid and uid=$uid";

if($fid==-1)
	$sql="delete from o_user_cart where uid=$uid";

$result=sql_exec($sql);

if(!$result){
	echo json_encode(["ok"=>0,"msg"=>"sql excute fail"]);
}else{
	echo json_encode(["ok"=>1,"msg"=>"success"]);
}
?>