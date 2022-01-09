<?php

namespace App\Services;

use App\Repositories\LoanRepository;

class LoanService {

    
    public function __construct(private LoanRepository $loanRepo)
    {
        
    }

    public function getLoansToFund(int $userId){
        $loans = $this->loanRepo->getAllLoansToFund($userId);


        return $loans;
    }

}