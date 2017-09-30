<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBuildsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('builds', function($table) {
            $table->increments('id');
            $table->string('build_name')->unique();
            $table->string('source_branch');
            $table->string('build_server_ip');
            $table->string('build_server_user');
            $table->string('build_server_pass');
            $table->string('build_server_path');
            $table->string('build_server_cmd');
            $table->string('update_server_cmd');
            $table->string('build_client_ip');
            $table->string('build_client_user');
            $table->string('build_client_pass');
            $table->string('build_client_path');
            $table->string('build_client_cmd');
            $table->string('update_client_cmd');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('builds');
    }
}
