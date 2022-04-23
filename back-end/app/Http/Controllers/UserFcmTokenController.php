<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserFcmTokenRequest;
use App\Models\UserFcmToken;

class UserFcmTokenController extends Controller
{
    

    public function store(CreateUserFcmTokenRequest $request){
        $token = new UserFcmToken(['token' => $request->token]);

        $request->user()->fcmTokens()->where('token', $request->token)->delete();

        $request->user()->fcmTokens()->save($token);

        return ['status' => 'ok'];

    }
    
    public function destroy(CreateUserFcmTokenRequest $request){
        $request->user()->fcmTokens()->where('token', $request->token)->delete();
    }

}
