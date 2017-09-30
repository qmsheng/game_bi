<?php

namespace App\Http\Controllers\Admin;

use anlutro\cURL\Laravel\cURL;
use App\Models\Platform;
use App\Models\Server;
use App\Http\Controllers\Controller;

class ServerController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $servers = Server::with('platform')->paginate(5);
        $platforms = Platform::all();

        $sql = " SELECT id FROM tserver_pc ";

        $gsServer = \DB::connection('iod_web_game_db')->select( $sql );

        $this->data = ['servers'=>$servers, 'platforms'=>$platforms,'gsserverinfo'=>$gsServer];
        return $this->returnJson();
    }

    /**
     * 打开添加
     */
    public function create() {

    }

    /**
     * 添加保存
     */
    public function store() {
        $server = new Server();
        $server->server_id = request()->input('server_id', 0);
        $server->server_name = request()->input('server_name', '');
        $server->platform_server_id = request()->input('platform_server_id', '');
        $server->server_ip = request()->input('server_ip', '');
        $server->login_port = request()->input('login_port', 0);
        $server->description = request()->input('description', '');
        $server->http_port = request()->input('http_port', '');
        $server->lang = request()->input('lang', '');
        $server->login_key = request()->input('login_key', '');
        $server->pay_key = request()->input('pay_key', '');
        $server->http_api_server_address = request()->input('http_api_server_address', '');
        $server->platform_id = request()->input('platform_id', 1);
        $server->status = 0;
        $server->active = 1;
        $server->save();
        return $this->returnJson();
    }

    /**
     * 详细显示
     */
    public function show() {

    }

    /**
     * 打开编辑
     */
    public function edit() {

    }

    /**
     * 编辑更新
     */
    public function update($id) {
        $server = Server::find($id);
        if ($server) {
            $server->server_id = request()->input('server_id', '');
            $server->server_name = request()->input('server_name', '');
            $server->platform_server_id = request()->input('platform_server_id', '');
            $server->server_ip = request()->input('server_ip', '');
            $server->login_port = request()->input('login_port', '');
            $server->http_port = request()->input('http_port', '');
            $server->lang = request()->input('lang', '');
            $server->description = request()->input('description', '');
            $server->login_key = request()->input('login_key', '');
            $server->pay_key = request()->input('pay_key', '');
            $server->http_api_server_address = request()->input('http_api_server_address', '');
            $server->platform_id = request()->input('platform_id', '');
            $server->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $server = Server::find($id);
        if ($server) {
            $server->delete();
        }
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
     * 开服
     */
    public function openServer() {
        $server_id = request()->input('server_id', '');

        $server = \DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            // 1）更改服务器状态
            $url = $this->queryGMSvr().'/gspermission';
            $url .= '?server_id='.$server_id;
            $url .= '&permission=1';    //登入的权限 1玩家，2运营，3GM
            $url .= '&uid=xxx';   //此参数无意义，但是接口逻辑需要
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $this->result_id = -1;
                $this->data = $e;
                return $this->returnJson();
            }
        }

        return $this->returnJson();
    }

    /**
     * 关服
     */
    public function closeServer() {
        $server_id = request()->input('server_id', '');

        $server = \DB::connection('iod_web_game_db')->select("select * from tservers WHERE server_id = ?",[$server_id]);
        if ($server) {
            // 1）踢所有在线玩家
            $url = $this->queryGMSvr().'/allplayeroffline';
            $url .= '?server_id='.$server_id;
            $url .= '&uid=xxx';   //此参数无意义，但是接口逻辑需要
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $this->result_id = -1;
                $this->data = $e;
                return $this->returnJson();
            }

            // 2）更改服务器状态
            $url = $this->queryGMSvr().'/gspermission';
            $url .= '?server_id='.$server_id;
            $url .= '&permission=2';    //登入的权限 1玩家，2运营，3GM
            $url .= '&uid=xxx';   //此参数无意义，但是接口逻辑需要
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $this->result_id = -1;
                $this->data = $e;
                return $this->returnJson();
            }
        }

        return $this->returnJson();
    }

    /**
     * 编译gs c++服务器
     */
    public function makeGSServer() {
        $server_ids          = request()->input('server_ids');
        $is_restart         = request()->input('is_restart');
        $authentication_key = request()->input('authentication_key');

        if ( intval($server_ids) && intval($is_restart) && $authentication_key == "IODadmin" ) {
            // 1）编译gs c++服务器
            $url = $this->queryGMSvr().'/updatesvr';
            $url .= '?svr_id='.$server_ids;
            $url .= '&restart='.$is_restart;    //重启服务器，1：重启，0：不重启
            try {
                cURL::get($url);
            } catch(\Exception $e) {
                $this->result_id = -1;
                $this->data = $e;
                return $this->returnJson();
            }
        }

        $this->result_id = -2;

        return $this->returnJson();
    }
}
