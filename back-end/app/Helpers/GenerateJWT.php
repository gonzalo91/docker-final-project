<?php 
namespace App\Helpers;

use Firebase\JWT\JWT;

class GenerateJWT{


    public static function execute($user){

        $key = config('app.jwt_secret');

        $time = time();

        $payload = array(
            'iat' => $time, // Tiempo que inició el token
            'exp' => $time + (60*60*24), // Tiempo que expirará el token (+1 hora)
            'data' => [ // información del usuario
                'user_id' => $user->id,
                'name' => $user->name
            ]
        );

        $jwt = JWT::encode($payload, $key,);

        return $jwt;
    }


}