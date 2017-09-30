<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role_name' => 'administrator',
            'description' => '',
        ]);
        DB::table('roles')->insert([
            'role_name' => 'test',
            'description' => '',
        ]);
    }
}
