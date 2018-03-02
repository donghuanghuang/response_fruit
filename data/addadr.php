<?php
session_start();
header("Content-type:application/json;charset=utf-8");
require_once("./init.php");
$uid=$_SESSION["uid"];
@$firstname=$_REQUEST["firstname"];
@$uaddress=$_REQUEST["uaddress"];
@$uphone=$_REQUEST["uphone"];
@$isd=$_REQUEST["isd"];
if($isd==null || $isd=="")
	$isd=0;
if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
if(!$firstname)
	die(json_encode(["ok"=>0,"msg"=>"请填写姓名"]));
if(!$uaddress)
	die(json_encode(["ok"=>0,"msg"=>"请填写地址"]));
if(!$uphone)
	die(json_encode(["ok"=>0,"msg"=>"请填写手机号码"]));

$sql="insert into o_user_address values(null,$uid,'$firstname','$uaddress','$uphone',$isd)";

$result=sql_exec($sql);

if(!$result)
	die(json_encode(["ok"=>0,"msg"=>"未知错误"]));
else{
	if($isd==1){
		$aid=mysqli_insert_id($conn);
		
		$sql="update o_user_address set isDefault=0 where aid!=$aid and uid=$uid";
		
		$result = sql_exec($sql);
		
		if(!$result)
			die(json_encode(["ok"=>0,"msg"=>"未知错误"]));
	}
	echo(json_encode(["ok"=>1,"msg"=>"添加成功"]));
}
	

	

?>