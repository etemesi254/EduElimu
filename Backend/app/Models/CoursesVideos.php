<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoursesVideos extends Model
{
    protected $table = 'courses_videos';
    protected $fillable = [
        'video_id',
        'course_id',
    ];
    use HasFactory;
}
