<?php
namespace App\Http\Controllers;

use App\Models\Police;
use Illuminate\Http\Request;

class PoliceController extends Controller
{
    public function index()
    {
         return Police::with('precinct', 'rank')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pesAccount'     => 'required|string|max:150|unique:police,pesAccount',
            'access_token'   => 'nullable|string',
            'badgeNumber'    => 'required|string|max:50|unique:police,pesAccount',
            'lname'          => 'required|string|max:150',
            'fname'          => 'required|string|max:150',
            'mi'             => 'nullable|string|max:3',
            'ext'            => 'nullable|string|max:5',
            'rankId'         => 'required|exists:ranks_lookup,rankId',
            'contactNumber'  => 'nullable|string|max:50',
            'precinctId'     => 'required|exists:precincts,precinctId',
            
        ]);

        $police = Police::create($validated);

        return response()->json(['message' => 'Police record created successfully', 'data' => $police]);
    }

    public function update(Request $request, $id)
    {
        $police = Police::findOrFail($id);

        $validated = $request->validate([
            'pesAccount'     => 'required|string|max:150',
            'access_token'   => 'nullable|string',
            'badgeNumber'    => 'required|string|max:50',
            'lname'          => 'required|string|max:150',
            'fname'          => 'required|string|max:150',
            'mi'             => 'nullable|string|max:3',
            'ext'            => 'nullable|string|max:5',
            'rankId'         => 'required|exists:ranks_lookup,rankId',
            'contactNumber'  => 'nullable|string|max:50',
            'precinctId'     => 'required|exists:precincts,precinctId',
        ]);

        $police->update($validated);

        return response()->json(['message' => 'Police record updated successfully']);
    }

    public function destroy($id)
    {
        Police::destroy($id);

        return response()->json(['message' => 'Police record deleted']);
    }
}
