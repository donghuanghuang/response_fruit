<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	$oaid = $_SESSION['oaid'];
	
	if($oaid && $oaid!=" "){
		$sql="select * from o_vhistory order by vtime desc";
		
		$rs = sql_exec($sql);
		
		echo json_encode($rs);
	}