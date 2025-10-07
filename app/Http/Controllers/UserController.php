<?php

namespace App\Http\Controllers;

use App\Models\SystemUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\Police;

class UserController extends Controller
{
    public function index()
    {
        $users = SystemUser::with('police')->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|unique:system_user',
            'password' => 'required|string|min:6',
            'role' => 'required',
            'policeId' => 'required|exists:police,policeId',
        ]);

        // Check if a dispatcher is already assigned
        if ($request->role === 'Dispatch' && SystemUser::where('policeId', $request->policeId)->exists()) {
            return response()->json([
                'errors' => ['policeId' => ['Dispatcher already has an account.']]
            ], 422);
        }

        $validated['password'] = Hash::make($validated['password']);
        $validated['isActive'] = 1;

        SystemUser::create($validated);

        return response()->json(['message' => 'User created successfully']);
    }

    public function update(Request $request, $id)
    {
        $user = SystemUser::findOrFail($id);
        $user->update($request->only('username', 'roles', 'isActive'));

        if ($request->password) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return $user;
    }

    public function getDispatchers()
    {
        $dispatchers = Police::select('policeId', 'lname', 'fname', 'mi', 'ext')->get();
        return response()->json($dispatchers);
    }

    public function resetPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|min:6',
        ]);

        $user = SystemUser::findOrFail($id);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = SystemUser::findOrFail($id);

        // Check if old password matches the stored hash
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect.'], 403);
        }

        // Save the new password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully.']);
    }
    public function destroy($id)
    {
        return SystemUser::destroy($id);
    }
}
