<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Simple auth check
$headers = getallheaders();
if (!isset($headers['Authorization']) || $headers['Authorization'] !== 'admin-secret-token') {
    echo json_encode([
        "success" => false,
        "data" => [],
        "message" => "Unauthorized"
    ]);
    exit;
}

// DB connection
$conn = new mysqli("localhost", "root", "", "your_database");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "data" => [],
        "message" => "Database connection failed"
    ]);
    exit;
}

// Fetch pending reports
$sql = "SELECT id, brand, phone_model, full_name, email, phone_source 
        FROM reports 
        WHERE status = 'pending' 
        ORDER BY created_at DESC";

$result = $conn->query($sql);

$reports = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reports[] = $row;
    }
}

// Always return consistent structure
echo json_encode([
    "success" => true,
    "data" => $reports,
    "message" => "Pending reports fetched successfully"
]);

$conn->close();
?>