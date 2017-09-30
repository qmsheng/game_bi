<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accredit extends Model
{
    protected  $connection = 'mysql';
    protected $table = 'accredits';
    public $timestamps = false;
}
