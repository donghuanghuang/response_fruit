<?php
session_start();
header("Content-type:application/json;charset=utf-8");

require_once("./init.php");

	
	@$oaid = $_SESSION['oaid'];
	@$fid = $_REQUEST['fid'];
	
	if(!$fid || $fid==" "){
		die();
	}
	
	if($oaid && $oaid!=" "){
		$sql="select title,price,reviews,detail2 from o_product where fid=$fid";
		
		$rs=sql_exec($sql);
		
		echo json_encode($rs[0]);
	}