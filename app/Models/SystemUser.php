<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class SystemUser extends Authenticatable
{
    protected $table = 'system_user';
    protected $primaryKey = 'userId';
    public $timestamps = false;

    protected $fillable = [
        'username',
        'password',
        'role',
        'policeId',
        'isActive',
    ];

    protected $hidden = [
        'password',
    ];

    // Relationship: Each system user belongs to a police record
    public function police()
    {
        return $this->belongsTo(Police::class, 'policeId', 'policeId');
    }
   public function precinct()
    {
        return $this->hasOneThrough(
            Precinct::class, // Final model you want to reach
            Police::class,   // Intermediate model
            'policeId',      // Foreign key on Police (intermediate) table
            'precinctId',    // Foreign key on Precinct (final) table
            'policeId',      // Local key on SystemUser
            'precinctId'     // Local key on Police
        );
    }
    public function deployments()
    {
        return $this->hasMany(Deployment::class, 'userId', 'userId');
    }
   
}
