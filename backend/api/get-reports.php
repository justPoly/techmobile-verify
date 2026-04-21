<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$model = trim($_GET['model'] ?? '');

if (empty($model)) {
    echo json_encode([]);
    exit;
}

$search = "%{$model}%";

$sql = "SELECT * FROM community_reports 
        WHERE model_name LIKE ? 
        ORDER BY created_at DESC LIMIT 10";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $search);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode($reports);
?>