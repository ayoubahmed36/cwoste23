<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;


class Order extends Pivot
{
    protected $table = 'orders';

    protected $fillable = [
        'client_id',
        'service_id',
        'status',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

}
