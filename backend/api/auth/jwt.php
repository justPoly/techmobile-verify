<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// require_once __DIR__ . "/../../vendor/autoload.php";
// require_once "../../config/env.php";

require_once "../vendor/autoload.php";


$secretKey = $_ENV['JWT_SECRET'] ?? 'default_secret_key';
$issuer = "https://verify.techmobile.com.ng";

function generateJWT($user)
{
    global $secretKey, $issuer;

    $issuedAt = time();
    $expiration = $issuedAt + (60 * 60 * 24); // 24 hours

    $payload = [
        "iss" => $issuer,
        "iat" => $issuedAt,
        "exp" => $expiration,
        "data" => [
            "id" => $user["id"],
            "email" => $user["email"],
            "full_name" => $user["full_name"]
        ]
    ];

    return JWT::encode($payload, $secretKey, 'HS256');
}

function verifyJWT($token)
{
    global $secretKey;

    try {
        return JWT::decode($token, new Key($secretKey, 'HS256'));
    } catch (Exception $e) {
        return null;
    }
}