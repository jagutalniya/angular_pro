<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$school_name = trim($data['school_name'] ?? '');
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($school_name) || empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

$checkQuery = "SELECT id FROM schools WHERE username = ?";
$stmt = mysqli_prepare($conn, $checkQuery);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode(['success' => false, 'message' => 'Username already exists']);
    exit();
}

$insertQuery = "INSERT INTO schools (school_name, username, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())";
$stmt = mysqli_prepare($conn, $insertQuery);
mysqli_stmt_bind_param($stmt, "sss", $school_name, $username, $password);
$success = mysqli_stmt_execute($stmt);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'School added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add school']);
}
?>