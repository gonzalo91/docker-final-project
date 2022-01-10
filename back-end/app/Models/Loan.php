<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;


    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function orders_accepted(){
        return $this->orders()->where('status', OrderStatuses::Accepted);
    }

    public function getAmountToFundAttribute(){
        $ordersSumRealFund = $this->getOrdersSum();        

        return $this->total_amount - $ordersSumRealFund;
    }

    public function getOrdersSum(){
        return is_null($this->orders_accepted_sum_real_fund) ? 0 : (float) $this->orders_accepted_sum_real_fund;        
    }

}

enum LoanStatuses: int{
    case Funding = 1;
    case Funded = 2;
    case Cancelled = 3;
}