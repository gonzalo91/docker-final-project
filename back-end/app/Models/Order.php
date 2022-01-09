<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    public function user(){
        return $this->belongsTo('users');
    }

    public function loan(){
        return $this->belongsTo('loans');

    }
}

enum OrderStatuses: int{

    case Error = 0;
    case Pending = 1;
    case Processing = 2;
    case Accepted = 3;

}
