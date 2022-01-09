<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserBalanceController extends Controller
{
    //

    public function index(){

        return [
            'balance' => number_format(request()->user()->balance, 2),
        ];

    }
}
