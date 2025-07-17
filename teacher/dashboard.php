<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

if (!isset($_SESSION['teacher_id']) || !isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$teacher_id = $_SESSION['teacher_id'];
$school_id = $_SESSION['school_id'];

$query = "SELECT t.name AS teacher_name, s.school_name 
          FROM teachers t
          JOIN schools s ON t.school_id = s.id 
          WHERE t.id = $teacher_id";

$result = mysqli_query($conn, $query);

if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode(['success' => false, 'message' => 'Teacher or school not found']);
    exit();
}

$info = mysqli_fetch_assoc($result);

$studentQuery = "SELECT COUNT(*) AS student_count FROM students WHERE teacher_id = $teacher_id";
$studentResult = mysqli_query($conn, $studentQuery);
$studentData = mysqli_fetch_assoc($studentResult);

$response = [
    'success' => true,
    'teacher_name' => $info['teacher_name'],
    'school_name' => $info['school_name'],
    'student_count' => (int) $studentData['student_count']
];

echo json_encode($response);
?>