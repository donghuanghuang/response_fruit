<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$aname=$_REQUEST["aname"];
	@$apwd=$_REQUEST["apwd"];
	@$vcount = $_REQUEST["vcount"];
	@$code = $_REQUEST["code"];
	
	if(!$aname || $aname==" "){
		die('{"code":-1,"msg":"aname error"}');
	}
	
	if(!$apwd || $apwd==" "){
		die('{"code":-1,"msg":"apwd error"}');
	}
	
	if($vcount>4){
		$scode = $_SESSION["failCount"];
		if($scode!=$code)
			die('{"code":-2,"msg":"code error"}');
	}
	
	$sql="select * from o_admin where aname='$aname' and apwd='$apwd' and expire=0";
	
	$rs = sql_exec($sql);
	
	
	
	$row = mysqli_affected_rows($conn);
	
	if($row==0)
		die('{"code":0,"msg":"aname or apwd error"}');
	else if($row==1){
		$power = $rs[0]['apower'];
		$oaid = $rs[0]['oaid'];
		$_SESSION['apower']=$power;
		$_SESSION['oaid']=$oaid;
		die('{"code":1,"msg":"pass","power":"'.$power.'"}');
	}
		
?>