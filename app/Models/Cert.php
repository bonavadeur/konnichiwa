<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cert extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'cert';
    protected $primaryKey = 'id';
    protected $fillable = [
        'username', 'cert', 'publicKey', 'outdate'
    ];
}
