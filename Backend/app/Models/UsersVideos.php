<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersVideos extends Model
{
    protected $table = 'user_video_progress';
    protected $fillable = [
        'user_id',
        'course_id',
        'video_id',
        'completed',
    ];
    use HasFactory;

}
