<?php

function dd(...$inputs) {
    foreach($inputs as $input) {
        echo '<pre>';
        var_dump($input);
        echo '</pre';
    }
    die();
}

function view($name, $data = []){
    extract($data);
    return require "app/views/{$name}.view.php";
}

function redirect($path){
    header("Location: /{$path}");
}