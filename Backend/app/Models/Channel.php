<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $fillable = [
        'name',
        'status',
        'user_id',
        'subscribers',
        'description',
        'banner',
    ];
    use HasFactory;

    public function videos()
    {
        return $this->hasMany(Videos::class);
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
