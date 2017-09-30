<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function($table) {
            $table->bigIncrements('id');
            $table->smallInteger('type');
            $table->datetime('time');
            $table->string('account_id')->default('');
            $table->unsignedInteger('server_id')->default(0);
            $table->unsignedInteger('uint_param1')->default(0);
            $table->unsignedInteger('uint_param2')->default(0);
            $table->text('str_param1')->nullable();
            $table->text('str_param2')->nullable();
            $table->index('server_id');
            $table->index('time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('reports');
    }
}
