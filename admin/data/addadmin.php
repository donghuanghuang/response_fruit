<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	@$apower = $_SESSION['apower'];
	@$aname = $_REQUEST['aname'];
	@$apwd = $_REQUEST['apwd'];
	@$power = $_REQUEST['power'];
	if(!$aname || $aname==" " || strlen($aname)>12 ||strlen($aname)<6){
		die('{"code":-1,"msg":"管理账号格式错误"}');
	}
	
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
	$sql="select * from o_admin where aname='$aname'";
	
	sql_exec($sql);

	if(mysqli_affected_rows($conn)!=0){
		die('{"code":-1,"msg":"aname already exist"}');
	}
	
	$sql="insert into o_admin values(null,'$aname','$apwd',$power,0)";
	
	$rs = sql_exec($sql);
	
	if(!$rs){
		die('{"code":-1,"msg":"sql execute error"}');
	}else{
		die('{"code":1,"msg":"success"}');
	}