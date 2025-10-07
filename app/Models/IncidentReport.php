<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidentReport extends Model
{
    use HasFactory;

    protected $table = 'incident_reports';   // table name
    protected $primaryKey = 'incidentId';   // primary key
    public $timestamps = false;             // no created_at & updated_at

    protected $fillable = [
        'reportID',
        'registrationId',
        'lat',
        'lng',
        'message',
        'status',
        'reportdate',
    ];

    /**
     * Relationship: IncidentReport belongs to a Registration
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class, 'registrationId', 'registrationId');
    }
}
