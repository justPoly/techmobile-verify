<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config.php';

// 🔒 Optional: simple admin auth (match your dashboard)
$headers = getallheaders();
if (!isset($headers['Authorization']) || $headers['Authorization'] !== 'admin-secret-token') {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Unauthorized"
    ]);
    exit;
}

// ❌ Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Invalid request method"
    ]);
    exit;
}

// 📥 Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$id     = intval($data['id'] ?? 0);
$status = $data['status'] ?? '';
$notes  = trim($data['notes'] ?? '');

// ✅ Validate input
if (!$id || !in_array($status, ['approved', 'rejected'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Invalid input data"
    ]);
    exit;
}

// 🛠️ Prepare query
$sql = "UPDATE community_reports 
        SET status = ?, 
            reviewed_by = 'Admin', 
            reviewed_at = NOW(), 
            admin_notes = ? 
        WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Failed to prepare statement"
    ]);
    exit;
}

$stmt->bind_param("ssi", $status, $notes, $id);

// 🚀 Execute
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "data" => [
            "id" => $id,
            "status" => $status
        ],
        "message" => "Report $status successfully"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Failed to update report"
    ]);
}

$stmt->close();
$conn->close();
?>