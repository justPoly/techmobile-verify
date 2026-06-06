<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityReport extends Model
{
    use HasFactory;

    protected $table = 'community_reports';

    protected $fillable = [
        'brand', 'phone_model', 'device_status', 'full_name', 'email',
        'phone_source', 'additional_info', 'photo1', 'photo2', 'status',
        'reviewed_by', 'reviewed_at', 'admin_notes'
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
    ];
}