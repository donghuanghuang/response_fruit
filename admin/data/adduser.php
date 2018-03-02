<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	
	@$oaid = $_SESSION['oaid'];
	@$username = $_REQUEST['username'];
	@$password = $_REQUEST['password'];
	@$email = $_REQUEST['email'];
	@$phone = $_REQUEST['phone'];
	
	if($username==null || $username=="")
		die('{"code":-2,"msg":"username error"}');
	if($password==null || $password=="")
		die('{"code":-2,"msg":"password error"}');
	if($email==null || $email=="")
		die('{"code":-2,"msg":"email error"}');
	if($phone==null || $phone=="")
		die('{"code":-2,"msg":"phone error"}');
	
	//判断用户名是否重复
	if($oaid && $oaid!=" "){
		
		$sql="select username from o_user where username='$username'";
		
		sql_exec($sql);
		
		if(mysqli_affected_rows($conn)==0){
			$now = time()*1000;
			$sql="insert into o_user values(null,'$username','$password','$email','$phone',$now,0)";
			
			$rs=sql_exec($sql);
			
			if(!$rs)
				die('{"code":-1,"msg":"sql error"}');
			else
				die('{"code":1,"msg":"添加成功"}');
			
			
		}else{
			die('{"code":-3,"msg":"用户名重复"}');
		}
	}

?>