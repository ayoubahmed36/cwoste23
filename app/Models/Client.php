<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'user_id',
        'ccp',
        'first_name',
        'last_name',
        'phone',
        'date_of_birth',
        'gender',
        'marital_status',
        'nb_children',
        'job_status',
        'job_title',
        'work_institution',
        'postal_cheque',
        'proof_certificate',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'orders');
    }
}
