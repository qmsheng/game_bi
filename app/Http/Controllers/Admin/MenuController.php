<?php

namespace App\Http\Controllers\Admin;

use App\Models\Menu;
use App\Http\Controllers\Controller;

class MenuController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $menus = Menu::paginate(5);
        $parent_menus = Menu::where('parent_id', 0)->get();
        $this->data = ['menus'=>$menus, 'parent_menus'=>$parent_menus];
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
        $menu = new Menu();
        $menu->menu_name = request()->input('menu_name', '');
        $menu->url = request()->input('url', '');
        $menu->icon = request()->input('icon', '');
        $menu->description = request()->input('description', '');
        $menu->parent_id = request()->input('parent_id', '');
        $menu->save();
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
        $menu = Menu::find($id);
        if ($menu) {
            $menu->menu_name = request()->input('menu_name', '');
            $menu->url = request()->input('url', '');
            $menu->icon = request()->input('icon', '');
            $menu->description = request()->input('description', '');
            $menu->parent_id = request()->input('parent_id', '');
            $menu->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $menu = Menu::find($id);
        if ($menu) {
            $menu->delete();
        }
        return $this->returnJson();
    }
}
