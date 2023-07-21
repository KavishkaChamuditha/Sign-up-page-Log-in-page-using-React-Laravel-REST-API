<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
// to docode the password 
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function register(Request $req){
        //return "Hello this is register";

        //to get the data that are sending from postmen  
        $user = new User; 
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user; 
    }

    function login(Request $req){

        $user = User::where('email', $req->email)-> first();

        if(!$user || !Hash::check($req->password,$user->password))
        {
            return ["Error"=>"Your Email Or Password is incorrect"];
        }

        return $user; 
        // return "Log In";
    }

}
