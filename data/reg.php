<?php
	require_once("init.php");
	@$uname = $_REQUEST["uname"];
	@$upwd  = $_REQUEST["upwd"];
	@$email = $_REQUEST["email"];
	@$phone = $_REQUEST["phone"];
	
	if($uname ==null && $uname=="")
		die("uname require");
	if($upwd ==null && $upwd=="")
		die("upwd require");
	if($email ==null && $email=="")
		die("email require");
	if($phone ==null && $phone=="")
		die("phone require");
	$now =time()*1000;
	
	$sql = "insert into o_user values(null,'$uname','$upwd','$email','$phone',$now,0)";
	
	echo $res = sql_exec($sql)?"success":"fail";
?>