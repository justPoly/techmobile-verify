<?php

error_reporting(0);
ini_set('display_errors', 0);

require_once __DIR__ . "/config/env.php";

// Database Configuration
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];

// Create connection
$conn = new mysqli(
    $host,
    $username,
    $password,
    $dbname,
    $port
);

// Check connection
if ($conn->connect_error) {

    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]));
}

// Set charset
$conn->set_charset("utf8mb4");