<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$oaid = $_SESSION['oaid'];
	@$apower = $_SESSION['apower'];
	if($oaid && $oaid!=" " && $apower==0){
		@$pno=$_REQUEST['pno'];
		@$pageSize=$_REQUEST['pageSize'];
		
		if($pno=="" || $pno==null || $pno<=0)
			$pno=1;
		if($pageSize=="" || $pageSize==null || $pageSize<=0)
			$pageSize=8;
		
				//查询最大页码
		$sql="select count(oaid) maxSize from o_admin";
		
		$rs = sql_exec($sql);

		$maxSize=$rs[0]['maxSize'];

		$maxPage=ceil($maxSize/$pageSize);
		
		if($pno>$maxPage)
			$pno=$maxPage;
		
		$sql="select * from o_admin limit ".($pno-1)*$pageSize.",$pageSize";
		
		$rs = sql_exec($sql);
		
		$output=["data"=>$rs,"maxPage"=>$maxPage,"pno"=>$pno,"power"=>$apower];
		
		echo json_encode($output);
	
	}else{
		
		die('{"code":-1,"msg":"no power"}');
	}