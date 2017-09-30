<?php

namespace App\Http\Controllers\Admin;

use App\Models\Permission;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $permissions = Permission::paginate(5);
        $this->data = ['permissions'=>$permissions];
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
        $permission = new Permission();
        $permission->permission = request()->input('permission', '');
        $permission->method = request()->input('method', '');
        $permission->description = request()->input('description', '');
        if (!empty($permission->permission) && !empty($permission->method)) {
            $permission->save();
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
        $permission = Permission::find($id);
        if ($permission) {
            $permission->permission = request()->input('permission', '');
            $permission->method = request()->input('method', '');
            $permission->description = request()->input('description', '');
            if (!empty($permission->permission) && !empty($permission->method)) {
                $permission->save();
            }
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $permission = Permission::find($id);
        if ($permission) {
            $permission->delete();
        }
        return $this->returnJson();
    }
}
