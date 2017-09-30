<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/14
 * Time: 19:09
 */

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Util\Util;
use Auth;

class AppController extends Controller
{
    /**
     * @return string
     */
    public function username() {
        return 'username';
    }

    /**
     * 加载APP
     */
    public function initApp()
    {
        if (!Auth::check()) {
            $this->result_id = Util::NOT_LOGIN_ERROR_ID;
        } else {
            $user = Auth::user();
            $this->data = $user->getInfo();
        }
        return $this->returnJson();
    }

    /**
     * 登录
     */
    public function login()
    {
        $username = request()->input('username', '');
        $password = request()->input('password', '');
        if (!Auth::attempt(['username'=>$username, 'password'=>$password, 'active' => 1])) {
            $this->result_id =Util::LOGIN_FAILED;
        }
        return $this->returnJson();
    }

    /**
     * 登出
     */
    public function logout()
    {
        Auth::logout();
        return $this->returnJson();
    }
}