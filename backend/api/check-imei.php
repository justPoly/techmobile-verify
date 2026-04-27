<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Invalid request method'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$modelInput = trim($data['input'] ?? '');

if (empty($modelInput)) {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Please enter a phone model name'
    ]);
    exit;
}

$search = "%{$modelInput}%";

$sql = "SELECT * FROM ncc_approved 
        WHERE models LIKE ? 
           OR manufacturer LIKE ? 
           OR equipment_name LIKE ?
        ORDER BY id DESC LIMIT 1";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Database query preparation failed'
    ]);
    exit;
}

$stmt->bind_param("sss", $search, $search, $search);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'status' => 'success',
        'verdict' => 'genuine',
        'message' => 'This model is NCC Approved ✅',
        'brand' => $row['manufacturer'],
        'model' => $row['models'],
        'equipment_name' => $row['equipment_name'],
        'applicant' => $row['applicant']
    ]);
} else {
    echo json_encode([
        'status' => 'warning',
        'verdict' => 'suspicious',
        'message' => 'This model was NOT found in the NCC Approved list. It might be a new release, grey import, or fake. Be careful!'
    ]);
}

$stmt->close();
$conn->close();
?>