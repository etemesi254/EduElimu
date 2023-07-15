<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseResources extends Model
{
    protected $table = 'course_resources';
    protected $fillable = [
        'name',
        'course_id',
        'resource'
    ];
    use HasFactory;
}
