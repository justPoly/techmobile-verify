<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$full_name || !$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

// Check if email exists
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists"
    ]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("
    INSERT INTO users (full_name, email, password)
    VALUES (?, ?, ?)
");

$stmt->bind_param("sss", $full_name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create account"
    ]);
}