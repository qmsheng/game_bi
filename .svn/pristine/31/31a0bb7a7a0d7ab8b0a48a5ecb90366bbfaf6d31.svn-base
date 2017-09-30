<?php

namespace App\Http\Controllers\Admin;

use App\Models\ConsumePoint;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConsumePointController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $consumePoint = ConsumePoint::paginate(20);
        $this->data = ['consumes'=>$consumePoint];
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
        $consumePoint = new ConsumePoint();
        $consumePoint->type_id = request()->input('type_id', '');
        $consumePoint->name = request()->input('name', '');
        $consumePoint->save();
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
        $consumePoint = ConsumePoint::find($id);
        if ($consumePoint) {
            $consumePoint->type_id = request()->input('type_id', '');
            $consumePoint->name = request()->input('name', '');
            $consumePoint->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $consumePoint = ConsumePoint::find($id);
        if ($consumePoint) {
            $consumePoint->delete();
        }
        return $this->returnJson();
    }
}
