<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config.php';

if (!isset($_SERVER['HTTP_AUTHORIZATION']) || $_SERVER['HTTP_AUTHORIZATION'] !== 'admin-secret-token') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$sql = "SELECT id, brand, phone_model, full_name, email, phone_source, 
               additional_info, photo1, photo2, created_at 
        FROM community_reports 
        WHERE status = 'pending' 
        ORDER BY created_at DESC";

$result = $conn->query($sql);
$reports = [];

while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode($reports);
$conn->close();
?>