<?php
session_start();
header("Content-type:application/json");
require_once("./init.php");
@$fid=$_REQUEST["fid"];
@$fcount=$_REQUEST["fcount"];
@$uid=$_SESSION["uid"];
if(!$fid){
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
}
if(!$fcount || $fcount<=0 || $fcount>99){
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
}
if(!$uid){
	die(json_encode(["ok"=>0,"msg"=>"fail","uid"=>$uid]));
}
$sql="select fid from o_user_cart where fid=$fid and uid=$uid";

$result = sql_exec($sql);

if(count($result)==1){
	$sql="update o_user_cart set fcount=fcount+$fcount where fid=$fid and uid=$uid";

}else{
	$sql="insert into o_user_cart values(null,$fid,$fcount,$uid)";

}
	
	sql_exec($sql);
	
	if(mysqli_affected_rows($conn)==1)
		die(json_encode(["ok"=>1,"msg"=>"success"]));
	else die(json_encode(["ok"=>0,"msg"=>"fail +$sql"]));



?>