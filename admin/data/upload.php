<?php
	//判断是否为空
	header("content-type:application/json");
	$rs = empty($_FILES);
	if($rs==true){
		die('{"code":-1}');
	}

	$picname=$_FILES['mypic']['name'];//文件名
	$picsize=$_FILES['mypic']['size'];//文件大小 单位 字节

	if($picsize>512*1024){
		//512KB
		die('{"code":-2}');
	}

	$type = strstr($picname,".");

	if($type != ".gif" && $type != ".jpg" && $type != ".png" && $type != ".avi" && $type != ".mp4" && $type != ".jpeg"){
		die('{"code":-3}');
	}

	$fileName = time().rand(1,9999).$type;
	$src = $_FILES["mypic"]["tmp_name"];
	$des = "uploads/".$fileName;
	move_uploaded_file($src,$des);
?>