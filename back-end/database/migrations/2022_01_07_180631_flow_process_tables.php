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
            $table->decimal('current_fund')->default(0);
            $table->smallInteger('status')->index();

            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('loan_id')->constrained();

            $table->decimal('user_fund');
            $table->decimal('real_fund')->default(0);

            $table->smallInteger('status')->index();
            $table->string('error_msg')->nullable();

            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->decimal('balance')->default(150000.99);
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
