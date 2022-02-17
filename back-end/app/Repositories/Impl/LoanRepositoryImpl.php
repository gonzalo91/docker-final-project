<?php
namespace App\Repositories\Impl;

use App\Models\OrderStatuses;
use App\Models\{Loan, LoanStatuses};
use App\Repositories\LoanRepository;

class LoanRepositoryImpl implements LoanRepository{


    function getAllLoansToFund(int $userId){

        return Loan::withCount([
            'orders' => fn($qb) => $qb->where('user_id', $userId)->where('status', OrderStatuses::Accepted) 
        ])->withSum('orders_accepted', 'real_fund')
        ->where('status', LoanStatuses::Funding)->get();

    }

}