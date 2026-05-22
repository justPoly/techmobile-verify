<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://verify.techmobile.com.ng");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../config.php";
require_once "jwt.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

// ---------------- INPUT ----------------
$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required"
    ]);
    exit;
}

// ---------------- FIND USER ----------------
$stmt = $conn->prepare("
    SELECT id, full_name, email, password, is_verified
    FROM users
    WHERE email = ?
    LIMIT 1
");

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// ---------------- CHECK VERIFICATION ----------------
if (!$user['is_verified']) {
    echo json_encode([
        "status" => "error",
        "message" => "Please verify your email before logging in."
    ]);
    exit;
}

// ---------------- PASSWORD CHECK ----------------
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);
    exit;
}

// ---------------- GENERATE JWT ----------------
unset($user['password']);
unset($user['is_verified']);

$token = generateJWT($user);

// ---------------- RESPONSE ----------------
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "token" => $token,
    "user" => $user
]);