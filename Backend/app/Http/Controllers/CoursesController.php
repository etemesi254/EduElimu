<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    public function createCourse(Request $request){
        $rules = [
            "name" => "required",
            "description" => "required",
            "channel_id" => "required",
            "course_banner" => "required",
        ];
        try {
            $request->validate($rules);

            $data = $request->only("channel_id", "name", "description");

            $bannerPath = $this->storeCourseBanner($request);

            if (is_bool($bannerPath)) {
                // a boolean indicates an error
                return response()->json(
                    [
                        "status" => 500,
                        "message" => "Could not store video",
                        "data" => null
                    ], status: 500);
            }

            $course = Courses::create([
                "name" => $data["name"],
                "channel_id" => $data["channel_id"],
                "description" => $data["description"],
                "course_banner" => $bannerPath
            ]);

            return response()->json([
                'status' => 201,
                'message' => "Successfully created channel",
                "data" => $course,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeCourseBanner(Request $request): bool|string
    {
        // store the video
        return $request->file("course_banner")->store("course_banners", "public");
    }
}
