<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

header("Content-Type: application/json");

// ---------------- LOAD ENV ----------------
$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$secretKey = $_ENV['JWT_SECRET'] ?? 'default_secret';

// ---------------- GET HEADERS (SAFE) ----------------
function getAuthorizationHeader()
{
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER["HTTP_AUTHORIZATION"]);
    }

    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            return trim($headers['Authorization']);
        }
    }

    return null;
}

// ---------------- GET TOKEN ----------------
function getBearerToken()
{
    $header = getAuthorizationHeader();

    if (!$header) return null;

    if (!preg_match('/Bearer\s(\S+)/', $header, $matches)) {
        return null;
    }

    return $matches[1];
}

// ---------------- AUTH CHECK ----------------
function authenticate()
{
    global $secretKey;

    $token = getBearerToken();

    if (!$token) {
        echo json_encode([
            "status" => "error",
            "message" => "Unauthorized: No token provided"
        ]);
        exit;
    }

    try {
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        return $decoded->data; // user payload
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Unauthorized: Invalid token"
        ]);
        exit;
    }
}