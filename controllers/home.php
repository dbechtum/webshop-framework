<?php

require 'Task.php';
$tasks = $database->fetchAll('todos', 'Task');

require 'views/home.view.php';