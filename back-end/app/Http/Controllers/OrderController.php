<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;

use App\Models\Loan;
use App\Mail\OrderCreated;
use App\Http\Resources\OrderResource;
use App\Models\{Order, OrderStatuses};
use App\Http\Requests\OrderStoreRequest;

class OrderController extends Controller
{
    
    public function getAllByUser(){

        $user = request()->user();

        $orders = $user->orders()->with(['loan'])->orderBy('id', 'desc')->get();

        return OrderResource::collection( $orders );

    }

    public function store(OrderStoreRequest $request){
        $amountToFund = $request->amount_to_fund;
        $loan = Loan::findOrFail($request->loan_id);
                

        $order = new Order;
        $order->user_id = $request->user()->id;
        $order->loan_id = $loan->id;
        $order->user_fund = $amountToFund;
        $order->real_fund = 0;
        $order->status    = OrderStatuses::Pending;
        $saved = $order->save();        

        
        if($saved){            
            Mail::to(config('mail.mail_notification'))
                ->send(new OrderCreated($order));
        }

        return response(['status' => 'Order Creada'], 201);
    }
}
