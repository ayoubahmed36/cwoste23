<?php

namespace App\Http\Controllers;

use App\Models\RegistrationDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display/serve a protected document
     */
    public function show(RegistrationDocument $document)
    {
        $user = auth()->user();
        
        // Authorization: admin or document owner
        if ($user->role !== 'admin' && $document->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this document');
        }
        
        // Check if file exists using Storage disk
        if (!Storage::disk('private')->exists($document->path)) {
            abort(404, 'Document file not found');
        }
        
        $filePath = Storage::disk('private')->path($document->path);
        
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $document->original_name . '"',
        ]);
    }
    
    /**
     * Replace an existing document
     */
    public function replace(Request $request, RegistrationDocument $document)
    {
        $user = auth()->user();
        
        // Only admin can replace documents
        if ($user->role !== 'admin') {
            abort(403, 'Only administrators can replace documents');
        }
        
        $request->validate([
            'file' => ['required', 'file', 'mimes:pdf', 'max:2048'], // 2MB max
        ]);
        
        // Delete old file
        if (Storage::disk('private')->exists($document->path)) {
            Storage::disk('private')->delete($document->path);
        }
        
        // Store new file
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs(
            "cwoste_uploads/clients/{$document->user_id}/registration_documents",
            $fileName,
            'private'
        );
        
        // Update document record
        $document->update([
            'original_name' => $file->getClientOriginalName(),
            'path' => $filePath,
        ]);
        
        return back()->with('success', 'تم استبدال الملف بنجاح');
    }
}
