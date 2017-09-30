<?php

use Illuminate\Database\Seeder;

class BuildsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('builds')->insert([
            'build_name' => '主线版本',
            'source_branch' => 'develop',
            'build_server_ip' => '192.168.1.252',
            'build_server_user' => 'ServerBuilder',
            'build_server_pass' => 'ServerBuilder',
            'build_server_path' => '/ServerBuilder',
            'build_server_cmd' => 'sh build_server.sh',
            'update_server_cmd' => 'sh update_server.sh',
            'build_client_ip' => '192.168.1.111',
            'build_client_user' => 'biowar8888',
            'build_client_pass' => 'ServerBuilder',
            'build_client_path' => '/ServerBuilder',
            'build_client_cmd' => './build_client.bat',
            'update_client_cmd' => './build_client.bat'
        ]);
    }
}
