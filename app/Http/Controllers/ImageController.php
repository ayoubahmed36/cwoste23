<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function profileImage($userId)
    {

        $requestedUser = User::findOrFail($userId);
        $currentUser = Auth::user();
        
        // Authorization check
        $isOwner = $currentUser && $currentUser->id == $requestedUser->id;
        $isAdmin = $currentUser && $currentUser->role === 'admin';
        
        if (!$isOwner && !$isAdmin) {
            abort(403, 'Unauthorized access to image.');
        }
        
        // ✅ THE REAL FIX: Check if the stored path actually exists
        if (!$requestedUser->image) {
            abort(404, 'User has no profile image.');
        }
        
        // Check if the file exists at the stored path
        if (!Storage::disk('private')->exists($requestedUser->image)) {
            abort(404, 'Image file not found at: ' . $requestedUser->image);
        }

        return response()->file(Storage::disk('private')->path($requestedUser->image));
    }
}