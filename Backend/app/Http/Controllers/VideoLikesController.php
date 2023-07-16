<?php

namespace App\Http\Controllers;

use App\Models\VideoDislikes;
use App\Models\VideoLikes;
use App\Models\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideoLikesController extends Controller
{
    //
    public function likeVideo(Request $request): \Illuminate\Http\JsonResponse
    {

        $rules = [
            "video_id" => "required|exists:videos,id",
            "user_id" => "required|exists:users,id",
        ];

        try {
            $request->validate($rules);

            // create the subscriber relationship
            $details = VideoLikes::create([
                "video_id" => $request->video_id,
                "user_id" => $request->user_id,
            ]);
            $video = Videos::findOrFail($request->video_id);
            $video->likes += 1;
            $video->save();

            return response()->json(["status" => 200,
                "message" => "Successfully liked " . $video->name,
                "data" => [$video]
            ], status: 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
                "data" => null
            ], 500);
        }
    }

    public function dislikeVideo(Request $request): \Illuminate\Http\JsonResponse
    {

        $rules = [
            "video_id" => "required|exists:videos,id",
            "user_id" => "required|exists:users,id",
        ];

        try {
            $request->validate($rules);

            // create the subscriber relationship
            $details = VideoDislikes::create([
                "video_id" => $request->video_id,
                "user_id" => $request->user_id,
            ]);
            $video = Videos::findOrFail($request->video_id);
            $video->dislikes += 1;
            $video->save();

            return response()->json(["status" => 200,
                "message" => "Successfully disliked " . $video->name,
                "data" => [$video]
            ], status: 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
                "data" => null
            ], 500);
        }
    }
    public function getVideoLikers(Request $request)
    {
        try {


            $rules = [
                "id" => "required|exists:videos,id",
            ];
            $request->validate($rules);
            $result = DB::select("select users.name,users.email,users.phone_number,users.profile_image from users inner join video_likes c on users.id = c.user_id where  c.video_id = " . $request->id);
            return response()->json(
                [
                    "status" => 200,
                    "message" => "Successfully fetched video likers for video",
                    "data" => $result
                ]
            );

        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

}
