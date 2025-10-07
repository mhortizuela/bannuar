<?php
namespace App\Http\Controllers;

use App\Models\Rank;
use Illuminate\Http\Request;

class RankController extends Controller
{
    public function index()
    {
        return Rank::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rank' => 'required|string|max:50|unique:ranks_lookup,rank',
        ]);

        $rank = Rank::create($validated);

        return response()->json(['message' => 'Rank created successfully', 'data' => $rank]);
    }

    public function update(Request $request, $id)
    {
        $rank = Rank::findOrFail($id);

        $validated = $request->validate([
            'rank' => 'required|string|max:50|unique:ranks_lookup,rank,' . $id . ',rankId',
        ]);

        $rank->update($validated);

        return response()->json(['message' => 'Rank updated successfully']);
    }

    public function destroy($id)
    {
        Rank::destroy($id);

        return response()->json(['message' => 'Rank deleted successfully']);
    }
}
