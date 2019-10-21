<?php

$host = "localhost"; /* Host name */
$user = "u0345666_wl"; /* User */
$password = "b!fu31QY"; /* Password */
$dbname = "u0345666_wishlist"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
mysqli_query($con,"SET CHARACTER SET 'utf8'");
mysqli_query($con,"SET SESSION collation_connection ='utf8_unicode_ci'");

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
?>