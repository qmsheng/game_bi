<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;

class FreezeInfo extends Model
{
    protected $connection = 'game_db';
    protected $table = 'freeze_info';
    public $timestamps = false;
    public $primaryKey = 'role_id';
}
