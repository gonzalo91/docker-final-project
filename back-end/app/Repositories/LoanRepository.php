<?php
namespace App\Repositories;

interface LoanRepository{

    function getAllLoansToFund(int $userId);

}