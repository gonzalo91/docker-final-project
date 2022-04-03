<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function loan(){
        return $this->belongsTo(Loan::class);

    }

    public function getStatusTextAttribute(){
        $statusInt = (int) $this->status;
        

        return match($statusInt){
            OrderStatuses::Pending->value => 'Pendiente',
            OrderStatuses::Processing->value => 'Procesando',
            OrderStatuses::Accepted->value => 'Aceptada',
            OrderStatuses::Error->value => 'Error',            
            default => 'Error'
        };
    }
}

enum OrderStatuses: int{

    case Error = 0;
    case Pending = 1;
    case Processing = 2;
    case Accepted = 3;

}
