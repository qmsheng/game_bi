<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/11
 * Time: 10:57
 */
namespace App\Http\Controllers\Game;

use App\Models\Game\RoleInfo;
use DB;

class ApiController extends \App\Http\Controllers\Controller
{
    /**
     * 排行榜
     * @return \Illuminate\Http\JsonResponse
     */
    public function rank() {
        $type = request()->input('type', '');
        $local = request()->input('local', '');
        $role_id = request()->input('roleid', '');

        $sql = "";
        $order_key = "";

        $sql = "";
        $order_key = "";
        $order_type = "asc";
        $platform_server_id = 0;
        $role = RoleInfo::where('role_id', $role_id)->first();
        //$role = DB::connection('iod_web_game_db')->select("select platform_server_id from role_info where role_id = ". $role_id);
        if ($role)
        {
            $platform_server_id = $role->platform_server_id;
        }
        if ($type != 0)
        {
            switch($type)
            {
                case 1:
                    $order_key = "level";
                    $order_type = "desc";
                    break;
                case 2:
                    $order_key = "effectiveness";
                    $order_type = "desc";
                    break;
                case 3:
                    $order_key = "ultimate_tower_stage";
                    $order_type = "desc";
                    break;
                default:
                    $order_key = "level";
                    $order_type = "desc";
            }
            $sql = "(select role_name,role_id,".$order_key.",role_class,account_id from role_info where role_id = ".$role_id.") union all (select role_name,role_id,".$order_key.",role_class,account_id from role_info ";
            if ($local != 0)
                $sql .= " where platform_server_id = ".$platform_server_id;
            $sql .= "  order by ".$order_key." ".$order_type." limit 20)";
        }
        else
        {
            //总榜
            $order_key = "order_key";
            $sql = "(select 1 as rank, role_name,role_id,level as order_key,role_class,account_id from role_info ";
            if ($local != 0)
                $sql .= " where platform_server_id=".$platform_server_id;
            $sql .= " order by level desc limit 1) union all (select 2 as rank, role_name,role_id,effectiveness as order_key,role_class,account_id from role_info ";
            if ($local != 0)
                $sql .= " where platform_server_id=".$platform_server_id;
            $sql .= " order by effectiveness desc limit 1)";
        }


        $ranks = DB::connection('iod_web_game_db')->select($sql);

        $result = array();
        $result['type'] = $type;
        $result['local'] = $local;
        $result['role_id'] = $role_id;
        if (count($ranks) >= 2)
        {
            if ($type != 0)
            {
                $self = array_shift($ranks);
                if ($self->role_id != $role_id)
                {
                    return json_encode($result);
                }
                $result['self']['role_name'] = $self->role_name;
                $result['self']['role_id'] = $self->role_id;
                $result['self']['job'] = $self->role_class;
                $result['self']['key'] = $self->$order_key;
                $result['self']['rank'] = 0;
                $index = 0;
                foreach($ranks as $rank)
                {
                    $result['ranks'][$index]['role_name'] = $rank->role_name;
                    $result['ranks'][$index]['role_id'] = $rank->role_id;
                    $result['ranks'][$index]['key'] = $rank->$order_key;
                    $result['ranks'][$index]['job'] = $rank->role_class;
                    $result['ranks'][$index]['rank'] = $index+1;
                    if ($rank->role_id == $role_id)
                    {
                        $result['self']['rank'] = $index+1;
                    }
                    $index++;
                }
                $result['count'] = $index;
                $result['time'] = time();
            }
            else
            {
                $result['self'] = array();
                $index = 0;
                foreach($ranks as $rank)
                {
                    $result['ranks'][$index]['role_name'] = $rank->role_name;
                    $result['ranks'][$index]['role_id'] = $rank->role_id;
                    $result['ranks'][$index]['key'] = $rank->$order_key;
                    $result['ranks'][$index]['job'] = $rank->role_class;
                    $result['ranks'][$index]['rank'] = $rank->rank;
                    $index++;
                }
            }

        }
        return response()->json($result);
    }


    public function fans() {
        $roleid = request()->input('roleid', '');
        $querypage = request()->input('page', '');
        $querycount = request()->input('pagesize', '');
        $result = array(
            'fans_total_count'=>0,
            'fans' => array(),
            'page' => 1,
            'pagesize'=>7
        );
        if ($querycount == 0)
            $querycount = 7;
        if ($querypage <= 0)
            $querypage = 1;
        $sql = "select count('x') as cnt from friendship_info where friend_role_id = ?";
        $cnt = DB::connection('iod_web_game_db')->select($sql, [$roleid]);
        $total_count = 0;
        $max_page = 0;
        if (count($cnt) > 0)
        {
            $total_count = $cnt[0]->cnt;
            $max_page = floor($total_count / $querycount);
            if ($total_count % $querycount > 0)
                $max_page = $max_page + 1;
            if ($max_page < $querypage)
                $querypage = $max_page;
            if ($querypage == 0)
                $querypage = 1;
        }
        $start_row = ($querypage - 1) * $querycount;
        $end_row = ($querypage) * $querycount;
        $sql = "select b.role_name, b.role_class, b.level from friendship_info a left join role_info b on a.role_id = b.role_id where a.friend_role_id = ? limit ".$start_row.",".$end_row;
        $fans_infos = DB::connection('iod_web_game_db')->select($sql, [$roleid]);
        $fans = array();
        foreach($fans_infos as $fans_info)
        {
            $fan = array(
                'role_name' => $fans_info->role_name,
                'role_class' => $fans_info->role_class,
                'level' => $fans_info->level
            );
            array_push($fans, $fan);
        }



        $result['fans_total_count'] = $total_count;
        $result['fans_total_page'] = $max_page;
        $result['fans'] = $fans;
        $result['page'] = $querypage;
        $result['pagesize'] = $querycount;

        return response()->json($result);
    }
}