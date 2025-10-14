<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationDocument extends Model
{
    protected $fillable = [
        'original_name',
        'path',
        'user_id',
        'required_document_registration_id',
    ];

    public function requiredDocumentRegistration()
    {
        return $this->belongsTo(RequiredDocumentRegistration::class);
    }
    
    // Helper to get the actual required document through the pivot
    public function requiredDocument()
    {
        return $this->hasOneThrough(
            RequiredDocument::class,
            RequiredDocumentRegistration::class,
            'id', // Foreign key on required_document_registration table
            'id', // Foreign key on required_documents table
            'required_document_registration_id', // Local key on registration_documents table
            'required_document_id' // Local key on required_document_registration table
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
