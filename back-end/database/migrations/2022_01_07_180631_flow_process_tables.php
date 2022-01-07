<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FlowProcessTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->decimal('interest_rate');

            $table->decimal('total_amount');        
            $table->dateTime('completed_at')->nullable();        
            $table->decimal('current_fund');
            $table->smallInteger('status');

            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('loan_id')->constrained();

            $table->decimal('user_fund');
            $table->decimal('real_fund');

            $table->smallInteger('status');            
            $table->string('error_msg');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('loans');
    }
}
