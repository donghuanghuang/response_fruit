<?php
	header("content-type:application/json");
	session_start();
	require_once("./init.php");
	//��ȡ����ҳ����ҳ����  ��Ҫ��¼
	$oaid = $_SESSION['oaid'];
	$output=[];
	
	if($oaid && $oaid!=" "){
		//��Ʒ����
		$sql="select count(fid) as p_count from o_product";
		
		$rs = sql_exec($sql);
		
		$output["p_count"]=$rs[0]["p_count"];
		
		//�û�����
		$sql="select count(id) as u_count from o_user";
		
		$rs = sql_exec($sql);
		
		$output["u_count"]=$rs[0]["u_count"];
		//����ɶ�����
		$sql="select count(lid) as l_count from o_user_list where lstate=3";
		
		$rs = sql_exec($sql);
		
		$output["l_count"]=$rs[0]["l_count"];
		
		//��������
		$sql="select count(lid) as l_tcount from o_user_list";
		
		$rs = sql_exec($sql);
		
		$output["l_tcount"]=$rs[0]["l_tcount"];
		
		//�ȴ�������������
		$sql="select count(lid) as l_dcount from o_user_list where lstate=1";
		
		$rs = sql_exec($sql);
		
		$output["l_dcount"]=$rs[0]["l_dcount"];
		
		//�ȴ�����������
		$sql="select count(lid) as l_ccount from o_user_list where lstate=0";
		
		$rs = sql_exec($sql);
		
		$output["l_ccount"]=$rs[0]["l_ccount"];
		
		
		echo json_encode($output);
	}