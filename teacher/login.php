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

if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit();
}

$query = "SELECT * FROM teachers WHERE username = ? AND password = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $_SESSION['teacher_id'] = $row['id'];
    $_SESSION['school_id'] = $row['school_id'];
    unset($row['password']);

    echo json_encode([
        'success' => true,
        'teacher' => $row,
        'message' => 'Login successful'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password'
    ]);
}
?>