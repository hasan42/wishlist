<?php
include "config.php";

switch ($method) {
  case 'GET':
    $id = $_GET['id'];
    $categoryId = $_GET['category'];
    $sql = "select * from items".($categoryId?" where category=$categoryId":'').($id?" where id=$id":'');
    break;
  case 'POST':
    if($_POST["actions"] == 'add new'){

      $name = $_POST["name"];
      $link = $_POST["link"];
      $description = $_POST["description"];
      $category = $_POST["category"];
      $price = $_POST["price"];
      $sql = "insert into items (id, name, link, description, category, price, done) values (NULL, '$name', '$link', '$description', '$category', '$price', '')"; 

    }elseif($_POST["actions"] == 'toggle done'){

      $id = $_POST["id"];
      $done = $_POST["done"];
      echo $id.$done;
      $sql = "update items set done = $done where id = $id"; 
      
    }
    break;
  case 'DELETE':
    $id = $_GET["id"];
    $categoryId = $_GET['category'];
    $sql = "delete from items".($categoryId?" where category=$categoryId":'').($id?" where id=$id":''); 
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

// $comapanyData = mysqli_query($con,"select * from items");

// $response = array();

// while($row = mysqli_fetch_assoc($itemsData)){

//   $response[] = $row;
// }

// echo json_encode($response);
exit;
?>