<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;


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

    public function storeChannelBanner(Request $request): bool|string
    {
        // store the video
        return $request->file("channel_banner")->store("channel_banners", "public");
    }

    //

    public function addChannelWithFirebaseId(Request $request)
    {
        $rules = [
            "firebase_id" => "required|exists:users",
            "name" => "required",
            "description" => "required",
            "channel_banner" => "required",
        ];
        try {
            $request->validate($rules);

            $data = $request->only("user_id", "name", "description");

            $bannerPath = $this->storeChannelBanner($request);

            $user = User::where("firebase_id", "=", $request->firebase_id)->firstOrFail();
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
                "user_id" => $user->id,
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

    public function getChannelsWithFirebaseId(Request $request)
    {
        $rules = [
            "firebase_id" => "required",
        ];
        try {

            $request->validate($rules);

            $data = DB::select("select channels.* from eduelimu.channels inner join eduelimu.users on users.id = channels.user_id  where users.firebase_id = '" . $request->firebase_id . "'");
            $response = [
                "status" => 200,
                "message" => "Successful",
                "data" => $data,
            ];
            return response($response, 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getAllChannels(): array
    {
        $response = [
            "status" => 200,
            "message" => "Successful",
            "data" => Channel::all(),
        ];
        return $response;
    }

    public function deleteChannel(Request $request)
    {
        $rules = [
            "id" => "required|integer|exists:channels"
        ];
        try {
            $request->validate($rules);
            $deleteResp = Channel::destroy($request->id);
            $resp = [
                "status" => 200,
                "message" => "Successfully deleted channel",
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
        $rules = [
            "name" => "required",
            "description" => "required",
            "channel_banner" => "required",
            "id" => "required|exists:channels",
            "status" => "required"
        ];
        try {
            $request->validate($rules);

            $data = $request->only("status", "name", "description");

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


            $channel = tap(Channel::whereId($request->id))->update([
                "name" => $data["name"],
                "status" => $data["status"],
                "description" => $data["description"],
                "banner" => $bannerPath
            ])->first();

            return response()->json([
                'status' => 200,
                'message' => "Successfully modified channel",
                "data" => $channel,

            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function getChannelVideos($channel)
    {
        try {
            $channel = Channel::findOrFail($channel);

            $videos = $channel->videos()->get();

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
}
