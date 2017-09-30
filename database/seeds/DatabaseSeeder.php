<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTableSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        $this->call(MenuTableSeeder::class);
        $this->call(UserRoleTableSeeder::class);
        $this->call(RolePermissionTableSeeder::class);
        $this->call(RoleMenuTableSeeder::class);
        $this->call(PlatformTableSeeder::class);
        $this->call(ServersTableSeeder::class);
        $this->call(AccreditsTableSeeder::class);
        $this->call(BuildsTableSeeder::class);
        $this->call(ReportPointTableSeeder::class);
    }
}
