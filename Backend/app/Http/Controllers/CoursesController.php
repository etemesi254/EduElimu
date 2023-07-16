<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Channel;
use App\Models\CourseResources;
use App\Models\CoursesVideos;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Models\UsersCourses;
use App\Models\UsersVideos;
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
            $channel = $course->channel()->get();

            return response()->json([
                'status' => 200,
                'message' => "Retrieved videos in the course successfully",
                'data' => $videos,
                'channel' => $channel
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function markAsDone(Request $request){
        $rules = [
            "user_id" => "required",
            "course_id" => "required",
            "video_id" => "required",
        ];

        try {
            $request->validate($rules);
            $video = UsersVideos::create([
                "video_id" => $request->video_id,
                "course_id" => $request->course_id,
                "user_id" => $request->user_id,
                "completed" => 1,
            ]);

            //update progress in course
            $total_videos = CoursesVideos::where('course_id', $request->course_id)->get()->count();

            $completed_videos = UsersVideos::where('course_id', $request->course_id)
            ->where('user_id', $request->user_id)
            ->where("completed",1)
            ->get()->count();

            $progress = intval(($completed_videos / $total_videos) * 100);

            UsersCourses::where('user_id', $request->user_id)
            ->where('course_id', $request->course_id)
            ->update([
                "videos_total"=> $total_videos,
                "videos_completed"=> $completed_videos,
                "progress"=> $progress
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Video marked as completed",
                "data" => $video,
            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function markNotDone(Request $request){
        $rules = [
            "video_id" => "required",
            "course_id" => "required",
            "user_id" => "required",
        ];
        try {
            $request->validate($rules);
            $videoId = $request->input('video_id');
            $courseId = $request->input('course_id');
            $userId = $request->input('user_id');

            UsersVideos::where('video_id', $videoId)
                    ->where('course_id', $courseId)
                    ->where('user_id', $userId)
                    ->delete();

            //update progress in course
            $total_videos = CoursesVideos::where('course_id', $request->course_id)->get()->count();

            $completed_videos = UsersVideos::where('course_id', $request->course_id)
            ->where('user_id', $request->user_id)
            ->where("completed",1)
            ->get()->count();

            $progress = intval(($completed_videos / $total_videos) * 100);

            UsersCourses::where('user_id', $request->user_id)
            ->where('course_id', $request->course_id)
            ->update([
                "videos_total"=> $total_videos,
                "videos_completed"=> $completed_videos,
                "progress"=> $progress
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Video marked as not done",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getUsersProgress(Request $request){
        $rules = [
            "user_id" => "required",
            "course_id" => "required",
        ];
        try {
            $request->validate($rules);
            $progressRecord = UsersCourses::where('user_id', $request->user_id)
            ->where('course_id', $request->course_id)
            ->first();
            return response()->json([
                'status' => 200,
                'message' => "User's course progress retrieved",
                "data" => $progressRecord,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function addCourseResourse(Request $request){
        $rules = [
            "name" => "required",
            "course_id" => "required",
            "resource" => "required",
        ];
        try {
            $request->validate($rules);

            $data = $request->only("course_id", "name");

            $bannerPath = $this->storeCourseResourses($request);

            if (is_bool($bannerPath)) {
                // a boolean indicates an error
                return response()->json(
                    [
                        "status" => 500,
                        "message" => "Could not store course resource",
                        "data" => null
                    ], status: 500);
            }

            $resource = CourseResources::create([
                "name" => $data["name"],
                "course_id" => $data["course_id"],
                "resource" => $bannerPath
            ]);

            return response()->json([
                'status' => 201,
                'message' => "Successfully added course resource",
                "data" => $resource,

            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function updateCourseResourse(Request $request){
        $rules = [
            "id" => "required",
        ];
        $data = [];
        try {
            $request->validate($rules);

            if($request->name){
                $data["name"] = $request->name;
            }

            if($request->course_id){
                $data["course_id"] = $request->course_id;
            }

            if($request->resource){
                $bannerPath = $this->storeCourseResourses($request->resource);

                if (is_bool($bannerPath)) {
                    // a boolean indicates an error
                    return response()->json(
                        [
                            "status" => 500,
                            "message" => "Could not store course resoursce",
                            "data" => null
                        ], status: 500);
                }
            }

            $resource = tap(CourseResources::whereId($request->id))->update($data)->first();

            return response()->json([
                'status' => 201,
                'message' => "Successfully modified course resource",
                "data" => $resource,

            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function deleteCourseResourse(Request $request){
        $rules = [
            "id" => "required",
        ];

        try {
            $request->validate($rules);
            CourseResources::whereId($request->id)
                    ->delete();
            return response()->json([
                'status' => 201,
                'message' => "Successfully deleted course resource",

            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function storeCourseResourses(Request $request): bool|string
    {
        return Storage::url(Storage::disk('s3')->put("/course_resources", $request->file("resource"), "public"));

        // store the video
        //return $request->file("resource")->store("course_resources", "public");
    }

    public function getCourseResources($id){
        try {
            $resources = CourseResources::where("course_id",$id)->get();

            return response()->json([
                'status' => 201,
                'message' => "Successfully retrieved course resources",
                "data" => $resources,

            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getAllResources() {
        try {
            $resources = CourseResources::all();

            return response()->json([
                'status' => 201,
                'message' => "Successfully retrieved all resources",
                "data" => $resources,

            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function downloadFile($resourceId)
    {
        $resource = CourseResources::findOrFail($resourceId);

        if (!$resource) {
            return response()->json([
                'status' => 404,
                'message' => 'Resource not found',
            ], 404);
        }

        // Get the file path and original file name
        $filePath = $resource->resource;
        $originalFileName = $resource->name;

        if (!Storage::exists('public/' . $filePath)) {
            return response()->json([
                'status' => 404,
                'message' => 'File not found',
            ], 404);
        }

        $customFileName = $resourceId . '_' . $originalFileName;
        $headers = [
            'Content-Disposition' => 'attachment; filename="' . $customFileName . '"',
        ];

        return response()->download(storage_path('app/public/'.$filePath),$customFileName);

        // return Response::download(storage_path('app/public/' . $filePath), $customFileName, $headers);
    }

    public function download($assignments){

        return response()->download(public_path('assets/'.$assignments));
    }

    public function getCourseChannelDeets($course){
        try {
            $course = Courses::findOrFail($course);
            $channel = $course->channel()->get();

      return response()->json([
                'status' => 201,
                'message' => "Successfully retrieved course channel",
                "data" => $channel,

            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

}
