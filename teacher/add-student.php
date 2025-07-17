<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

// Check if teacher or school is logged in
$teacher_id = $_SESSION['teacher_id'] ?? null;
$school_id = $_SESSION['school_id'] ?? null;

if (!$school_id && !$teacher_id) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');
$name     = trim($data['name'] ?? '');
$class    = trim($data['class'] ?? '');
$gender   = trim($data['gender'] ?? '');
$address  = trim($data['address'] ?? '');

if (!$username || !$password || !$name || !$class || !$gender || !$address) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit();
}

if ($teacher_id && !$school_id) {
    $result = mysqli_query($conn, "SELECT school_id FROM teachers WHERE id = $teacher_id LIMIT 1");
    if ($row = mysqli_fetch_assoc($result)) {
        $school_id = $row['school_id'];
    } else {
        echo json_encode(['success' => false, 'error' => 'Teacher not found.']);
        exit();
    }
}

$check = mysqli_query($conn, "SELECT id FROM students WHERE username = '$username'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(['success' => false, 'error' => 'Username already exists.']);
    exit();
}

$createdAt = date('Y-m-d H:i:s');
$query = "INSERT INTO students (school_id, teacher_id, username, password, name, class, gender, address, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "iissssssss", $school_id, $teacher_id, $username, $password, $name, $class, $gender, $address, $createdAt, $createdAt);
$success = mysqli_stmt_execute($stmt);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Student added successfully.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to add student.']);
}
?>