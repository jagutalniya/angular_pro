<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

if (!isset($_SESSION['school_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$school_id = $_SESSION['school_id'];

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = (int)$_GET['id'];
    $query = "SELECT id, name, class, gender, address FROM students WHERE id = $id AND school_id = $school_id LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'Student not found']);
    }
    exit();
}
$search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
$where = "WHERE students.school_id = $school_id";

if (!empty($search)) {
    $where .= " AND (students.name LIKE '%$search%' OR students.username LIKE '%$search%' OR students.class LIKE '%$search%')";
}

$query = "SELECT students.id, students.username, students.name, students.class, students.gender, students.address,
                 teachers.name AS teacher_name
          FROM students
          LEFT JOIN teachers ON students.teacher_id = teachers.id
          $where
          ORDER BY students.id DESC";

$result = mysqli_query($conn, $query);

$students = [];
while ($row = mysqli_fetch_assoc($result)) {
    unset($row['password']);
    $students[] = $row;
}

echo json_encode($students);
?>
