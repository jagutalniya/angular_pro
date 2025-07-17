<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include '../db.php';

if (!isset($_SESSION['teacher_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$teacher_id = $_SESSION['teacher_id'];

// Get school_id for this teacher
$schoolResult = mysqli_query($conn, "SELECT school_id FROM teachers WHERE id = $teacher_id LIMIT 1");
if (!$schoolResult || mysqli_num_rows($schoolResult) == 0) {
    echo json_encode(['error' => 'Teacher not found']);
    exit();
}
$schoolRow = mysqli_fetch_assoc($schoolResult);
$school_id = $schoolRow['school_id'];

// Check if single student requested
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $student_id = (int)$_GET['id'];

    $query = "SELECT id, name, class, gender, address FROM students WHERE id = $student_id AND school_id = $school_id";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'Student not found']);
    }
    exit(); // 🛑 STOP here after sending single student
}

// Otherwise, return all students with optional search + pagination
$search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$where = "WHERE school_id = $school_id AND teacher_id = $teacher_id";
if (!empty($search)) {
    $where .= " AND (name LIKE '%$search%' OR username LIKE '%$search%' OR class LIKE '%$search%')";
}

$countQuery = "SELECT COUNT(*) as total FROM students $where";
$countResult = mysqli_query($conn, $countQuery);
$total = mysqli_fetch_assoc($countResult)['total'];
$totalPages = ceil($total / $limit);

$query = "SELECT id, name, username, class, gender, address FROM students $where ORDER BY id DESC LIMIT $limit OFFSET $offset";
$result = mysqli_query($conn, $query);

$students = [];
while ($row = mysqli_fetch_assoc($result)) {
    $students[] = $row;
}

echo json_encode([
    'students' => $students,
    'total_pages' => $totalPages,
    'current_page' => $page
]);
?>