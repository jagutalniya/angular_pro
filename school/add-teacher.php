<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

if (!isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$school_id = $_SESSION['school_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Extract & sanitize input
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');
$name = trim($data['name'] ?? '');
$subject = trim($data['subject'] ?? '');

if (empty($username) || empty($password) || empty($name) || empty($subject)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit();
}

$insertQuery = "INSERT INTO teachers (school_id, username, password, name, subject, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
$stmt = mysqli_prepare($conn, $insertQuery);
mysqli_stmt_bind_param($stmt, "issss", $school_id, $username, $password, $name, $subject);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['success' => true, 'message' => 'Teacher added successfully.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to insert record.']);
}
?>