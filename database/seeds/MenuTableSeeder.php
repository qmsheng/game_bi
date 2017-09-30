<?php

use Illuminate\Database\Seeder;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menus')->insert(['id' => 101,  'menu_name' => '数据报表',  'url' => '/report',  'icon' => 'file excel outline icon', 'description' => '数据报表', 'parent_id' => 0]);
        DB::table('menus')->insert(['id' => 102,  'menu_name' => '总报表',  'url' => '/report',  'icon' => 'pie chart icon', 'description' => '总报表', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 103,  'menu_name' => '全报报表',  'url' => '/serversreport',  'icon' => 'area chart icon', 'description' => '全报报表', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 104,  'menu_name' => '单服报表',  'url' => '/serverreport',  'icon' => 'bar chart icon', 'description' => '单服报表', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 105,  'menu_name' => '留存报表',  'url' => '/preservereport',  'icon' => 'calendar outline icon', 'description' => '留存报表', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 106,  'menu_name' => '实时在线',  'url' => '/onlinereport',  'icon' => 'line chart icon', 'description' => '实时在线', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 107,  'menu_name' => '实时新增',  'url' => '/newreport',  'icon' => 'add to calendar icon', 'description' => '实时新增', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 108,  'menu_name' => '实时营收',  'url' => '/incomereport',  'icon' => 'money icon', 'description' => '实时营收', 'parent_id' => 101]);
        DB::table('menus')->insert(['id' => 109,  'menu_name' => '订单查询',  'url' => '/orderreport',  'icon' => 'first order icon', 'description' => '订单查询', 'parent_id' => 101]);


        DB::table('menus')->insert(['id' => 201,  'menu_name' => '用户管理',  'url' => '/userinfo',  'icon' => 'users icon', 'description' => '用户管理', 'parent_id' => 0]);
        DB::table('menus')->insert(['id' => 202,  'menu_name' => '玩家信息',  'url' => '/userinfo',  'icon' => 'user icon', 'description' => '玩家信息', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 203,  'menu_name' => '数据分布',  'url' => '/datadistribute',  'icon' => 'area chart icon', 'description' => '数据分布', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 204,  'menu_name' => '新手引导',  'url' => '/newguard',  'icon' => 'book icon', 'description' => '新手引导', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 205,  'menu_name' => '踢线&禁言&封停',  'url' => '/kickplayer',  'icon' => 'remove user icon', 'description' => '踢线&禁言&封停', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 206,  'menu_name' => '玩家补偿',  'url' => '/compensate',  'icon' => 'recycle icon', 'description' => '玩家补偿', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 207,  'menu_name' => '公告发放',  'url' => '/sendnotice',  'icon' => 'alarm icon', 'description' => '公告发放', 'parent_id' => 201]);
        DB::table('menus')->insert(['id' => 208,  'menu_name' => '邮件发送',  'url' => '/sendmail',  'icon' => 'mail icon', 'description' => '邮件发送', 'parent_id' => 201]);

        DB::table('menus')->insert(['id' => 301,  'menu_name' => '礼品码',  'url' => '/cdkey',  'icon' => 'gift icon', 'description' => '礼品码', 'parent_id' => 0]);
        DB::table('menus')->insert(['id' => 302,  'menu_name' => '礼品码管理',  'url' => '/cdkey',  'icon' => 'settings icon', 'description' => '礼品码管理', 'parent_id' => 301]);
        DB::table('menus')->insert(['id' => 303,  'menu_name' => '礼品码查询',  'url' => '/cdkeysearch',  'icon' => 'search icon', 'description' => '礼品码查询', 'parent_id' => 301]);

        DB::table('menus')->insert(['id' => 401,  'menu_name' => '活动管理',  'url' => '/activity',  'icon' => 'trophy icon', 'description' => '活动管理', 'parent_id' => 0]);
        DB::table('menus')->insert(['id' => 402,  'menu_name' => '运营活动管理',  'url' => '/activity',  'icon' => 'settings icon', 'description' => '运营活动管理', 'parent_id' => 401]);


        DB::table('menus')->insert(['id' => 501,  'menu_name' => '系统管理',  'url' => '/user',  'icon' => 'configure icon', 'description' => '系统管理', 'parent_id' => 0]);
        DB::table('menus')->insert(['id' => 502,  'menu_name' => '账号管理',  'url' => '/user',  'icon' => 'protect icon', 'description' => '账号管理', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 503,  'menu_name' => '角色管理',  'url' => '/role',  'icon' => 'sitemap icon', 'description' => '角色管理', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 504,  'menu_name' => '权限管理',  'url' => '/permission',  'icon' => 'privacy icon', 'description' => '设置用户可以访问的权限', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 505,  'menu_name' => '菜单管理',  'url' => '/menu',  'icon' => 'sitemap icon', 'description' => '管理菜单的显示', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 506,  'menu_name' => '平台管理',  'url' => '/platform',  'icon' => 'tasks icon', 'description' => '平台管理', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 507,  'menu_name' => '区服管理',  'url' => '/server',  'icon' => 'server icon', 'description' => '区服管理', 'parent_id' => 501]);
        DB::table('menus')->insert(['id' => 508,  'menu_name' => '流失点管理',  'url' => '/lost',  'icon' => 'industry icon', 'description' => '流失点管理', 'parent_id' => 501]);


    }
}
