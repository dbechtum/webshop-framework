<?php

function dd(...$inputs) {
    foreach($inputs as $input) {
        echo '<pre>';
        var_dump($input);
        echo '</pre';
    }
    die();
}