<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoanDashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $ordersSumRealFund = is_null($this->orders_sum_real_fund) ? 0 : (float) $this->orders_sum_real_fund;

        

        return [
            'id' => $this->id,
            'orders_count' => $this->orders_count,
            'interest_rate' => $this->interest_rate . ' %',
            'total_amount' => '$ '. number_format($this->total_amount, 2),
            'orders_sum_real_fund' => '$ '.  number_format($this->getOrdersSum(), 2),                        
            'amount_to_fund' => '$ ' . number_format($this->amount_to_fund, 2),
        ];
    }
}
