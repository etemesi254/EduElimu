<?php

namespace App\Http\Controllers;

use App\Models\Videos;
use Illuminate\Http\Request;

class VideoUploaderController extends Controller
{
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
                "status" => $request->status,
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
        return $request->file("image_banner")->store("image_banner","public");
    }

    public function storeVideo(Request $request): bool|string
    {
        // store the video
        return $request->file("video")->store("videos","public");
    }

    public function getAllVideos(Request $request)
    {
        return response()->json(data: Videos::all(), status: 200);
    }
}
