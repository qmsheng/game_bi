<?php

namespace App\Http\Controllers\Admin;

use App\Models\CdKey;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Platform;

class CdKeyController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $cdKey = CdKey::paginate(20);
        $platforms = Platform::all();
        $this->data = ['cdkeys'=>$cdKey, 'platforms'=>$platforms];
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
        $cdKey = new cdKey();
        $cdKey->id = request()->input('id', '');
        $cdKey->prop = request()->input('prop', '');
        $cdKey->save();
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
        $cdKey = CdKey::find($id);
        if ($cdKey) {
            $cdKey->id = request()->input('id', '');
            $cdKey->prop = request()->input('prop', '');
            $cdKey->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $cdKey = cdKey::find($id);
        if ($cdKey) {
            $cdKey->delete();
        }
        return $this->returnJson();
    }
}
