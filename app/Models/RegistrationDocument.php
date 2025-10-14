<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationDocument extends Model
{
    protected $fillable = [
        'original_name',
        'path',
        'user_id',
        'required_documents_id',
    ];

    public function requiredDocument()
    {
        return $this->belongsTo(RequiredDocument::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
