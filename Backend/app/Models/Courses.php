<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $fillable = [
        'name',
        'course_banner',
        'channel_id',
        'description',
    ];
    use HasFactory;
}
