<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('api')->group(function () {

    // Phone Verification
    Route::post('/check-phone', [App\Http\Controllers\Api\PhoneCheckController::class, 'check']);

    // Community Reports
    Route::post('/reports', [App\Http\Controllers\Api\CommunityReportController::class, 'store']);
    Route::get('/reports/latest', [App\Http\Controllers\Api\CommunityReportController::class, 'latest']);

    // Admin Routes (later)
    // Route::prefix('admin')->middleware('auth:sanctum')->group(function () { ... });
});