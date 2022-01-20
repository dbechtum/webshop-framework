<?php

namespace App\Controllers;

use App\Core\App;

class UsersController{

    public function index(){
        $users = App::get('database')->fetchAll('users');

        return view('register', compact('users'));
    }
    public function store(){
        App::get('database')->insert('users', [
            'name' => $_POST['name']
        ]);
        
        return redirect('register');
    }
}