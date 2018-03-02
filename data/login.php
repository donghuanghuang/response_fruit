<?php
session_start();
require_once("init.php");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];

if($uname ==null && $uname=="")
die("uname require");
if($upwd ==null && $upwd=="")
die("upwd require");

$sql="select * from o_user where username='$uname' and password='$upwd' and expire=0";

$result=sql_exec($sql);

if(count($result)){
	/******************************/
	$_SESSION["uid"]=$result[0]["id"];
	/******************************/
	echo "success";
}else echo "fail";

//echo $rs = mysqli_affected_rows($conn)==1?"success":"fail";
?>