<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$imei = trim($_POST['imei'] ?? '');
$model_name = trim($_POST['model_name'] ?? '');
$brand = trim($_POST['brand'] ?? '');
$verdict = $_POST['verdict'] ?? '';
$comment = trim($_POST['comment'] ?? '');
$buyer_location = trim($_POST['buyer_location'] ?? '');
$used_months = intval($_POST['used_months'] ?? 0);

// Basic validation
if (strlen($imei) !== 15 || empty($model_name) || empty($verdict)) {
    echo json_encode(['status' => 'error', 'message' => 'IMEI, Model and Verdict are required']);
    exit;
}

// Check if IMEI already reported
$stmt = $conn->prepare("SELECT id FROM community_reports WHERE imei = ?");
$stmt->bind_param("s", $imei);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'This IMEI has already been reported']);
    exit;
}

// Handle Photo Uploads
$uploadDir = '../uploads/reports/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

$photo1 = '';
$photo2 = '';

if (isset($_FILES['photo1']) && $_FILES['photo1']['error'] == 0) {
    $photo1 = time() . '_1_' . basename($_FILES['photo1']['name']);
    move_uploaded_file($_FILES['photo1']['tmp_name'], $uploadDir . $photo1);
}

if (isset($_FILES['photo2']) && $_FILES['photo2']['error'] == 0) {
    $photo2 = time() . '_2_' . basename($_FILES['photo2']['name']);
    move_uploaded_file($_FILES['photo2']['tmp_name'], $uploadDir . $photo2);
}

if (empty($photo1) || empty($photo2)) {
    echo json_encode(['status' => 'error', 'message' => 'Please upload at least 2 photos']);
    exit;
}

// Insert Report (Auto Approved)
$sql = "INSERT INTO community_reports (imei, model_name, brand, verdict, comment, buyer_location, photo1, photo2, used_months) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssi", $imei, $model_name, $brand, $verdict, $comment, $buyer_location, $photo1, $photo2, $used_months);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your report has been published successfully.'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit report']);
}
?>