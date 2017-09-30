<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected  $connection = 'mysql';
    protected $table = 'roles';
    public $timestamps = false;

    public function permissions() {
        return $this->belongsToMany('App\Models\Permission', 'role_permission', 'role_id', 'permission_id');
    }

    public function menus() {
        return $this->belongsToMany('App\Models\Menu', 'role_menu', 'role_id', 'menu_id');
    }
}
