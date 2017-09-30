<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('server_id')->unique();
            $table->string('server_name');
            $table->unsignedInteger('platform_server_id')->default(0);
            $table->string('description');
            $table->string('server_ip');
            $table->string('login_port');
            $table->string('http_port');
            $table->string('lang');
            $table->string('login_key');
            $table->string('pay_key');
            $table->string('http_api_server_address');
            $table->unsignedInteger('platform_id');
            $table->tinyInteger('status')->default(0);
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('platform_id')->references('id')->on('platforms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('servers');
    }
}
