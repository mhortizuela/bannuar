<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Police extends Model
{
    use HasFactory;

    protected $primaryKey = 'policeId';
    public $timestamps = false;

    protected $fillable = [
        'pesAccount',
        'access_token',
        'policeId',
        'badgeNumber',
        'lname',
        'fname',
        'mi',
        'ext',
        'rankId',
        'contactNumber',
        'precinctId',
    ];

    // Relationship: One police officer can have one system user (dispatch)
    public function systemUser()
    {
        return $this->hasOne(SystemUser::class, 'policeId', 'policeId');
    }
    public function rank()
    {
        return $this->belongsTo(Rank::class, 'rankId', 'rankId');
    }

    public function precinct()
    {
        return $this->belongsTo(Precinct::class, 'precinctId', 'precinctId');
    }
    
}
