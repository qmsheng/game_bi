<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $result_id = 0;
    protected $data = [];
    protected $msg = 'err';

    public function returnJson() {
        return response()->json(['result'=>$this->result_id, 'data'=>$this->data]);
    }

    public function returnErrJson() {
        return response()->json(['result'=>$this->result_id, 'data'=>$this->data, 'msg'=>$this->msg]);
    }
}
