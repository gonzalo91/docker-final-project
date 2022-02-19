<?php

use App\Http\Controllers\LoanController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserBalanceController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
->group(function(){

    Route::get('/', function () {
        return view('home');
    })->name('home');
    
    Route::get('/ordenes', function () {
        return view('ordenes');
    })->name('orders');
    
    Route::get('/perfil', [ProfileController::class, 'index'])->name('profile');
    Route::get('/perfil/image-profile', [ProfileController::class, 'image']);
    Route::post('/perfil/image-profile', [ProfileController::class, 'updateImage']);
    
    
    Route::get('loans', [LoanController::class,'index']);
    
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'getAllByUser']);
    
    Route::get('balance', [UserBalanceController::class, 'index']);

});


Auth::routes();

