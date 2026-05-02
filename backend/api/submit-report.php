<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

try {
    // Get text data
    $brand          = trim($_POST['brand'] ?? '');
    $phoneModel     = trim($_POST['phoneModel'] ?? '');
    $deviceStatus   = trim($_POST['deviceStatus'] ?? '');
    $fullName       = trim($_POST['fullName'] ?? '');
    $email          = trim($_POST['email'] ?? '');
    $phoneNumber    = trim($_POST['phoneNumber'] ?? '');
    $phoneSource    = trim($_POST['phoneSource'] ?? '');
    $additionalInfo = trim($_POST['additionalInfo'] ?? '');

    // Basic validation
    if (empty($brand) || empty($phoneModel) || empty($fullName) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    // Handle image uploads
    $uploadDir = '../uploads/reports/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $photo1 = $photo2 = '';

    // Upload first image
    if (isset($_FILES['photo1']) && $_FILES['photo1']['error'] === 0) {
        $ext = pathinfo($_FILES['photo1']['name'], PATHINFO_EXTENSION);
        $photo1 = 'report_' . time() . '_1.' . strtolower($ext);
        move_uploaded_file($_FILES['photo1']['tmp_name'], $uploadDir . $photo1);
    }

    // Upload second image (if any)
    if (isset($_FILES['photo2']) && $_FILES['photo2']['error'] === 0) {
        $ext = pathinfo($_FILES['photo2']['name'], PATHINFO_EXTENSION);
        $photo2 = 'report_' . time() . '_2.' . strtolower($ext);
        move_uploaded_file($_FILES['photo2']['tmp_name'], $uploadDir . $photo2);
    }

    // Insert into database
    $sql = "INSERT INTO community_reports 
            (brand, phone_model, device_status, full_name, email, phone_number, 
             phone_source, additional_info, photo1, photo2, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", 
        $brand, 
        $phoneModel, 
        $deviceStatus, 
        $fullName, 
        $email, 
        $phoneNumber, 
        $phoneSource, 
        $additionalInfo, 
        $photo1, 
        $photo2
    );

    if ($stmt->execute()) {
        $report_id = "RPT-" . date("Ymd") . "-" . $conn->insert_id;
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Report submitted successfully',
            'report_id' => $report_id
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save report']);
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
}

$conn->close();
?>