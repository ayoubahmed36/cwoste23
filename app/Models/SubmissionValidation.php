<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmissionValidation extends Model
{
    use HasFactory;

    protected $fillable = [
        'submission_id',
        'field_name',
        'status',
        'admin_message',
        'validated_by',
        'validated_at',
    ];

    protected $casts = [
        'validated_at' => 'datetime',
    ];

    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'validated_by');
    }
}
