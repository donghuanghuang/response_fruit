<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
@$uid=$_SESSION["uid"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="select * from o_user_address where uid=$uid order by isDefault";

$result=sql_exec($sql);
if(count($result)==0)
	die(json_encode(["ok"=>1,"msg"=>"null"]));
else echo(json_encode($result));
?>