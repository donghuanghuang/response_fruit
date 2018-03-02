<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$rid = $_SERVER['REMOTE_ADDR'];
	@$srid = $_SESSION['rid'];
	//::1
	$now = time()*1000;
	
	if($rid=="::1")
		$rid="root";

	if(!$srid){
		$_SESSION['rid']=$rid;
		$sql="insert into o_vhistory values(null,'$rid',$now,0)";
		sql_exec($sql);
	}else{
		
	}
	
?>