<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoanController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserBalanceController;
use App\Http\Controllers\UserFcmTokenController;
use App\Http\Controllers\Auth\LoginMovilController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [LoginMovilController::class, 'login' ])
    ->middleware(['throttle:30,5']);


Route::middleware('auth:sanctum')->group(function(){

    Route::post('user/save-token', [UserFcmTokenController::class, 'store'])->name('user.save-token');
    Route::get('loans', [LoanController::class,'index']);    
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'getAllByUser']);    
    Route::get('balance', [UserBalanceController::class, 'index']);
    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
