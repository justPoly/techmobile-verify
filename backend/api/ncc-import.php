<?php
ini_set('max_execution_time', 300);     // 5 minutes
ini_set('memory_limit', '256M');

require_once 'config.php';

$url = "https://ncc.gov.ng/sites/default/files/2026-03/type-approval-mobile-phones-week3-march.csv";

echo "Downloading NCC list...<br>";

$csv_content = file_get_contents($url);

if ($csv_content === FALSE) {
    die("❌ Could not download the file.");
}

echo "Processing data...<br>";

// Clear old data
$conn->query("TRUNCATE TABLE ncc_approved");

$lines = array_map('str_getcsv', explode("\n", $csv_content));
$values = [];
$imported = 0;

foreach ($lines as $index => $row) {
    if ($index == 0 || count($row) < 5) continue; // Skip header

    $sn = $conn->real_escape_string($row[0] ?? '');
    $applicant = $conn->real_escape_string($row[1] ?? '');
    $certificate_holder = $conn->real_escape_string($row[2] ?? '');
    $equipment_name = $conn->real_escape_string($row[3] ?? '');
    $models = $conn->real_escape_string($row[4] ?? '');
    $manufacturer = $conn->real_escape_string($row[5] ?? '');

    $values[] = "('$sn', '$applicant', '$certificate_holder', '$equipment_name', '$models', '$manufacturer', NOW())";
    $imported++;

    // Insert in batches of 500 to avoid too long query
    if (count($values) >= 500) {
        $sql = "INSERT INTO ncc_approved 
                (sn, applicant, certificate_holder, equipment_name, models, manufacturer, last_updated) 
                VALUES " . implode(",", $values);
        
        $conn->query($sql);
        $values = [];
    }
}

// Insert remaining rows
if (count($values) > 0) {
    $sql = "INSERT INTO ncc_approved 
            (sn, applicant, certificate_holder, equipment_name, models, manufacturer, last_updated) 
            VALUES " . implode(",", $values);
    $conn->query($sql);
}

echo "<strong>Success!</strong> Imported <strong>$imported</strong> phones from NCC list.";
?>