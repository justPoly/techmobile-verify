<?php
// Database Configuration
$host = 'localhost';
$dbname = 'techmobile_db';
$username = 'root';
$password = '';          // Leave empty if you didn't set password in XAMPP

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8mb4");

echo "Database Connected Successfully!";   // You can remove this line later
?>