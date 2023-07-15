<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersCourses extends Model
{
    protected $table = 'userscourses';
    protected $fillable = [
        'user_id',
        'course_id',
        'videos_total',
        'videos_completed',
        'progress',
    ];
    use HasFactory;
    
}
