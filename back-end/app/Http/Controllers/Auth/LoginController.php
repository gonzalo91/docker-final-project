<?php

namespace App\Http\Controllers\Auth;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\AuthenticatesUsers;


use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function authenticated(Request $request, $user)
    {
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
        $cookie = cookie('jwt', $jwt, 60 * 24);     

        return $request->wantsJson()
                    ? (new JsonResponse([], 204))->withCookie($cookie)
                    : (redirect()->intended($this->redirectPath()))->withCookie($cookie);

    }
}
