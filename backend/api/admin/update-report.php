<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$id      = intval($data['id'] ?? 0);
$status  = $data['status'] ?? '';           // 'approved' or 'rejected'
$notes   = trim($data['notes'] ?? '');

if (!$id || !in_array($status, ['approved', 'rejected'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

$sql = "UPDATE community_reports 
        SET status = ?, 
            reviewed_by = 'Admin', 
            reviewed_at = NOW(), 
            admin_notes = ? 
        WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $status, $notes, $id);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success', 
        'message' => "Report $status successfully"
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update report']);
}

$conn->close();
?>