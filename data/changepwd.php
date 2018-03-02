<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
@$uid=$_SESSION["uid"];
@$opwd=$_REQUEST['opwd'];
@$npwd=$_REQUEST['npwd'];
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if(!$opwd)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if(!$npwd)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="select password from o_user where id=$uid";

$result=sql_exec($sql);

$pwd=$result[0]['password'];

if($pwd!=$opwd)
	die(json_encode(["ok"=>-1,"msg"=>"old pwd error"]));
else{
	if($pwd==$npwd)
		die(json_encode(["ok"=>-2,"msg"=>"new pwd error"]));
	
	$sql="update o_user set password='$npwd' where id=$uid";

	$result=sql_exec($sql);
	
	if(!$result)
		die(json_encode(["ok"=>0,"msg"=>"fail"]));
	else{
		$_SESSION["uid"]=null;
		die(json_encode(["ok"=>1,"msg"=>"success"]));
	}
}
?>