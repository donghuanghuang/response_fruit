<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$lid = $_REQUEST['lid'];
	
	if($lid==null || $lid==" ")
		die('{"code":0,"msg":"lid error"}');
	
	if(!$oaid || $oaid==" ")
		die('{"code":0,"msg":"oaid error"}');
	$sql = "select l.*,a.uaddress from o_user_list l,o_user_address a where l.lid=$lid and l.aid=a.aid";
	
	$rs=sql_exec($sql);
	
	if(!$rs){
		die('{"code":-1,"msg":"sql execute error"}');
	}else{
		echo json_encode($rs[0]);
	}
?>