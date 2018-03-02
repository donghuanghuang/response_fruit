<?php
	require_once("init.php");
	@$uname = $_REQUEST["uname"];
	
	@$email = $_REQUEST["email"];
	@$phone = $_REQUEST["phone"];
	
	
	if($uname!=null && $uname!="")
		$sql = "select username from o_user where username='$uname'";
	
	if($email!=null && $email!="")
		$sql = "select email from o_user where email='$email'";
	
	if($phone!=null && $phone!="")
		$sql = "select phone from o_user where phone='$phone'";
	
	sql_exec($sql);
	
	echo mysqli_affected_rows($conn)==0?"success":"fail";
?>