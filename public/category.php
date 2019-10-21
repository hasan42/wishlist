<?php
include "config.php";

switch ($method) {
    case 'GET':
      $id = $_GET['id'];
      $sql = "select * from category".($id?" where id=$id":''); 
      break;
    case 'POST':
      if($_POST["actions"] == 'add new'){
        $name = $_POST["name"];
        echo $name;
        $sql = "insert into category (id, name, done) values (NULL, '$name', '')"; 
      }elseif($_POST["actions"] == 'toggle done'){
        $id = $_POST["id"];
        $done = $_POST["done"];
        echo $id.$done;
        $sql = "update category set done = $done where id = $id"; 
      }
      break;
    case 'DELETE':
      $id = $_GET["id"];
      $sql = "delete from category where id = $id"; 
      break;
}
$result = mysqli_query($con,$sql);

if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
  $response = array();
  while($row = mysqli_fetch_assoc($result)){
     $response[] = $row;
  }
  echo json_encode($response);
} elseif ($method == 'POST') {
  echo json_encode($result);
} elseif ($method == 'DELETE') {
  echo json_encode($result);
}else {
  echo mysqli_affected_rows($con);
}

// $categoryData = mysqli_query($con,"select * from category");

// $response = array();

// while($row = mysqli_fetch_assoc($categoryData)){
//    $response[] = $row;
// }

// echo json_encode($response);
exit;
?>