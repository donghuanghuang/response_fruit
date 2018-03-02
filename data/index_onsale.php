<?php
header("Content-type:application/json");
require_once("./init.php");
@$ftype=$_REQUEST["ftype"];
@$fcount=$_REQUEST["fcount"];
if(!$fcount)
	$fcount=8;
if($ftype==null || $ftype==""){
    //随机查询8条数据
    $sql="SELECT o_piclist.fid,o_piclist.lg,o_product.price,title FROM  o_index_onsale,o_piclist,o_product WHERE o_piclist.fid=o_index_onsale.fid and o_index_onsale.fid=o_product.fid GROUP by fid ORDER BY RAND() LIMIT $fcount;";
}else if($ftype=="1" || $ftype=="2" || $ftype=="3" ){
    $sql="SELECT o_piclist.fid,o_piclist.lg,o_product.price,title FROM o_index_onsale,o_piclist,o_product WHERE o_index_onsale.ftype=$ftype and o_piclist.fid=o_index_onsale.fid and o_index_onsale.fid=o_product.fid GROUP by fid";
}else{
	$sql="SELECT o_piclist.fid,o_piclist.lg,o_product.price,title FROM o_index_onsale,o_piclist,o_product WHERE o_index_onsale.ftype=1 and o_piclist.fid=o_index_onsale.fid and o_index_onsale.fid=o_product.fid GROUP by fid";
}

$result = sql_exec($sql);

echo json_encode($result);

?>