<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Channel;
use App\Models\CoursesVideos;
use App\Models\User;
use App\Models\Videos;
use App\Models\UsersCourses;
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
                'message' => "Successfully retrieved course",
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

    public function addStudentsToCourse(Request $request){
        $rules = [
            "user_id" => "required",
            "course_id" => "required",
        ];

        try {
            $request->validate($rules);
            $student = UsersCourses::create([
                "user_id" => $request->user_id,
                "course_id" => $request->course_id,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Student successfully added to course",
                "data" => $student,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getStudentsInCourse($courseId)
{
    try {
        $course = Courses::findOrFail($courseId);
        $users = $course->usersCourses()->get();

        return response()->json([
            'status' => 200,
            'message' => "Retrieved users in the course successfully",
            'data' => $users,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 422,
            'message' => $e->getMessage(),
        ], 422);
    }
}
    public function removeStudentFromCourse(Request $request)
    {
        $rules = [
            "user_id" => "required",
            "course_id" => "required",
        ];
        try {
            $request->validate($rules);
            $userId = $request->input('user_id');
            $courseId = $request->input('course_id');

            UsersCourses::where('user_id', $userId)
                    ->where('course_id', $courseId)
                    ->delete();

            return response()->json([
                'status' => 200,
                'message' => "Student removed from course successfully",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function addVideosToCourse(Request $request){
        $rules = [
            "video_id" => "required",
            "course_id" => "required",
        ];

        try {
            $request->validate($rules);
            $student = CoursesVideos::create([
                "video_id" => $request->video_id,
                "course_id" => $request->course_id,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Video successfully added to course",
                "data" => $student,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function removeVideoFromCourse(Request $request)
    {
        $rules = [
            "video_id" => "required",
            "course_id" => "required",
        ];
        try {
            $request->validate($rules);
            $videoId = $request->input('video_id');
            $courseId = $request->input('course_id');

            CoursesVideos::where('video_id', $videoId)
                    ->where('course_id', $courseId)
                    ->delete();

            return response()->json([
                'status' => 200,
                'message' => "Video removed from course successfully",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getCourseVideos($courseId)
    {
        try {
            $course = Courses::findOrFail($courseId);
            $videos = $course->videos()->get();

            return response()->json([
                'status' => 200,
                'message' => "Retrieved videos in the course successfully",
                'data' => $videos,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }


}
