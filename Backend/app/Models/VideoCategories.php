<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoCategories extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "banner",
        "status"
    ];
}
