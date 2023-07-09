<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VideoCategoriesController;
use App\Http\Controllers\VideoUploaderController;
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

Route::put("/updateUserWithEmail/{email}", [UsersController::class, 'updateUserWithEmail']);
Route::post('/registerUser', [UsersController::class, 'register']);
Route::put("/updateUserWithNo/{number}", [UsersController::class, 'updateUserWithPhone']);
Route::get("/getCurrentUser", [UsersController::class, 'getCurrentUser']);

Route::any("/uploads/upload_video", [VideoUploaderController::class, "addVideo"]);

Route::any("/videos/all", [VideoUploaderController::class, "getAllVideos"]);

Route::prefix("channels")->group(function () {
    Route::any("/create", [ChannelController::class, "addChannel"]);
    Route::any("/firebase_id", [ChannelController::class, "getChannelsWithFirebaseId"]);
});


Route::post("/categories/create", [VideoCategoriesController::class, "createCategory"]);
Route::get("/categories/all", [VideoCategoriesController::class, "listAllCategories"]);


Route::any("/users/firebase_id", [UsersController::class, "getUserWithFirebaseId"]);
