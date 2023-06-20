<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function updateUserWithPhone($phone_number){
        try {
            $updated_user = User::where('phone_number', $phone_number)->update([
                'name' => request()->name,
                'email' => request()->email,
                'profile_image' => request()->profile_image,
                'DOB' => request()->DOB,
            ]);
            return response()->json([
                'status'=>201,
                'message'=>'User updated successfully',
                'data'=>$updated_user
            ],201); 
        } catch (\Throwable $th) {
            return response()->json([
                'status'=>500,
                'message'=>$th->getMessage(),
            ],500); 
        }
    }

    public function register(){
       try {
        $user = User::create([
            'name' => request()->name,
            'phone_number' => request()->phone_number,
            'profile_image' => request()->profile_image,
            'DOB' => request()->DOB,
            'email' => request()->email,
        ]);
        return response()->json([
            'status'=>200,
            'message'=>'User updated successfully',
            'data'=>$user
        ],200); 
       } catch (\Throwable $th) {
        return response()->json([
            'status'=>500,
            'message'=>$th->getMessage(),
        ],500); 
       }
    }

    public function updateUserWithEmail($email){
        try {
            $updated_user = User::where('email', $email)->update([
                'name' => request()->name,
                'phone_number' => request()->phone_number,
                'profile_image' => request()->profile_image,
                'DOB' => request()->DOB,
            ]);
            return response()->json([
                'status'=>201,
                'message'=>'User updated successfully',
                'data'=>$updated_user
            ],201); 
        } catch (\Throwable $th) {
            return response()->json([
                'status'=>500,
                'message'=>$th->getMessage(),
            ],500); 
        }
    }

    public function getCurrentUser() {
        try {
            if (request()->has('email')) {
                $user = User::where('email', request()->email)->first();
        
                if ($user) {
                    return  response()->json([
                        'status'=>201,
                        'data'=>$user
                    ],201); 
                } else {
                    // Handle the case when the user is not found
                    return response()->json(['message' => 'User not found'], 404);
                }
            } 
    
            if (request()->has('phone_number')) {
                $user = User::where('phone_number', request()->phone_number)->first();
        
                if ($user) {
                    return  response()->json([
                        'status'=>201,
                        'data'=>$user
                    ],201); 
                } else {
                    // Handle the case when the user is not found
                    return response()->json(['message' => 'User not found'], 404);
                }
            } 
        } catch (\Throwable $th) {
            return response()->json([
                'status'=>500,
                'message'=>$th->getMessage(),
            ],500); 
        }
    }
    
}
