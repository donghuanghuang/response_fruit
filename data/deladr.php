<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
$uid=$_SESSION["uid"];
@$aid=$_REQUEST["aid"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if(!$aid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));

$sql="delete from o_user_address where uid=$uid and aid=$aid";

$rs=sql_exec($sql);

if(!$rs){
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
}else{
	die(json_encode(["ok"=>1,"msg"=>"success"]));
}