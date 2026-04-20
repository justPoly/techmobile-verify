<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $input = trim($data['input'] ?? '');   // We'll use one field for both IMEI and model

    if (empty($input)) {
        echo json_encode(['status' => 'error', 'verdict' => 'error', 'message' => 'Input is required']);
        exit;
    }

    // If it's a 15-digit IMEI
    if (strlen($input) === 15 && is_numeric($input)) {
        $tac = substr($input, 0, 8);
        $search = "%{$tac}%";
        
        $sql = "SELECT * FROM ncc_approved 
                WHERE models LIKE ? 
                   OR manufacturer LIKE ? 
                ORDER BY id DESC LIMIT 1";
                
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $search, $search);
    } 
    // Else treat as model name search
    else {
        $search = "%{$input}%";
        $sql = "SELECT * FROM ncc_approved 
                WHERE models LIKE ? 
                   OR manufacturer LIKE ? 
                   OR equipment_name LIKE ?
                ORDER BY id DESC LIMIT 1";
                
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $search, $search, $search);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode([
            'status' => 'success',
            'verdict' => 'genuine',
            'message' => 'This device is NCC Approved ✅',
            'brand' => $row['manufacturer'],
            'model' => $row['models'],
            'equipment_name' => $row['equipment_name'],
            'applicant' => $row['applicant']
        ]);
    } else {
        echo json_encode([
            'status' => 'warning',
            'verdict' => 'suspicious',
            'message' => 'This phone/model was NOT found in the NCC Approved list. Please be careful — it might be grey import or fake.'
        ]);
    }
} else {
    echo json_encode(['status' => 'error', 'verdict' => 'error', 'message' => 'Invalid request method']);
}
?>