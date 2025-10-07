<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => fn () => $request->user()
                    ? [
                        'userId' => $request->user()->userId,
                        'role' => $request->user()->role,
                        'lname' => optional($request->user()->police)->lname,
                        'fname' => optional($request->user()->police)->fname,
                        'mi'    => optional($request->user()->police)->mi,
                        'precinctId'    => optional($request->user()->precinct)->precinctId,
                        'precinctNumber'    => optional($request->user()->precinct)->precinctNumber,
                        'precinctName'    => optional($request->user()->precinct)->precinctName,
                        'address'    => optional($request->user()->precinct)->address,
                        'lat'    => optional($request->user()->precinct)->lat,
                        'lng' => optional($request->user()->precinct)->lng,
                    ]
                    : null,
            ],
        ]);
    }
}
