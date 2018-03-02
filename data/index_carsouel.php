<?php
header("Content-type:application/json");
require_once("./init.php");
$sql="select * from o_index_carsouel";

echo json_encode(sql_exec($sql));
?>