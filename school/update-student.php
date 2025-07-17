<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

// Extract input values safely
$id = (int)($data['id'] ?? 0);
$name = trim($data['name'] ?? '');
$class = trim($data['class'] ?? '');
$gender = trim($data['gender'] ?? '');
$address = trim($data['address'] ?? '');

if (!$id || !$name || !$class || !$gender || !$address) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit();
}

// Determine role: school admin or teacher
$school_id = 0;

if (isset($_SESSION['school_id'])) {
    // Logged in as school admin
    $school_id = $_SESSION['school_id'];
} elseif (isset($_SESSION['teacher_id'])) {
    // Logged in as teacher, fetch their school_id
    $teacher_id = $_SESSION['teacher_id'];
    $res = mysqli_query($conn, "SELECT school_id FROM teachers WHERE id = $teacher_id LIMIT 1");
    if ($row = mysqli_fetch_assoc($res)) {
        $school_id = $row['school_id'];
    } else {
        echo json_encode(['success' => false, 'message' => 'Teacher not found.']);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Verify the student belongs to this school
$check = mysqli_query($conn, "SELECT id FROM students WHERE id = $id AND school_id = $school_id");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(['success' => false, 'message' => 'Student not found or unauthorized.']);
    exit();
}

// Proceed to update
$query = "UPDATE students SET name = ?, class = ?, gender = ?, address = ?, updated_at = NOW() WHERE id = ? AND school_id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssssii", $name, $class, $gender, $address, $id, $school_id);
$success = mysqli_stmt_execute($stmt);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Student updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed.']);
}
?>