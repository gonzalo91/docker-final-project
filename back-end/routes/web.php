<?php

use App\Http\Controllers\LoanController;
use App\Http\Controllers\UserBalanceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name('home')->middleware('auth');

Route::get('/ordenes', function () {
    return view('ordenes');
})->name('orders')->middleware('auth');


Route::get('loans', [LoanController::class,'index']);

Route::get('balance', [UserBalanceController::class, 'index']);

Auth::routes();

