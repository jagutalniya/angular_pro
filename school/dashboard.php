<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

if (!isset($_SESSION['school_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

$school_id = $_SESSION['school_id'];

$schoolQuery = "SELECT school_name FROM schools WHERE id = $school_id LIMIT 1";
$schoolResult = mysqli_query($conn, $schoolQuery);
$school = mysqli_fetch_assoc($schoolResult);

$teacherQuery = "SELECT COUNT(*) as count FROM teachers WHERE school_id = $school_id";
$teacherResult = mysqli_query($conn, $teacherQuery);
$teacherCount = mysqli_fetch_assoc($teacherResult)['count'];

$studentQuery = "SELECT COUNT(*) as count FROM students WHERE school_id = $school_id";
$studentResult = mysqli_query($conn, $studentQuery);
$studentCount = mysqli_fetch_assoc($studentResult)['count'];

echo json_encode([
    'success' => true,
    'school_name' => $school['school_name'],
    'teacher_count' => $teacherCount,
    'student_count' => $studentCount
]);
