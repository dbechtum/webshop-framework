<?php

return[
    'database' => [
        'name' => 'posterspace',
        'username' => 'root',
        'password' => 'Gorilla1!',
        'connection' => 'mysql:host=127.0.0.1',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    ]
];