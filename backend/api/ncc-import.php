<?php
ini_set('max_execution_time', 600); // 10 minutes
ini_set('memory_limit', '512M');

require_once 'config.php';

echo "Starting NCC Import...<br>";

// Use the latest URL (change this if NCC posts a newer one)
$url = "https://ncc.gov.ng/sites/default/files/2026-04/type-approval-mobile-phones-week2-april.csv"; 

// Try multiple possible recent URLs if one fails
$csv_content = @file_get_contents($url);

if ($csv_content === FALSE) {
    die("❌ Could not download file. Please download manually and place in the folder.");
}

echo "File downloaded. Processing...<br>";

// Clear old data
$conn->query("TRUNCATE TABLE ncc_approved");

$lines = array_map('str_getcsv', explode("\n", $csv_content));
$imported = 0;

foreach ($lines as $index => $row) {
    if ($index === 0 || count($row) < 6) continue; // Skip header

    $sn                  = $conn->real_escape_string($row[0] ?? '');
    $applicant           = $conn->real_escape_string($row[1] ?? '');
    $certificate_holder  = $conn->real_escape_string($row[2] ?? '');
    $equipment_name      = $conn->real_escape_string($row[3] ?? '');
    $models              = $conn->real_escape_string($row[4] ?? '');
    $manufacturer        = $conn->real_escape_string($row[5] ?? '');

    $sql = "INSERT INTO ncc_approved 
            (sn, applicant, certificate_holder, equipment_name, models, manufacturer, last_updated) 
            VALUES ('$sn', '$applicant', '$certificate_holder', '$equipment_name', '$models', '$manufacturer', NOW())";

    if ($conn->query($sql)) {
        $imported++;
    }
}

echo "<strong>✅ Import Completed!</strong><br>";
echo "Total phones imported: <strong>$imported</strong><br>";
echo "You can now test modern phones (Tecno, Infinix, Samsung, etc.)";
?>