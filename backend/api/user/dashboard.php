<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://verify.techmobile.com.ng");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../auth/authMiddleware.php";
require_once "../config.php";

// ---------------- AUTH USER ----------------
$user = authenticate();

// ---------------- FETCH USER ----------------
$stmt = $conn->prepare("
    SELECT id, full_name, email, created_at
    FROM users
    WHERE id = ?
    LIMIT 1
");

$stmt->bind_param("i", $user->id);
$stmt->execute();

$result = $stmt->get_result();
$dbUser = $result->fetch_assoc();

// ---------------- SAMPLE STATS ----------------
// Replace with real DB queries later
$stats = [
    "total_checks" => 12,
    "approved" => 8,
    "reports" => 2
];

// ---------------- RESPONSE ----------------
echo json_encode([
    "status" => "success",
    "user" => $dbUser,
    "stats" => $stats
]);