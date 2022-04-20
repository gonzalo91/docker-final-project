<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserFcmTokenRequest;
use App\Models\UserFcmToken;

class UserFcmTokenController extends Controller
{
    

    public function store(CreateUserFcmTokenRequest $request){
        $token = new UserFcmToken(['token' => $request->token]);

        $request->user()->fcmTokens()->save($token);

        return ['status' => 'ok'];

    }

}
