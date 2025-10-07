<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    // Display all records
    public function index()
    {
        $registrations = Registration::all();
        return response()->json($registrations);
    }

    // Store a new record
    /*public function store(Request $request)
    {
        $data = $request->validate([
            'CP_NO' => 'required|string|max:30',
            'surname' => 'required|string|max:30',
            'firstname' => 'required|string|max:30',
            'middlename' => 'nullable|string|max:30',
            'otp' => 'required|integer',
            'isValidated' => 'required|integer',
        ]);

        $registration = Registration::create($data);

        return response()->json($registration, 201);
    }*/

    // Show a single record
    public function show($id)
    {
        $registration = Registration::findOrFail($id);
        return response()->json($registration);
    }

    // Update a record
    /*public function update(Request $request, $id)
    {
        $registration = Registration::findOrFail($id);

        $data = $request->validate([
            'CP_NO' => 'sometimes|string|max:30',
            'surname' => 'sometimes|string|max:30',
            'firstname' => 'sometimes|string|max:30',
            'middlename' => 'nullable|string|max:30',
            'otp' => 'sometimes|integer',
            'isValidated' => 'sometimes|integer',
        ]);

        $registration->update($data);

        return response()->json($registration);
    }

    // Delete a record
    public function destroy($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->delete();

        return response()->json(null, 204);
    }*/
}
