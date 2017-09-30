<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/8
 * Time: 14:56
 */

namespace App\Http\Controllers;

use App\Models\Game\FlagInfo;
use App\Models\Platform;
use App\Models\Report;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Keychain;
use Lcobucci\JWT\Signer\Rsa\Sha256;

use App\Models\Server;
use App\Models\Game\RoleInfo;
use Mockery\CountValidator\Exception;
use App\Models\ServerOnline;
use App\Models\Accredit;
use App\Models\Recharge;
use anlutro\cURL\Laravel\cURL;


class ApiKongZhongController extends Controller
{
    public function game()
    {
        $userid = request()->input('userid', '');
        $username = request()->input('username', '');
        $time = request()->input('time', '');
        $server_id = request()->input('server_id', '');
        $isAdult = request()->input('isAdult', '');
        $flag = request()->input('flag', '');
        $platform = request()->input('platform', '');
        $status = request()->input('status', '');
        $msg = request()->input('msg', '');

        $error = '';
        $serverid = $server_id;
        $server = Server::where('server_id', $serverid)->first();
        if ($server) {
            if ($server->status != 0) {
                $error = 'server_maintenance';
            } else {
                $sign = md5($userid.$username.$time.$server_id.$isAdult.$server->login_key);
                if ($sign != $flag) {
                    $error = 'token_invalid';
                } else {
                    $time = time();
                    $params['uid'] = $userid;
                    $params['uname'] = $username;
                    $params['time'] = $time;
                    $params['server_id'] = $server->platform_server_id;
                    $params['login_ip'] = $server->server_ip;
                    $params['login_port'] = $server->login_port;
                    $key =  md5($username.'-'.$time.'-'.$userid.'-'.$server->login_key);
                    $params['sign'] = $key;
                    $params['lang'] = $server->lang;
                    $params['api_server_address'] = $server->http_api_server_address."/client/api/";
                    $params['api_report_address'] = $server->http_api_server_address."/rpt/report";

                    //成功时写一个日志
                    $report = new Report();
                    $report->type = 10100;
                    $report->account_id = $userid;
                    $report->server_id = $serverid;
                    $report->uint_param1 = 0;
                    $report->uint_param2 = 0;
                    $report->str_param1 = $username;
                    $report->str_param2 = 0;
                    $report->time = date('Y-m-d H:i:s');
                    $report->save();

                    return view('api.game', $params);
                }
            }
        } else {
            $error = 'access_deny';
        }

        return view('api.error', ['error' => $error]);
    }

    /**
     * 充值
     */
    public function pay() {
        $PayNum = request()->input('PayNum', '');
        $PayToUserId = request()->input('PayToUserId', '');
        $PayToUser = request()->input('PayToUser', '');
        $server_id = request()->input('server_id', '');
        $PayMoney = request()->input('PayMoney', '');
        $PayGold = request()->input('PayGold', '');
        $PayTime = request()->input('PayTime', '');
        $flag = request()->input('flag', '');
        $platform = request()->input('platform', '');

        $result = 1;
        do
        {
            $server = Server::where('server_id', $server_id)->first();
            if (!$server) {
                $result = 0;
                break;

            }

            $sign = md5($PayNum . '|' . $PayToUserId . '|' . $PayToUser . '|' . $server_id . '|' .  $PayMoney . '|' . $PayGold . '|' . $PayTime . '|' . $server->pay_key );
            if ($sign != $flag) {
                $result = -3;
                break;
            }


            $role_info = RoleInfo::where('account_id', $PayToUserId)->where('platform_server_id', $server->platform_server_id)->first();
            if (!$role_info) {
                $result = -1;
                break;
            }

            if(Recharge::where('order_id', $PayNum)->count() > 0) {
                $result = -2;
                break;
            }

            $recharge = new Recharge();
            $recharge->order_id = $PayNum;
            $recharge->server_id = $server_id;
            $recharge->uid = $PayToUserId;
            $recharge->game_coin = $PayGold;
            $recharge->paytype = '';
            $recharge->money = $PayMoney;
            $recharge->time = date('Y-m-d H:i:s');
            $recharge->money_type = 'RMB';
            if (!$recharge->save()) {
                $result = -2;
                break;
            }

            //写首充数据
            $flag_info = FlagInfo::where('role_id', $role_info->role_id)->first();
            if (!$flag_info){
                $flag_info = new FlagInfo();
                $flag_info->first_recharge_flag = 1;
                try {
                    $flag_info->save();
                } catch(\Exception $e) {

                }
            }

            $role_info->diamond = $role_info->diamond + $PayGold;
            $role_info->save();

            $url = "http://".$server->server_ip.":".$server->http_port."/recharge?role_id=".$role_info->role_id."&count=".$PayGold;
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $result = 1;
            }

        } while(false);

        echo $result;
    }

    /**
     * 查询信息
     */
    public function getRoleInfo()
    {
        $PayToUserId = request()->input('payToUserId');
        $PayToUser = request()->input('payToUser');
        $PayTime = request()->input('payTime');
        $flag = request()->input('flag');
        $platfor = request()->input('platfor');

        $result = ['code'=>1];
        $sign = md5($PayToUserId.'|'.$PayToUser.'|'.$PayTime.'|'.$this->login_key);
        do
        {
            if ($flag !=$sign) {
                $result['msg'] = 'sign wrong';
                break;
            }

            if (empty($PayToUserId) || empty($platfor)) {
                $result['msg'] = 'param null';
                break;
            }

            $role_infos = RoleInfo::where('account_id', $PayToUserId)->all(['role_name', 'level', 'role_id', 'money','diamond']);

            $result = ['data'=>$role_infos];
        }while(false);

        return response()->json($result);
    }

    private $login_key = 'Saubda^12&*ds1g4ehy4hyhy4hu4u4ehy4hy4s$&$%DHRHRR';
    private $pay_key = 'Saubda^12&*ds1g4ehy4hyhy4hu4u4ehy4hy4s$&$%DHRHRR';
}