<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphsDataController extends Controller
{
    //
    public function returnGraphData(Request $request)
    {
        $userCount = Db::select("select count(*) as count from users;");
        $channelCount = DB::select("select count(c.user_id) as count,users.name from users inner join channels c on users.id = c.user_id group by c.user_id;");
        $categoryCount = DB::select("select count(video_categories.id) as count, video_categories.name, video_categories.description from video_categories inner join videos v on video_categories.id = v.category group by v.category;");
        $userToChannelCount = DB::select("select count(channels.id) as count,u.name from channels inner join users u on channels.user_id = u.id group by  u.id;");
        $courseEnrollment = DB::select("select c.name,count(userscourses.course_id) as count from userscourses inner join courses c on userscourses.course_id = c.id  group by  userscourses.course_id;");
        $totalVideoCount = DB::select("select count(*) as count from videos");
        $totalCourse = DB::select("select count(*) as count from courses");
        $totalChannelCount = DB::select("select count(*) as count from channels");
        return response()->json([
            "status" => 200,
            "message" => "Successfully got aggregate data",
            "data" => [
                "user_count" => $userCount,
                "channel_count" => $channelCount,
                "category_count" => $categoryCount,
                "user_to_channel_count" => $userToChannelCount,
                "course_enrollment" => $courseEnrollment,
                "total_videos"=>$totalVideoCount,
                "total_courses"=>$totalCourse,
                "total_channels"=>$totalChannelCount
            ]
        ]);

    }
}
