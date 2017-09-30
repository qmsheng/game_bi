<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;

class FlagInfo extends Model
{
    protected $connection = 'game_db';
    protected $table = 'flag_info';
    public $timestamps = false;
    public $primaryKey = 'role_id';
}
