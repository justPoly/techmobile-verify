<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

// Fetch latest 8 reports
$sql = "SELECT id, brand, phone_model, full_name, status, created_at 
        FROM community_reports 
        ORDER BY created_at DESC 
        LIMIT 8";

$result = $conn->query($sql);
$reports = [];

while ($row = $result->fetch_assoc()) {
    $row['time_ago'] = timeAgo($row['created_at']);   // Optional: nice time format
    $reports[] = $row;
}

// Helper function for "2 hours ago"
function timeAgo($datetime) {
    $time = strtotime($datetime);
    $diff = time() - $time;
    
    if ($diff < 60) return "Just now";
    if ($diff < 3600) return floor($diff / 60) . " mins ago";
    if ($diff < 86400) return floor($diff / 3600) . " hours ago";
    return floor($diff / 86400) . " days ago";
}

echo json_encode($reports);
$conn->close();
?>