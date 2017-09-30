<?php

namespace App\Http\Controllers\Admin;

use App\Models\ReportPoint;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LostReportController extends Controller
{
    /**
     * 初始数据
     */
    public function index() {
        $lost_reports = ReportPoint::paginate(20);
        $this->data = ['losts'=>$lost_reports];
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
        $lost_report = new ReportPoint();
        $lost_report->type_id = request()->input('type_id', '');
        $lost_report->type_name = request()->input('type_name', '');
        $lost_report->order_by = request()->input('order_by', '');
        $lost_report->save();
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
        $lost_report = ReportPoint::find($id);
        if ($lost_report) {
            $lost_report->type_id = request()->input('type_id', '');
            $lost_report->type_name = request()->input('type_name', '');
            $lost_report->order_by = request()->input('order_by', '');
            $lost_report->save();
        }
        return $this->returnJson();
    }

    /**
     * 删除
     */
    public function destroy($id) {
        $lost_report = ReportPoint::find($id);
        if ($lost_report) {
            $lost_report->delete();
        }
        return $this->returnJson();
    }
}
