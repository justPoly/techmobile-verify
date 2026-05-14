<?php
ob_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://verify.techmobile.com.ng");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
require_once "../config.php";

// PHPMailer
require_once "../vendor/PHPMailer/src/Exception.php";
require_once "../vendor/PHPMailer/src/PHPMailer.php";
require_once "../vendor/PHPMailer/src/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Validate fields
if (!$full_name || !$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email address"
    ]);
    exit;
}

// Check if email already exists
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

// Generate verification token
$verificationToken = bin2hex(random_bytes(32));

// Insert user
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

if ($stmt->execute()) {

    // Create verification link
    $verificationLink =
        "https://verify.techmobile.com.ng/api/auth/verify.php?token=" .
        $verificationToken;

    // Send verification email
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'html';

        $mail->Host = "verify.techmobile.com.ng";
        $mail->SMTPAuth = true;

        $mail->Username = "support@verify.techmobile.com.ng";
        $mail->Password = "justPoly@96";

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom(
            "support@verify.techmobile.com.ng",
            "Techmobile Verify"
        );

        $mail->addAddress($email, $full_name);

        $mail->isHTML(true);

        $mail->Subject = "Verify Your Email - Techmobile Verify";

        $mail->Body = "
            <div style='font-family: Arial, sans-serif; padding:20px;'>

                <h2 style='color:#2563eb;'>
                    Welcome to Techmobile Verify
                </h2>

                <p>
                    Thank you for creating an account.
                </p>

                <p>
                    Please click the button below to verify your email address.
                </p>

                <a
                    href='$verificationLink'
                    style='
                        display:inline-block;
                        padding:12px 20px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                    '
                >
                    Verify Email
                </a>

                <p style='margin-top:20px; font-size:14px; color:#666;'>
                    If you did not create this account, you can ignore this email.
                </p>

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
            "message" => "Email could not be sent.",
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
?>