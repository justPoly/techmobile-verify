<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NccApproved extends Model
{
    use HasFactory;

    protected $table = 'ncc_approved';

    protected $fillable = [
        'sn', 'applicant', 'certificate_holder', 'equipment_name', 
        'models', 'manufacturer', 'last_updated'
    ];
}