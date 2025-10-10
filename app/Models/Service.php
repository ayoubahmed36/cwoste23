<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'service_type_id',
        'active',
        'description',
        'config',
        'rules_file',
        'form_file',
    ];

    public function requiredDocuments()
    {
        return $this->belongsToMany(RequiredDocument::class);
    }

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class);
    }
}