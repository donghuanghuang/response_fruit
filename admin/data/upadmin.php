<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$apower = $_SESSION['apower'];
	@$aid = $_REQUEST['aid'];
	@$apwd = $_REQUEST['apwd'];
	@$power = $_REQUEST['power'];
	
	if(!$apwd || $apwd==" " || strlen($apwd)>12 ||strlen($apwd)<6){
		die('{"code":-1,"msg":"管理密码格式错误"}');
	}
	if($power!=0 && $power!=1){
		$power==1;
	}
	
	if($apower==null || $apower==" " || $apower!=0){
		die('{"code":-2,"msg":"power error"}');
	}
	
	if(!$oaid || $oaid==" "){
		die('{"code":0,"msg":"oaid error"}');
	}
	if(!$aid || $aid==" "){
		die('{"code":0,"msg":"aid error"}');
	}
	
	$sql = "update o_admin set apwd='$apwd',apower=$power where oaid=$aid";
	
	$rs = sql_exec($sql);
	
	if(!$rs){
		die('{"code":-1,"msg":"sql execute error"}');
	}else{
		die('{"code":1,"msg":"success"}');
	}
?>