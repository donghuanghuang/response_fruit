<?php

	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$oaid = $_SESSION['oaid'];
	
	if($oaid && $oaid!=" "){
		@$pno=$_REQUEST['pno'];
		@$pageSize=$_REQUEST['pageSize'];
		if($pno=="" || $pno==null || $pno<=0)
			$pno=1;
		if($pageSize=="" || $pageSize==null || $pageSize<=0)
			$pageSize=8;
		
		//²éÑ¯×î´óÒ³Âë
		$sql="select count(fid) maxSize from o_product";

		$rs = sql_exec($sql);

		$maxSize=$rs[0]['maxSize'];

		$maxPage=ceil($maxSize/$pageSize);
		
		if($pno>$maxPage)
			$pno=$maxPage;
		
		
		$sql="select p.fid,p.title,p.price,p.reviews,pic.lg 
		from o_product as p,o_piclist as pic 
		WHERE p.fid=pic.fid group by p.fid limit ".($pno-1)*$pageSize.",$pageSize";
		
		$rs = sql_exec($sql);
		
		$output=["data"=>$rs,"maxPage"=>$maxPage,"pno"=>$pno];
		
		echo json_encode($output);
	}


?>