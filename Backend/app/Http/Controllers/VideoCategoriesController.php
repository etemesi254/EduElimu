<?php

namespace App\Http\Controllers;

use App\Models\VideoCategories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                // "status" => $request->status,
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
        return $request->file("banner")->store("categories_banner", "public");
    }

    public function listAllCategories(Request $request)
    {
        try {
            $categories = DB::select("select * from video_categories where status=1");
            return response()->json(
                [
                    "status" => 200,
                    "message" => "Retrieved Video Categories successfully",
                    "data" => $categories
                ], status: 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    "status" => 500,
                    "message" => "Could not retrieve video categories",
                    "data" => null
                ], status: 500);
        }
    }

    public function listAllVideosForCategory(Request $request)
    {
        $rules = [
            "category_id" => "required|integer",
        ];

        try {
            $request->validate($rules);
            $result = DB::select("select videos.* from videos inner join video_categories vc on videos.category = vc.id where vc.id=" . $request->category_id);
            $response = [
                "status" => 200,
                "message" => "Successful",
                "data" => $result,
            ];
            return response($response, 200);

        } catch (Exception $e) {
            return response()->json(
                [
                    "status" => 422,
                    "message" => $e->getMessage(),
                    "data" => null
                ], status: 422);
        }
    }

    public function deleteVideoCategory(Request $request)
    {
        $rules = [
            "id" => "required|integer|exists:video_categories"
        ];
        try {
            $request->validate($rules);
            $deleteResp = VideoCategories::destroy($request->id);
            $resp = [
                "status" => 200,
                "message" => "Successfully deleted video category",
            ];
            return response($resp, 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 422,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function updateVideoCategory(Request $request)
    {
        $rules = [
            "name" => "required",
            "description" => "required",
            "banner" => "required",
            "id" => "required|exists:video_categories"
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
            $video = tap(VideoCategories::whereId($request->id))->update([
                "name" => $request->name,
                "description" => $request->description,
                // "status" => $request->status,
                "banner" => $imagePath
            ])->first();

            return response()->json([
                'status' => 200,
                'message' => "Successfully updated video category",
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

    public function getCategoryDetails($categories)
    {
        try {
            $category = VideoCategories::findOrFail($categories);

            return response()->json([
                'status' => 200,
                'message' => "Successfully retrieved video category",
                "data" => $category,
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

    public function updateCategoryStatus(Request $request)
    {
        $rules = [
            "status" => "required",
            "id" => "required|exists:video_categories"
        ];
        try {
            $request->validate($rules);
            $category = VideoCategories::findOrFail($request->id);
            $category->status = $request->status;
            $category->save();
            return response()->json([
                "status" => 200,
                "message" => "Successfully modified category status"
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
}
