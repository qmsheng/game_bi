<?php

use Illuminate\Database\Seeder;

class PlatformTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('platforms')->insert([
            'platform_name' => 'ogas',
            'display_name' => 'OG平台',
            'description' => 'OG平台',
        ]);
    }
}
