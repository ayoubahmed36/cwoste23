<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'original_name',
        'path',
        'status',
        'rejected_reason',
        'order_id',
        'required_documents_id',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function requiredDocument()
    {
        return $this->belongsTo(RequiredDocument::class);
    }
}
