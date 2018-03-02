<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
@$uid=$_SESSION["uid"];
@$aid=$_REQUEST["aid"];
@$firstname=$_REQUEST["firstname"];
@$uaddress=$_REQUEST["uaddress"];
@$uphone=$_REQUEST["uphone"];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="update o_user_address set firstname='$firstname',uaddress='$uaddress',uphone='$uphone' 
where uid=$uid and aid=$aid";

$result=sql_exec($sql);
if(!$result)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
else echo(json_encode(["ok"=>1,"msg"=>"success"]));
?>