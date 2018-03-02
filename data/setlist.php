<?php
header("Content-type:application/json;charset=utf-8");
session_start();
require_once("./init.php");
/******************************/
@$uid=$_SESSION['uid'];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
@$lid=$_REQUEST['lid'];
@$lstate=$_REQUEST['lstate'];

if(!$lid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if($lstate==null || $lstate=="")
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="update o_user_list set lstate=$lstate where uid=$uid and lid=$lid";

sql_exec($sql);

if(mysqli_affected_rows($conn)!=1)
	die(json_encode(["ok"=>0,"msg"=>"fail1"]));
else die(json_encode(["ok"=>1,"msg"=>"success"]));

?>