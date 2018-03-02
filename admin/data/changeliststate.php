<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$lid = $_REQUEST['lid'];
	@$state = $_REQUEST['state'];
	
	if(!$oaid || $oaid==" ")
		die('{"code":0,"msg":"oaid error"}');
	
	if(!$lid)
		die('{"code":0,"msg":"lid error"}');
	
	if($state==null)
		die('{"code":0,"msg":"state error"}');
	
	$sql = "update o_user_list set lstate=$state where lid=$lid";
	
	$rs = sql_exec($sql);
	
	if(!$rs){
		die('{"code":0,"msg":"sql error"}');
	}else{
		die('{"code":1,"msg":"success"}');
	}