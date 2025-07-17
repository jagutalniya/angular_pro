<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

include '../db.php';

if (!isset($_SESSION['teacher_id']) || !isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$teacher_id = $_SESSION['teacher_id'];
$school_id = $_SESSION['school_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get single student data by ID
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Invalid ID']);
        exit();
    }

    $query = "SELECT id, name, class, gender, address 
              FROM students 
              WHERE id = $id AND teacher_id = $teacher_id AND school_id = $school_id 
              LIMIT 1";

    $result = mysqli_query($conn, $query);
    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(['success' => false, 'message' => 'Student not found']);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update student details
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)($data['id'] ?? 0);
    $name = trim($data['name'] ?? '');
    $class = trim($data['class'] ?? '');
    $gender = trim($data['gender'] ?? '');
    $address = trim($data['address'] ?? '');

    if (!$id || !$name || !$class || !$gender || !$address) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit();
    }

    // Validate student ownership
    $check = mysqli_query($conn, "SELECT id FROM students WHERE id = $id AND teacher_id = $teacher_id AND school_id = $school_id");
    if (mysqli_num_rows($check) === 0) {
        echo json_encode(['success' => false, 'message' => 'Unauthorized or student not found']);
        exit();
    }

    // Update query
    $query = "UPDATE students SET name = ?, class = ?, gender = ?, address = ?, updated_at = NOW() WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ssssi", $name, $class, $gender, $address, $id);
    $updated = mysqli_stmt_execute($stmt);

    if ($updated) {
        echo json_encode(['success' => true, 'message' => 'Student updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Update failed']);
    }
}
?>