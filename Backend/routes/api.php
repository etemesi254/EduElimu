<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\SubscribersController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VideoCategoriesController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\VideoLikesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::fallback(function () {
    return response(["status" => 404, "description" => "not found", "data" => []], 404);

});

Route::group(['middleware' => 'auth:sanctum'], function () {
    //we will put our secure routes here

});

Route::post("/updateUserWithEmail/{email}", [UsersController::class, 'updateUserWithEmail']);
Route::post('/registerUser', [UsersController::class, 'register']);
Route::put("/updateUserWithNo/{number}", [UsersController::class, 'updateUserWithPhone']);
Route::get("/getCurrentUser", [UsersController::class, 'getCurrentUser']);
Route::delete('/deleteUser/{user}', [UsersController::class, 'deleteUser']);

Route::post("/uploads/upload_video", [VideoController::class, "addVideo"]);

Route::prefix("videos")->group(function () {
    Route::post("/delete", [VideoController::class, "deleteVideo"]);
    Route::post("/update", [VideoController::class, "updateChannelDetails"]);

    Route::any("/front", [VideoController::class, "getFrontVideos"]);
    Route::any("/all", [VideoController::class, "getAllVideos"]);
    Route::get("/channel/{id}", [VideoController::class, "getVideoChannel"]);
    Route::any("/like", [VideoLikesController::class, "likeVideo"]);
    Route::any("/likers", [VideoLikesController::class, "getVideoLikers"]);
    // NB: Should be the last
    Route::get("/{id}", [VideoController::class, "getUserVideos"]);

});


Route::prefix("channels")->group(function () {
    Route::post("/create", [ChannelController::class, "addChannel"]);
    Route::post("/create/firebase_id", [ChannelController::class, "addChannelWithFirebaseId"]);

    Route::any("/firebase_id", [ChannelController::class, "getChannelsWithFirebaseId"]);
    Route::any("/all", [ChannelController::class, "getAllChannels"]);
    Route::any("/delete", [ChannelController::class, "deleteChannel"]);
    Route::any("/update", [ChannelController::class, "updateChannelDetails"]);

    Route::get("/getChannelVideos/{channel}", [ChannelController::class, "getChannelVideos"]);
    Route::get("/getUserChannels/{user}", [ChannelController::class, "getUserChannels"]);
});

Route::prefix("categories")->group(
    function () {
        Route::delete("/delete", [VideoCategoriesController::class, "deleteVideoCategory"]);

        Route::post("/create", [VideoCategoriesController::class, "createCategory"]);
        Route::post("/update", [VideoCategoriesController::class, "updateVideoCategory"]);
        Route::post("/update", [VideoCategoriesController::class, "updateVideoCategory"]);

        Route::get("/all", [VideoCategoriesController::class, "listAllCategories"]);
        Route::get("/categoryDetails/{category}", [VideoCategoriesController::class, "getCategoryDetails"]);

        Route::any("/videos", [VideoCategoriesController::class, "listAllVideosForCategory"]);

    }
);

Route::prefix("subscribers")->group(function () {
    Route::any("subscribe", [SubscribersController::class, "subscribe"]);
    Route::any("getChannelSubscribers", [SubscribersController::class, "getChannelSubscribers"]);
    Route::any("unsubscribe", [SubscribersController::class, "unsubscribe"]);
});

Route::prefix("users")->group(function () {
    Route::any("/firebase_id", [UsersController::class, "getUserWithFirebaseId"]);
    Route::get("/all", [UsersController::class, "getAllUsers"]);
});
