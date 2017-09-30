<?php

namespace App\Http\Controllers\Game;

use App\Http\Controllers\Controller;
use App\Models\ServerOnline;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Report;

class ReportController extends Controller
{
    /**
     * @param $server_id
     * @param $online_num
     */
    public function reportOnlineNum($server_id, $online_num) {
        $server_online = new ServerOnline();
        $server_online->server_id = $server_id;
        $server_online->time = date('Y-m-d H:i:s');
        $server_online->online_num = $online_num;
        if ($server_online->save()) {
            echo 1;
        } else {
            echo 0;
        }
    }

    public function report() {
        $type = request()->input('type', '0');
        $account_id = request()->input('account_id', 0);
        $server_id = request()->input('server_id', 0);
        $uint_param1 = request()->input('uint_param1', 0);
        $uint_param2 = request()->input('uint_param2', 0);
        $str_param1 = request()->input('str_param1', '');
        $str_param2 = request()->input('str_param2', '');

        if ($type == 0) {
            echo 0;
            return;
        }

        $report = new Report();
        $report->type = $type;
        $report->account_id = $account_id;
        $report->server_id = $server_id;
        $report->uint_param1 = $uint_param1;
        $report->uint_param2 = $uint_param2;
        $report->str_param1 = $str_param1;
        $report->str_param2 = $str_param2;
        $report->time = date('Y-m-d H:i:s');

        if ($report->save()) {
            echo 1;
        } else {
            echo 0;
        }
    }
}
