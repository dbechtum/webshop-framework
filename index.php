<?php

use App\Core\{Router, Request}; 

require 'vendor/autoload.php';

// .env configuration
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//var_dump($_ENV);
$database = require 'core/bootstrap.php';



Router::load('app/routes.php')
    ->direct(Request::uri(), Request::method());