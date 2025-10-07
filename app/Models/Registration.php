<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $table = 'registration'; // change if table name is different
    protected $primaryKey = 'registrationId';
    public $timestamps = false; // disable timestamps since your table doesn't have created_at/updated_at

    protected $fillable = [
        'CP_NO',
        'surname',
        'firstname',
        'middlename',
        'otp',
        'isValidated',
    ];
    public function incidentReports()
    {
        return $this->hasMany(IncidentReport::class, 'registrationId', 'registrationId');
    }
}

