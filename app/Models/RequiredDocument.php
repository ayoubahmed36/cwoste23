<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequiredDocument extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function services()
    {
        return $this->belongsToMany(Service::class);
    }
}