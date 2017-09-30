<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/8
 * Time: 14:56
 */

namespace App\Http\Controllers;

use App\Models\Game\FlagInfo;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Keychain;
use Lcobucci\JWT\Signer\Rsa\Sha256;

use App\Models\Report;
use App\Models\Server;
use App\Models\Game\RoleInfo;
use App\Models\ServerOnline;
use App\Models\Accredit;
use App\Models\Recharge;
use anlutro\cURL\Laravel\cURL;


class ApiController extends Controller
{
    /**
     * 登录游戏
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function login() {
        $credentials = request()->input('token', '');

        $signer = new Sha256();
        $parser = new Parser();
        $keychain = new Keychain();
        $token = null;
        $error = '';

        if ($credentials == '') {
            $error = 'token_invalid';
            $token = null;
        } else {
            try {
                $token = $parser->parse($credentials);
            } catch(\Exception $e) {
                $error = 'token_invalid';
                $token = null;
            }
        }

        if ($token != null)
        {
            do
            {
                if ($token->verify($signer, $keychain->getPublicKey($this->public_key)) ==  false) {
                    $error = 'token_invalid';
                    break;
                }

//              if ($token->isExpired() == true) {
//                    $error = 'token_expired';
//                    break;
//                }

//                if ($_SERVER["REMOTE_ADDR"] != $token->getClaim('clientIp')) {
//                    $error = 'token_ip_error';
//                    break;
//                }

                $oasisId = $token->getClaim('oasisId');
                $gamecode = $token->getClaim('gamecode');
                $server_id = $token->getClaim('serverId');
                $client_ip = $token->getClaim('clientIp');
                $login_type = $token->getClaim('loginType');
                $login_key = $token->getClaim('loginKey');

                $server = Server::where('server_id', $server_id)->first();
                if ($server) {
                    if ($server->status != 0) {
                        $error = 'server_maintenance';
                        break;
                    }

                    $time = time();
                    $sign = md5($gamecode . '-' . $time . '-' . $oasisId . '-' . $server->login_key);
                    $params['uid'] = $oasisId;
                    $params['uname'] = $gamecode;
                    $params['time'] = $time;
                    $params['server_id'] = $server->platform_server_id;
                    $params['login_ip'] = $server->server_ip;
                    $params['login_port'] = $server->login_port;
                    $params['sign'] = $sign;
                    $params['lang'] = $server->lang;
                    $params['api_server_address'] = $server->http_api_server_address."/client/api";
                    $params['api_report_address'] = $server->http_api_server_address."/rpt/report";

                    //成功时写一个日志
                    $report = new Report();
                    $report->type = 10100;
                    $report->account_id = $oasisId;
                    $report->server_id = $server_id;
                    $report->uint_param1 = 0;
                    $report->uint_param2 = 0;
                    $report->str_param1 = 0;
                    $report->str_param2 = 0;
                    $report->time = date('Y-m-d H:i:s');
                    $report->save();

                    return view('api.game', $params);
                } else {
                    $error = 'access_deny';
                    break;
                }

            }while(false);
        }

        return view('api.error', ['error' => $error]);
    }


    /**
     * 充值
     * @return int
     */
    public function pay() {
        $uid = request()->input('uid', '0');
        $server_id = request()->input('server_id', '0');
        $order_id = request()->input('order_id', '0');
        $gamecoins = request()->input('gamecoins', '0');
        $payway = request()->input('payway', '0');
        $money = request()->input('money', '0');
        $money_type = request()->input('moneytype', '0');
        $sign = request()->input('sign', '');

        $result = 1;
        do
        {
            $server = Server::where('server_id', $server_id)->first();
            if (!$server) {
                $result = -6;
                break;
            }

            if (md5($order_id . $uid . $server_id .  $gamecoins . $payway . $money . $money_type . $server->pay_key) != $sign) {
                $result = -7;
                break;
            }

//            if (!$this->checkAccessPermission($_SERVER["REMOTE_ADDR"])) {
//                $result = -5;
//                break;
//            }


            if(Recharge::where('order_id', $order_id)->count() > 0) {
                $result = -4;
                break;
            }

            if ($gamecoins <= 0) {
                $result = -3;
                break;
            }

            $role_info = RoleInfo::where('account_id', $uid)->where('platform_server_id', $server->platform_server_id)->first();
            if (!$role_info) {
                $result = -2;
                break;
            }

            $recharge = new Recharge();
            $recharge->order_id = $order_id;
            $recharge->server_id = $server_id;
            $recharge->uid = $uid;
            $recharge->game_coin = $gamecoins;
            $recharge->paytype = $payway;
            $recharge->money = $money;
            $recharge->time = date('Y-m-d H:i:s');
            $recharge->money_type = $money_type;

            if (!$recharge->save()) {
                $result = -1;
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

            $role_info->diamond = $role_info->diamond + $gamecoins;
            $role_info->save();

            $url = "http://".$server->server_ip.":".$server->http_port."/recharge?role_id=".$role_info->role_id."&count=".$gamecoins;
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $result = 1;
            }

        } while(false);

        return $result;
    }

    /**
     * 测试
     */
    public function test()
    {
        try {
            cURL::get('http://192.168.1.20:9999');
        } catch(\Exception $e) {
            echo '-1';
        }
    }


    /**
     * 获取信息
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo() {
        $credentials = request()->input('token', '');

        $signer = new Sha256();
        $parser = new Parser();
        $keychain = new Keychain();
        $token = null;
        if ($credentials == '') {
            $error = 'token_invalid';
            $token = null;
        } else {
            try {
                $token = $parser->parse($credentials);
            } catch(\Exception $e) {
                $error = 'token_invalid';
                $token = null;
            }
        }
        $result = ['status' => "fail"];

        if ($token != null) {
            if ($token->verify($signer, $keychain->getPublicKey($this->public_key)) ==  false) {
                $result["error"] = trans('token_invalid');
            }

            if ($token->isExpired() == true) {
                $result["error"] = trans('token_expired');
            }

            $oasisId = $token->getClaim('oasisId');
            $gamecode = $token->getClaim('gamecode');
            $server_id = $token->getClaim('serverId');

            $server = Server::where('server_id', $server_id)->first();
            if ($server) {
                $role_info = RoleInfo::where('account_id', $oasisId)->where('platform_server_id', $server->platform_server_id)->first(['role_name', 'level', 'role_id']);
                if (!$role_info) {
                    $result["error"] = trans('not_found_role');
                } else {
                    $result["status"] = "ok";
                    $result["uid"] = $oasisId;
                    $result["roles"] = [["name"=>$role_info->role_name, "level"=>$role_info->level, "roleid"=>$role_info->role_id]];
                }
            } else {
                $result["error"] = trans('access_deny');
            }
        }

        return response()->json($result);
    }


    /**
     * 查询在线人数
     */
    public function getOnlineNum() {
        $server_id = request()->input('server_id', '0');

        $current_time = date('U');
        $server = Server::where('server_id', $server_id)->first();
        if ($server) {
            $server_online = ServerOnline::where('server_id', $server->platform_server_id)->orderBy('time', 'desc')->first();
            $report_time = date('U', strtotime($server_online->time));
            if ($report_time < $current_time - 300) {
                echo 0;
            } else {
                echo $server_online->online_num;
            }
        } else {
            echo 0;
        }
    }


    /**
     * 获取注册人数
     */
    public function getRegNum() {
        $server_id = request()->input('server_id', '0');

        $server = Server::where('server_id', $server_id)->first();
        if ($server) {
            $count = RoleInfo::where('platform_server_id', $server->platform_server_id)->count();
            echo $count;
        } else {
            echo -1;
        }
    }

    private function checkAccessPermission($ip) {
        if (Accredit::where('ip', $ip)->count() > 0) {
            return true;
        }
        return false;
    }

    var $public_key =<<<EOD
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqj01UvHpVFeLKhfU5NdIBUkyp
fx2Esxb9X54RTVViChGxWrRO14PBbIRB5iJbd/vUIiDDXp40d5QLJpBasuFOViui
7MiafNQ2MO319u0osEL9g9+e+cPOfyk87Q6osekAGyMeJrgQ1U29AerOQ9gLehgn
OKGtkdfwZdHX/U8WCwIDAQAB
-----END PUBLIC KEY-----
EOD;
}