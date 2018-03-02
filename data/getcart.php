<?php
/*
SELECT c.*,pic.lg,p.title,p.price 
FROM o_user_cart as c,o_piclist as pic,o_product as p 
WHERE c.fid=p.fid and p.fid=pic.fid and c.uid=$uid 
GROUP BY fid
*/
session_start();
header("Content-type:application/json");

require_once("./init.php");

@$uid=$_SESSION["uid"];

if(!$uid)
	die(json_encode(["ok"=>0,"msg"=>"fail"]));
$sql="SELECT c.*,pic.lg,p.title,p.price 
FROM o_user_cart as c,o_piclist as pic,o_product as p 
WHERE c.fid=p.fid and p.fid=pic.fid and c.uid=$uid 
GROUP BY fid";

$rs = sql_exec($sql);

echo json_encode($rs);
?>