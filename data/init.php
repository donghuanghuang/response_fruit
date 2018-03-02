<?php
	$host = '127.0.0.1';
	$user = 'root';
	$password = '';
	$database= 'o_shop';
	$port = 3306;
	$charset = 'UTF8';

	$conn=mysqli_connect($host,$user,$password,$database,$port);
	
	mysqli_query($conn,"SET NAMES $charset");
	
	function sql_exec($sql){
		global $conn;
		
		$res = mysqli_query($conn,$sql);
		
		if(stripos($sql,'select') === 0)
			if(!$res){
				return  "查询执行失败！请检查SQL语法：$sql";
			}else{
				return $rowList = mysqli_fetch_all($res,MYSQLI_ASSOC);
			}
		else
			return $res;
	}
		
?>