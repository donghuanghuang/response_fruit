<?php
	header("Content-type:application/json");
	@$fid=$_REQUEST["fid"];
	if($fid==null || $fid=="")
		die("fid required");
	require_once("./init.php");
	$sql = "select * from o_product where fid=$fid";
	
	$result=sql_exec($sql);
	
	$fdetail = $result[0];
	
	$sql = "select lg,sm from o_piclist where fid =$fid";
	
	$result=sql_exec($sql);
	
	$fdetail["pics"]=$result;
	
	echo json_encode($fdetail);

?>