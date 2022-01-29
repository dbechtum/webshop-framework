<?php

namespace App\Controllers;

class PagesController{

    public function home(){

        return view('home');
    }

    public function about(){
        return view('about');
    }

    public function contact(){
        return view('contact');
    }

    public function register_successful(){
        return view('register-successful');
    }

    public function login(){
        return view('login');
    }

}