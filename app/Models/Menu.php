<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected  $connection = 'mysql';
    protected $table = 'menus';
    public $timestamps = false;
}
