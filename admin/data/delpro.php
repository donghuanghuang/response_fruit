<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$apower = $_SESSION['apower'];
	@$fid = $_REQUEST['fid'];
	
	if(!$fid || $fid==" "){
		die('{"code":-1,"msg":"fid error"}');
	}
	
	if($apower==null || $apower==" " || $apower!=0){
		die('{"code":-2,"msg":"power error"}');
	}
	
	if(!$oaid || $oaid==" "){
		die('{"code":0,"msg":"oaid error"}');
	}
	
	$sql="delete from o_product where fid=$fid";
	
	$rs = sql_exec($sql);
	
	if(!$rs){
		die('{"code":-3,"msg":"sql error"}');
	}else{
		$sql="delete from o_piclist where fid=$fid";
	
		$rs = sql_exec($sql);
		if(!$rs){
			die('{"code":-3,"msg":"sql error"}');
		}else{
		
			die('{"code":1,"msg":"success"}');
		}
	}