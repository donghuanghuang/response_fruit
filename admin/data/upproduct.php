<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	
	@$fid = $_REQUEST['fid'];
	@$title = $_REQUEST['title'];
	@$price = $_REQUEST['price'];
	if(!$fid || $fid==" "){
		die();
	}
	
	if(!$title || $title==" "){
		die();
	}
	
	if(!$price || $price==" "){
		die();
	}
	
	if($oaid && $oaid!=" "){
		$sql="update o_product set title='$title',price=$price where fid=$fid";
		
		$rs=sql_exec($sql);
		
		if(!$rs){
			echo '{"code":-1}';
		}else{
			echo '{"code":1}';
		}
	}

?>