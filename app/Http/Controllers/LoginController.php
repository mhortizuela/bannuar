<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SystemUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLogin()
    {
        return inertia('Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials, $request->remember)) {
            return back()->withErrors([
                'username' => 'Invalid credentials.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/system-users-page');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}