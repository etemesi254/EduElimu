<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\UsersController;
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

Route::any("/channels/create", [ChannelController::class, "addChannel"]);
Route::put("/updateUserWithEmail/{email}", [UsersController::class, 'updateUserWithEmail']);
Route::post('/registerUser', [UsersController::class, 'register']);
Route::put("/updateUserWithNo/{number}", [UsersController::class, 'updateUserWithPhone']);
Route::get("/getCurrentUser", [UsersController::class, 'getCurrentUser']);

Route::any("/uploads/upload_video", [VideoUploaderController::class, "addVideo"]);
