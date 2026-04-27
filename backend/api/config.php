<?php
// Database Configuration
$host = 'localhost';
$dbname = 'techmobile_db';
$username = 'root';
$password = '';
$port = 3307;

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Database connection failed'
    ]));
}

// Set charset
$conn->set_charset("utf8mb4");

// DO NOT echo anything here in production
?>