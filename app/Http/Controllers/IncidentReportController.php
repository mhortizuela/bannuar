<?php

namespace App\Http\Controllers;

use App\Models\IncidentReport;
use Illuminate\Http\Request;

class IncidentReportController extends Controller
{
    /**
     * Display a listing of the incident reports (with optional filtering).
     */
    public function index(Request $request)
    {
        $status = $request->query('status'); 

        $query = IncidentReport::with('registration');

        if ($status && strtolower($status) !== 'all') {
            $query->where('status', $status);
        }

        $incidents = $query->get();

        return response()->json([
            'success' => true,
            'incidents' => $incidents
        ]);
    }

    /**
     * Store a newly created incident report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'registrationId' => 'required|integer|exists:registrations,registrationId',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'message' => 'required|string',
            'status' => 'required|string|max:50',
            'reportdate' => 'nullable|date',
        ]);

        $incident = IncidentReport::create($validated);

        return response()->json(['message' => 'Incident report created successfully.'], 201);
    }

    /**
     * Display the specified incident report.
     */
    public function show($id)
    {
        $incident = IncidentReport::with('registration')->findOrFail($id);
        return $incident;
    }

    /**
     * Update the specified incident report.
     */
    public function update(Request $request, $id)
    {
        $incident = IncidentReport::findOrFail($id);

        $validated = $request->validate([
            'registrationId' => 'sometimes|integer|exists:registrations,registrationId',
            'lat' => 'sometimes|numeric',
            'lng' => 'sometimes|numeric',
            'message' => 'sometimes|string',
            'status' => 'sometimes|string|max:50',
            'reportdate' => 'nullable|date',
        ]);

        $incident->update($validated);

        return response()->json(['message' => 'Incident report updated successfully.']);
    }

    /**
     * Remove the specified incident report.
     */
    public function destroy($id)
    {
        $incident = IncidentReport::findOrFail($id);
        $incident->delete();

        return response()->json(['message' => 'Incident report deleted successfully.']);
    }
}
