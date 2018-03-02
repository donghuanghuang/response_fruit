<?php
header("Content-type:application/json;charset=utf-8");

require_once("./init.php");
/******************************/
@$kw=$_REQUEST['kw'];

if(!$kw)
	die("[]");
$sql="select fid,title,price from o_product where title like '%$kw%';";
$result=sql_exec($sql);
echo json_encode($result);