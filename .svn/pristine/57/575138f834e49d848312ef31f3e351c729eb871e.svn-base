<?php

namespace App\Http\Controllers\Admin;

use anlutro\cURL\Laravel\cURL;
use App\Http\Controllers\Controller;
use App\Models\Game\FreezeInfo;
use App\Models\Game\RoleInfo;
use App\Models\Notice;
use App\Models\Server;
use App\Models\Platform;
use Maatwebsite\Excel\Facades\Excel;

use DB;

class MGameController extends Controller
{
    /**
     * 查询发邮件
     */
    public function query()
    {
        $platforms = Platform::all();
        $servers = Server::all();
        $this->data = ['servers'=>$servers, 'platforms'=>$platforms];
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
     * 获取玩家角色名字符串
     */
    private function get_role_name_string( $role_name )
    {
        $role_name = trim($role_name);
        $role_name = str_replace(";", ",", $role_name);
        $role_name = str_replace(".", ",", $role_name);
        $role_name = str_replace("/", ",", $role_name);
        $role_name = str_replace("'", ",", $role_name);
        $role_name = str_replace("，", ",", $role_name);
        $arr_name = explode(',',$role_name);

        $str_name = '';
        foreach ($arr_name as $arr_name_key => $arr_name_value) {
            if ($str_name) {
                $str_name = $str_name . ",'" . $arr_name_value . "'";
            }else{
                $str_name = "'" . $arr_name_value . "'";
            }
        }

        return $str_name;
    }

    /**
     * 玩家补偿
     */
    public function sendMail()
    {
        $platform_id = request()->input('platform_id', '');
        $server_id = request()->input('server_id', '');
        $role_name = request()->input('role_name', '');
        $title = request()->input('title', '');
        $content = request()->input('content', '');
        $items = request()->input('items', '');
        $title = str_replace(' ', '&nbsp;', $title);
        $content = str_replace(' ', '&nbsp;', $content);


        $servers = [];
        if ($platform_id == 0) {
            $servers = Server::all();
        } else {
            if ($server_id == 0) {
                $servers = Server::where('platform_id', $platform_id)->get();
            } else {
                $servers = Server::where('server_id', $server_id)->get();
            }
        }

        $index = 1;
        $one_second = 1;
        $gm_server = $this->queryGMSvr() ? $this->queryGMSvr() : '';

        $statistic = ['count'=>0, 'failed'=>0, 'success'=>0];
        if ($gm_server) {
            foreach($servers as $server) {

                $role_info = [];
                if ($role_name == '') {
                    $role_info = DB::connection('iod_web_game_db')->select(" select a.role_id,a.name from tactroleinfo a LEFT JOIN taccount b ON a.account_id=b.account_Id WHERE a.server_id=$server_id ");
                } else {
                    $str_name = $this->get_role_name_string( $role_name );

                    $sql_str = " select role_id,name from tactroleinfo WHERE name in ($str_name) ";

                    $role_info = DB::connection('iod_web_game_db')->select( $sql_str );
                }

                if (!$role_info) {
                    $statistic['count'] = 0;
                } else {
                    $statistic['count'] = count($role_info);
                    foreach($role_info as $role) {
                        // modify by qiumaosheng 20170714
                        // $url = 'http://'.$server->server_ip.':'.$server->http_port.'/mail';
                        if ( $index % 20 == 0 ) {
                            sleep($one_second);
                        }
                        $index++;

                        $url  = $gm_server.'/mail';
                        $url .= '?role_id='.urlencode($role->role_id);
                        $url .= '&role_name='.urlencode($role->name);
                        $url .= '&title='.urlencode($title);
                        $url .= '&content='.urlencode($content);
                        $url .= '&items='.urlencode($items);
                        $url .= '&server_id='.$server_id;
                        
                        $statistic['test'] = $url;
                        try {
                            cURL::get($url);
                        } catch(\Exception $e) {
                            $statistic['failed'] =  $statistic['failed'] + 1;
                            continue;
                        }
                        $statistic['success'] =  $statistic['success'] + 1;
                        // usleep(1000); //单位，微妙
                    }
                }
            }
        }
        
        $this->data = $statistic;

        return $this->returnJson();
    }


    /**
     * 查询玩家补偿
     */
    public function querySendMail()
    {
        $sql_str = " SELECT * FROM tgiftmailinfo WHERE 1 ORDER BY mail_id desc LIMIT 20 ";
        
        $arr_res_query_info = DB::connection('iod_web_game_db')->select( $sql_str );

        $this->data = ['mail_info'=>$arr_res_query_info];

        return $this->returnJson();
    }

    /**
     * 更新数据
     */
    public function testFunc()
    {
        $sql_str = " SELECT id,order_by FROM `report_point` ";
        
        $arr_info = DB::connection('mysql')->select( $sql_str );

        $order_by = 0;
        foreach ($arr_info as $arr_info_key => $arr_info_value) {

            $sql_str_2 = " UPDATE report_point SET order_by=$order_by WHERE id=$arr_info_value->id ";
        
            $arr_info_2 = DB::connection('mysql')->select( $sql_str_2 );

            $order_by = $order_by + 10;
        }
    }

    /**
     * 发公告
     */
    public function sendNotice()
    {
        $server_id = request()->input('server_id', '');
        $content = request()->input('content', '');
        $content = str_replace(' ', '&nbsp;', $content);
        $start_time = request()->input('start_time','');
        $end_time = request()->input('end_time','');

        $servers = [];
        if ($server_id != 0) {
            $servers = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        } else {
            $servers = Server::all();
        }
        if ($servers) {
            foreach($servers as $server) {
                // $url = 'http://'.$server->server_ip.':'.$server->http_port.'/notice';
                // modify by qiumaosheng 20170714
                if ( !$this->queryGMSvr() )
                {
                    break;
                }
                $url = $this->queryGMSvr().'/notice';
                $url .= '?content='.urlencode($content);
                $url .= '&start_time='.$start_time;
                $url .= '&end_time='.$end_time;
                $url .= '&server_id='.$server_id;

                $this->result_id = $url;
                try {
                    cURL::get($url);
                } catch(\Exception $e) {
                    $this->result_id = -1;
                    return $this->returnJson();
                }
            }
        } else {
            $total_conn_count_list = DB::connection('log_db')->select("select count(DISTINCT(uid)) as cnt from TLog where LogType = ?", [13]);
            $this->result_id = -1;
        }

        return $this->returnJson();
    }

    /**
     * 查询已发公告
     */
    public function queryNotice()
    {
        $sql_str_1 = " SELECT t1.*,t3.platform_name
                        FROM
                        (
                        tnotice t1
                        LEFT JOIN tservers t2
                        ON t1.server_id=t2.server_id
                        )
                        LEFT JOIN tplatforms t3
                        ON t3.id=t2.platform_id ";

        $arr_notices = DB::connection('iod_web_game_db')->select( $sql_str_1 );

        $this->data = ['notices'=>$arr_notices];

        return $this->returnJson();
    }

    /**
     * 删除已发公告
     */
    public function delNotice()
    {
        $id = request()->input('id');
        $server_id = request()->input('server_id');

        if ( intval($id) && intval($server_id) ) {

            if ( !$this->queryGMSvr() )
            {
                break;
            }

            $url = $this->queryGMSvr().'/delnotice';
            $url .= '?id='.$id;
            $url .= '&server_id='.$server_id;

            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $this->result_id = -1;
                return $this->returnJson();
            }
        }

        return $this->returnJson();
    }

    /**
     * 玩家帧频信息查询
     */
    public function queryPlayerFrameFrequency()
    {
        $serverid   = request()->input('serverid');
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');
        $page       = request()->input('page');

        // 1）LogType=25，玩家帧频数
        $sql_str_1 = " SELECT platform,serverid,LogTime,uid,strData1,numberData1,
                        '0' as first_login_time,'0' as first_loginont_time,
                        '0' as last_login_time,'0' as last_loginont_time
                        FROM TLog 
                        WHERE LogType=25 
                        AND serverid=$serverid
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time' ";

        // 翻页
        if ( intval($page) && intval($page) > 0 ) {
            $start_page = ($page - 1) * 20; //默认每页20条数据
            $end_page = 20;

            $sql_str_1 = $sql_str_1 . " limit $start_page,$end_page ";
        }else{
            $sql_str_1 = $sql_str_1 . " limit 0,20 ";
        }

        $str_uid = '';
        $arr_player_info = DB::connection('log_db')->select( $sql_str_1 );

        foreach ($arr_player_info as $arr_player_info_key => $arr_player_info_value) {
            if (!$str_uid) {
                $str_uid = "'" . $arr_player_info_value->uid . "'";
            }else{
                $str_uid = $str_uid . ',' . "'" . $arr_player_info_value->uid . "'";
            }
        }

        // 2）LogType=2，玩家登入（最新）
        $sql_str_2 = " SELECT uid,LogTime FROM TLog WHERE LogType=2 AND uid in ($str_uid) ";
        $arr_login_info = DB::connection('log_db')->select( $sql_str_2 );

        $arr_login_data = array();
        $login_count = count($arr_login_info);

        for ($i=$login_count-1; $i >= 0; $i--) { 
            $arr_login_data[$arr_login_info[$i]->uid] = $arr_login_info[$i];
        }

        // 3）LogType=3，玩家登出（最新）
        $sql_str_3 = " SELECT uid,LogTime FROM TLog WHERE LogType=3 AND uid in ($str_uid) ";
        $arr_loginout_info = DB::connection('log_db')->select( $sql_str_3 );

        $arr_loginout_data = array();
        $loginout_count = count($arr_loginout_info);

        for ($i=$loginout_count-1; $i >= 0; $i--) { 
            $arr_loginout_data[$arr_loginout_info[$i]->uid] = $arr_loginout_info[$i];
        }

        // 4）玩家最后登入登出
        $sql_str_4 = " SELECT t1.last_login_time,t1.last_logout_time,t2.account_name
                        FROM tactroleinfo t1
                        LEFT JOIN taccount t2
                        ON t1.account_id=t2.account_Id 
                        WHERE t2.account_name in ($str_uid) ";

        $arr_player_last_info = DB::connection('iod_web_game_db')->select( $sql_str_4 );

        $arr_player_last_data = array();
        foreach ($arr_player_last_info as $arr_player_last_info_key => $arr_player_last_info_value) {
            $arr_player_last_data[$arr_player_last_info_value->account_name] = $arr_player_last_info_value;
        }

        foreach ($arr_player_info as $arr_player_info_key => $arr_player_info_value) {
            if ( !empty($arr_login_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->first_login_time = $arr_login_data[$arr_player_info_value->uid]->LogTime;
            }

            if ( !empty($arr_loginout_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->first_loginont_time = $arr_loginout_data[$arr_player_info_value->uid]->LogTime;
            }

            if ( !empty($arr_player_last_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->last_login_time    = $arr_player_last_data[$arr_player_info_value->uid]->last_login_time;
                $arr_player_info_value->last_loginont_time = $arr_player_last_data[$arr_player_info_value->uid]->last_logout_time;
            }
        }

        $this->data = ['player_info'=>$arr_player_info];

        // $sFileStep1 = __DIR__."/framefrequency.csv";

        // $fp = fopen($sFileStep1, "w");
        // foreach ($arr_player_info as $key => $aRow) {
        //     fwrite($fp, $aRow->platform.','.$aRow->serverid.','.
        //                 $aRow->LogTime.','.$aRow->uid.','.
        //                 $aRow->strData1.','.$aRow->numberData1.','.
        //                 $aRow->first_login_time.','.$aRow->first_loginont_time.','.
        //                 $aRow->last_login_time.','.$aRow->last_loginont_time."\n");
        // }
        // fclose($fp);

        return $this->returnJson();
    }

    /**
     * 玩家帧频信息查询Tmp
     */
    public function queryPlayerFrameFrequencyTmp()
    {
        $serverid   = request()->input('serverid');
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');
        $page       = request()->input('page');

        // 1）LogType=25，玩家帧频数
        $sql_str_1 = " SELECT platform,serverid,LogTime,uid,strData1,numberData1,message,
                        '0' as first_login_time,'0' as first_loginont_time,
                        '0' as last_login_time,'0' as last_loginont_time
                        FROM TLog 
                        WHERE LogType=25 
                        AND serverid=$serverid
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time' ";

        // 翻页
        // if ( intval($page) && intval($page) > 0 ) {
        //     $start_page = ($page - 1) * 20; //默认每页20条数据
        //     $end_page = 20;

        //     $sql_str_1 = $sql_str_1 . " limit $start_page,$end_page ";
        // }else{
        //     $sql_str_1 = $sql_str_1 . " limit 0,20 ";
        // }

        $str_uid = '';
        $arr_player_info = DB::connection('log_db')->select( $sql_str_1 );

        $arr_player_tmp = array();
        foreach ($arr_player_info as $arr_player_info_key => $arr_player_info_value) {
            if (!$str_uid) {
                $str_uid = $arr_player_info_value->uid;
            }else{
                $str_uid = $str_uid . ',' . $arr_player_info_value->uid;
            }

            if ( strpos($arr_player_info_value->message, "-1609498365") ) {
                $arr_player_tmp[$arr_player_info_key] = $arr_player_info_value;
            }
        }

        // 2）LogType=2，玩家登入（最新）
        $sql_str_2 = " SELECT uid,LogTime FROM TLog WHERE LogType=2 AND uid in ($str_uid) ";
        $arr_login_info = DB::connection('log_db')->select( $sql_str_2 );

        $arr_login_data = array();
        $login_count = count($arr_login_info);

        for ($i=$login_count-1; $i >= 0; $i--) { 
            $arr_login_data[$arr_login_info[$i]->uid] = $arr_login_info[$i];
        }

        // 3）LogType=3，玩家登出（最新）
        $sql_str_3 = " SELECT uid,LogTime FROM TLog WHERE LogType=3 AND uid in ($str_uid) ";
        $arr_loginout_info = DB::connection('log_db')->select( $sql_str_3 );

        $arr_loginout_data = array();
        $loginout_count = count($arr_loginout_info);

        for ($i=$loginout_count-1; $i >= 0; $i--) { 
            $arr_loginout_data[$arr_loginout_info[$i]->uid] = $arr_loginout_info[$i];
        }

        // 4）玩家最后登入登出
        $sql_str_4 = " SELECT t1.last_login_time,t1.last_logout_time,t1.level,t2.account_name
                        FROM tactroleinfo t1
                        LEFT JOIN taccount t2
                        ON t1.account_id=t2.account_Id 
                        WHERE t2.account_name in ($str_uid) ";

        $arr_player_last_info = DB::connection('iod_web_game_db')->select( $sql_str_4 );

        $arr_player_last_data = array();
        foreach ($arr_player_last_info as $arr_player_last_info_key => $arr_player_last_info_value) {
            $arr_player_last_data[$arr_player_last_info_value->account_name] = $arr_player_last_info_value;
        }

        $arr_player_uid_info = array();

        foreach ($arr_player_tmp as $arr_player_info_key => $arr_player_info_value) {
            if ( !empty($arr_login_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->first_login_time = $arr_login_data[$arr_player_info_value->uid]->LogTime;
            }

            if ( !empty($arr_loginout_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->first_loginont_time = $arr_loginout_data[$arr_player_info_value->uid]->LogTime;
            }

            if ( !empty($arr_player_last_data[$arr_player_info_value->uid]) ) {
                $arr_player_info_value->last_login_time    = $arr_player_last_data[$arr_player_info_value->uid]->last_login_time;
                $arr_player_info_value->last_loginont_time = $arr_player_last_data[$arr_player_info_value->uid]->last_logout_time;
                $arr_player_info_value->level              = $arr_player_last_data[$arr_player_info_value->uid]->level;
            }

            $arr_player_uid_info[$arr_player_info_value->uid] = $arr_player_info_value;
        }

        $this->data = ['player_info'=>$arr_player_uid_info];

        // $sFileStep1 = __DIR__."/framefrequency.csv";

        // $fp = fopen($sFileStep1, "w");
        // foreach ($arr_player_uid_info as $key => $aRow) {
        //     fwrite($fp, $aRow->platform.','.$aRow->serverid.','.
        //                 $aRow->uid.','.$aRow->strData1.','.
        //                 $aRow->numberData1.','.$aRow->level.','.
        //                 $aRow->LogTime.','.
        //                 $aRow->first_login_time.','.$aRow->first_loginont_time.','.
        //                 $aRow->last_login_time.','.$aRow->last_loginont_time.','.
        //                 $aRow->message."\n");
        // }
        // fclose($fp);

        return $this->returnJson();
    }

    /**
     * 所有玩家帧频信息
     */
    public function queryAllPlayerFrameFrequency()
    {
        $server_id   = request()->input('server_id');
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');

        // 1）LogType=25，玩家帧频数
        $sql_str_1 = " SELECT numberData1
                        FROM TLog
                        WHERE LogType=25
                        AND serverid=$server_id
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time' ";

        $arr_all_player_info = DB::connection('log_db')->select( $sql_str_1 );

        $frame_frequency_1 = 0;
        $frame_frequency_2 = 0;
        $frame_frequency_3 = 0;
        $frame_frequency_4 = 0;
        $frame_frequency_5 = 0;

        foreach ($arr_all_player_info as $arr_all_player_info_key => $arr_all_player_info_value) {
            if ( intval($arr_all_player_info_value->numberData1) >= 0 && intval($arr_all_player_info_value->numberData1) < 15 ) {
                $frame_frequency_1++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 15 && intval($arr_all_player_info_value->numberData1) < 25 ) {
                $frame_frequency_2++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 25 && intval($arr_all_player_info_value->numberData1) < 35 ) {
                $frame_frequency_3++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 35 && intval($arr_all_player_info_value->numberData1) < 50 ) {
                $frame_frequency_4++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 50 ) {
                $frame_frequency_5++;
            }else{

            }
        }

        $all_frame_frequency = $frame_frequency_1 + $frame_frequency_2 + $frame_frequency_3 + $frame_frequency_4 + $frame_frequency_5;
        $frame_frequency_rate_1 = sprintf("%.2f", ( ($frame_frequency_1 / $all_frame_frequency) * 100 ) ) . "%";
        $frame_frequency_rate_2 = sprintf("%.2f", ( ($frame_frequency_2 / $all_frame_frequency) * 100 ) ) . "%";
        $frame_frequency_rate_3 = sprintf("%.2f", ( ($frame_frequency_3 / $all_frame_frequency) * 100 ) ) . "%";
        $frame_frequency_rate_4 = sprintf("%.2f", ( ($frame_frequency_4 / $all_frame_frequency) * 100 ) ) . "%";
        $frame_frequency_rate_5 = sprintf("%.2f", ( ($frame_frequency_5 / $all_frame_frequency) * 100 ) ) . "%";

        // 2）LogType=25，玩家帧频数
        $sql_str_2 = " SELECT sum(numberData1) as sum_numberData1,count(uid) as count_uid
                        FROM TLog 
                        WHERE LogType=25
                        AND serverid=$server_id
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time'
                        GROUP BY uid ";

        $arr_all_uid_info = DB::connection('log_db')->select( $sql_str_2 );

        $frame_frequency_count_average_1 = 0;
        $frame_frequency_count_average_2 = 0;
        $frame_frequency_count_average_3 = 0;
        $frame_frequency_count_average_4 = 0;
        $frame_frequency_count_average_5 = 0;

        foreach ($arr_all_uid_info as $arr_all_uid_info_key => $arr_all_uid_info_value) {
            $average_frame_frequency = round($arr_all_uid_info_value->sum_numberData1 / $arr_all_uid_info_value->count_uid);

            if ( $average_frame_frequency >= 0 && $average_frame_frequency < 15 ) {
                $frame_frequency_count_average_1++;
            }elseif ( $average_frame_frequency >= 15 && $average_frame_frequency < 25 ) {
                $frame_frequency_count_average_2++;
            }elseif ( $average_frame_frequency >= 25 && $average_frame_frequency < 35 ) {
                $frame_frequency_count_average_3++;
            }elseif ( $average_frame_frequency >= 35 && $average_frame_frequency < 50 ) {
                $frame_frequency_count_average_4++;
            }elseif ( $average_frame_frequency >= 50 ) {
                $frame_frequency_count_average_5++;
            }else{

            }
        }

        $all_frame_frequency_count_average = $frame_frequency_count_average_1 + $frame_frequency_count_average_2 + $frame_frequency_count_average_3 + $frame_frequency_count_average_4 + $frame_frequency_count_average_5;
        $frame_frequency_count_average_rate_1 = sprintf("%.2f", ( ($frame_frequency_count_average_1 / $all_frame_frequency_count_average) * 100 ) ) . "%";
        $frame_frequency_count_average_rate_2 = sprintf("%.2f", ( ($frame_frequency_count_average_2 / $all_frame_frequency_count_average) * 100 ) ) . "%";
        $frame_frequency_count_average_rate_3 = sprintf("%.2f", ( ($frame_frequency_count_average_3 / $all_frame_frequency_count_average) * 100 ) ) . "%";
        $frame_frequency_count_average_rate_4 = sprintf("%.2f", ( ($frame_frequency_count_average_4 / $all_frame_frequency_count_average) * 100 ) ) . "%";
        $frame_frequency_count_average_rate_5 = sprintf("%.2f", ( ($frame_frequency_count_average_5 / $all_frame_frequency_count_average) * 100 ) ) . "%";

        $arr_info = array(
            array(
                "frame_frequency_level" => "15帧以下",
                "frame_frequency" => $frame_frequency_1,
                "frame_frequency_rate" => $frame_frequency_rate_1,
                "frame_frequency_count_average" => $frame_frequency_count_average_1,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_1,
            ),
            array(
                "frame_frequency_level" => "15-25帧",
                "frame_frequency" => $frame_frequency_2,
                "frame_frequency_rate" => $frame_frequency_rate_2,
                "frame_frequency_count_average" => $frame_frequency_count_average_2,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_2,
            ),
            array(
                "frame_frequency_level" => "25-35帧",
                "frame_frequency" => $frame_frequency_3,
                "frame_frequency_rate" => $frame_frequency_rate_3,
                "frame_frequency_count_average" => $frame_frequency_count_average_3,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_3,
            ),
            array(
                "frame_frequency_level" => "35-50帧",
                "frame_frequency" => $frame_frequency_4,
                "frame_frequency_rate" => $frame_frequency_rate_4,
                "frame_frequency_count_average" => $frame_frequency_count_average_4,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_4,
            ),
            array(
                "frame_frequency_level" => "50帧以上",
                "frame_frequency" => $frame_frequency_5,
                "frame_frequency_rate" => $frame_frequency_rate_5,
                "frame_frequency_count_average" => $frame_frequency_count_average_5,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_5,
            ),
        );

        $this->data = ['player_info'=>$arr_info];

        return $this->returnJson();
    }

    /**
     * 新玩家帧频信息
     */
    public function queryNewPlayerFrameFrequency()
    {
        $server_id   = request()->input('server_id');
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');

        // 1）LogType=25，玩家帧频数
        //    LogType=13，连接数
        $sql_str_1 = " SELECT numberData1
                        FROM TLog
                        WHERE LogType=25
                        AND serverid=$server_id
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time'
                        AND uid NOT IN (SELECT uid FROM TLog WHERE LogType=13 and DATE(LogTime)<'$start_time' group by uid) ";

        $arr_all_player_info = DB::connection('log_db')->select( $sql_str_1 );

        $frame_frequency_1 = 0;
        $frame_frequency_2 = 0;
        $frame_frequency_3 = 0;
        $frame_frequency_4 = 0;
        $frame_frequency_5 = 0;

        foreach ($arr_all_player_info as $arr_all_player_info_key => $arr_all_player_info_value) {
            if ( intval($arr_all_player_info_value->numberData1) >= 0 && intval($arr_all_player_info_value->numberData1) < 15 ) {
                $frame_frequency_1++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 15 && intval($arr_all_player_info_value->numberData1) < 25 ) {
                $frame_frequency_2++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 25 && intval($arr_all_player_info_value->numberData1) < 35 ) {
                $frame_frequency_3++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 35 && intval($arr_all_player_info_value->numberData1) < 50 ) {
                $frame_frequency_4++;
            }elseif ( intval($arr_all_player_info_value->numberData1) >= 50 ) {
                $frame_frequency_5++;
            }else{

            }
        }

        $all_frame_frequency = $frame_frequency_1 + $frame_frequency_2 + $frame_frequency_3 + $frame_frequency_4 + $frame_frequency_5;
        $frame_frequency_rate_1 = $all_frame_frequency ? sprintf("%.2f", ( ($frame_frequency_1 / $all_frame_frequency) * 100 ) ) . "%" : "0%";
        $frame_frequency_rate_2 = $all_frame_frequency ? sprintf("%.2f", ( ($frame_frequency_2 / $all_frame_frequency) * 100 ) ) . "%" : "0%";
        $frame_frequency_rate_3 = $all_frame_frequency ? sprintf("%.2f", ( ($frame_frequency_3 / $all_frame_frequency) * 100 ) ) . "%" : "0%";
        $frame_frequency_rate_4 = $all_frame_frequency ? sprintf("%.2f", ( ($frame_frequency_4 / $all_frame_frequency) * 100 ) ) . "%" : "0%";
        $frame_frequency_rate_5 = $all_frame_frequency ? sprintf("%.2f", ( ($frame_frequency_5 / $all_frame_frequency) * 100 ) ) . "%" : "0%";

        // 2）LogType=25，玩家帧频数
        //    LogType=13，连接数
        $sql_str_2 = " SELECT sum(numberData1) as sum_numberData1,count(uid) as count_uid
                        FROM TLog 
                        WHERE LogType=25
                        AND serverid=$server_id
                        AND DATE(LogTime)>='$start_time'
                        AND DATE(LogTime)<='$end_time'
                        AND uid NOT IN (SELECT uid FROM TLog WHERE LogType=13 and DATE(LogTime)<'$start_time' group by uid)
                        GROUP BY uid ";

        $arr_all_uid_info = DB::connection('log_db')->select( $sql_str_2 );

        $frame_frequency_count_average_1 = 0;
        $frame_frequency_count_average_2 = 0;
        $frame_frequency_count_average_3 = 0;
        $frame_frequency_count_average_4 = 0;
        $frame_frequency_count_average_5 = 0;

        foreach ($arr_all_uid_info as $arr_all_uid_info_key => $arr_all_uid_info_value) {
            $average_frame_frequency = round($arr_all_uid_info_value->sum_numberData1 / $arr_all_uid_info_value->count_uid);

            if ( $average_frame_frequency >= 0 && $average_frame_frequency < 15 ) {
                $frame_frequency_count_average_1++;
            }elseif ( $average_frame_frequency >= 15 && $average_frame_frequency < 25 ) {
                $frame_frequency_count_average_2++;
            }elseif ( $average_frame_frequency >= 25 && $average_frame_frequency < 35 ) {
                $frame_frequency_count_average_3++;
            }elseif ( $average_frame_frequency >= 35 && $average_frame_frequency < 50 ) {
                $frame_frequency_count_average_4++;
            }elseif ( $average_frame_frequency >= 50 ) {
                $frame_frequency_count_average_5++;
            }else{

            }
        }

        $all_frame_frequency_count_average = $frame_frequency_count_average_1 + $frame_frequency_count_average_2 + $frame_frequency_count_average_3 + $frame_frequency_count_average_4 + $frame_frequency_count_average_5;
        $frame_frequency_count_average_rate_1 = $all_frame_frequency_count_average ? sprintf("%.2f", ( ($frame_frequency_count_average_1 / $all_frame_frequency_count_average) * 100 ) ) . "%" : "0%";
        $frame_frequency_count_average_rate_2 = $all_frame_frequency_count_average ? sprintf("%.2f", ( ($frame_frequency_count_average_2 / $all_frame_frequency_count_average) * 100 ) ) . "%" : "0%";
        $frame_frequency_count_average_rate_3 = $all_frame_frequency_count_average ? sprintf("%.2f", ( ($frame_frequency_count_average_3 / $all_frame_frequency_count_average) * 100 ) ) . "%" : "0%";
        $frame_frequency_count_average_rate_4 = $all_frame_frequency_count_average ? sprintf("%.2f", ( ($frame_frequency_count_average_4 / $all_frame_frequency_count_average) * 100 ) ) . "%" : "0%";
        $frame_frequency_count_average_rate_5 = $all_frame_frequency_count_average ? sprintf("%.2f", ( ($frame_frequency_count_average_5 / $all_frame_frequency_count_average) * 100 ) ) . "%" : "0%";

        $arr_info = array(
            array(
                "frame_frequency_level" => "15帧以下",
                "frame_frequency" => $frame_frequency_1,
                "frame_frequency_rate" => $frame_frequency_rate_1,
                "frame_frequency_count_average" => $frame_frequency_count_average_1,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_1,
            ),
            array(
                "frame_frequency_level" => "15-25帧",
                "frame_frequency" => $frame_frequency_2,
                "frame_frequency_rate" => $frame_frequency_rate_2,
                "frame_frequency_count_average" => $frame_frequency_count_average_2,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_2,
            ),
            array(
                "frame_frequency_level" => "25-35帧",
                "frame_frequency" => $frame_frequency_3,
                "frame_frequency_rate" => $frame_frequency_rate_3,
                "frame_frequency_count_average" => $frame_frequency_count_average_3,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_3,
            ),
            array(
                "frame_frequency_level" => "35-50帧",
                "frame_frequency" => $frame_frequency_4,
                "frame_frequency_rate" => $frame_frequency_rate_4,
                "frame_frequency_count_average" => $frame_frequency_count_average_4,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_4,
            ),
            array(
                "frame_frequency_level" => "50帧以上",
                "frame_frequency" => $frame_frequency_5,
                "frame_frequency_rate" => $frame_frequency_rate_5,
                "frame_frequency_count_average" => $frame_frequency_count_average_5,
                "frame_frequency_count_average_rate" => $frame_frequency_count_average_rate_5,
            ),
        );

        $this->data = ['player_info'=>$arr_info];

        return $this->returnJson();
    }

    /**
     * 开服活动计划
     * init:[{"platform":"7k7k","server_id":"1","activity_id":"1","activity_name":"狂热升级","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"2","activity_name":"珠光宝气","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"3","activity_name":"装备附魔","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"4","activity_name":"恶魔狩猎者","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"5","activity_name":"锡拉史诗","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"6","activity_name":"消费达人","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"},{"platform":"7k7k","server_id":"1","activity_id":"7","activity_name":"巅峰战力","start_time":"2017-08-31 04:00:00","end_time":"2017-09-01 04:00:00"}]
     */
    public function openServerActivityPlan()
    {
        $server_id   = request()->input('server_id');
        $activity_id   = request()->input('activity_id', -1);
        $start_time = request()->input('start_time');
        $end_time   = request()->input('end_time');

        // 1）data_type=10，开服活动计划，存储数据
        $sql_str_1 = " SELECT content FROM tgsdata WHERE data_type=10 and server_id=$server_id";

        $arr_tgsdata_info = DB::connection('iod_web_game_db')->select( $sql_str_1 );

        $json_content = $arr_tgsdata_info[0]->content;

        $arr_content = json_decode($json_content);

        $index = 0;
        if ( $arr_content ) {
            foreach ($arr_content as $arr_content_key => $arr_content_value) {
                if ( $activity_id == $arr_content_value->activity_id && $server_id == $arr_content_value->server_id ) {
                    $arr_content_value->start_time = $start_time;
                    $arr_content_value->end_time   = $end_time;
                    break;
                }
                $index++;
            }
        }

        if ( $index == count($arr_content) ) {
            foreach ($arr_content as $arr_content_key => $arr_content_value) {
                $arr_content_value->start_time = $start_time;
                $arr_content_value->end_time   = $end_time;
            }
        }

        $json_content = json_encode($arr_content);

        // 2）data_type=10，开服活动计划，更新存储数据
        $sql_str_2 = " update tgsdata set content='$json_content' WHERE data_type=10 and server_id=$server_id ";

        $arr_update_data_info = DB::connection('iod_web_game_db')->select( $sql_str_2 );

        $this->data = ['arr_content'=>$arr_content];

        return $this->returnJson();
    }

    /**
     * 查询开服活动计划
     */
    public function queryOpenServerActivityPlan()
    {
        $platforms = Platform::all();

        $sql = " SELECT t2.platform_name,t1.* FROM 
                    tservers t1
                    LEFT JOIN tplatforms t2
                    ON t1.platform_id=t2.id ";
        $servers = DB::connection('iod_web_game_db')->select( $sql );

        // 1）data_type=10，开服活动计划，存储数据
        $sql_str_1 = " SELECT content FROM tgsdata WHERE data_type=10 ";
        $arr_tgsdata_info = DB::connection('iod_web_game_db')->select( $sql_str_1 );
        $json_content = $arr_tgsdata_info[0]->content;
        $arr_content = json_decode($json_content);

        $this->data = ['query'=>$arr_content, 'servers'=>$servers, 'platforms'=>$platforms];

        return $this->returnJson();
    }

    /**
     * 封号
     */
    public function freezeAccount()
    {

    }

    /**
     * 踢人
     */
    public function kickPlayer()
    {
        $server_id = request()->input('server_id', '');
        $role_id = request()->input('role_id', '');
        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            $role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?",[$role_id]);
            $uid = DB::connection('iod_web_game_db')->select("select account_name from taccount where account_Id=?",[$role_info[0]->account_id]);
            if (!$role_info) {
                $this->result_id = -2;
            } else {

                // if ( !$this->queryGMSvr() )
                // {
                //     break;
                // }
                $url = $this->queryGMSvr().'/offline';

                // $url = 'http://'.$server[0]->server_ip.':'.$server[0]->http_port.'/offline';
                $url .= '?uid='.$uid[0]->account_name;
                $url .= '&server_id='.$server_id;

                try {
                    cURL::get($url);
                } catch(\Exception $e) {
                    $this->result_id = -1;
                    $this->data = $e;
                    return $this->returnJson();
                }
            }

        } else {
            $this->result_id = -1;
        }
        return $this->returnJson();
    }

    /**
     * 查询封号
     */
    public function queryFreeze() {
        $server_id = request()->input('server_id', '');
        $role_name = request()->input('role_name', '');
        $role_id = request()->input('role_id', 0);

        $server = Server::where('server_id', $server_id)->first();
        $params = [];
        $freeze_array = [];
        if ($server) {
            $sql = "select ".$server_id." as server_id, a.role_id,a.name,a.last_login_time,a.last_logout_time,b.suspended_start_time, b.suspended_duration, b.gag_start_time, b.gag_duration from tactroleinfo a left join taccount b on a.account_id = b.account_Id ";
            if ($role_id > 0) {
                $sql .= ' where a.role_id = ?';
                $params = [$role_id];
            } else {
                $sql .= ' where a.name = ?';
                $params = [$role_name];
            }
            $freezes = DB::connection('iod_web_game_db')->select($sql, $params);

            if($freezes)
            {
                foreach ($freezes as $freeze_info)
                {
                    $info = [];
                    $info['server_id'] = $server_id;
                    $info['role_id'] = $freeze_info->role_id;
                    $info['role_name'] = $freeze_info->name;

                    if($freeze_info->last_login_time >= $freeze_info->last_logout_time)
                    {
                        $info['online'] = 1;
                    }
                    else{
                        $info['online'] = 0;
                    }

                    if ( $freeze_info->gag_duration > 0)
                    {
                        if ( time() - strtotime($freeze_info->gag_start_time) > $freeze_info->gag_duration )
                        {
                            $info['silence_hour'] = (time() - strtotime($freeze_info->gag_start_time))/60;
                        }
                        else{
                            $info['silence_hour'] = '-';
                        }
                    }
                    else{
                        $info['silence_hour'] = '-';
                    }

                    if ( $freeze_info->suspended_duration > 0)
                    {
                        if ( time() - strtotime($freeze_info->suspended_start_time) > $freeze_info->suspended_duration )
                        {
                            $info['freeze_hour'] = (time() - strtotime($freeze_info->suspended_start_time))/60;
                        }
                        else{
                            $info['freeze_hour'] = '-';
                        }
                    }
                    else{
                        $info['freeze_hour'] = '-';
                    }

                    array_push($freeze_array,$info);
                }
            }

            $this->data['freezes'] = $freeze_array;
        }

        return $this->returnJson();
    }

    public function silencePlayer() {
        $server_id = request()->input('server_id', '');
        $role_id = request()->input('role_id', '');
        $hour = request()->input('hour', '');
        $minute = $hour*60;

        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            $role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?",[$role_id]);
            $uid = DB::connection('iod_web_game_db')->select("select account_name from taccount where account_Id=?",[$role_info[0]->account_id]);
            if (!$role_info) {
                $this->result_id = -2;
            } else {
                // $url = 'http://'.$server[0]->server_ip.':'.$server[0]->http_port.'/gag';
                $url = $this->queryGMSvr().'/gag';
                $url .= '?uid='.$uid[0]->account_name;
                $url .= '&opt=1';
                $url .= '&time='.$minute;
                $url .= '&server_id='.$server_id;

                $this->result_id = $url;
                try {
                    cURL::get($url);
                } catch(\Exception $e) {
                    $this->result_id = -1;
                    $this->data = $e;
                    return $this->returnJson();
                }
            }

        } else {
            $this->result_id = -1;
        }
        return $this->returnJson();
    }

    public function freezePlayer() {
        $server_id = request()->input('server_id', '');
        $role_id = request()->input('role_id', '');
        $hour = request()->input('hour', '');
        $minute = $hour*60;

        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            $role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?",[$role_id]);
            $uid = DB::connection('iod_web_game_db')->select("select account_name from taccount where account_Id=?",[$role_info[0]->account_id]);
            if (!$role_info) {
                $this->result_id = -2;
            } else {
                // $url = 'http://'.$server[0]->server_ip.':'.$server[0]->http_port.'/suspended';
                $url = $this->queryGMSvr().'/suspended';
                $url .= '?uid='.$uid[0]->account_name;
                $url .= '&opt=1';
                $url .= '&time='.$minute;
                $url .= '&server_id='.$server_id;
                try {
                    cURL::get($url);
                } catch(\Exception $e) {
                    $this->result_id = -1;
                    $this->data = $e;
                    return $this->returnJson();
                }
            }

        } else {
            $this->result_id = -1;
        }
        return $this->returnJson();
    }

    public function unsilencePlayer() {
        $server_id = request()->input('server_id', '');
        $role_id = request()->input('role_id', '');

        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            $role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?",[$role_id]);
            $uid = DB::connection('iod_web_game_db')->select("select account_name from taccount where account_Id=?",[$role_info[0]->account_id]);
            if (!$role_info) {
                $this->result_id = -2;
            } else {
                // $url = 'http://'.$server[0]->server_ip.':'.$server[0]->http_port.'/gag';
                $url = $this->queryGMSvr().'/gag';
                $url .= '?uid='.$uid[0]->account_name;
                $url .= '&opt=2';
                $url .= '&server_id='.$server_id;
                try {
                    cURL::get($url);
                } catch(\Exception $e) {
                    $this->result_id = -1;
                    $this->data = $e;
                    return $this->returnJson();
                }
            }

        } else {
            $this->result_id = -1;
        }
        return $this->returnJson();
    }

    public function unfreezePlayer()
    {
        $server_id = request()->input('server_id', '');
        $role_id = request()->input('role_id', '');

        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?", [$server_id]);
        if ($server) {
            $role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?", [$role_id]);
            $uid = DB::connection('iod_web_game_db')->select("select account_name from taccount where account_Id=?", [$role_info[0]->account_id]);
            if (!$role_info) {
                $this->result_id = -2;
            } else {
                // $url = 'http://' . $server[0]->server_ip . ':' . $server[0]->http_port . '/suspended';
                $url = $this->queryGMSvr().'/suspended';
                $url .= '?uid=' . $uid[0]->account_name;
                $url .= '&opt=2';
                $url .= '&server_id='.$server_id;
                try {
                    cURL::get($url);
                } catch (\Exception $e) {
                    $this->result_id = -1;
                    $this->data = $e;
                    return $this->returnJson();
                }
            }

        } else {
            $this->result_id = -1;
        }
        return $this->returnJson();
    }

    public function copyPlayer()
    {
        $server_id = request()->input('server_id',1);
        $role_id = request()->input('role_id','');
        $new_account = request()->input('new_account','');
        $new_name = request()->input('new_name','');

        $now_time = time();
        $now_date = date('Y-m-d H:i:s');

        $server = DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?", [$server_id]);
        if ($server)
        {
            $orign_role_info =  DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE role_id=?", [$role_id]);
            foreach ($orign_role_info as $orign_role)
            {
                $sql_create_account = "insert into taccount(account_name,password,create_time,minors,server_id,platform,suspended,suspended_start_time,suspended_duration,gag,gag_start_time,gag_duration)";
                $sql_create_account .= "values( ? , '' , ? , 0, 0, '', 0, ?, 0, 0, ?, 0 )";
                $result = DB::connection('iod_web_game_db')->insert($sql_create_account,[$new_account,$now_date,$now_date,$now_date]);

                $query_new_account =  DB::connection('iod_web_game_db')->select("select * from taccount where account_name=?",[$new_account]);
                foreach ($query_new_account as $new_account_info)
                {
                    $sql_create_role_info = "insert into tactroleinfo(account_id,name,gender,job,current_title,signature,mood_message,level,exper,power,max_combo_hit,
                                                                        password,speech_channel,logout_place,total_online_time,last_login_time,last_logout_time,no_opt_time,
                                                                        last_upgrade_time,create_time,hp,sp,energy,role,fighting_force,other_data,server_id)";
                    $sql_create_role_info .= "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    DB::connection('iod_web_game_db')->select($sql_create_role_info,[ $new_account_info->account_Id,$new_name,$orign_role->gender,$orign_role->job,$orign_role->current_title,
                                                                                $orign_role->signature,$orign_role->mood_message,$orign_role->level,$orign_role->exper,$orign_role->power,
                                                                                $orign_role->max_combo_hit,'',$orign_role->speech_channel,$orign_role->logout_place,$orign_role->total_online_time,
                                                                                $orign_role->last_login_time,$orign_role->last_logout_time,$orign_role->no_opt_time,$orign_role->last_upgrade_time,
                                                                                $orign_role->create_time,$orign_role->hp,$orign_role->sp,$orign_role->energy,$orign_role->role,$orign_role->fighting_force,
                                                                                $orign_role->other_data,$orign_role->server_id]);

                    $new_role_info = DB::connection('iod_web_game_db')->select("select * from tactroleinfo WHERE name=?", [$new_name]);
                    $new_role_id = $new_role_info[0]->role_id;
                    if ($new_role_id)
                    {
                        $orign_role_prop_List = DB::connection('iod_web_game_db')->select("select * from TProp WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_prop_List as $info)
                        {
                            $sql_copy_prop = "insert into TProp(role_id,unlock_grid_number,package_id) VALUES (?,?,?)";

                            DB::connection('iod_web_game_db')->select($sql_copy_prop,[$new_role_id,$info->unlock_grid_number,$info->package_id]);
                        }

                        $orign_role_proplist_List = DB::connection('iod_web_game_db')->select("select * from tproplist WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_proplist_List as $info)
                        {
                            $sql_copy_proplist = "insert into tproplist VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                            DB::connection('iod_web_game_db')->select($sql_copy_proplist,[$info->sn,$new_role_id,$info->type,$info->position,$info->prop_id, $info->exper,$info->level,
                                                                $info->number,$info->inlaid_gem_number, $info->gem1,$info->gem2,$info->gem3,$info->gem4, $info->gem5,$info->quality]);
                        }

                        $orign_role_propuseinfo_List = DB::connection('iod_web_game_db')->select("select * from TPropUseInfo WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_propuseinfo_List as $info)
                        {
                            $sql_copy_propuseinfo = "insert into TPropUseInfo VALUES(?,?,?,?)";

                            DB::connection('iod_web_game_db')->select($sql_copy_propuseinfo,[$new_role_id,$info->prop_id,$info->last_use_time,$info->times_one_day]);
                        }

                        $orign_role_levelinfo_List = DB::connection('iod_web_game_db')->select("select * from TLevelInfo WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_levelinfo_List as $info)
                        {
                            $sql_copy_levelinfo = "insert into TLevelInfo VALUES(?,?,?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_levelinfo,[$new_role_id,$info->mapid,$info->star,$info->last_enter_time, $info->date_number,$info->max_loot_count,$info->looted_count]);
                        }

                        $orign_role_vipinfo_List = DB::connection('iod_web_game_db')->select("select * from TRoleVipInfo WHERE role_id=?", [$role_id]);
                        foreach($orign_role_vipinfo_List as $info)
                        {
                            $sql_copy_vipinfo = "insert into TRoleVipInfo VALUES(?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_vipinfo,[$new_role_id, $info->level, $info->total_recharge, $info->recharge_count, $info->first_recharge_reward]);
                        }

                        $orign_role_skill_List = DB::connection('iod_web_game_db')->select("select * from TSkill WHERE role_id=?", [$role_id]);
                        foreach($orign_role_skill_List as $info)
                        {
                            $sql_copy_skill = "insert into TSkill VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_skill,[$new_role_id, $info->scheme_id, $info->slot, $info->is_lock, $info->skill_id, $info->keyboard, $info->soul_id, $info->soul_level,
                                                                $info->prop_sn, $info->aux_sn_1, $info->aux_sn_2, $info->aux_sn_3, $info->aux_sn_4, $info->aux_sn_5]);
                        }

                        $orign_role_skillscheme_List = DB::connection('iod_web_game_db')->select("select * from TSkillScheme WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_skillscheme_List as $info)
                        {
                            $sql_copy_skillscheme = "insert into TSkillScheme VALUES(?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_skillscheme,[$new_role_id, $info->scheme_id]);
                        }

/*                        $orign_role_taskcondition_List = DB::connection('iod_web_game_db')->select("select * from TTaskCondition WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_taskcondition_List as $info)
                        {
                            $sql_copy_taskcondition = "insert into TTaskCondition(role_id,idx,statistics_id,param1,param2,param3) VALUES(?,?,?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_taskcondition,[$new_role_id, $info->condition_id, $info->idx, $info->statistics_id, $info->param1, $info->param2, $info->param3]);
                        }

                        $orign_role_tasklist_List = DB::connection('iod_web_game_db')->select("select * from TTaskList WHERE role_id=?", [$role_id]);
                        foreach($orign_role_tasklist_List as $info)
                        {
                            $sql_copy_tasklist = "insert into TTaskList VALUES(?,?,?,?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_tasklist,[$new_role_id, $info->task_type, $info->task_line, $info->current_task, $info->state, $info->repeat_time,
                                                                $info->activation_time,$info->condition_id]);
                        }*/

                        $orign_role_tasktrack_List = DB::connection('iod_web_game_db')->select("select * from TTaskTrack WHERE role_id=?", [$role_id]);
                        foreach ($orign_role_tasktrack_List as $info)
                        {
                            $sql_copy_tasktrack = "insert into TTaskTrack VALUES(?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_tasktrack,[$new_role_id,$info->track_id, $info->task_id]);
                        }

                        $orign_role_taskcondition_List = DB::connection('iod_web_game_db')->select("select a.*, b.idx, b.statistics_id, b.param1, b.param2, b.param3 
                                                                                              from TTaskList a LEFT JOIN TTaskCondition b ON a.condition_id = b.condition_id WHERE a.role_id = ?",[$role_id]);
                        foreach ($orign_role_taskcondition_List as $info)
                        {
                            $sql_copy_tasklist = "insert into TTaskList(role_id,task_type,task_line,current_task,state,repeat_time,activation_time) VALUES(?,?,?,?,?,?,?)";
                            DB::connection('iod_web_game_db')->select($sql_copy_tasklist,[$new_role_id, $info->task_type, $info->task_line, $info->current_task, $info->state, $info->repeat_time,
                                $info->activation_time]);

                            $temp =  DB::connection('iod_web_game_db')->select("select * from TTaskList WHERE role_id = ? AND condition_id NOT IN (SELECT condition_id FROM TTaskCondition WHERE role_id = ?)",[$new_role_id,$new_role_id]);

                            foreach ($temp as $temp_info)
                            {
                                $sql_copy_taskcondition = "insert into TTaskCondition VALUES(?,?,?,?,?,?,?)";
                                DB::connection('iod_web_game_db')->select($sql_copy_taskcondition,[$new_role_id,$temp_info->condition_id, $info->idx, $info->statistics_id, $info->param1, $info->param2, $info->param3]);
                            }
                        }


                    }


                }
            }
        }
    }

    //临时接口
    public function tempAPI()
    {
        $platform_id = request()->input('platform_id', '');
        $server_id = request()->input('server_id', '');
        $role_name = request()->input('role_name', '');
        $title = request()->input('title', '');
        $content = request()->input('content', '');
        $items = request()->input('items', '');
        $title = str_replace(' ', '&nbsp;', $title);
        $content = str_replace(' ', '&nbsp;', $content);
//        $title = str_replace("'", '&#39;', $title);
//        $content = str_replace("'", '&#39;', $content);


        $servers = [];
        if ($platform_id == 0) {
            $servers = Server::all();
        } else {
            if ($server_id == 0) {
                $servers = Server::where('platform_id', $platform_id)->get();
            } else {
                $servers = Server::where('server_id', $server_id)->get();
            }
        }
        $statistic = ['count'=>0, 'failed'=>0, 'success'=>0];
        foreach($servers as $server) {
            $role_info = [];

            $res = [];
            $files = 'uidlist.xlsx';
            Excel::load($files, function($reader) use( &$res ) {
                $reader = $reader->getSheet(0);
                $res = $reader->toArray();
            });

            if ($res)
            {
                foreach ($res as $uid)
                {
                    $roles = DB::connection('iod_web_game_db')->select("select a.role_id,a.name from tactroleinfo a LEFT JOIN taccount b ON a.account_id=b.account_Id WHERE b.account_name=?",[$uid[0]]);
                    if ($roles)
                    {
                        array_push($role_info,$roles[0]);
                    }
                }
            }

            if (!$role_info) {
                $statistic['count'] = 0;
            } else {
                $statistic['count'] = count($role_info);
                foreach($role_info as $role) {
                    $url = 'http://'.$server->server_ip.':'.$server->http_port.'/mail';
                    $url .= '?role_id='.urlencode($role->role_id);
                    $url .= '&role_name='.urlencode($role->name);
                    $url .= '&title='.urlencode($title);
                    $url .= '&content='.urlencode($content);
                    $url .= '&items='.urlencode($items);
                    try {
                        cURL::get($url);
                    } catch(\Exception $e) {
                        $statistic['failed'] =  $statistic['failed'] + 1;
                        continue;
                    }
                    $statistic['success'] =  $statistic['success'] + 1;
                    usleep(200);
                }
            }
        }
        $this->data = $statistic;

        return $this->returnJson();
    }

    public function generateGiftCode()
    {
        $platform_id = request()->input('platform_id', '0');
        $chestId = request()->input('chestId', '');
        $number = request()->input('number', '');
        $batch = request()->input('batch', '');
        $start_time = request()->input('start_time', '');
        $end_time = request()->input('end_time', '');
        $prefix = request()->input('prefix','');
        $length = request()->input('length','');
        $name = request()->input('name','Default');

        $prefix_len = strlen($prefix);
        if ($prefix_len >= $length)
        {
            return -1;
        }

        $check = DB::connection('mysql')->select("select * from cdkey_list where batch=?",[$batch]);
        if ($check)
        {
            return -2;
        }

        $create_num = 0;

        while( $create_num < $number )
        {
            $cdkey = $prefix;
            $cdkey .= $this->createRandomStr($length-$prefix_len);
            $sql = DB::connection('mysql')->select("insert into cdkey(cdkey,state,chestId,platform_id,batch,start_time,end_time) VALUES(?,?,?,?,?,?,?)",[$cdkey,0,$chestId,$platform_id,$batch,$start_time,$end_time]);

            if ( !$sql )
            {
                $create_num = $create_num + 1;
            }
        }

        $nowtime = date("Y-m-d H:i:s", time());
        if ($platform_id == 0)
        {
            $platform_name = "所有平台";
        }
        else{
            $platform = DB::connection('iod_web_game_db')->select('select * from tplatforms where id = ?',[$platform_id]);
            $platform_name = $platform[0]->platform_name;
        }

        $sql2 = DB::connection('mysql')->select("insert into cdkey_list VALUES(?,?,?,?,?,?,?,?,?,?)",[$batch,$name,$number,0,$nowtime,$start_time,$end_time,$platform_id,$platform_name,$chestId]);

        return 0;
    }

    function createRandomStr($length){
        $str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';//62个字符
        $strlen = 62;
        while($length > $strlen){
            $str .= $str;
            $strlen += 62;
        }
        $str = str_shuffle($str);
        return substr($str,0,$length);
    }

    public function exportCdKey()
    {
        $batch = request()->input('batch', 'error');

        $cdkey_array = DB::connection('mysql')->select("select cdkey from cdkey where batch = ? ",[$batch]);
        $export = [];
        foreach ( $cdkey_array as $cdkey)
        {
            $info['cdkey'] = $cdkey->cdkey;
            array_push($export,$info);
        }

        Excel::create($batch, function($excel) use ($export) {
            $excel->sheet('cdkeys', function($sheet) use ($export) {
                $sheet->with($export);
            });
        })->export('xls');

        return 0;
    }
}
