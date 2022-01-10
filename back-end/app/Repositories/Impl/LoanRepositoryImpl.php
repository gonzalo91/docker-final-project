<?php
namespace App\Repositories\Impl;

use App\Models\{Loan, LoanStatuses};
use App\Repositories\LoanRepository;
use Illuminate\Support\Facades\Log;

class LoanRepositoryImpl implements LoanRepository{


    function getAllLoansToFund(int $userId){

        return Loan::withCount(['orders' => fn($qb) => $qb->where('user_id', $userId) ])
                ->withSum('orders_accepted', 'real_fund')
                ->where('status', LoanStatuses::Funding)->get();

    }

}