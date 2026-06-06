<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NccApproved;
use Illuminate\Http\Request;

class PhoneCheckController extends Controller
{
    public function check(Request $request)
    {
        $input = trim($request->input('input'));

        if (empty($input)) {
            return response()->json([
                'status' => 'error',
                'verdict' => 'error',
                'message' => 'Please enter a phone model name'
            ], 400);
        }

        // Fuzzy search - split words
        $words = array_filter(explode(' ', strtolower($input)));

        $query = NccApproved::query();

        foreach ($words as $word) {
            $query->where(function ($q) use ($word) {
                $q->whereRaw('LOWER(models) LIKE ?', ["%{$word}%"])
                  ->orWhereRaw('LOWER(manufacturer) LIKE ?', ["%{$word}%"])
                  ->orWhereRaw('LOWER(equipment_name) LIKE ?', ["%{$word}%"])
                  ->orWhereRaw('LOWER(applicant) LIKE ?', ["%{$word}%"]);
            });
        }

        $phone = $query->first();

        if ($phone) {
            return response()->json([
                'status' => 'success',
                'verdict' => 'genuine',
                'message' => 'This model is NCC Approved ✅',
                'brand' => $phone->manufacturer,
                'model' => $phone->models,
                'equipment_name' => $phone->equipment_name,
                'applicant' => $phone->applicant,
                'approval_date' => $phone->last_updated?->format('d M, Y'),
            ]);
        }

        return response()->json([
            'status' => 'warning',
            'verdict' => 'suspicious',
            'message' => 'This model was NOT found in the NCC Approved list. It might be a new release, grey import, or fake. Be careful!'
        ]);
    }
}