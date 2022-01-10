<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Models\Loan;
use App\Models\{Order, OrderStatuses};


class OrderController extends Controller
{
    
    public function getAllByUser(){

        $user = request()->user();

        return OrderResource::collection( $user->orders );

    }

    public function store(OrderStoreRequest $request){
        $amountToFund = $request->amount_to_fund;
        $loan = Loan::findOrFail($request->loan_id);
                
        $order = new Order;
        $order->user_id = $request->user()->id;
        $order->loan_id = $loan->id;
        $order->user_fund = $amountToFund;
        $order->real_fund = $amountToFund;
        $order->status    = OrderStatuses::Pending;
        $order->save();        

        return response('Order Creada', 201);
    }
}
