<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config.php';

// More flexible authorization check
$auth = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';

if ($auth !== 'admin-secret-token') {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "data" => [],
        "message" => "Unauthorized"
    ]);
    exit;
}

$sql = "SELECT id, brand, phone_model, full_name, email, phone_source, 
               additional_info, created_at 
        FROM community_reports 
        WHERE status = 'pending' 
        ORDER BY created_at DESC";

$result = $conn->query($sql);
$reports = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $reports[] = $row;
    }
}

echo json_encode([
    "success" => true,
    "data" => $reports,
    "message" => "Pending reports fetched successfully"
]);

$conn->close();
?>