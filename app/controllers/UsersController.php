<?php

namespace App\Controllers;

use App\Core\App;

class UsersController{

    public function store(){
        $user = $_POST;
        $user['created_at'] = date('Y-m-d H:i:s');
        $user['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);

        App::get('database')->insert('users', [
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'password' => $user['password'],
            'created_at' => $user['created_at'],
            'updated_at' => $user['created_at']
        ]);
        
        return redirect('register-successful');
    }
    
    public function login(){
        $query = "SELECT * FROM `users` WHERE `email`='" . $_POST['email'] . "'";
        $data = App::get('database')->fetch($query);

        //dd($data, $_POST['password'], password_verify($_POST['password'], $data['password']));

        //todo: save user in cookies/localstorage
        if(password_verify($_POST['password'], $data['password'])) {
            $cookie_name = "user";
            $cookie_value = $data['first_name'] . " " . $data['last_name'];
            setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day    
        }
        return redirect(''); //return to home page*/
    }
}