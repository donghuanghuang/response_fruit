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

$sql="update o_user_address set isDefault=1 where aid=$aid and uid=$uid";

$rs=sql_exec($sql);

if(!$rs){
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
}else{
		$sql="update o_user_address set isDefault=0 where aid!=$aid and uid=$uid";
		
		$rs = sql_exec($sql);
		
		if(!$rs)
			die(json_encode(["ok"=>0,"msg"=>"未知错误"]));	
		else die(json_encode(["ok"=>1,"msg"=>"修改成功"]));	
}
?>