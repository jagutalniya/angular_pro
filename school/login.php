<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit();
}

$query = "SELECT * FROM schools WHERE username = ? AND password = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($school = mysqli_fetch_assoc($result)) {
    $_SESSION['school_id'] = $school['id'];
    unset($school['password']);

    echo json_encode([
        'success' => true,
        'school' => $school
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password'
    ]);
}
