<?php

namespace App\Http\Controllers\Admin;

use App\Models\Platform;
use App\Http\Controllers\Controller;

class PlatformController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $platforms = Platform::paginate(5);
        $this->data = ['platforms'=>$platforms];
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
        $platform = new Platform();
        $platform->platform_name = request()->input('platform_name', '');
        $platform->description = request()->input('description', '');
        $platform->save();
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
        $platform = Platform::find($id);
        if ($platform) {
            $platform->platform_name = request()->input('platform_name', '');
            $platform->description = request()->input('description', '');
            $platform->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $platform = Platform::find($id);
        if ($platform) {
            $platform->delete();
        }
        return $this->returnJson();
    }
}
