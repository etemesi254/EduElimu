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

    public function channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Channel::class, 'channel_id');
    }

    public function usersCourses()
    {
        return $this->belongsToMany(User::class, 'userscourses', 'course_id', 'user_id');
    }

}
