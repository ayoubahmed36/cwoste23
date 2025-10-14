<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequiredDocumentRegistration extends Model
{
    protected $table = 'required_document_registration';
    
    protected $fillable = [
        'required_document_id',
    ];

    public function requiredDocument()
    {
        return $this->belongsTo(RequiredDocument::class);
    }
}
