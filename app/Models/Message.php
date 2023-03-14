<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'message';
    protected $primaryKey = 'id';
    protected $fillable = [
        'sender', 'receiver', 'message', 'cert', 'signature'
    ];
}
