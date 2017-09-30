<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportPoint extends Model
{
    protected  $connection = 'mysql';
    protected $table = 'report_point';
    public $timestamps = false;
}
