<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	@$oaid = $_SESSION['oaid'];
	$rs = empty($_FILES);
	if($rs==true){
		die('{"code":-1,"msg":"file error"}');
	}
	if($oaid && $oaid!=" "){
		@$title = $_REQUEST['title'];
		@$details1 = $_REQUEST['details1'];
		@$price = $_REQUEST['price'];
		@$size = $_REQUEST['size'];
		@$sday = $_REQUEST['sday'];
		@$smidu = $_REQUEST['smidu'];
		@$ssize = $_REQUEST['ssize'];
		@$details2 = $_REQUEST['details2'];
		
		if(!$title || $title==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$details1 || $details1==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$price || $price==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$size || $size==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$sday || $sday==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$smidu || $smidu==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$ssize || $ssize==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		if(!$details2 || $details2==" "){
			die('{"code":-2,"msg":"arg error"}');
		}
		sleep(2);
		$sql="
insert into o_product values(null,
		'$title',
		$price,
		'$size',
		'$sday',
		'$smidu',
		'$ssize',
		'$details1',
		0,
		'$details2',
		'46',
		'9g',
		'3g',
		'1g',
		'6g',
		'93% DV',
		'317%',
		'12%',
		'9%',
		'22%'
);";
		$rs = sql_exec($sql);
		
		if(!$rs){
			die('{"code":-3,"msg":"sql error1"}');
		}else{
		$fid = mysqli_insert_id($conn);
		foreach($_FILES as $k=>$file){
			if($file['size']>2048*1024)
				die('{"code":-2,"msg":"图片不能超过2M"}');
			
			$type=strstr($file['name'],".");
		
			if($type != ".gif" && $type != ".jpg" && $type != ".png" && $type != ".avi" && $type != ".mp4" && $type != ".jpeg"){
				die('{"code":-2,"msg":"图片格式不正确"}');
			}
			
			$fileName = time().rand(1,9999).$type;
			$src = $file["tmp_name"];
			$des = "../../images/".$fileName;
			move_uploaded_file($src,$des);
			$fn="images/".$fileName;
			$sql="insert into o_piclist values(null,$fid,'$fn','$fn')";
			
			$rs = sql_exec($sql);
		
			if(!$rs){
				die('{"code":-3,"msg":"sql error2"}');
			}
			
		}
		die('{"code":1,"msg":"success"}');
		
		}
		
		
		
	}else{
	
		die('{"code":0,"msg":"oaid error"}');

	}
	
		
	
?>