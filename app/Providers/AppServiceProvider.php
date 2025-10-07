<?php
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SystemUser;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Inertia::share([
            'auth' => fn () => Auth::check() ? $this->formatUser(Auth::user()) : null,
        ]);
    }

    protected function formatUser($user)
    {
        // Eager load relationships
        $user->load(['police.precinct']);

        return [
            'userId' => $user->userId,
            'lname'  => $user->police->lname ?? null,
            'fname'  => $user->police->fname ?? null,
            'mi'     => $user->police->mi ?? null,
            'role'   => $user->role,
           
        ];
    }
}

