<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNoticesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notices', function($table) {
            $table->bigIncrements('id');
            $table->text('server_ids');
            $table->string('content');
            $table->datetime('start_time');
            $table->datetime('end_time');
            $table->unsignedInteger('interval');
            $table->unsignedInteger('user_id');
            $table->smallInteger('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notices');
    }
}
