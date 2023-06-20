<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UsersController;
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

Route::post("/signup", function (Request $request) {
    $request_data = json_decode($request->getContent(), true);
    $msg = [];
    $status = 200;

    if ($request_data == null) {
        $msg = ["status" => 400, "description" => "unprocessable entry", "data" => []];
        $status = 400;
    } else {
        $rules = [
            "email" => "required|unique:users",
            "name" => "required|min:6",
            "password" => "required",
            "dob" => "required",
        ];
        try {
            $request->validate($rules);
            $user = new User;

            $user = User::create([
                    'name' => $request_data['name'],
                    'email' => $request_data['email'],
                    'password' => Hash::make($request_data['password']),
                    'dob' => $request_data['dob'],
                    'status' => 1
                ]
            );
            $token = $user->createToken($request_data["name"]);
            $msg = ["status" => 200, "description" => "okay", "data" => ["token" => $token->plainTextToken]];

        } catch (Exception $e) {
            $msg = ["status" => 500, "description" => $e->getMessage(), "data" => ["token" => ""]];
            $status = 500;

        }
    }
    return response($msg, $status);
});

Route::post("/login", function (Request $request) {
    $rules = [
        "password" => "required",
        "email" => "required",
    ];
    $msg = [];
    $status = 200;
    try {
        $request->validate($rules);
        $credentials = $request->only("email", "password");
        if (Auth::attempt($credentials)) {
            $id = Auth::id();
            $currentUser = User::find($id);

            $token = $currentUser->createToken($currentUser->name);
            $currentUser->setRememberToken($token);
            $msg = ["status" => 200, "description" => "okay", "data" => ["token" => $token->plainTextToken]];
        } else {
            $msg = ["status" => 401, "description" => "unauthorized", "data" => []];
            $status = 401;
        }
    } catch (Exception $e) {
        $msg = ["status" => 401, "description" => $e->getMessage(), "data" => []];
        $status = 401;
    }
    return response($msg, $status);

});

Route::fallback(function () {
    return response(["status" => 404, "description" => "not found", "data" => []], 404);

});


Route::put("/updateUserWithEmail/{email}", [UsersController::class, 'updateUserWithEmail']);
Route::post('/registerUser', [UsersController::class, 'register']);
Route::put("/updateUserWithNo/{number}", [UsersController::class, 'updateUserWithPhone']);
Route::get("/getCurrentUser", [UsersController::class, 'getCurrentUser']);