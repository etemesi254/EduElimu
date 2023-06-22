<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], 404);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function updateUserWithPhone($phone_number)
    {
        try {
            $updated_user = User::where('phone_number', $phone_number)->update([
                'name' => request()->name,
                'email' => request()->email,
                'profile_image' => request()->profile_image,
                'DOB' => request()->DOB,
            ]);
            return response()->json([
                'status' => 201,
                'message' => 'User updated successfully',
                'data' => $updated_user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $rules = [
                "name" => "required",
                "phone_number" => "required",
                "profile_image" => "required",
                "DOB" => "required",
                "email" => "required",
                "password" => "required",
                "firebase_id"=>"required",
            ];
            $request->validate($rules);

            $user = User::create([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'profile_image' => $request->profile_image,
                'DOB' => $request->DOB,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'firebase_id'=>$request->firebase_id,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'User created successfully',
                'data' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateUserWithEmail($email)
    {
        $updated_user = [];
        if (request()->phone_number) {
            $updated_user['phone_number'] = request()->phone_number;
        }
        if (request()->name) {
            $updated_user['name'] = request()->name;
        }

        if (request()->profile_image) {
            $updated_user['profile_image'] = request()->profile_image;
        }

        if (request()->DOB) {
            $updated_user['DOB'] = request()->DOB;
        }
        try {
            User::where('email', $email)->update($updated_user);
            return response()->json([
                'status' => 201,
                'message' => 'User updated successfully',
                'data' => $updated_user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function getCurrentUser()
    {
        try {
            if (request()->has('email')) {
                $user = User::where('email', request()->email)->first();

                if ($user) {
                    return response()->json([
                        'status' => 201,
                        'data' => $user
                    ], 201);
                } else {
                    // Handle the case when the user is not found
                    return response()->json(['message' => 'User not found'], 404);
                }
            }

            if (request()->has('phone_number')) {
                $user = User::where('phone_number', request()->phone_number)->first();

                if ($user) {
                    return response()->json([
                        'status' => 201,
                        'data' => $user
                    ], 201);
                } else {
                    // Handle the case when the user is not found
                    return response()->json(['message' => 'User not found'], 404);
                }
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

}
