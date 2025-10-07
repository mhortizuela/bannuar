<?php

namespace App\Http\Controllers;

use App\Models\Deployment;
use App\Models\DeploymentMember;
use App\Models\SystemUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeploymentController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::user()->userId;
        $type = $request->query('type'); 
        $query = Deployment::with(['officer', 'members.police', 'dispatch'])
                    ->where('userId', $userId);

        // ✅ Only filter if type is not "all"
        if ($type && strtolower($type) !== 'all') {
            $query->where('type', $type);
        }
        return $query->get();
    }

    public function store(Request $request)
    {
        $type = $request->input('type');
        $rules = [
            'precinctId' => 'required|exists:precincts,precinctId',
            'deploymentNumber' => 'required|string|max:100|unique:deployments,deploymentNumber',
            'description' => 'required|string',
            //'policeId' => 'required|exists:police,policeId',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'deploymentAddress' => 'required|string|max:255',
            'fireArms' => 'required|string|max:255',
            'comDevices' => 'required|string|max:255',
            'patrolBodyNumber' => 'required|string|max:100',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'status' => 'required|in:Active,Inactive,Completed',
            'type' =>'required|in:Checkpoint,Foot,Mobile,Bicycle',
            'userId' => 'required|exists:system_user,userId',  // Foreign key to SystemUser
            'members' => 'required|array',
            'members.*.policeId' => 'required|exists:police,policeId',
            'members.*.current_lat' => 'nullable|numeric',
            'members.*.current_lng' => 'nullable|numeric',
            'members.*.role' => 'nullable|string',
        ];

        // Conditional validation
        if (in_array($type, ['Checkpoint', 'Mobile'])) {
            $rules['fireArms'] = 'required|string|min:1';
        } else {
            $rules['fireArms'] = 'nullable|string|min:0';
        }

        $validated = $request->validate($rules);

        $deployment = Deployment::create($validated);

        if ($request->has('members')) {
            foreach ($validated['members'] as $member) {
                $deployment->members()->create($member);
            }
        }

        return response()->json(['message' => 'Deployment created successfully.'], 201);
    }

    public function update(Request $request, $id)
    {
        $deployment = Deployment::findOrFail($id);

        $validated = $request->validate([
            'precinctId' => 'required|exists:precincts,precinctId',
            'deploymentNumber' => 'required|unique:deployments,deploymentNumber,' . $id . ',deploymentId',
            'description' => 'required|string',
            //'policeId' => 'required|exists:police,policeId',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'deploymentAddress' => 'required|string|max:255',
            'fireArms' => 'required|string|max:255',
            'comDevices' => 'required|string|max:255',
            'patrolBodyNumber' => 'required|string|max:100',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'status' => 'required|in:Active,Inactive,Completed',
            'type' => 'required|in:Checkpoint,Foot,Mobile,Bicycle',
            'userId' => 'required|exists:system_user,userId',
            'members' => 'required|array',
            'members.*.policeId' => 'required|exists:police,policeId',
            'members.*.current_lat' => 'nullable|numeric',
            'members.*.current_lng' => 'nullable|numeric',
            'members.*.role' => 'nullable|string',
        ]);

        $deployment->update($validated);

        if ($request->has('members')) {
            $deployment->members()->delete();
            foreach ($validated['members'] as $member) {
                $deployment->members()->create($member);
            }
        }

        return response()->json(['message' => 'Deployment updated successfully.']);
    }

    public function destroy($id)
    {
        $deployment = Deployment::findOrFail($id);
        $deployment->members()->delete();
        $deployment->delete();

        return response()->json(['message' => 'Deployment deleted successfully.']);
    }
}
