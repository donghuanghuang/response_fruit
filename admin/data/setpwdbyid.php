<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$oaid = $_SESSION['oaid'];
	@$npwd = $_REQUEST['npwd'];
	@$uid = $_REQUEST['uid'];
	if(!$npwd || strlen($npwd)<6){
		die('{"code":-2,"msg":"npwd error"}');
	}
	
	if($oaid && $oaid!=" "){
		$sql="update o_user set password='$npwd' where id=$uid";
		$rs = sql_exec($sql);
		if(!$rs){
			die('{"code":-1,"msg":"sql error"}');
		}else{
			die('{"code":1,"msg":"success"}');
		}
	}