<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;

class PlayerLog extends Model
{
    protected $connection = 'log_db';
    protected $table = 'role_log';
    public $timestamps = false;
}
