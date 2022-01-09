<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanDashboardResource;
use App\Services\LoanService;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    
    public function index(LoanService $loanService){

        $loans = $loanService->getLoansToFund(request()->user()->id);

        return LoanDashboardResource::collection( $loans );

    }

}
