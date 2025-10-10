<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientReview extends Model
{
    protected $fillable = [
        'client_id',
        'admin_id',
        'status',
        'overall_note',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function issues()
    {
        return $this->hasMany(ClientReviewIssue::class, 'review_id');
    }
}
