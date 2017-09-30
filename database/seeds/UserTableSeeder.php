<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'display_name' => 'Administrator',
            'email' => '478798686@qq.com',
            'qq' => '478798686',
            'display_icon' => '',
            'active' => 1
        ]);
    }
}
