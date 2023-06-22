<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;


class ChannelController extends Controller
{
    //
    public function addChannel(Request $request): \Illuminate\Http\JsonResponse
    {
        $rules = [
            "user_id" => "required",
            "name" => "required",
            "description" => "required",
        ];
        try {
            $request->validate($rules);

            $data = $request->only("user_id", "name", "description");
            $channel = Channel::create([
                "name" => $data["name"],
                "status" => 1,
                "user_id" => $data["user_id"],
                "subscribers" => 0,
                "description" => $data["description"],
                "banner"=>"TEMP"
            ]);

            return $channel;


        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }

    }
}
