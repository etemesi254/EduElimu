<?php

namespace App\Http\Controllers;


use App\Models\Channel;
use App\Models\Subscribers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscribersController extends Controller
{
    public function subscribe(Request $request)
    {

        $rules = [
            "channel_id" => "required|exists:channels,id",
            "user_id" => "required|exists:users,id",
        ];
        try {
            $request->validate($rules);

            // create the subscriber relationship
            $details = Subscribers::create([
                "channel_id" => $request->channel_id,
                "user_id" => $request->user_id,
            ]);
            // Then increment the channel subscriber count
            // store in db
            $channel = Channel::findOrFail($request->channel_id);
            $channel->subscribers += 1;
            $channel->save();

            return response()->json(["status" => 200,
                "message" => "Successfully subscribed to " . $channel->name,
                "data" => [$details]
            ], status: 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getChannelSubscribers(Request $request)
    {
        try {


            $rules = [
                "id" => "required|exists:channels,id",
            ];
            $request->validate($rules);
            $result = DB::select("select users.name,users.email,users.phone_number,users.profile_image from users inner join channels c on users.id = c.user_id where  c.id = " . $request->id);
            return response()->json(
                [
                    "status" => 200,
                    "message" => "Successfully fetched users for channel",
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

    public function unsubscribe(Request $request)
    {
        $rules = [
            "channel_id" => "required|exists:channels,id",
            "user_id" => "required|exists:users,id",
        ];
        try {
            $request->validate($rules);

            // create the subscriber relationship
            $details = Subscribers::where("channel_id", $request->channel_id)->where("user_id", $request->user_id);
            if ($details != null) {
                // Then increment the channel subscriber count
                // store in db
                $channel = Channel::findOrFail($request->channel_id);
                $channel->subscribers -= 1;
                $channel->save();

                $details->delete();
                return response()->json(["status" => 200,
                    "message" => "Successfully unsubscribed from " . $channel->name,
                    "data" => []
                ], status: 200);
            } else {
                return response()->json(["status" => 404,
                    "message" => "User not subscribed to channel",
                    "data" => null
                ], status: 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
