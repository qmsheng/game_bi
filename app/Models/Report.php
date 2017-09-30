<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected  $connection = 'mysql';
    protected $table = 'reports';
    public $timestamps = false;
}
