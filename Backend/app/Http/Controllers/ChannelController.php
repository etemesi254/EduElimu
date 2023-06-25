<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;


class ChannelController extends Controller
{


    public function addChannel(Request $request)
    {
        $rules = [
            "user_id" => "required",
            "name" => "required",
            "description" => "required",
            "channel_banner" => "required",
        ];
        try {
            $request->validate($rules);

            $data = $request->only("user_id", "name", "description");

            $bannerPath = $this->storeChannelBanner($request);

            if (is_bool($bannerPath)) {
                // a boolean indicates an error
                return response()->json(
                    [
                        "status" => 500,
                        "message" => "Could not store video",
                        "data" => null
                    ], status: 500);
            }

            $channel = Channel::create([
                "name" => $data["name"],
                "status" => 1,
                "user_id" => $data["user_id"],
                "subscribers" => 0,
                "description" => $data["description"],
                "banner" => $bannerPath
            ]);

            return response()->json([
                'status' => 201,
                'message' => "Successfully created channel",
                "data" => $channel,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    //

    public function storeChannelBanner(Request $request): bool|string
    {
        // store the video
        return $request->file("channel_banner")->store("channel_banners");
    }
}
