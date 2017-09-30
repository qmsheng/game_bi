<?php

use Illuminate\Database\Seeder;

class ServersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('servers')->insert([
            'server_id' => '1',
            'server_name' => 's1',
            'platform_server_id'=>'1001',
            'description' => '一区',
            'server_ip' => '38.83.111.132',
            'login_port' => '10000',
            'http_port' => '10013',
            'http_api_server_address' => 'http://38.83.111.131',
            'lang'=>'en',
            'login_key'=>'1234567890',
            'pay_key'=>'1234567890',
            'platform_id' => 1,
            'status' => 0,
            'active' => 1,
        ]);
    }
}
