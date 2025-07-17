<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include '../db.php';

if (!isset($_SESSION['student_id']) || $_SESSION['role'] !== 'student') {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$student_id = $_SESSION['student_id'];

$query = "SELECT students.id, students.name, students.username, students.class, students.gender, students.address, schools.school_name 
          FROM students 
          JOIN schools ON students.school_id = schools.id 
          WHERE students.id = ? 
          LIMIT 1";

$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "i", $student_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Student not found']);
}
?>