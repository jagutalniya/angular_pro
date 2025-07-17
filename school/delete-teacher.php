<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

if (!isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$school_id = $_SESSION['school_id'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid teacher ID']);
    exit();
}

$checkQuery = "SELECT id FROM teachers WHERE id = $id AND school_id = $school_id";
$checkResult = mysqli_query($conn, $checkQuery);
if (mysqli_num_rows($checkResult) === 0) {
    echo json_encode(['success' => false, 'error' => 'Teacher not found']);
    exit();
}

$deleteQuery = "DELETE FROM teachers WHERE id = $id";
if (mysqli_query($conn, $deleteQuery)) {
    echo json_encode(['success' => true, 'message' => 'Teacher deleted successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to delete teacher']);
}
?>