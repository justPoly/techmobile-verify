<?php

require_once "../config.php";

$token = $_GET['token'] ?? '';

if (!$token) {
    die("Invalid verification token.");
}

$stmt = $conn->prepare("
    SELECT id
    FROM users
    WHERE verification_token = ?
    LIMIT 1
");

$stmt->bind_param("s", $token);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Invalid or expired token.");
}

$user = $result->fetch_assoc();

$update = $conn->prepare("
    UPDATE users
    SET
        is_verified = 1,
        verification_token = NULL
    WHERE id = ?
");

$update->bind_param("i", $user['id']);
$update->execute();

echo "
<h2>Email Verified Successfully</h2>
<p>You can now login to your account.</p>
<a href='https://verify.techmobile.com.ng/login'>
    Go to Login
</a>
";