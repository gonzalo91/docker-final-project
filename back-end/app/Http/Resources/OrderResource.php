<?php

namespace App\Http\Resources;

use App\Models\OrderStatuses;
use Illuminate\Http\Resources\Json\JsonResource;



class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $array = parent::toArray($request);

        $tailStatus = $this->status == OrderStatuses::Error->value ? ' (' . $this->error_msg . ')' : '';

        $array['status_text'] = $this->status_text . $tailStatus;

        $amountToShow = $this->status == OrderStatuses::Error->value ? $this->user_fund : $this->real_fund;
        $array['amount_to_show'] = number_format($amountToShow, 2);

        return $array;
    }
}
