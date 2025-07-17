<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

if (!isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$school_id = $_SESSION['school_id'];
$data = json_decode(file_get_contents("php://input"), true);

$id = (int)($data['id'] ?? 0);
$name = trim($data['name'] ?? '');
$subject = trim($data['subject'] ?? '');

if (!$id || !$name || !$subject) {
    echo json_encode(['success' => false, 'message' => 'Invalid data.']);
    exit();
}

$check = mysqli_query($conn, "SELECT id FROM teachers WHERE id = $id AND school_id = $school_id");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(['success' => false, 'message' => 'Teacher not found or unauthorized']);
    exit();
}

$query = "UPDATE teachers SET name = ?, subject = ?, updated_at = NOW() WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssi", $name, $subject, $id);
$success = mysqli_stmt_execute($stmt);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Teacher updated']);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed']);
}
?>
