<?php
session_start();

// CORS headers for Angular frontend
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';


$data = json_decode(file_get_contents("php://input"), true);
$inputUsername = $conn->real_escape_string($data['username'] ?? '');
$inputPassword = $conn->real_escape_string($data['password'] ?? '');

if (empty($inputUsername) || empty($inputPassword)) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit();
}

$query = "SELECT * FROM superadmins WHERE username = '$inputUsername' AND password = '$inputPassword' LIMIT 1";
$result = $conn->query($query);

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $_SESSION['superadmin'] = $user['id'];
    echo json_encode(['success' => true, 'name' => $user['name']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
}

$conn->close();
?>
