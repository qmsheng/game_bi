<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use Hash;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $users = User::with('roles')->paginate(30);
        $roles = Role::all();
        $this->data = ['users'=>$users, 'roles'=>$roles];
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
        $user = new User();
        $user->username = request()->input('username');
        $user->display_name = request()->input('display_name');
        $user->password = Hash::make('com.123');
        $user->email = request()->input('email');
        $user->qq = request()->input('qq');
        $user->display_icon = '';
        $user->active = 1;
        $roles = request()->input('role_ids');

        if ($user->save()) {
            if (is_array($roles)) {
                foreach($roles as $role_id) {
                    $user->roles()->attach($role_id);
                }
            }
        }
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
        $user = User::find($id);
        if ($user) {
            $user->username = request()->input('username');
            $user->display_name = request()->input('display_name');
            //$user->password = Hash::make('1234567890');
            $user->email = request()->input('email');
            $user->qq = request()->input('qq');
            $user->display_icon = '';
            $user->active = 1;
            $roles = request()->input('role_ids');
            $this->data = $roles;
            if($user->save()) {
                if (is_array($roles)) {
                    $user->roles()->detach();
                    foreach($roles as $role_id) {
                        $user->roles()->attach($role_id);
                    }
                }
            }
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $user = User::find($id);
        if ($user) {
            $user->delete();
        }
        return $this->returnJson();
    }
}
