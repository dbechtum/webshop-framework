<?php

//for some reason $_ENV is empty in this file, so could not use the .env config
//FILL OUT $connect!
$connect = new PDO("mysql:host=127.0.0.1;
    dbname=posterspace;
    user", "root",
    "");//password

$received_data = json_decode(file_get_contents("php://input"));

$data = array();

if($received_data->action == 'fetchposters') {
    $query = "
    SELECT * FROM posters
    ORDER BY id DESC
    ";
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC))
    {
        $data[] = $row;
    }
    return print_r(json_encode($data));
}