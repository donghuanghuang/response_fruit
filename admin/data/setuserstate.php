<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$oaid = $_SESSION['oaid'];
	@$expire = $_REQUEST['expire'];
	@$uid = $_REQUEST['uid'];
	if($expire!=0 && $expire!=1)
		$expire=0;
	if($uid==null || $uid=="")
		die('{"code":-2,"msg":"uid error"}');
	
	
	if($oaid && $oaid!=" " || $oaid!=0){
		$sql = "update o_user set expire=$expire where id=$uid";
		
		$rs=sql_exec($sql);
		
		if(!$rs){
			die('{"code":-1,"msg":"sql error"}');
		}else{
			die('{"code":1,"msg":"success"}');
		}
		
	}