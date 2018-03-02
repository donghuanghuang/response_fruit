<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$apower = $_SESSION['apower'];
	@$aid = $_REQUEST['aid'];
	@$exp = $_REQUEST['exp'];
	if($apower==null || $apower==" " || $apower!=0)
		die('{"code":-2,"msg":"power error"}');
	
	if(!$oaid || $oaid==" ")
		die('{"code":0,"msg":"oaid error"}');
	
	if(!$aid)
		die('{"code":0,"msg":"aid error"}');
	
	if($exp!=0 && $exp!=1)
		$exp=0;
	
	$sql="update o_admin set expire=$exp where oaid=$aid";
	
	$rs = sql_exec($sql);
	
	if(!$rs){
		die('{"code":-1,"msg":"sql execute error"}');
	}else{
		die('{"code":1,"msg":"success"}');
	}

?>