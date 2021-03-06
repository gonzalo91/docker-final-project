<?php

namespace App\Http\Resources;

use App\Models\OrderStatuses;
use Carbon\Carbon;
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

        $amountToShow = $this->status == OrderStatuses::Accepted->value ? $this->real_fund : $this->user_fund ;
        $array['amount_to_show'] = number_format($amountToShow, 2);
        $array['created_at_formatted'] = Carbon::parse($this->created_at)->format('Y-m-d');

        return $array;
    }
}
