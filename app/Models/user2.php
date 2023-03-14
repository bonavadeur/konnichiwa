<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user2 extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'username', 'password'
    ];
}
