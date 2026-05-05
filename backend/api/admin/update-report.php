<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config.php';

// ✅ Reliable header extraction
function getAuthorizationHeader() {
    if (isset($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        return $_SERVER['HTTP_X_ADMIN_TOKEN'];
    }

    // Fallback for Apache
    $headers = getallheaders();
    if (isset($headers['X-Admin-Token'])) {
        return $headers['X-Admin-Token'];
    }

    return '';
}

$auth = getAuthorizationHeader();

if ($auth !== 'admin-secret-token') {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Unauthorized"
    ]);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Invalid request method"
    ]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$id     = intval($data['id'] ?? 0);
$status = trim($data['status'] ?? '');
$notes  = trim($data['notes'] ?? '');

// Validate input
if ($id <= 0 || !in_array($status, ['approved', 'rejected'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "data" => null,
        "message" => "Invalid input data"
    ]);
    exit;
}

// Update the report
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
        "message" => "Database prepare error"
    ]);
    exit;
}

$stmt->bind_param("ssi", $status, $notes, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "data" => [
            "id" => $id,
            "status" => $status
        ],
        "message" => "Report " . strtoupper($status) . " successfully"
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