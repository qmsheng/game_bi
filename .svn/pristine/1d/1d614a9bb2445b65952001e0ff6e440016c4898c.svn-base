<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Platform extends Model
{
    protected  $connection = 'iod_web_game_db';
    protected $table = 'tplatforms';
    public $timestamps = false;

    public function servers()
    {
        return $this->hasMany('App\Models\Server');
    }
}
