<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // You can change this
$offset = ($page - 1) * $limit;

$sql = "SELECT id, brand, phone_model, full_name, status, created_at 
        FROM community_reports 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $row['time_ago'] = timeAgo($row['created_at']);
    $reports[] = $row;
}

// Get total count for pagination
$totalResult = $conn->query("SELECT COUNT(*) as total FROM community_reports");
$totalRow = $totalResult->fetch_assoc();
$totalPages = ceil($totalRow['total'] / $limit);

function timeAgo($datetime) {
    $time = strtotime($datetime);
    $diff = time() - $time;
    if ($diff < 60) return "Just now";
    if ($diff < 3600) return floor($diff / 60) . " mins ago";
    if ($diff < 86400) return floor($diff / 3600) . " hours ago";
    return floor($diff / 86400) . " days ago";
}

echo json_encode([
    'reports' => $reports,
    'totalPages' => $totalPages,
    'currentPage' => $page
]);

$conn->close();
?>