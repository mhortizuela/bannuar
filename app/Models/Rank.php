<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    protected $table = 'ranks_lookup';
    protected $primaryKey = 'rankId';
    public $timestamps = false;

    protected $fillable = ['rank'];

     public function police()
    {
        return $this->hasMany(Police::class, 'rankId', 'rankId');
    }
}