<?php

namespace App\Http\Controllers\Admin;

use anlutro\cURL\Laravel\cURL;
use App\Http\Controllers\Controller;
use App\Models\Game\RoleInfo;
use App\Models\Platform;
use App\Models\Role;
use App\Models\Server;
use DB;

class QGameController extends Controller
{
    /**
     * 查询区服数据
     */
    public function queryQGame()
    {
        $platforms = Platform::all();
        // $servers = Server::all();

        $sql = " SELECT t2.platform_name,t1.* FROM 
                    tservers t1
                    LEFT JOIN tplatforms t2
                    ON t1.platform_id=t2.id ";

        $servers = DB::connection('iod_web_game_db')->select( $sql );

        $this->data = ['servers'=>$servers, 'platforms'=>$platforms];
        return $this->returnJson();
    }



    /**
     * 查询活动计划
     */
    public function getActivityTask()
    {
        $activity_ids    = request()->input('activity_ids');
        $platform_names  = request()->input('platform_names');
        $type_id         = request()->input('type_id');
        $type_id         = intval($type_id);

        $sql = " SELECT t1.*,t2.server_name,t3.platform_name,
                (
                case when UNIX_TIMESTAMP(t1.start_time)<UNIX_TIMESTAMP(now()) and UNIX_TIMESTAMP(now())<UNIX_TIMESTAMP(t1.end_time) then '进行中' 
                when UNIX_TIMESTAMP(t1.start_time)>UNIX_TIMESTAMP(now()) then '待开始'
                else '已结束' end 
                ) as activity_status
                FROM 
                (
                iodwebgame.tactivitytask t1
                LEFT JOIN iodwebgame.tservers t2
                ON t1.gs_id=t2.server_id
                )
                left join iodwebgame.tplatforms t3
                ON t2.platform_id=t3.id ";

        // type_id : 1.待开始,2.进行中,3.已结束
        if ($type_id === 1) {
            $sql = $sql." WHERE UNIX_TIMESTAMP(t1.start_time)>UNIX_TIMESTAMP(now()) "; //待开始
        }elseif($type_id === 2){
            $sql = $sql." WHERE UNIX_TIMESTAMP(t1.start_time)<UNIX_TIMESTAMP(now()) and UNIX_TIMESTAMP(now())<UNIX_TIMESTAMP(t1.end_time) "; //进行中
        }elseif($type_id === 3){
            $sql = $sql." WHERE UNIX_TIMESTAMP(t1.end_time)<UNIX_TIMESTAMP(now()) "; //已结束
        }else{

        }

        if ($platform_names) {
            if ($type_id === 1 || $type_id === 2 || $type_id === 3) {
                $sql = $sql." and t3.platform_name='$platform_names' ";
            }else{
                $sql = $sql." WHERE t3.platform_name='$platform_names' ";
            }
        }

        if ($activity_ids) {
            if ($type_id === 1 || $type_id === 2 || $type_id === 3 || $platform_names) {
                $sql = $sql." and t1.activity_id='$activity_ids' ";
            }else{
                $sql = $sql." WHERE t1.activity_id='$activity_ids' ";
            }
        }

        $query = DB::connection('iod_web_game_db')->select( $sql );

        $platforms = Platform::all();
        $servers = Server::all();

        $this->data = ['query' => $query, 'platforms'=>$platforms, 'servers'=>$servers];
        return $this->returnJson();
    }

    /**
     * 获取gmsvr的配置路径
     */
    private function queryGMSvr()
    {
        $sql = " SELECT t2.server_ip,t2.run_param
                    FROM tglobalconfig t1
                    LEFT JOIN tservers t2
                    ON t1.`value`=t2.id
                    WHERE t1.id=3 ";

        $authinfo = \DB::connection('iod_web_game_db')->selectOne( $sql );
        if(null == $authinfo)
        {
            return null;
        }

        $arr = json_decode($authinfo->run_param);

        if ($arr) {
            //获取gmsvr的配置路径
            return 'http://'.$authinfo->server_ip.':'.$arr->http_port;
        }else{
            return null;
        } 
    }


    /**
     * 绑定平台
     */
    private function bindPlatformEvent( $gs_id )
    {
        $result = 0;

        if ( !$this->queryGMSvr() )
        {
            $this->msg = 'GMser config err';
            return $this->returnErrJson();
        }

        $uri = $this->queryGMSvr().'/update_activity?gs_id='.$gs_id;

        try {
            cURL::get($uri);
        } catch(\Exception $e) {
            $this->msg = 'platform event err';
            return $this->returnErrJson();
        }
    }    

    /**
     * 添加活动计划
     */
    public function addActivityTask()
    {
        // $platform_id     = request()->input('platform_id', 1);
        $gs_id             = request()->input('gs_id', 0);
        $activity_id       = request()->input('activity_id', 0);
        $start_time        = request()->input('start_time', '2017-01-01 00:00:00');
        $end_time          = request()->input('end_time', '2017-01-01 00:00:00');
        $reward_start_time = request()->input('reward_start_time', '2017-01-01 00:00:00');
        $reward_end_time   = request()->input('reward_end_time', '2017-01-01 00:00:00');
        $info              = request()->input('info', '0');
        $data_group_id     = request()->input('data_group_id', 0);

        if (!$gs_id) {
            $gs_id = 0;
        }

        if (!$activity_id) {
            $activity_id = 0;
        }

        if (!$start_time) {
            $start_time = '2017-01-01 00:00:00';
        }

        if (!$end_time) {
            $end_time = '2017-01-01 00:00:00';
        }

        if (!$reward_start_time) {
            $reward_start_time = '2017-01-01 00:00:00';
        }

        if (!$reward_end_time) {
            $reward_end_time = '2017-01-01 00:00:00';
        }

        if (!$info) {
            $info = '0';
        }

        if (!$data_group_id) {
            $data_group_id = 0;
        }

        $sql = " INSERT INTO tactivitytask (gs_id,activity_id,start_time,end_time,reward_start_time,reward_end_time,info,data_group_id) 
                VALUES ($gs_id,$activity_id,'$start_time','$end_time','$reward_start_time','$reward_end_time','$info',$data_group_id) ";

        // 1）添加活动
        $query = DB::connection('iod_web_game_db')->select( $sql );

        $this->data = ['insert' => $sql];

        // 2）绑定平台
        $this->bindPlatformEvent( $gs_id );

        return $this->returnJson();
    }

    /**
     * 删除活动
     */
    public function delActivityTask()
    {

        $inst_ids  = request()->input('inst_ids', 0);
        $inst_ids  = intval($inst_ids);

        $sql = " select * from tactivitytask WHERE inst_id='$inst_ids' AND UNIX_TIMESTAMP(start_time)>UNIX_TIMESTAMP(now()) ";
        $query = DB::connection('iod_web_game_db')->select( $sql );

        if ( count($query) > 0) {
            $sql = " DELETE FROM TActivityTask WHERE inst_id='$inst_ids' ";
            $query = DB::connection('iod_web_game_db')->select( $sql );
        }

        $this->data = ['del' => $query];

        return $this->returnJson();
    }





    /**
     * 获取用户角色id号
     */
    private function getRoleIDByAccountname( $uid )
    {
        // 表tactroleinfo 与 表taccount  ======>>  账号id是一一对应的
        $sql = " select a.role_id from tactroleinfo a left JOIN taccount b ON a.account_id = b.account_Id WHERE b.account_name = '$uid' ";
        $query = DB::connection('iod_web_game_db')->select( $sql );
        if ($query)
        {
            return $query[0]->role_id;
        }else{
            return NULL;
        }
    }

    /**
     * 获取玩家相关信息
     */
    private function getPlayerInfo( $server_id, $role_name, $role_id, $uid, $page )
    {
        $sql_str1 = " select t1.account_id,t1.role_id,t1.name,t1.level,t1.exper,t1.create_time,t1.last_logout_time,t1.last_login_time,t1.fighting_force,
                    t2.level as vip_level,t3.account_name as uid,0 as money
                    from
                    (
                        tactroleinfo t1
                        left join trolevipinfo t2
                        ON t1.role_id=t2.role_id
                    )
                    left join taccount t3
                    ON t3.account_Id=t1.account_id ";

        // prop_id:
        // 1090519041 ==>> 钻石数
        // 1090519042 ==>> 金币数
        // 1090519046 ==>> 魂能数
        $sql_str2 = " SELECT `role_id`,`prop_id`,`number` FROM tproplist WHERE prop_id IN (1090519041,1090519042,1090519046) ";

        // 参数1：帐号名字
        if ( $uid )
        {
            $role_id = $this->getRoleIDByAccountname( $uid );
        }

        // 参数2：服务器id
        if ( intval($server_id) ) {
            $query_server = Server::where('server_id', $server_id)->first();
            if ( count($query_server) > 0 ) {
                $sql_str1 = $sql_str1 . " where t1.server_id=$server_id ";
            }
        }

        // 参数3：角色名
        if ( $role_name ) {
            if ( intval($server_id) ) {
                $sql_str1 = $sql_str1 . " and t1.name='$role_name' ";
            }else{
                $sql_str1 = $sql_str1 . " where t1.name='$role_name' ";
            }
        }

        // 参数4：角色id
        if ( intval($role_id) ) {
            if ( intval($server_id) || $role_name ) {
                $sql_str1 = $sql_str1 . " and t1.role_id=$role_id ";
            }else{
                $sql_str1 = $sql_str1 . " where t1.role_id=$role_id ";
            }

            $sql_str2 = $sql_str2 . " and role_id=$role_id ";
        }

        // 参数5：翻页
        if ( intval($page) && intval($page) > 0 ) {
            $start_page = ($page - 1) * 20; //默认每页20条数据
            $end_page = 20;

            $sql_str1 = $sql_str1 . " limit $start_page,$end_page ";
        }else{
            $sql_str1 = $sql_str1 . " limit 0,20 ";
        }

        $role_infos = array();
        if ( intval($server_id) || $role_name || intval($role_id) ) {
            $role_infos = DB::connection('iod_web_game_db')->select($sql_str1);
        }

        $role_datas = array();
        foreach ($role_infos as $key => $role_detail) {
            $role_datas[$role_detail->role_id] = $role_detail;
        }

        $role_numbers = DB::connection('iod_web_game_db')->select($sql_str2);

        // prop_id:
        // 1090519041 ==>> 钻石数
        // 1090519042 ==>> 金币数
        // 1090519046 ==>> 魂能数
        foreach ($role_numbers as $key => $role_info_detail) {
            if ( !empty($role_datas[$role_info_detail->role_id]) ) {
                if ( $role_info_detail->prop_id == 1090519041 ) {
                    $role_datas[$role_info_detail->role_id]->diamond = $role_info_detail->number;
                }elseif ( $role_info_detail->prop_id == 1090519042 ) {
                    $role_datas[$role_info_detail->role_id]->gold = $role_info_detail->number;
                }elseif ($role_info_detail->prop_id == 1090519046) {
                    $role_datas[$role_info_detail->role_id]->soul = $role_info_detail->number;
                }else{
                }
            }
        }

        $sql_str3 = " SELECT role_id,sum(money) as money FROM trechargedata WHERE 1 GROUP BY role_id ";
        $arr_player_money = DB::connection('iod_web_game_recharge')->select($sql_str3);
        foreach ($arr_player_money as $arr_player_money_key => $arr_player_money_value) {
            if ( !empty($role_datas[$arr_player_money_value->role_id]) ) {
                $role_datas[$arr_player_money_value->role_id]->money = $arr_player_money_value->money;
            }
        }

        return $role_datas;
    }

    /**
     * 查询玩家信息
     */
    public function queryRoleInfo()
    {
        $server_id = request()->input('server_id');
        $role_name = request()->input('role_name');
        $role_id   = request()->input('role_id');
        $uid       = request()->input('uid');
        $page      = request()->input('page');

        $role_datas = $this->getPlayerInfo( $server_id, $role_name, $role_id, $uid, $page );

        $role_data_info = array();
        $index = 0;
        foreach ($role_datas as $key => $value) {
            $role_data_info[$index] = $value;
            $index++;
        }

        $this->data = ['role_infos' => $role_data_info];
        return $this->returnJson();
    }

    /**
     * 查询钻石充值 
     */
    public function queryRechargeInfo()
    {
        $server_id     = request()->input('server_id');
        $platform_name = request()->input('platform_name');
        $start_time    = request()->input('start_time');
        $end_time      = request()->input('end_time');
        $role_name     = request()->input('role_name');

        $sql_str = " SELECT * FROM trechargedata ";

        if ( intval($server_id) ) {
            $sql_str = $sql_str . " WHERE server_id=$server_id ";
        }

        if ( $platform_name ) {
            if ( intval($server_id) ) {
                $sql_str = $sql_str . " and platform_name='$platform_name' ";
            }else{
                $sql_str = $sql_str . " WHERE platform_name='$platform_name' ";
            }
        }

        if ( $start_time ) {
            if ( intval($server_id) || $platform_name ) {
                $sql_str = $sql_str . " and DATE(time)>'$start_time' ";
            }else{
                $sql_str = $sql_str . " WHERE DATE(time)>'$start_time' ";
            }
        }

        if ( $end_time ) {
            if ( intval($server_id) || $platform_name || $start_time ) {
                $sql_str = $sql_str . " and DATE(time)<'$end_time' ";
            }else{
                $sql_str = $sql_str . " WHERE DATE(time)<'$end_time' ";
            }
        }

        if ( $role_name ) {
            if ( intval($server_id) || $platform_name || $start_time || $end_time ) {
                $sql_str = $sql_str . " and role_name='$role_name' ";
            }else{
                $sql_str = $sql_str . " WHERE role_name='$role_name' ";
            }
        }

        $recharge_info = DB::connection('iod_web_game_recharge')->select( $sql_str );

        $this->data = ['recharge_info' => $recharge_info];
        return $this->returnJson();
    }




    /**
     * 绑钻产出 
     */
    public function bindDiamondOutput()
    {
        $server_id     = request()->input('server_id');
        // $platform_name = request()->input('platform_name');
        $start_time    = request()->input('start_time');
        $end_time      = request()->input('end_time');

        $sql_data = "";
        if ( intval($server_id) ) {
            $sql_data = $sql_data . " and serverid=$server_id ";
        }

        // if ( $platform_name ) {
        //     $sql_data = $sql_data . " and platform='$platform_name' ";
        // }

        if ( $start_time ) {
            $sql_data = $sql_data . " and DATE(LogTime)>='$start_time' ";
        }

        if ( $end_time ) {
            $sql_data = $sql_data . " and DATE(LogTime)<='$end_time' ";
        }

        // LogType = 19,   玩家钻石,绑钻,添加记录
        $sql_str = " SELECT '7k7k' as `platform`,`serverid` as server_id,sum(`numberData2`) as total_numberData2,count(`numberData2`) as count_numberData2 FROM `TLog` 
                        WHERE `LogType`=19 $sql_data GROUP BY `strData2`,`platform`,`serverid` ";

        $arr_bind_diamond = DB::connection('log_db')->select( $sql_str );

        $arr_bind_info = array();
        $index         = 0;
        foreach ($arr_bind_diamond as $arr_bind_diamond_value) {
            $arr_bind_diamond_value->index = $index+1;

            $arr_bind_info[$index] = $arr_bind_diamond_value;

            $index++;
        }

        $this->data = ['arr_bind_diamond' => $arr_bind_info];

        return $this->returnJson();
    }



    /**
     * 钻石消费 
     */
    public function queryDiamondConsume()
    {
        $server_id     = request()->input('server_id');
        $start_time    = request()->input('start_time');
        $end_time      = request()->input('end_time');

        $sql_data = "";
        if ( intval($server_id) ) {
            $sql_data = $sql_data . " and t1.serverid=$server_id ";
        }

        if ( $start_time ) {
            $sql_data = $sql_data . " and DATE(t1.LogTime)>='$start_time' ";
        }

        if ( $end_time ) {
            $sql_data = $sql_data . " and DATE(t1.LogTime)<='$end_time' ";
        }

        // LogType = 17,   钻石消费
        $sql_str = " SELECT '7k7k' as platform,t1.serverid as server_id,DATE(t1.LogTime) as date,
                        SUM(t1.numberData3) as numberData3,SUM(t1.numberData2) as numberData2,t2.`name`
                        FROM IODWebGameLog.TLog t1
                        LEFT JOIN laravel.consume_point t2
                        ON t1.LogType=17
                        WHERE t1.numberData1=t2.type_id $sql_data 
                        GROUP BY t2.`name`,t1.LogTime,t1.numberData2
                        order by t1.numberData2 DESC ";

        $arr_diamond_consume = DB::connection('log_db')->select( $sql_str );

        $arr_diamond_info = array();
        $index         = 0;
        foreach ($arr_diamond_consume as $arr_diamond_consume_value) {
            $arr_diamond_consume_value->index = $index+1;

            $arr_diamond_info[$index] = $arr_diamond_consume_value;

            $index++;
        }

        $this->data = ['arr_diamond_consume' => $arr_diamond_info];

        return $this->returnJson();
    }



    /**
     * 查询在线信息
     */
    public function queryOnline()
    {
        $server_id  = request()->input('server_id');
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');

        $arr_online_info = [];

        $sql_str_1 = " SELECT t2.platform_name,t1.* FROM 
                    tservers t1
                    LEFT JOIN tplatforms t2
                    ON t1.platform_id=t2.id
                    WHERE t1.server_id=$server_id ";

        $arr_server_info = DB::connection('iod_web_game_db')->select( $sql_str_1 );

        if ($arr_server_info) {

            $platform_name = $arr_server_info[0]->platform_name;
            $server_name   = $arr_server_info[0]->server_name;
            $sql_str_2 = " select '$platform_name' as 'platform_name',serverid as 'server_id','$server_name' as 'server_name',LogTime as 'time',numberData1 as 'online_num'
                            from TLog 
                            WHERE LogType = 5 
                            AND serverid=$server_id
                            AND DATE(LogTime)>='$start_time'
                            AND DATE(LogTime)<='$end_time'
                            ORDER BY LogTime DESC ";

            $arr_online_info = DB::connection('log_db')->select( $sql_str_2 );
        }

        $this->data = ['server_onlines' => $arr_online_info];

        return $this->returnJson();
    }

    /**
     * 查询流失点信息
     */
    public function queryGuard()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $sql_str_1 = " SELECT t1.platform_name,t2.server_name
                        FROM tplatforms t1
                        LEFT JOIN tservers t2
                        ON t1.id=t2.platform_id
                        WHERE t2.server_id=$server_id ";

        // LogType=13, 连接数
        $sql_str_2 =  " SELECT uid 
                            FROM TLog 
                            WHERE DATE(LogTime)>='$start_time' 
                            AND DATE(LogTime)<='$end_time' 
                            AND LogType=13
                            and serverid=$server_id
                            AND uid NOT IN 
                            (
                                SELECT uid 
                                FROM TLog 
                                WHERE LogType=13
                                and serverid=$server_id
                                and DATE(LogTime)<'$start_time'
                                GROUP BY uid
                            )
                            GROUP BY uid ";

        $arr_server_info = DB::connection('iod_web_game_db')->select( $sql_str_1 );

        $arr_lost_info = array();
        if ($arr_server_info) {
            $platform_name = $arr_server_info[0]->platform_name;
            $server_name   = $arr_server_info[0]->server_name;

            $arr_connecte_info = DB::connection('log_db')->select( $sql_str_2 );

            $uid_str = '';
            foreach ($arr_connecte_info as $arr_connecte_info_key => $arr_connecte_info_value) {
                if ($uid_str) {
                    $uid_str = $uid_str . ",'" . $arr_connecte_info_value->uid . "'";
                }else{
                    $uid_str = "'" . $arr_connecte_info_value->uid . "'";
                }
            }

            if ($uid_str) {
                $uid_str = " AND uid in ( " . $uid_str . " )";
            }

            $sql_str_3 = " select t2.type_name,t1.numberData1 as type,count(distinct(t1.uid)) as cnt,
                            '$platform_name' as platform_name,$server_name as server_name
                            from IODWebGameLog.TLog t1
                            LEFT JOIN laravel.report_point t2
                            ON t1.serverid=2 and t1.LogType=15 
                            WHERE t1.numberData1=t2.type_id
                            $uid_str
                            GROUP BY t2.type_name,t2.order_by,t1.numberData1
                            ORDER BY t2.order_by ";

            $arr_lost_info = DB::connection('log_db')->select( $sql_str_3 );
        }

        $this->data = ['points'=>$arr_lost_info];
        return $this->returnJson();
    }

    /**
     * 查询单服报表
     */
    public function queryServerReport()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $result = [];
        $sql = "select a.*,b.platform_name from tservers a left join tplatforms b on a.platform_id = b.id where server_id = ? ";
        $servers = DB::connection('iod_web_game_db')->select($sql, [$server_id]);


        if ($servers) {
            $server = $servers[0];

            $total_charge_money = 0;
            $charge_diamond = DB::connection('iod_web_game_recharge')->select('SELECT SUM(money) as money FROM trechargedata WHERE server_id=?',[$server_id]);
            if ( $charge_diamond )
            {
                $total_charge_money = sprintf("%.1f", $charge_diamond[0]->money);
            }

            $total_consume_diamond = 0;
            $total_consume = DB::connection('log_db')->select('SELECT SUM(numberData2) as consume FROM TLog WHERE serverid = ? AND LogType = ?',[$server_id,17]);
            if ( $total_consume )
            {
                $total_consume_diamond = $total_consume[0]->consume;
            }

            $consume_array = DB::connection('log_db')->select("select SUM(numberData2) as consume,DATE(LogTime) as dt from TLog WHERE serverid = ? AND LogType = ? and DATE(LogTime) >= ? and DATE(LogTime) <= ?  group by DATE(LogTime)", [$server_id,17, $start_time, $end_time]);

            $daily_charge_array = DB::connection('iod_web_game_recharge')->select("SELECT DATE(time) as dt,SUM(money) as money,count(id) as chargetime,COUNT(DISTINCT(role_id)) as cnt FROM `trechargedata` WHERE server_id=? and DATE(time)>=? AND DATE(time)<=? group by DATE(time)", [$server_id,$start_time, $end_time]);

            $daily_create_count_list = DB::connection('log_db')->select("select DATE(LogTime) as dt,count(DISTINCT(uid)) cnt from TLog where serverid=? and LogType = ? AND numberData1=? and DATE(LogTime) >= ? and DATE(LogTime) <= ? group by DATE(LogTime)", [$server_id,15, 10060, $start_time, $end_time]);

            $daily_login_count = DB::connection('log_db')->select("select DATE(LogTime) as dt,count(DISTINCT(RoleId)) as cnt from TLog where serverid=? and LogType = ? and DATE(LogTime) >= ? and DATE(LogTime) <= ?  group by DATE(LogTime)", [$server_id,2, $start_time, $end_time]);

            foreach($daily_login_count as $daily_login) {
                $info = [];
                $info['platform_name'] = $server->platform_name;
                $info['server_name'] = $server->server_name;
                $info['language'] = $server->lang;
                $info['time'] = $daily_login->dt;
                $info['login_count'] = $daily_login->cnt;

                $daily_conn_count = DB::connection('log_db')->select("select count(distinct(uid)) as cnt from TLog where serverid=? and LogType=? AND DATE(LogTime)=? AND uid NOT IN (SELECT uid FROM TLog WHERE serverid=? and LogType=13 and DATE(LogTime)<? group by uid)",[$server_id,13, $daily_login->dt, $server_id, $daily_login->dt]);
                $daily_connect_count = $daily_conn_count[0]->cnt;
                $info['connection'] = $daily_connect_count;

                $daily_create = 0;
                foreach($daily_create_count_list as $daily_create_count) {
                    if ($daily_create_count->dt == $daily_login->dt) {
                        $daily_create = $daily_create_count->cnt;
                        break;
                    }
                }
                $info['create'] = $daily_create;

                if($daily_connect_count)
                {
                    $info['create_percent'] = sprintf("%.2f", (($daily_create / $daily_connect_count) * 100)) . "%";
                }else{
                    $info['create_percent'] = "0";
                }

                $daily_money = 0;
                $daily_charge_times = 0;
                $daily_charge_player = 0;
                foreach($daily_charge_array as $daily_charge) {
                    if ($daily_charge->dt == $daily_login->dt) {
                        $daily_money = sprintf("%.1f", $daily_charge->money);
                        $daily_charge_times = $daily_charge->chargetime;
                        $daily_charge_player = $daily_charge->cnt;
                        break;
                    }
                }
                $info['recharge_money'] = $total_charge_money .'/'.$daily_money;
                $info['recharge_player_count'] = $daily_charge_player;
                $info['recharge_count'] = $daily_charge_times;
                if ($daily_charge_player)
                {
                    $info['arppu'] = sprintf("%.2f", (($daily_money / $daily_charge_player)));
                }
                else{
                    $info['arppu'] = 0;
                }

                $daily_consume = 0;
                foreach($consume_array as $consume) {
                    if ($consume->dt == $daily_login->dt) {
                        $daily_consume = $consume->consume;
                        break;
                    }
                }
                $info['pay'] = $total_consume_diamond .'/'. $daily_consume;

                $total_online_time = 0;
                $new_activity = 0;
                $daily_new_activity1 = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1) as tm FROM TLog WHERE serverid=? and LogType = 3 AND DATE(LogTime) = ? AND uid  IN (SELECT uid from TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$server_id,$daily_login->dt,$server_id,4,$daily_login->dt]);
                foreach ($daily_new_activity1 as $login)
                {
                    $total_online_time = $total_online_time + $login->tm;
                    // if ( $login->tm >= 300 )
                    // {
                        $new_activity = $new_activity + 1;
                    // }
                }

                $nowtime = time();
                $nowdate = date($nowtime);
                if ($nowdate == $daily_login->dt)
                {
                    $daily_new_activity2 =  DB::connection('log_db')->select("SELECT DISTINCT(uid),LogTime from TLog WHERE serverid=? and LogType = 2 AND DATE(LogTime) = ? AND uid IN (SELECT uid from TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) = ?) AND uid NOT IN (SELECT uid FROM TLog WHERE serverid=? and DATE(LogTime) = ? AND LogType = ?)",[$server_id,$daily_login->dt,$server_id,4,$daily_login->dt,$server_id,$daily_login->dt,3]);
                    foreach ($daily_new_activity2 as $login)
                    {
                        $total_online_time = $total_online_time + ($nowtime - $login->LogTime);
                        // if ($nowtime - $login->LogTime >= 300)
                        // {
                            $new_activity = $new_activity + 1;
                        // }
                    }
                }

                $old_activity = 0;
                $daily_old_activity1 = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1) as tm FROM TLog WHERE serverid=? and LogType = 3 AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$server_id,$daily_login->dt,$server_id,4,$daily_login->dt]);
                foreach ($daily_old_activity1 as $login)
                {
                    $total_online_time = $total_online_time + $login->tm;
                    // if ($login->tm >= 600)
                    // {
                        $old_activity = $old_activity + 1;
                    // }
                }

                if ($nowdate == $daily_login->dt)
                {
                    $daily_old_activity2 =  DB::connection('log_db')->select("SELECT DISTINCT(uid),LogTime from TLog WHERE serverid=? and LogType = 2 AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) = ?) AND uid NOT IN (SELECT uid FROM TLog WHERE serverid=? and DATE(LogTime) = ? AND LogType = ?)",[$server_id,$daily_login->dt,$server_id,4,$daily_login->dt,$server_id,$daily_login->dt,3]);
                    foreach ($daily_old_activity2 as $login)
                    {
                        $total_online_time = $total_online_time + ($nowtime - $login->LogTime);
                        // if ($nowtime - $login->LogTime >= 600)
                        // {
                            $new_activity = $new_activity + 1;
                        // }
                    }
                }

                $info['old_activity'] = $old_activity;

                $info['new_activity'] = $new_activity;
                 // + $old_activity;

                $activity = $new_activity + $old_activity;

                if ($activity > 0)
                {
                    $info['pay_rate'] = sprintf( "%.2f", ( ($daily_charge_player / $activity) * 100 ) ) . "%";
                }
                else{
                    $info['pay_rate'] = sprintf( "%.2f", ( $daily_charge_player * 100 ) ) . "%";
                }

                $daily_online = DB::connection('log_db')->select("SELECT MAX(numberData1) as max_online,AVG(numberData1) as avg_online from TLog WHERE serverid=? and DATE(LogTime) = ? AND LogType = ?",[$server_id,$daily_login->dt,5]);
                $info['online'] = '-';
                if ($daily_online)
                {
                    $info['online'] = $daily_online[0]->max_online . "/" . sprintf("%.2f", $daily_online[0]->avg_online);
                }

                $total_online_min = $total_online_time/60;
                $avg_online_min = $total_online_min / $daily_login->cnt;
                // $info['online_second'] = sprintf("%.2f", ($total_online_min)) . "min" . "/" . sprintf("%.2f", ($avg_online_min)) . "min" ;
                $info['online_second'] = sprintf("%.2f", ($avg_online_min)) . "min" ;

                $max_online = 0;
                $online_num = 0;

                $sql = "select count(distinct(uid)) as cnt from TLog where serverid=? and LogType = ? and LogTime > ? and LogTime < ? and uid in (select uid from TLog where serverid=? and LogType=? AND DATE(LogTime)=? AND uid NOT IN (SELECT uid FROM TLog WHERE serverid=? and LogType=13 and DATE(LogTime)<?) ) group by date(LogTime)";
                $next_day = date('Y-m-d', strtotime('+1 day',strtotime($daily_login->dt)));
                $next_day_login_info = DB::connection('log_db')->select($sql, [$server_id,2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server_id, 2, $daily_login->dt, $server_id, $daily_login->dt]);

                $next_day = date('Y-m-d', strtotime('+6 day',strtotime($daily_login->dt)));
                $seven_day_login_info = DB::connection('log_db')->select($sql, [$server_id,2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server_id, 2, $daily_login->dt, $server_id, $daily_login->dt]);

                $next_day = date('Y-m-d', strtotime('+29 day',strtotime($daily_login->dt)));
                $thirty_day_login_info = DB::connection('log_db')->select($sql, [$server_id,2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server_id, 2, $daily_login->dt, $server_id, $daily_login->dt]);

                $info['next_lose'] = '-';
                foreach($next_day_login_info as $next_day) {
                    if ($daily_create == 0) {
                        $info['next_lose'] = 0;
                    }else{
                        $info['next_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_create) * 100)) . "%";
                    }
                    break;
                }
                $info['seven_lose'] = '-';
                foreach($seven_day_login_info as $next_day) {
                    $info['seven_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_create) * 100)) . "%";
                    //$info['online'] = $next_day->cnt;
                    break;
                }

                $info['thirty_lose'] = '-';
                foreach($thirty_day_login_info as $next_day) {
                    $info['thirty_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_create) * 100)) . "%";
                    break;
                }

                array_push($result, $info);
            }

            // var_dump('=============:'.count($daily_login_count).'===========');

            $this->data = ['reports'=>$result];
        }
        return $this->returnJson();
    }


    /**
     * 查询全服报表
     */
    public function queryAllServerReport()
    {
        $platform_id = request()->input('platform_id');
        $server_id   = request()->input('server_id', 0);
        $start_time  = request()->input('start_time');
        $end_time    = request()->input('end_time');

        // 1）查询出全服报表的全部数据
        $sql_string = " select t1.server_id,t1.server_name,date_format(t1.created_at,'%Y-%m-%d') as created_at,t2.platform_name,
                        0 as con_count,0 as create_user_count,0 as login_user_count,0 as active_user_count,'0/0' as online_user_count,
                        0 as all_charge_money,0 as now_date_charge_money,0 as all_charge_uid_count,0 as now_date_charge_uid_count
                        from tservers t1
                        left join tplatforms t2
                        on t1.platform_id = t2.id  ";

        if ( intval($platform_id) ) {
            $sql_string = $sql_string . " where t1.platform_id=$platform_id ";
        }

        if ( intval($server_id) || $server_id == 0 ) {
            if ( intval($platform_id) ) {
                $sql_string = $sql_string . " and t1.server_id=$server_id ";
            }else{
                $sql_string = $sql_string . " where t1.server_id=$server_id ";
            }
        }

        $servers = DB::connection('iod_web_game_db')->select( $sql_string );


        $server_arr = array();
        // 更改数据结构，key-value
        foreach ($servers as $server_key => $server_value) {
            $server_arr[$server_value->server_id] = $server_value;
        }

        $str_sql = ( intval($server_id) || $server_id == 0 ) ? " and serverid=$server_id " : " ";

        // 2）查询出连接数
        $sql_string_2 = " select serverid,count(distinct(uid)) as con_count 
                            from IODWebGameLog.TLog 
                            where LogType=13 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
                            GROUP BY serverid ";
        $connect_count = DB::connection('log_db')->select( $sql_string_2 );

        foreach ($connect_count as $connect_count_key => $connect_count_value) {
            $server_arr[$connect_count_value->serverid]->con_count = $connect_count_value->con_count;
        }

        // 3）查询出创建用户数量
        $sql_string_3 = " select serverid,count(DISTINCT(uid)) as create_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
                            GROUP BY serverid ";
        $arr_create_user_count = DB::connection('log_db')->select( $sql_string_3 );
        foreach ($arr_create_user_count as $arr_create_user_count_key => $arr_create_user_count_value) {
            $server_arr[$arr_create_user_count_value->serverid]->create_user_count = $arr_create_user_count_value->create_user_count;
        }

        // 4）查询出登录用户数量
        $sql_string_4 = " select serverid,count(DISTINCT(uid)) as login_user_count from IODWebGameLog.TLog 
                            where LogType=13 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
                            GROUP BY serverid ";
        $arr_login_user_count = DB::connection('log_db')->select( $sql_string_4 );
        foreach ($arr_login_user_count as $arr_login_user_count_key => $arr_login_user_count_value) {
            $server_arr[$arr_login_user_count_value->serverid]->login_user_count = $arr_login_user_count_value->login_user_count;
        }

        // 5）查询出活跃用户数量
        // 5.1）查询出新用户活跃数量
        $sql_string_5 = " select uid,serverid,sum(numberData1) as active_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)=curdate() $str_sql
                            GROUP BY serverid,uid ";
        $arr_new_active_user_count = DB::connection('log_db')->select( $sql_string_5 );
        $five_min = 300;  // 60 * 5 = 300s
        $uid_str = '';
        foreach ($arr_new_active_user_count as $arr_new_active_user_count_key => $arr_new_active_user_count_value) {
            if ( $arr_new_active_user_count_value->active_user_count > $five_min) {
                $server_arr[$arr_new_active_user_count_value->serverid]->active_user_count++;

                if ($uid_str) {
                    $uid_str = $uid_str . ",'" . $arr_new_active_user_count_value->uid . "'";
                }else{
                    $uid_str = "'" . $arr_new_active_user_count_value->uid . "'";
                }
            }
        }

        if ($uid_str) {
            $uid_str = ' and uid not in ( ' . $uid_str . ' )';
        }
        // 5.2）查询出老用户活跃数量
        $sql_string_6 = " select serverid,sum(numberData1) as active_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $uid_str $str_sql
                            GROUP BY serverid,uid ";
        $arr_old_active_user_count = DB::connection('log_db')->select( $sql_string_6 );
        $ten_min = 600;  // 60 * 10 = 600s
        foreach ($arr_old_active_user_count as $arr_old_active_user_count_key => $arr_old_active_user_count_value) {
            if ( $arr_old_active_user_count_value->active_user_count > $ten_min) {
                $server_arr[$arr_old_active_user_count_value->serverid]->active_user_count++;
            }
        }

        // 6）查询出在线人数（最高/平均）
        $sql_string_7 = " SELECT serverid,MAX(numberData1) as max_online,AVG(numberData1) as avg_online from IODWebGameLog.TLog 
                            WHERE LogType=5 and DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
                            GROUP BY serverid ";
        $arr_online_user_count = DB::connection('log_db')->select( $sql_string_7 );
        foreach ($arr_online_user_count as $arr_online_user_count_key => $arr_online_user_count_value) {
            $server_arr[$arr_online_user_count_value->serverid]->online_user_count = $arr_online_user_count_value->max_online . '/' . sprintf("%.0f", $arr_online_user_count_value->avg_online);
        }

        $str_sql = ( intval($server_id) || $server_id == 0 ) ? " and server_id=$server_id " : " ";

        // 7）查询出充值金额
        // 7.1)查询出这段时间内充值的金额
        // $sql_string_8 = " select serverid,SUM(numberData1) as all_charge_money from IODWebGameLog.TLog 
        //                     where LogType = 18 and DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
        //                     group by serverid ";
        $sql_string_8 = " SELECT server_id,SUM(money) as all_charge_money FROM `trechargedata` 
                            WHERE DATE(time)>='$start_time' AND DATE(time)<='$end_time' $str_sql
                            group by server_id ";
        $arr_all_charge_count = DB::connection('iod_web_game_recharge')->select( $sql_string_8 );
        foreach ($arr_all_charge_count as $arr_all_charge_count_key => $arr_all_charge_count_value) {
            $server_arr[$arr_all_charge_count_value->server_id]->all_charge_money = $arr_all_charge_count_value->all_charge_money;
        }

        // 7.2)查询出当天充值的金额
        // $sql_string_9 = " select serverid,SUM(numberData1) as now_date_charge_money from IODWebGameLog.TLog 
        //                     where LogType = 18 and DATE(LogTime)=curdate() $str_sql
        //                     group by serverid ";
        $sql_string_9 = " SELECT server_id,SUM(money) as now_date_charge_money FROM `trechargedata` 
                            WHERE DATE(time)=curdate() $str_sql
                            group by server_id ";
        $arr_now_date_charge_count = DB::connection('iod_web_game_recharge')->select( $sql_string_9 );
        foreach ($arr_now_date_charge_count as $arr_now_date_charge_count_key => $arr_now_date_charge_count_value) {
            $server_arr[$arr_now_date_charge_count_value->server_id]->now_date_charge_money = $arr_now_date_charge_count_value->now_date_charge_money;
        }

        // 8）查询出充值人数
        // 8.1)查询出这段时间内充值的人数
        // $sql_string_10 = " select serverid,count(DISTINCT(uid)) as all_charge_uid_count from IODWebGameLog.TLog 
        //                     where LogType = 18 and DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $str_sql
        //                     group by serverid ";
        $sql_string_10 = " SELECT server_id,count(DISTINCT(role_id)) as all_charge_uid_count FROM `trechargedata` 
                            WHERE DATE(time)>='$start_time' AND DATE(time)<='$end_time' $str_sql
                            group by server_id ";
        $arr_all_charge_uid_count = DB::connection('iod_web_game_recharge')->select( $sql_string_10 );
        foreach ($arr_all_charge_uid_count as $arr_all_charge_uid_count_key => $arr_all_charge_uid_count_value) {
            $server_arr[$arr_all_charge_uid_count_value->server_id]->all_charge_uid_count = $arr_all_charge_uid_count_value->all_charge_uid_count;
        }

        // 8.2)查询出当天充值的人数
        // $sql_string_11 = " select serverid,count(DISTINCT(uid)) as now_date_charge_uid_count from IODWebGameLog.TLog 
        //                     where LogType = 18 and DATE(LogTime)=curdate() $str_sql
        //                     group by serverid ";
        $sql_string_11 = " SELECT server_id,count(DISTINCT(role_id)) as now_date_charge_uid_count FROM `trechargedata` 
                            WHERE DATE(time)=curdate() $str_sql
                            group by server_id ";
        $arr_now_date_charge_uid_count = DB::connection('iod_web_game_recharge')->select( $sql_string_11 );
        foreach ($arr_now_date_charge_uid_count as $arr_now_date_charge_uid_count_key => $arr_now_date_charge_uid_count_value) {
            $server_arr[$arr_now_date_charge_uid_count_value->server_id]->now_date_charge_uid_count = $arr_now_date_charge_uid_count_value->now_date_charge_uid_count;
        }

        $index = 0;
        $arr_reports = array();
        foreach ($server_arr as $server_arr_key => $server_arr_value) {

            $server_arr_value->charge_money = $server_arr_value->all_charge_money . '/' . $server_arr_value->now_date_charge_money;
            $server_arr_value->charge_count = $server_arr_value->all_charge_uid_count . '/' . $server_arr_value->now_date_charge_uid_count;

            if ( $server_arr_value->create_user_count == 0 || $server_arr_value->con_count == 0 ) {
                $server_arr_value->create_role_rate = 0;
            }else{
                $server_arr_value->create_role_rate = ( (sprintf( "%.4f", ($server_arr_value->create_user_count/$server_arr_value->con_count) ) ) * 100 ) ."%";
            }

            if ( $server_arr_value->all_charge_money == 0 || $server_arr_value->active_user_count == 0 ) {
                $server_arr_value->arppu = 0;
            }else{
                $server_arr_value->arppu = ( (sprintf( "%.4f", ($server_arr_value->all_charge_money/$server_arr_value->active_user_count) ) ) * 100 ) ."%";
            }
            
            if ( $server_arr_value->now_date_charge_uid_count == 0 || $server_arr_value->active_user_count == 0 ) {
                $server_arr_value->pay_rate = 0;
            }else{
                $server_arr_value->pay_rate = ( (sprintf( "%.4f", ($server_arr_value->now_date_charge_uid_count/$server_arr_value->active_user_count) ) ) * 100 ) ."%";
            }

            $arr_reports[$index]                = $server_arr_value;
            $index++;
        }

        $this->data = ['reports'=>$arr_reports];
        return $this->returnJson();
    }

    /**
     * 查询总报表
     */
    public function queryTotalServerReport()
    {
        $platform_id = request()->input('platform_id');
        $start_time  = request()->input('start_time');
        $end_time    = request()->input('end_time');

        // 1）查询出全服报表的全部数据
        $sql_string = " select count(t1.platform_id) as server_count,t2.platform_name,
                        0 as con_count,0 as create_user_count,0 as login_user_count,0 as active_user_count,'0/0' as online_user_count,
                        0 as all_charge_money,0 as now_date_charge_money,0 as all_charge_uid_count,0 as now_date_charge_uid_count
                        from tservers t1
                        left join tplatforms t2
                        on t1.platform_id = t2.id
                        WHERE t1.platform_id=$platform_id
                        GROUP BY t1.platform_id,t1.created_at,t2.platform_name  ";

        $servers = DB::connection('iod_web_game_db')->select( $sql_string );
        $servers = $servers[0];

        // 2）查询出连接数
        $sql_string_2 = " select count(distinct(uid)) as con_count 
                            from IODWebGameLog.TLog 
                            where LogType=13 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' ";
        $connect_count = DB::connection('log_db')->select( $sql_string_2 );

        foreach ($connect_count as $connect_count_key => $connect_count_value) {
            $servers->con_count = $connect_count_value->con_count;
        }

        // 3）查询出创建用户数量
        $sql_string_3 = " select count(DISTINCT(uid)) as create_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' ";
        $arr_create_user_count = DB::connection('log_db')->select( $sql_string_3 );
        foreach ($arr_create_user_count as $arr_create_user_count_key => $arr_create_user_count_value) {
            $servers->create_user_count = $arr_create_user_count_value->create_user_count;
        }

        // 4）查询出登录用户数量
        $sql_string_4 = " select count(DISTINCT(uid)) as login_user_count from IODWebGameLog.TLog 
                            where LogType=13 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' ";
        $arr_login_user_count = DB::connection('log_db')->select( $sql_string_4 );
        foreach ($arr_login_user_count as $arr_login_user_count_key => $arr_login_user_count_value) {
            $servers->login_user_count = $arr_login_user_count_value->login_user_count;
        }

        // 5）查询出活跃用户数量
        // 5.1）查询出新用户活跃数量
        $sql_string_5 = " select uid,sum(numberData1) as active_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)=curdate() 
                            GROUP BY uid ";
        $arr_new_active_user_count = DB::connection('log_db')->select( $sql_string_5 );
        $five_min = 300;  // 60 * 5 = 300s
        $uid_str = '';
        foreach ($arr_new_active_user_count as $arr_new_active_user_count_key => $arr_new_active_user_count_value) {
            if ( $arr_new_active_user_count_value->active_user_count > $five_min) {
                $servers->active_user_count++;

                if ($uid_str) {
                    $uid_str = $uid_str . ",'" . $arr_new_active_user_count_value->uid . "'";
                }else{
                    $uid_str = "'" . $arr_new_active_user_count_value->uid . "'";
                }
            }
        }

        if ($uid_str) {
            $uid_str = ' and uid not in ( ' . $uid_str . ' )';
        }
        // 5.2）查询出老用户活跃数量
        $sql_string_6 = " select sum(numberData1) as active_user_count from IODWebGameLog.TLog 
                            where LogType=3 AND DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' $uid_str 
                            GROUP BY uid ";
        $arr_old_active_user_count = DB::connection('log_db')->select( $sql_string_6 );
        $ten_min = 600;  // 60 * 10 = 600s
        foreach ($arr_old_active_user_count as $arr_old_active_user_count_key => $arr_old_active_user_count_value) {
            if ( $arr_old_active_user_count_value->active_user_count > $ten_min) {
                $servers->active_user_count++;
            }
        }

        // 6）查询出在线人数（最高/平均）
        $sql_string_7 = " SELECT MAX(numberData1) as max_online,AVG(numberData1) as avg_online from IODWebGameLog.TLog 
                            WHERE LogType=5 and DATE(LogTime)>='$start_time' AND DATE(LogTime)<='$end_time' ";
        $arr_online_user_count = DB::connection('log_db')->select( $sql_string_7 );
        foreach ($arr_online_user_count as $arr_online_user_count_key => $arr_online_user_count_value) {
            $servers->online_user_count = $arr_online_user_count_value->max_online . '/' . sprintf("%.0f", $arr_online_user_count_value->avg_online);
        }

        // 7）查询出充值金额
        // 7.1)查询出这段时间内充值的金额
        $sql_string_8 = " SELECT SUM(money) as all_charge_money FROM `trechargedata` 
                            WHERE DATE(time)>='$start_time' AND DATE(time)<='$end_time' ";
        $arr_all_charge_count = DB::connection('iod_web_game_recharge')->select( $sql_string_8 );
        foreach ($arr_all_charge_count as $arr_all_charge_count_key => $arr_all_charge_count_value) {
            $servers->all_charge_money = $arr_all_charge_count_value->all_charge_money ? $arr_all_charge_count_value->all_charge_money : 0;
        }

        // 7.2)查询出当天充值的金额
        $sql_string_9 = " SELECT SUM(money) as now_date_charge_money FROM `trechargedata` 
                            WHERE DATE(time)=curdate() ";
        $arr_now_date_charge_count = DB::connection('iod_web_game_recharge')->select( $sql_string_9 );
        foreach ($arr_now_date_charge_count as $arr_now_date_charge_count_key => $arr_now_date_charge_count_value) {
            $servers->now_date_charge_money = $arr_now_date_charge_count_value->now_date_charge_money ? $arr_now_date_charge_count_value->now_date_charge_money : 0;
        }

        // 8）查询出充值人数
        // 8.1)查询出这段时间内充值的人数
        $sql_string_10 = " SELECT count(DISTINCT(role_id)) as all_charge_uid_count FROM `trechargedata` 
                            WHERE DATE(time)>='$start_time' AND DATE(time)<='$end_time' ";
        $arr_all_charge_uid_count = DB::connection('iod_web_game_recharge')->select( $sql_string_10 );
        foreach ($arr_all_charge_uid_count as $arr_all_charge_uid_count_key => $arr_all_charge_uid_count_value) {
            $servers->all_charge_uid_count = $arr_all_charge_uid_count_value->all_charge_uid_count;
        }

        // 8.2)查询出当天充值的人数
        $sql_string_11 = " SELECT count(DISTINCT(role_id)) as now_date_charge_uid_count FROM `trechargedata` 
                            WHERE DATE(time)=curdate() ";
        $arr_now_date_charge_uid_count = DB::connection('iod_web_game_recharge')->select( $sql_string_11 );
        foreach ($arr_now_date_charge_uid_count as $arr_now_date_charge_uid_count_key => $arr_now_date_charge_uid_count_value) {
            $servers->now_date_charge_uid_count = $arr_now_date_charge_uid_count_value->now_date_charge_uid_count;
        }

        $servers->charge_money = sprintf("%.1f", $servers->all_charge_money) . '/' . sprintf("%.1f", $servers->now_date_charge_money);
        $servers->charge_count = $servers->all_charge_uid_count . '/' . $servers->now_date_charge_uid_count;

        if ( $servers->create_user_count == 0 || $servers->con_count == 0 ) {
            $servers->create_role_rate = 0;
        }else{
            $servers->create_role_rate = ( (sprintf( "%.4f", ($servers->create_user_count/$servers->con_count) ) ) * 100 ) ."%";
        }

        if ( $servers->all_charge_money == 0 || $servers->active_user_count == 0 ) {
            $servers->arppu = 0;
        }else{
            $servers->arppu = ( (sprintf( "%.4f", ($servers->all_charge_money/$servers->active_user_count) ) ) * 100 ) ."%";
        }
        
        if ( $servers->now_date_charge_uid_count == 0 || $servers->active_user_count == 0 ) {
            $servers->pay_rate = 0;
        }else{
            $servers->pay_rate = ( (sprintf( "%.4f", ($servers->now_date_charge_uid_count/$servers->active_user_count) ) ) * 100 ) ."%";
        }

        $arr_reports[] = $servers;

        $this->data = ['reports'=>$arr_reports];
        return $this->returnJson();
    }


    public function queryDistribute()
    {
        $server_id = request()->input('server_id', '0');
        $query_type = request()->input('query_type', '0');

        $result = [];
        if ($query_type == 1) {
            $sql = "select a.*,b.platform_name from tservers a left join tplatforms b on a.platform_id = b.id where server_id = ? ";
            $servers = DB::connection('iod_web_game_db')->select($sql, [$server_id]);

            if ($servers) {

                $server = $servers[0];

                $sql = " select level,count(role_id) as cnt from tactroleinfo WHERE server_id=$server_id GROUP BY level ";
                $level_count = DB::connection('iod_web_game_db')->select($sql);

                $total = 0;

                foreach($level_count as $level) {
                    $total += $level->cnt;

                    $info['platform_name'] = $server->platform_name;
                    $info['server_id'] = $server->server_id;
                    $info['server_name'] = $server->server_name;
                    $info['lev'] = $level->level;
                    $info['cnt'] = $level->cnt;
                    $info['diff'] = '';
                    array_push($result, $info);

                }
                $this->data = ['distributeds'=>$result, 'query_type'=>1];
            }
        }

        return $this->returnJson();
    }

    /**
     * 实时新增
     */
    public function queryNewReport()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $sum_create = 0;
        $sum_connection = 0;
        $result = [];
        $sql = "select a.*,b.platform_name from tservers a left join tplatforms b on a.platform_id = b.id where server_id = ? ";
        $servers = DB::connection('iod_web_game_db')->select($sql, [$server_id]);
        if ($servers) {
            $server = $servers[0];

            $new_create = DB::connection('log_db')->select('SELECT COUNT(DISTINCT(uid)) AS create_count,DATE(LogTime) AS dt,HOUR(LogTime) AS hr FROM TLog WHERE LogType = ? AND DATE(LogTime) >= ? AND DATE(LogTime) <= ? AND serverid=? GROUP BY DATE(LogTime),HOUR(LogTime)',[4,$start_time,$end_time,$server_id]);
            foreach ($new_create as $daily_create)
            {
                $info = [];
                $info['platform_name'] = $server->platform_name;
                $info['server_name'] = $server->server_name;
                $info['time'] = $daily_create->dt . "   " . $daily_create->hr . "点";
                $info['create'] = $daily_create->create_count;
                $sum_create = $sum_create + $daily_create->create_count;

                $daily_login = DB::connection('log_db')->select('SELECT COUNT(DISTINCT(uid)) as dnt FROM TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) = ? AND HOUR(LogTime) = ? AND uid NOT IN (SELECT uid FROM TLog WHERE LogType=? AND serverid=? and LogTime < ?)',[$server_id,13,$daily_create->dt,$daily_create->hr,13,$server_id,$daily_create->dt. ' ' . $daily_create->hr. ':00:00']);
                $info['connection'] = '-';
                if ($daily_login)
                {
                    $info['connection'] = $daily_login[0]->dnt;
                    $sum_connection = $sum_connection + $daily_login[0]->dnt;
                }

                array_push($result, $info);
            }

            $info2 = [];
            $info2['platform_name'] = "总计";
            $info2['create'] = $sum_create;
            $info2['connection'] = $sum_connection;
            array_push($result, $info2);

            $this->data = ['reports'=>$result];
        }

        return $this->returnJson();
    }

    /**
     * 查询留存报表
     */
    public function queryPreserveReport()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $result = [];
        $sql = "select a.*,b.platform_name from tservers a left join tplatforms b on a.platform_id = b.id where server_id = ? ";
        $servers = DB::connection('iod_web_game_db')->select($sql, [$server_id]);
        if ($servers) {
            $server = $servers[0];

            $new_create = DB::connection('log_db')->select('SELECT COUNT(DISTINCT(uid)) AS create_count,DATE(LogTime) AS dt FROM TLog WHERE LogType = ? AND DATE(LogTime) >= ? AND DATE(LogTime) <= ? AND serverid=? GROUP BY(DATE(LogTime))',[4,$start_time,$end_time, $server->server_id]);
            foreach ($new_create as $daily_create)
            {
                $info = [];
                $info['platform_name'] = $server->platform_name;
                $info['server_name'] = $server->server_name;
                $info['time'] = $daily_create->dt;


                $daily_conn_count = DB::connection('log_db')->select("select count(distinct(uid)) as cnt from TLog where LogType=? AND DATE(LogTime)=? AND serverid=? AND uid NOT IN (SELECT uid FROM TLog WHERE LogType=13 and DATE(LogTime)<? AND serverid=?)",[13, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);
                $daily_connect_count = $daily_conn_count[0]->cnt;

                $info['create'] = $daily_connect_count;

                $sql = "select count(distinct(uid)) as cnt from TLog where LogType = ? and LogTime > ? and LogTime < ? and serverid=? AND uid in (select uid from TLog where LogType=? AND DATE(LogTime)=? AND serverid=? AND uid NOT IN (SELECT uid FROM TLog WHERE LogType=13 and DATE(LogTime)<? AND serverid=?) ) group by date(LogTime)";
                $next_day = date('Y-m-d', strtotime('+1 day',strtotime($daily_create->dt)));
                $next_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+2 day',strtotime($daily_create->dt)));
                $three_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id ]);

                $next_day = date('Y-m-d', strtotime('+3 day',strtotime($daily_create->dt)));
                $four_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+4 day',strtotime($daily_create->dt)));
                $five_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+5 day',strtotime($daily_create->dt)));
                $six_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+6 day',strtotime($daily_create->dt)));
                $seven_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+7 day',strtotime($daily_create->dt)));
                $eight_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+8 day',strtotime($daily_create->dt)));
                $nine_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+9 day',strtotime($daily_create->dt)));
                $ten_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+10 day',strtotime($daily_create->dt)));
                $eleven_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+11 day',strtotime($daily_create->dt)));
                $twelve_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+12 day',strtotime($daily_create->dt)));
                $thirteen_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+13 day',strtotime($daily_create->dt)));
                $fourteen_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+14 day',strtotime($daily_create->dt)));
                $fifteen_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+29 day',strtotime($daily_create->dt)));
                $thirty_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+59 day',strtotime($daily_create->dt)));
                $sixty_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+89 day',strtotime($daily_create->dt)));
                $ninety_day_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+179 day',strtotime($daily_create->dt)));
                $half_year_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                $next_day = date('Y-m-d', strtotime('+364 day',strtotime($daily_create->dt)));
                $year_login_info = DB::connection('log_db')->select($sql, [2, $next_day. ' 00:00:00', $next_day . ' 23:59:59', $server->server_id, 2, $daily_create->dt, $server->server_id, $daily_create->dt, $server->server_id]);

                //使用创角数计算流存
                $daily_connect_count = $daily_create->create_count;

                $info['next_lose'] = '-';
                foreach($next_day_login_info as $next_day) {
                    $info['next_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['three_lose'] = '-';
                foreach($three_day_login_info as $next_day) {
                    $info['three_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['four_lose'] = '-';
                foreach($four_day_login_info as $next_day) {
                    $info['four_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['five_lose'] = '-';
                foreach($five_day_login_info as $next_day) {
                    $info['five_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['six_lose'] = '-';
                foreach($six_day_login_info as $next_day) {
                    $info['six_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['seven_lose'] = '-';
                foreach($seven_day_login_info as $next_day) {
                    $info['seven_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['eight_lose'] = '-';
                foreach($eight_day_login_info as $next_day) {
                    $info['eight_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['nine_lose'] = '-';
                foreach($nine_day_login_info as $next_day) {
                    $info['nine_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['ten_lose'] = '-';
                foreach($ten_day_login_info as $next_day) {
                    $info['ten_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['eleven_lose'] = '-';
                foreach($eleven_day_login_info as $next_day) {
                    $info['eleven_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['twelve_lose'] = '-';
                foreach($twelve_day_login_info as $next_day) {
                    $info['twelve_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['thirteen_lose'] = '-';
                foreach($thirteen_day_login_info as $next_day) {
                    $info['thirteen_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['fourteen_lose'] = '-';
                foreach($fourteen_day_login_info as $next_day) {
                    $info['fourteen_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['fifteen_lose'] = '-';
                foreach($fifteen_day_login_info as $next_day) {
                    $info['fifteen_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['thirty_lose'] = '-';
                foreach($thirty_day_login_info as $next_day) {
                    $info['thirty_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['sixty_lose'] = '-';
                foreach($sixty_day_login_info as $next_day) {
                    $info['sixty_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['ninety_lose'] = '-';
                foreach($ninety_day_login_info as $next_day) {
                    $info['ninety_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['half_year_lose'] = '-';
                foreach($half_year_login_info as $next_day) {
                    $info['half_year_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                $info['year_lose'] = '-';
                foreach($year_login_info as $next_day) {
                    $info['year_lose'] = sprintf("%.2f", (($next_day->cnt / $daily_connect_count) * 100)) . "%";
                    break;
                }

                array_push($result, $info);
            }

            $this->data = ['reports'=>$result];
        }

        return $this->returnJson();
    }

    /**
     * 查询消费点信息
     */
    public function queryConsume()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $result = [];
        $server = Server::where('server_id', $server_id)->first();
        if ($server)
        {
            $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$server->platform_id]);

            $sql = " select numberData1,sum(numberData2) as count,sum(numberData3) as times ";
            $sql .= " from TLog";
            $sql .= " where serverid=? and LogType=? AND DATE(LogTime) >= ? AND DATE(LogTime) <= ?";
            $sql .= " group by numberData1";
            $point_array = DB::connection('log_db')->select($sql, [$server_id,17,$start_time,$end_time]);

            $total_consume = 0;
            $sum = DB::connection('log_db')->select("select sum(numberData2) as totalconsume from TLog WHERE serverid=? and LogType = ? AND DATE(LogTime) >= ? AND DATE(LogTime) <= ?",[$server_id,17,$start_time,$end_time]);
            if ($sum)
            {
                $total_consume = $sum[0]->totalconsume;
            }

            foreach ($point_array as $point)
            {
                if ($point->numberData1 != 0)
                {
                    $info = [];
                    $info['platform_name'] = $platform[0]->platform_name;
                    $info['server_name'] = $server->server_name;
                    $info['type'] = $point->numberData1;
                    $info['cnt'] = $point->count;
                    $info['times'] = $point->times;
                    $info['percent'] = '-';

                    if ( $total_consume > 0 )
                    {
                        $info['percent'] = sprintf("%.2f", (($point->count / $total_consume) * 100)) . "%";
                    }

                    $type_name = DB::connection("mysql")->select("select name from consume_point where type_id = ?",[$point->numberData1]);
                    $info['type_name']='-';
                    if ($type_name) {
                        $info['type_name'] = $type_name[0]->name;

                        array_push($result, $info);
                    }
                }

            }
        }
        $this->data = ['points'=>$result];
        return $this->returnJson();
    }

    /**
     * 实时营收
     */
    public function queryInComeReport()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $result = [];
        $server = Server::where('server_id', $server_id)->first();
        if ($server)
        {
            $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$server->platform_id]);

            $sql = "SELECT DATE(time) AS dt,COUNT(DISTINCT(role_id)) as cnt,sum(money) as charge,COUNT(id) as charge_times FROM trechargedata WHERE server_id = ? AND DATE(time) >= ? AND DATE(time) <= ? GROUP BY DATE(time)";

            $income_array = DB::connection('iod_web_game_recharge')->select($sql, [$server_id,$start_time,$end_time]);

            foreach ($income_array as $income)
            {
                $info = [];
                $info['platform_name'] = $platform[0]->platform_name;
                $info['server_name'] = $server->server_name;
                $info['time'] = $income->dt;
                $info['charge'] = $income->charge;
                $info['charge_people'] = $income->cnt;
                $info['charge_times'] = $income->charge_times;

                array_push($result, $info);
            }
        }

        $this->data = ['reports'=>$result];
        return $this->returnJson();
    }

    /**
     * 订单查询
     */
    public function queryChargeOrder()
    {
        $server_id = request()->input('server_id');
        $start_time = request()->input('start_time');
        $end_time = request()->input('end_time');
        $uid = request()->input('uid');

        $sql = " SELECT pay_id,account,role_id,role_name,server_id,money,game_gold,time,platform_name
                    FROM trechargedata 
                    WHERE DATE(time)>='$start_time' 
                    and DATE(time)<='$end_time' ";

        if ( intval($server_id) ) {
            $sql = $sql . " and server_id=$server_id ";
        }
        if ($uid) {
            $sql = $sql . " and account='$uid' ";
        }

        $result = DB::connection('iod_web_game_recharge')->select($sql, [$server_id,$start_time,$end_time]);

        $this->data = ['reports'=>$result];

        return $this->returnJson();
    }

    /**
     * 付费数据
     */
    public function queryPayData()
    {
        $server_id = request()->input('server_id', '0');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');

        $nowtime = time();
        $nowdate = date('Y-m-d',$nowtime);
        $result = [];
        $server = Server::where('server_id', $server_id)->first();
        if ($server)
        {
            $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$server->platform_id]);

            $date = DB::connection('log_db')->select('SELECT DATE(LogTime) as dt FROM TLog WHERE DATE(LogTime) >= ? AND DATE(LogTime) <= ? GROUP BY DATE(LogTime)',[$start_time,$end_time]);

// var_dump($date);
// exit;
            foreach ($date as $create)
            {
                if ( $create->dt == $nowdate)
                {
                    $info = [];
                    $info['platform_name'] = $platform[0]->platform_name;
                    $info['server_name'] = $server->server_name;
                    $info['time'] = $create->dt;

                    array_push($result, $info);
                }
                else
                {
                    $next_day = date('Y-m-d', strtotime('-1 day',strtotime($create->dt)));
                    $info = [];
                    $info['platform_name'] = $platform[0]->platform_name;
                    $info['server_name'] = $server->server_name;
                    $info['time'] = $create->dt;

                    $info['create'] = '-';
                    $info['old_login'] = '-';
                    $info['active'] = '-';
                    $info['active_user'] = '-';
                    $info['pay_value'] = '-';
                    $info['active_pay'] = '-';
                    $info['active_pay_percent'] = '-';
                    $info['active_arppu'] = '-';
                    $info['active_arpu'] = '-';

                    $sql = 'SELECT COUNT(DISTINCT(uid)) AS create_count,DATE(LogTime) AS dt FROM TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? GROUP BY DATE(LogTime)';

                    $create_array = DB::connection('log_db')->select($sql,[$server_id,4,$start_time]);

                    if ($create_array)
                    {
                        $info['create'] = $create_array[0]->create_count;
                    }

                    $sql = 'select COUNT(DISTINCT(uid)) as conn from TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) < ?)';
                    $daily_conn = DB::connection('log_db')->select($sql,[$server_id,13,$create->dt,$server_id,13,$create->dt]);
                    if ($daily_conn)
                    {
                        $info['connect'] = $daily_conn[0]->conn;
                    }

                    $new_activity = 0;
                    $daily_new_activity = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1) as tm FROM TLog WHERE serverid = ? AND LogType = 3 AND DATE(LogTime) = ? AND uid  IN (SELECT uid from TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$server_id,$create->dt,$server_id,4,$create->dt]);
                    foreach ($daily_new_activity as $login)
                    {
                        if ( $login->tm >= 300 )
                        {
                            $new_activity = $new_activity + 1;
                        }
                    }

                    $old_activity = 0;
                    $old_login = 0;
                    $daily_old_activity = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1) as tm FROM TLog WHERE serverid = ? AND LogType = 3 AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$server_id,$create->dt,$server_id,4,$create->dt]);
                    foreach ($daily_old_activity as $login)
                    {
                        if ($login->tm >= 600)
                        {
                            $old_activity = $old_activity + 1;
                        }

                        $old_login = $old_login + 1;
                    }

                    $info['old_login'] = $old_login;

                    $info['active'] = $new_activity + $old_activity;

                    $info['active_user'] = $new_activity . "/" . $old_activity;

                    $pay = DB::connection('iod_web_game_recharge')->select("SELECT SUM(money) as value FROM trechargedata WHERE server_id = ? AND DATE(time) = ?",[$server_id,$create->dt]);



                    // $new_pay = DB::connection('iod_web_game_recharge')->select("SELECT SUM(numberData1) as value FROM TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? AND uid not IN ( select uid FROM TLog WHERE serverid = ? AND DATE(LogTime) < ? )",[$server_id,18,$create->dt,$server_id,$create->dt]);
                    // modify by qmsheng createtime:2017-08-03 17:52
                    $uid_str = "";
                    $arr_log_info = DB::connection('log_db')->select("select uid FROM TLog WHERE serverid = ? AND DATE(LogTime) < ?",[$server_id,$create->dt]);

                    foreach ($arr_log_info as $arr_log_info_key => $arr_log_info_value) {
                        if ($uid_str) {
                            $uid_str = $uid_str . ',' . $arr_log_info_value->uid;
                        }else{
                            $uid_str = $arr_log_info_value->uid;
                        }
                    }

                    // $sql = " SELECT SUM(money) as value FROM trechargedata WHERE server_id = '$server_id' AND DATE(time) = '$create->dt' AND account not IN ( ? ) ";
                    $new_pay = DB::connection('iod_web_game_recharge')->select("SELECT SUM(money) as value FROM trechargedata WHERE server_id = ? AND DATE(time) = ? AND account not IN ( ? )",[$server_id,$create->dt,$uid_str]);

                    if ($pay && $new_pay)
                    {
                        $new_value = $new_pay[0]->value;
                        $old_value = $pay[0]->value - $new_value;
                        $info['pay_value'] = $new_value . "/" . $old_value;
                    }
                    else{
                        $info['pay_value'] = '-';
                    }

                    // $pay_active = DB::connection('log_db')->select("SELECT COUNT(DISTINCT(uid)) AS cnt FROM TLog WHERE server_id = ? AND LogType = ? AND DATE(LogTime) = ?",[$server_id,18,$create->dt]);
                    $pay_active = DB::connection('iod_web_game_recharge')->select("SELECT COUNT(DISTINCT(role_id)) AS cnt FROM trechargedata WHERE server_id = ? AND DATE(time) = ?",[$server_id,$create->dt]);

                    // $pay_active_new = DB::connection('log_db')->select("SELECT COUNT(DISTINCT(uid)) AS cnt FROM TLog WHERE serverid = ? AND LogType = ? AND DATE(LogTime) = ? AND uid NOT IN ( select uid FROM TLog WHERE serverid = ? AND DATE(LogTime) < ? )",[$server_id,18,$create->dt,$server_id,$create->dt]);
                    $pay_active_new = DB::connection('iod_web_game_recharge')->select("SELECT COUNT(DISTINCT(role_id)) AS cnt FROM trechargedata WHERE server_id = ? AND DATE(time) = ? AND account NOT IN ( ? )",[$server_id,$create->dt,$uid_str]);

                    if ($pay_active && $pay_active_new)
                    {
                        $new_count = $pay_active_new[0]->cnt;
                        $old_count = $pay_active[0]->cnt - $new_count;
                        $info['active_pay'] = $new_count . "/" . $old_count;

                        if ($new_count != 0 && $new_activity != 0)
                        {
                            $new_percent = sprintf("%.2f", (($new_count / $new_activity) * 100)) . "%";
                        }
                        else{
                            $new_percent = 0;
                        }

                        if ($old_count != 0 && $old_activity != 0) {
                            $old_percent = sprintf("%.2f", (($old_count / $old_activity) * 100)) . "%";
                        }
                        else{
                            $old_percent = 0;
                        }

                        $info['active_pay_percent'] = $new_percent . "/" . $old_percent;

                        if ($new_value != 0 && $new_count != 0) {
                            $new_arppu = sprintf("%.2f", (($new_value / $new_count)));
                        }
                        else{
                            $new_arppu = 0;
                        }

                        if ($old_value != 0 && $old_count != 0) {
                            $old_arppu = sprintf("%.2f", (($old_value / $old_count)));
                        }
                        else{
                            $old_arppu = 0;
                        }

                        $info['active_arppu'] = $new_arppu . "/" . $old_arppu;

                        if ($new_value != 0 && $new_activity != 0) {
                            $new_arpu = sprintf("%.2f", (($new_value / $new_activity) ));
                        }
                        else{
                            $new_arpu = 0;
                        }

                        if ($old_value != 0 && $old_activity != 0) {
                            $old_arpu = sprintf("%.2f", (($old_value / $old_activity) ));
                        }
                        else{
                            $old_arpu = 0;
                        }

                        $info['active_arpu'] = $new_arpu . "/" . $old_arpu;
                    }

                    array_push($result, $info);
                }

            }
        }

        $this->data = ['reports'=>$result];
        return $this->returnJson();
    }

    public function queryDiamondSpread()
    {
        $server_id = request()->input('server_id', '0');

        $result = [];
        $server = Server::where('server_id', $server_id)->first();
        if ($server)
        {
            $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$server->platform_id]);

            $nowtime = time();
            $nowdate = date('Y-m-d',$nowtime);

            $active_diamond = 0;
            $active_gold = 0;

            $info = [];
            $info['platform_name'] = $platform[0]->platform_name;
            $info['server_name'] = $server->server_name;
            $info['date'] = $nowdate;

            $user_count = DB::connection('iod_web_game_db')->select('select count(role_id) as cnt from tactroleinfo WHERE server_id = ?',[$server_id]);

            $new_activity = 0;
            $daily_new_activity1 = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1) as tm, AVG(RoleId) FROM TLog WHERE LogType = 3 AND DATE(LogTime) = ? AND uid  IN (SELECT uid from TLog WHERE LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$nowdate,4,$nowdate]);
            foreach ($daily_new_activity1 as $login)
            {
                if ( $login->tm >= 300 )
                {
                    $new_activity = $new_activity + 1;

                    $diamond = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519041,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_diamond = $active_diamond + $diamond[0]->cnt;
                    }

                    $gold = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519042,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_gold = $active_gold + $gold[0]->cnt;
                    }
                }
            }

            $daily_new_activity2 =  DB::connection('log_db')->select("SELECT DISTINCT(uid),LogTime, RoleId from TLog WHERE LogType = 2 AND DATE(LogTime) = ? AND uid IN (SELECT uid from TLog WHERE  LogType = ? AND DATE(LogTime) = ?) AND uid NOT IN (SELECT uid FROM TLog WHERE DATE(LogTime) = ? AND LogType = ?)",[$nowdate,4,$nowdate,$nowdate,3]);
            foreach ($daily_new_activity2 as $login)
            {
                if ($nowtime - $login->LogTime >= 300)
                {
                    $new_activity = $new_activity + 1;

                    $diamond = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519041,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_diamond = $active_diamond + $diamond[0]->cnt;
                    }

                    $gold = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519042,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_gold = $active_gold + $gold[0]->cnt;
                    }
                }
            }

            $old_activity = 0;
            $daily_old_activity1 = DB::connection('log_db')->select("SELECT DISTINCT(uid),SUM(numberData1), AVG(RoleId) as tm FROM TLog WHERE LogType = 3 AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE LogType = ? AND DATE(LogTime) = ? ) GROUP BY uid",[$nowdate,4,$nowdate]);
            foreach ($daily_old_activity1 as $login)
            {
                if ($login->tm >= 600)
                {
                    $old_activity = $old_activity + 1;

                    $diamond = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519041,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_diamond = $active_diamond + $diamond[0]->cnt;
                    }

                    $gold = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519042,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_gold = $active_gold + $gold[0]->cnt;
                    }
                }
            }

            $daily_old_activity2 =  DB::connection('log_db')->select("SELECT DISTINCT(uid),LogTime, RoleId from TLog WHERE LogType = 2 AND DATE(LogTime) = ? AND uid NOT IN (SELECT uid from TLog WHERE  LogType = ? AND DATE(LogTime) = ?) AND uid NOT IN (SELECT uid FROM TLog WHERE DATE(LogTime) = ? AND LogType = ?)",[$nowdate,4,$nowdate,$nowdate,3]);
            foreach ($daily_old_activity2 as $login)
            {
                if ($nowtime - $login->LogTime >= 600)
                {
                    $new_activity = $new_activity + 1;

                    $diamond = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519041,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_diamond = $active_diamond + $diamond[0]->cnt;
                    }

                    $gold = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id = ?',[1090519042,$login->RoleId]);
                    if ($diamond)
                    {
                        $active_gold = $active_gold + $gold[0]->cnt;
                    }
                }
            }

            $info['user_count'] = $user_count[0]->cnt;

            $info['active'] = $new_activity + $old_activity;

            $diamond_all = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id IN (SELECT role_id FROM tactroleinfo WHERE server_id = ?)',[1090519041,$server_id]);
            $gold_all = DB::connection('iod_web_game_db')->select('SELECT SUM(number) as cnt FROM tproplist WHERE prop_id = ? AND role_id IN (SELECT role_id FROM tactroleinfo WHERE server_id = ?)',[1090519042,$server_id]);


            $info['diamond'] = $diamond_all[0]->cnt . "/" .$active_diamond;
            $info['gold'] = $gold_all[0]->cnt . "/" .$active_gold;

            array_push($result, $info);
        }

        $this->data = ['reports'=>$result];
        return $this->returnJson();
    }

    public function queryCdKey()
    {
        $cdkey = request()->input('cdkey','');
        $user = request()->input('user','');

        $result = [];

        if ($cdkey)
        {
            $sql = DB::connection('mysql')->select("SELECT * FROM cdkey WHERE cdkey = ?",[$cdkey]);
        }
        else if($user)
        {
            $sql = DB::connection('mysql')->select("SELECT * FROM cdkey WHERE user = ?",[$user]);
        }

        foreach ($sql as $key)
        {
            $info = [];
            $info['cdKey'] = $key->cdkey;
            $info['use_time'] = $key->use_time;
            if ($key->platform_id == 0)
            {
                $info['platform'] = '全平台';
            }
            else{
                $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$key->platform_id]);
                $info['platform'] = $platform[0]->name;
            }

            $info['chestId'] = $key->chestId;
            $info['batch'] = $key->batch;
            $info['start_time'] = $key->start_time;
            $info['end_time'] = $key->end_time;
            $info['user'] = $key->user;

        }

        $this->data = ['reports'=>$result];
        return $this->returnJson();
    }
}
