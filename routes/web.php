<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PrecinctController;
use App\Http\Controllers\RankController;
use App\Http\Controllers\PoliceController;
use App\Http\Controllers\DeploymentController;
use App\Http\Controllers\IncidentReportController;

Route::get('/', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');
// Protected routes
Route::middleware(['auth'])->group(function () {
    //Dashboard
     Route::get('/dashboard', fn () => Inertia::render('Dashboard'));
    // System Users
    Route::get('/system-users-page', fn () => Inertia::render('SystemUsers'));
    Route::prefix('system-users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        Route::put('/{id}/reset-password', [UserController::class, 'resetPassword']);
        Route::put('/{id}/change-password', [UserController::class, 'changePassword']);
    });

    Route::get('/dispatchers', [UserController::class, 'getDispatchers']);

    // Precincts
    Route::get('/precincts-page', fn () => Inertia::render('Precincts'));
    Route::prefix('precincts')->group(function () {
        Route::get('/', [PrecinctController::class, 'index']);
        Route::post('/', [PrecinctController::class, 'store']);
        Route::put('/{id}', [PrecinctController::class, 'update']);
        Route::delete('/{id}', [PrecinctController::class, 'destroy']);
    });

    // Ranks
    Route::get('/ranks-page', fn () => Inertia::render('Ranks'));
    Route::prefix('ranks')->group(function () {
        Route::get('/', [RankController::class, 'index']);
        Route::post('/', [RankController::class, 'store']);
        Route::put('/{id}', [RankController::class, 'update']);
        Route::delete('/{id}', [RankController::class, 'destroy']);
    });

    // Police
    Route::get('/police-page', fn () => Inertia::render('Police'));
    Route::prefix('police')->group(function () {
        Route::get('/', [PoliceController::class, 'index']);
        Route::post('/', [PoliceController::class, 'store']);
        Route::put('/{id}', [PoliceController::class, 'update']);
        Route::delete('/{id}', [PoliceController::class, 'destroy']);
    });

    // Registration
    Route::get('/registration-page', fn () => Inertia::render('Registration'));
    Route::prefix('registration')->group(function () {
        Route::get('/', [PoliceController::class, 'index']);
    });
    //Incident Reports
    Route::get('/incident-reports', [IncidentReportController::class, 'index']);

    // Deployments
    Route::get('/checkpoint', fn () => Inertia::render('Checkpoint'));
    Route::get('/foot', fn () => Inertia::render('Foot'));
    Route::get('/mobile', fn () => Inertia::render('Mobile'));
    Route::get('/bicycle', fn () => Inertia::render('Bicycle'));

    Route::prefix('deployments')->group(function () {
        Route::get('/', [DeploymentController::class, 'index']);
        Route::post('/', [DeploymentController::class, 'store']);
        Route::put('/{id}', [DeploymentController::class, 'update']);
        Route::delete('/{id}', [DeploymentController::class, 'destroy']);
    });
});
