<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommunityReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CommunityReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand'           => 'required|string|max:100',
            'phone_model'     => 'required|string|max:150',
            'device_status'   => 'required|string',
            'full_name'       => 'required|string|max:100',
            'email'           => 'required|email|max:100',
            'phone_source'    => 'nullable|string|max:50',
            'additional_info' => 'nullable|string',
            'photo1'          => 'required|image|mimes:jpeg,png,jpg|max:10240',
            'photo2'          => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
        ]);

        // Store photos
        $photo1Path = $request->file('photo1')->store('reports', 'public');
        $photo2Path = $request->hasFile('photo2') 
                        ? $request->file('photo2')->store('reports', 'public') 
                        : null;

        $report = CommunityReport::create([
            'brand'           => $validated['brand'],
            'phone_model'     => $validated['phone_model'],
            'device_status'   => $validated['device_status'],
            'full_name'       => $validated['full_name'],
            'email'           => $validated['email'],
            'phone_source'    => $validated['phone_source'],
            'additional_info' => $validated['additional_info'],
            'photo1'          => $photo1Path,
            'photo2'          => $photo2Path,
            'status'          => 'pending',
        ]);

        $reportId = "RPT-" . date("Ymd") . "-" . str_pad($report->id, 5, '0', STR_PAD_LEFT);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Report submitted successfully!',
            'report_id' => $reportId
        ]);
    }

    // For Homepage - Latest 4 approved reports
    public function latest()
    {
        $reports = CommunityReport::select('id', 'brand', 'phone_model', 'full_name', 'status', 'created_at')
                    ->where('status', 'approved')
                    ->latest()
                    ->limit(4)
                    ->get();

        return response()->json($reports);
    }
}