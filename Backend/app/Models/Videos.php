<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "channel_id",
        "description",
        "view_count",
        "status",
        "file_url",
        "banner_url"
    ];

    public function channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Channel::class, 'channel_id');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'courses_videos', 'video_id', 'course_id');
    }


}
