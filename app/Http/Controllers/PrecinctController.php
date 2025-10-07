<?php
namespace App\Http\Controllers;

use App\Models\Precinct;
use Illuminate\Http\Request;

class PrecinctController extends Controller
{
    public function index()
    {
        return Precinct::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'precinctNumber' => 'required|string|max:50|unique:precincts,precinctNumber',
            'precinctName' => 'required|string|max:150',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'address' => 'required|string',
        ]);

        $precinct = Precinct::create($validated);

        return response()->json(['message' => 'Precinct created successfully', 'data' => $precinct]);
    }

    public function update(Request $request, $id)
    {
        $precinct = Precinct::findOrFail($id);

        $validated = $request->validate([
            'precinctNumber' => 'required|string|max:50',
            'precinctName' => 'required|string|max:150',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'address' => 'nullable|string',
        ]);

        $precinct->update($validated);

        return response()->json(['message' => 'Precinct updated successfully']);
    }

    public function destroy($id)
    {
        Precinct::destroy($id);
        return response()->json(['message' => 'Precinct deleted successfully']);
    }
}
