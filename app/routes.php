<?php

$router->get('', 'PagesController@home');

$router->get('register', 'UsersController@index');
$router->post('register', 'UsersController@store');
$router->get('register-successful', 'PagesController@register_successful');

$router->get('login', 'PagesController@login');
$router->post('login', 'UsersController@login');