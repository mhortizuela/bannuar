<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeploymentMember extends Model
{
    protected $primaryKey = 'memberId';
    public $timestamps = false;
    protected $fillable = ['deploymentId', 'policeId', 'current_lat', 'current_lng','role'];
    public function deployment()
    {
        return $this->belongsTo(Deployment::class);
    }
    public function police()
    {
        return $this->belongsTo(Police::class, 'policeId')->with('rank');
    }
}


