<?php

namespace App\Http\Controllers;

use App\Models\VideoCategories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class VideoCategoriesController extends Controller
{
    public function createCategory(Request $request): JsonResponse
    {
        $rules = [
            "name" => "required",
            "description" => "required",
            "banner" => "required",
            "status" => "required"
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

            // store in db
            $video = VideoCategories::create([
                "name" => $request->name,
                "description" => $request->description,
                "status" => $request->status,
                "banner" => $imagePath
            ]);

            return response()->json([
                'status' => 201,
                'message' => "Successfully created channel",
                "data" => $video,
            ], 201);
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

    public function storeBanner(Request $request): bool|string
    {
        // store the video
        return $request->file("banner")->store("categories_banner");
    }

    public function listAllCategories(Request $request){

        return VideoCategories::all();
    }
}
