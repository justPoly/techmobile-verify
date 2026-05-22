<?php

ob_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://verify.techmobile.com.ng");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config.php";
require_once "../vendor/autoload.php";

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// -------------------- ONLY POST --------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

// -------------------- GET INPUT --------------------
$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// -------------------- VALIDATION --------------------
if (!$full_name || !$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email address"
    ]);
    exit;
}

// -------------------- CHECK EXISTING USER --------------------
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

// -------------------- CREATE USER --------------------
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$verificationToken = bin2hex(random_bytes(32));

$stmt = $conn->prepare("
    INSERT INTO users (
        full_name,
        email,
        password,
        verification_token,
        is_verified
    )
    VALUES (?, ?, ?, ?, 0)
");

$stmt->bind_param(
    "ssss",
    $full_name,
    $email,
    $hashedPassword,
    $verificationToken
);

// -------------------- AFTER SUCCESS INSERT --------------------
if ($stmt->execute()) {

    $verificationLink = "https://verify.techmobile.com.ng/api/auth/verify.php?token=$verificationToken";

    // -------------------- SEND EMAIL --------------------
    try {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['MAIL_PORT'];

        $mail->setFrom($_ENV['MAIL_USERNAME'], "Techmobile Verify");
        $mail->addAddress($email, $full_name);

        $mail->isHTML(true);
        $mail->Subject = "Verify Your Email";

        $mail->Body = "
            <div style='font-family: Arial; padding:20px'>
                <h2>Welcome, $full_name</h2>
                <p>Click below to verify your email:</p>
                <a href='$verificationLink'
                   style='display:inline-block;padding:10px 15px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px'>
                   Verify Email
                </a>
            </div>
        ";

        $mail->send();

        echo json_encode([
            "status" => "success",
            "message" => "Account created successfully. Please verify your email."
        ]);

    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Email failed",
            "error" => $mail->ErrorInfo
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create account"
    ]);
}

ob_end_flush();

