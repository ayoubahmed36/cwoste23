<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientReviewIssue extends Model
{
    protected $fillable = [
        'review_id',
        'field_name',
        'issue_detail',
        'resolved_at',
    ];

    public function review()
    {
        return $this->belongsTo(ClientReview::class, 'review_id');
    }
}
