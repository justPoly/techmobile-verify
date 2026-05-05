<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config.php';

// Authorization Check
$auth = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? 
        $_SERVER['HTTP_AUTHORIZATION'] ?? 
        (getallheaders()['X-Admin-Token'] ?? '');

if ($auth !== 'admin-secret-token') {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id     = intval($data['id'] ?? 0);
$status = trim($data['status'] ?? '');

if ($id <= 0 || !in_array($status, ['approved', 'rejected'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

try {
    $conn->begin_transaction();

    // Update report status
    $updateSql = "UPDATE community_reports 
                  SET status = ?, reviewed_by = 'Admin', reviewed_at = NOW() 
                  WHERE id = ?";
    
    $stmt = $conn->prepare($updateSql);
    $stmt->bind_param("si", $status, $id);
    $stmt->execute();

    // If approved, add to ncc_approved table
    if ($status === 'approved') {
        $getSql = "SELECT brand, phone_model, full_name 
                   FROM community_reports WHERE id = ?";
        $getStmt = $conn->prepare($getSql);
        $getStmt->bind_param("i", $id);
        $getStmt->execute();
        $report = $getStmt->get_result()->fetch_assoc();

        if ($report) {
            $insertSql = "INSERT INTO ncc_approved 
                         (sn, applicant, certificate_holder, equipment_name, models, manufacturer, last_updated) 
                         VALUES (?, ?, ?, ?, ?, ?, NOW())";

            $sn = "COMM-" . date("Ymd") . "-" . $id;           // Custom serial number
            $applicant = $report['full_name'];
            $certificate_holder = $report['full_name'];
            $equipment_name = $report['phone_model'];
            $models = $report['phone_model'];
            $manufacturer = $report['brand'];

            $insertStmt = $conn->prepare($insertSql);
            $insertStmt->bind_param("ssssss", 
                $sn, 
                $applicant, 
                $certificate_holder, 
                $equipment_name, 
                $models, 
                $manufacturer
            );
            $insertStmt->execute();
        }
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Report " . strtoupper($status) . " successfully"
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}

$conn->close();
?>