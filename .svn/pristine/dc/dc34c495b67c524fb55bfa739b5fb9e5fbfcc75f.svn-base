<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected  $connection = 'mysql';
    protected $table = 'users';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'display_name', 'email', 'qq'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles() {
        return $this->belongsToMany('App\Models\Role', 'user_role', 'user_id', 'role_id');
    }

    /**
     * 取出所有用户信息并转换成JSON格式
     * @return array
     */
    public function getInfo() {
        $ret = $this->toArray();
        $ret['roles'] = [];
        $ret['menus'] = [];
        $ret['permissions'] = [];

        $menuArr = [];
        foreach($this->roles as $role) {
            array_push($ret['roles'], $role->toArray());
            $menus = $role->menus;
            foreach($menus as $menu) {
                $menuArr[$menu->id] = $menu;
            }
            $ret['menus'] = $this->getTree($menuArr, 0);
        }
        return $ret;
    }


    /**
     * 树菜单
     * @param $menus
     * @param $parent_id
     * @return array
     */
    private function getTree($menus, $parent_id) {
        $arr = [];
        foreach($menus as $menu) {
            if ($menu->parent_id == $parent_id) {
                $menu_arr = $menu->toArray();

                $menu_arr['menus'] = $this->getTree($menus, $menu->id);
                array_push($arr, $menu_arr);
            }

        }
        return $arr;
    }
}
