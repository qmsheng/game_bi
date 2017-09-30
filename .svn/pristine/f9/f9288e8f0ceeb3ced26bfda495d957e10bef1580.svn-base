<?php

namespace App\Http\Controllers\Admin;

use App\Models\Menu;
use App\Models\Permission;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Hamcrest\Arrays\IsArray;

class RoleController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $roles = Role::with('menus')->with('permissions')->paginate(5);
        $this->data = ['roles'=>$roles];
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
        $role = new Role();
        $role->role_name = request()->input('role_name', '');
        $role->description = request()->input('description', '');
        $menus = request()->input('menu_ids');
        $permissions = request()->input('permission_ids');

        if ($role->save()) {
            foreach($menus as $menu_id) {
                $role->menus()->attach($menu_id);
            }
            foreach($permissions as $menu_id) {
                $role->permissions()->attach($menu_id);
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
        $role = Role::find($id);
        if ($role) {
            $role->role_name = request()->input('role_name', '');
            $role->description = request()->input('description', '');

            $menus = request()->input('menu_ids');
            $permissions = request()->input('permission_ids');
            if ($role->save()) {
                if (is_array($menus)) {
                    $role->menus()->detach();
                    foreach($menus as $menu_id) {
                        $role->menus()->attach($menu_id);
                    }
                }
                if (is_array($permissions)) {
                    $role->permissions()->detach();
                    foreach($permissions as $permission_id) {
                        $role->permissions()->attach($permission_id);
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
        $role = Role::find($id);
        if ($role) {
            $role->delete();
        }
        return $this->returnJson();
    }
}
