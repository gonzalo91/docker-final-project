<?php

namespace App\Console\Commands;

use App\Models\{Loan, LoanStatuses};
use Illuminate\Console\Command;

class CreateLoans extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'loans:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crear Prestamos';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        
        foreach(range(1, 10) as $x ){
            $randomRate = rand(7.5, 35);
            $randomAmount = rand(1000, 999999);
            
            $loan = new Loan();

            $loan->interest_rate = $randomRate;
            $loan->total_amount  = $randomAmount;
            $loan->status        = LoanStatuses::Funding;
            
            $loan->save();

        }

        return 0;
    }
}
