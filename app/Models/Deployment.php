<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    protected $primaryKey = 'deploymentId';
    public $timestamps = false;

    protected $fillable = [
        'precinctId', 'deploymentNumber','userId', 'description', 'lat', 'lng',
        'deploymentAddress', 'fireArms', 'comDevices', 'patrolBodyNumber',
        'startDate', 'endDate', 'status','type'
    ];

    public function officer()
    {
        return $this->belongsTo(Police::class, 'policeId');
    }
    public function precinct()
    {
        return $this->belongsTo(Precinct::class, 'precinctId');
    }
     public function dispatch()
    {
        return $this->belongsTo(SystemUser::class, 'userId');
    }
    public function members()
    {
        return $this->hasMany(DeploymentMember::class, 'deploymentId');
    }
}

