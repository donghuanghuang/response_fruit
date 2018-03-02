<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	//获取管理页面首页数据  需要登录
	$oaid = $_SESSION['oaid'];
	$output=[];
	
	if($oaid && $oaid!=" "){
		//商品总数
		$sql="select count(fid) as p_count from o_product";
		
		$rs = sql_exec($sql);
		
		$output["p_count"]=$rs[0]["p_count"];
		
		//用户总数
		$sql="select count(id) as u_count from o_user";
		
		$rs = sql_exec($sql);
		
		$output["u_count"]=$rs[0]["u_count"];
		//已完成订单数
		$sql="select count(lid) as l_count from o_user_list where lstate=3";
		
		$rs = sql_exec($sql);
		
		$output["l_count"]=$rs[0]["l_count"];
		
		//订单总数
		$sql="select count(lid) as l_tcount from o_user_list";
		
		$rs = sql_exec($sql);
		
		$output["l_tcount"]=$rs[0]["l_tcount"];
		
		//等待发货订单总数
		$sql="select count(lid) as l_dcount from o_user_list where lstate=1";
		
		$rs = sql_exec($sql);
		
		$output["l_dcount"]=$rs[0]["l_dcount"];
		
		//等待处理订单总数
		$sql="select count(lid) as l_ccount from o_user_list where lstate=0";
		
		$rs = sql_exec($sql);
		
		$output["l_ccount"]=$rs[0]["l_ccount"];
		
		
		echo json_encode($output);
	}