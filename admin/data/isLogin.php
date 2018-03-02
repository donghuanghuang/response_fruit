<?php
	header("content-type:application/json");
	session_start();
	
	@$oaid = $_SESSION['oaid'];
	if(!$oaid || $oaid==" "){
		echo '{"code":-1}';
	}else{
		@$apower = $_SESSION['apower'];
		echo '{"code":1,"apower":'.$apower.'}';
	}