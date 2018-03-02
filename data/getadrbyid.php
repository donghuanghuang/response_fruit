<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
@$uid=$_SESSION["uid"];
@$aid=$_REQUEST['aid'];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="select * from o_user_address where uid=$uid and aid=$aid";

$result=sql_exec($sql);

if(count($result)==0)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
else echo(json_encode($result[0]));
?>