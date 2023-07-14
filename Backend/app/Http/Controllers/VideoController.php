<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VideoCategories;
use App\Models\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class VideoController extends Controller
{

    public function updateStatus(Request $request){
        $rules = [
            "status" => "required",
            "id" => "required|exists:videos"
        ];
        try {
            $request->validate($rules);
            $category = Videos::findOrFail($request->id);
            $category->status = $request->status;
            $category->save();
            return response()->json([
                "status" => 200,
                "message" => "Successfully modified video status"
            ]);

        } catch (Exception $e) {
            return response()->json(
                [
                    "status" => 422,
                    "message" => $e->getMessage(),
                    "data" => null
                ], status: 422);
        }
    }
    //
    public function addVideo(Request $request)
    {
        // get name and channel id
        $rules = [
            "name" => "required",
            "channel_id" => "required",
            "description" => "required",
            "video" => "required",
            "image_banner" => "required",
        ];

        try {
            $request->validate($rules);

            // store banner image and video
            $imagePath = $this->storeBanner($request);
            if (is_bool($imagePath)) {
                // a boolean indicates an error
                return response()->json(
                    [
                        "status" => 500,
                        "message" => "Could not store image banner",
                        "data" => null
                    ], status: 500);
            }
            $videoPath = $this->storeVideo($request);
            if (is_bool($videoPath)) {
                // a boolean indicates an error
                return response()->json(
                    [
                        "status" => 500,
                        "message" => "Could not store video",
                        "data" => null
                    ], status: 500);
            }
            // store in db
            $video = Videos::create([
                "name" => $request->name,
                "channel_id" => $request->channel_id,
                "description" => $request->description,
                "view_count" => 0,
                "status" => 1,
                "file_url" => $videoPath,
                "banner_url" => $imagePath
            ]);

            return response()->json([
                'status' => 201,
                'message' => "Successfully uploaded video",
                "data" => $video,

            ], 201);

        } catch (\Exception $e) {
            return response()->json(
                [
                    "status" => 500,
                    "message" => $e->getMessage(),
                    "data" => null
                ], status: 500);
        }


    }

    public function storeBanner(Request $request): bool|string
    {
        // store the video
        return $request->file("image_banner")->store("image_banner", "public");
    }

    public function storeVideo(Request $request): bool|string
    {
        // store the video
        return $request->file("video")->store("videos", "public");
    }

    public function getFrontVideos(Request $request)
    {
        $data = DB::select("select videos.name as video_name,videos.view_count as video_views, videos.id as video_id,videos.banner_url as video_banner, videos.file_url as video_file,c.id as channel_id, c.name as channel_name,c.banner as channel_banner,u.name as user_name, u.profile_image as user_profile,u.id as user_id,videos.created_at as created from videos inner join channels c on videos.channel_id = c.id inner  join  users u on c.user_id = u.id where videos.status =1");
        //$videos = Videos::all();
        return response()->json(
            [
                "status" => 200,
                "message" => 'videos retrieved successfully',
                "data" => ["videos" => $data]
            ], status: 200);
    }

    public function getAllVideos(Request $request)
    {
        $videos = Videos::all();
        return response()->json(
            [
                "status" => 200,
                "message" => 'videos retrieved successfully',
                "data" => $videos
            ], status: 200);
    }

    public function getUserVideos($user)
    {

        try {
            $user = User::findOrFail($user);
            $channels = $user->channels()->with('videos')->get();

            $videos = [];
            foreach ($channels as $channel) {
                $videos = array_merge($videos, $channel->videos->toArray());
            }

            return response()->json(
                [
                    "status" => 200,
                    "message" => 'videos retrieved successfully',
                    "data" => $videos
                ], status: 200);
        } catch (\Exception $e) {
            return response()->json(
                [
                    "status" => 500,
                    "message" => $e->getMessage(),
                    "data" => null
                ], status: 500);
        }
    }


    public function getVideoChannel($video_id)
    {
        try {
            $video = Videos::findOrFail($video_id);
            $channel = $video->channel()->get()->first();
            return response()->json(
                [
                    "status" => 200,
                    "message" => 'channel retrieved successfully',
                    "data" => $channel
                ], status: 200);
        } catch (\Exception $e) {
            return response()->json(
                [
                    "status" => 500,
                    "message" => $e->getMessage(),
                    "data" => null
                ], status: 500);
        }
    }

    public function deleteVideo(Request $request)
    {
        $rules = [
            "id" => "required|integer|exists:videos"
        ];
        try {
            $request->validate($rules);
            $deleteResp = Videos::destroy($request->id);
            $resp = [
                "status" => 200,
                "message" => "Successfully deleted video",
                "data" => $deleteResp
            ];
            return response($resp, 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    function updateChannelDetails(Request $request)
    {
        $data = [];
        $rules = [
            "id" => "required|exists:videos",
        ];
        try {
            $request->validate($rules);

            if ($request->name) {
                $data["name"] = $request->name;
            }

            if ($request->category) {
                $data["category"] = $request->category;
            }

            if ($request->channel_id) {
                $data["channel_id"] = $request->channel_id;
            }

            if ($request->view_count) {
                $data["view_count"] = $request->view_count;
            }

            if ($request->description) {
                $data["description"] = $request->description;
            }

            if ($request->status) {
                $data["status"] = $request->status;
            }

            if ($request->image_banner) {
                $bannerPath = $this->storeBanner($request);


                if (is_bool($bannerPath)) {
                    // a boolean indicates an error
                    return response()->json(
                        [
                            "status" => 500,
                            "message" => "Could not store video banner",
                            "data" => null
                        ], status: 500);
                }

                $data["banner_url"] = $bannerPath;
            }

            if ($request->video) {
                $filePath = $this->storeVideo($request);

                if (is_bool($filePath)) {
                    // a boolean indicates an error
                    return response()->json(
                        [
                            "status" => 500,
                            "message" => "Could not store video",
                            "data" => null
                        ], status: 500);
                }

                $data["file_url"] = $filePath;
            }

            $video = tap(Videos::whereId($request->id))->update($data)->first();

            return response()->json([
                'status' => 200,
                'message' => "Successfully modified video",
                "data" => $video,
                "prev" => $data

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

}
