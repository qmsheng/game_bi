<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    protected  $connection = 'iod_web_game_db';
    protected $table = 'tservers';
    public $timestamps = false;

    public function platform() {
        return $this->belongsTo('App\Models\Platform');
    }
}
