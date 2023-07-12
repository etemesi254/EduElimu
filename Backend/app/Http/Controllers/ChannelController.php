<?php

namespace App\Http\Controllers;

use App\Models\Channel;
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

    //

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
            $id = $request->id;
            $channel = Channel::FindOrFail($id);
    
            $videos = $channel->videos();
    
            if($videos){
                foreach($videos as $video){
                    $video->delete();
                }
            }
            
            $deleteResp = Channel::destroy($request->id);
            $resp = [
                "status" => 200,
                "message" => "Successfully deleted channel",
                "data"=>$deleteResp
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
            "id" => "required|exists:channels",
        ];
        try {
            $request->validate($rules);

            if($request->name){
                $data["name"] = $request->name;
            }

            if($request->description){
                $data["description"] = $request->description;
            }

            if($request->status){
                $data["status"] = $request->status;
            }

            if($request->banner){
                $bannerPath = $this->storeChannelBanner($request->banner);

                if (is_bool($bannerPath)) {
                    // a boolean indicates an error
                    return response()->json(
                        [
                            "status" => 500,
                            "message" => "Could not store video",
                            "data" => null
                        ], status: 500);
                }
            }

            $channel = tap(Channel::whereId($request->id))->update($data)->first();

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

    public function getUserChannels($user){
        try {
            $user = User::findOrFail($user);
            $channels = $user->channels()->get();
            return response()->json(
                [
                    "status" => 200,
                    "message" => 'channels retrieved successfully',
                    "data" => $channels,
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

    public function getChannelVideos($channel){
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
