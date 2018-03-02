<?php
header("Content-type:application/json");
session_start();
require_once("./init.php");
/******************************/
@$uid=$_SESSION['uid'];
/******************************/
if($uid){
	
	$sql = "select username from o_user where id='$uid'";
	
	$result=sql_exec($sql);

	echo json_encode(['ok'=>1,'uname'=>$result[0]["username"],'uid'=>$uid]);
}else{
	echo json_encode(['ok'=>0,'uname'=>""]);
}