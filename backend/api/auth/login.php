<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://verify.techmobile.com.ng");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config.php";

// Only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);

    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Validate fields
if (empty($email) || empty($password)) {

    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required"
    ]);

    exit;
}

// Check user
$stmt = $conn->prepare("
    SELECT
        id,
        full_name,
        email,
        password,
        is_verified
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

// Check email verification
if (!$user['is_verified']) {

    echo json_encode([
        "status" => "error",
        "message" => "Please verify your email before logging in."
    ]);

    exit;
}

// Verify password
if (!password_verify($password, $user['password'])) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);

    exit;
}

// Remove sensitive data
unset($user['password']);
unset($user['is_verified']);

// Generate token
$token = bin2hex(random_bytes(32));

// Success response
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "token" => $token,
    "user" => $user
]);