<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Precinct extends Model
{
    use HasFactory;

    protected $primaryKey = 'precinctId';
    public $timestamps = false;

    protected $fillable = [
        'precinctNumber',
        'precinctName',
        'lat',
        'lng',
        'address',
    ];

    public function police()
    {
        return $this->hasMany(Police::class, 'precinctId', 'precinctId');
        // Police model | Foreign key on Police table | Local key on this model
    }
    
}

