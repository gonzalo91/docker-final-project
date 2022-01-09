<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserBalanceController extends Controller
{
    //

    public function index(){

        return [
            'balance' => request()->user()->balance
        ];

    }
}
