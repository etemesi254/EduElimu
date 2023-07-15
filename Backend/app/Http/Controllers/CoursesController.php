<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Channel;
use App\Models\User;
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
                        "message" => "Could not store course banner",
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

    function editCourses(Request $request)
    {
        $data = [];
        $rules = [
            "id" => "required|exists:courses",
        ];
        try {
            $request->validate($rules);

            if($request->name){
                $data["name"] = $request->name;
            }

            if($request->description){
                $data["description"] = $request->description;
            }

            if($request->channel_id){
                $data["channel_id"] = $request->channel_id;
            }

            if($request->course_banner){
                $bannerPath = $this->storeCourseBanner($request->course_banner);

                if (is_bool($bannerPath)) {
                    // a boolean indicates an error
                    return response()->json(
                        [
                            "status" => 500,
                            "message" => "Could not store course banner",
                            "data" => null
                        ], status: 500);
                }
            }

            $course = tap(Courses::whereId($request->id))->update($data)->first();

            return response()->json([
                'status' => 200,
                'message' => "Successfully modified course",
                "data" => $course,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getAllCourses(){
        try {
            $courses = Courses::all();
            return response()->json([
                'status' => 200,
                'message' => "Successfully modified course",
                "data" => $courses,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getChannelCourses($channel){
        try {
            $channel = Channel::findOrFail($channel);
            $courses = $channel->courses()->get();
            
            return response()->json([
                'status' => 200,
                'message' => "Retrieved Channel's Courses successfully",
                "data" => $courses,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getUserCourses($user){
        try {
            $user = User::find($user);
            $courses = $user->courses;

            return response()->json([
                'status' => 200,
                'message' => "Retrieved User's Courses successfully",
                "data" => $courses,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
