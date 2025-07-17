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
    echo json_encode(['success' => false, 'error' => 'Invalid student ID']);
    exit();
}

$check = mysqli_query($conn, "SELECT id FROM students WHERE id = $id AND school_id = $school_id");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(['success' => false, 'error' => 'Student not found or not authorized']);
    exit();
}

$query = "DELETE FROM students WHERE id = $id AND school_id = $school_id";
if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true, 'message' => 'Student deleted successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Delete failed']);
}
?>
