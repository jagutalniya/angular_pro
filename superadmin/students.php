<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$search = isset($_GET['search']) ? $_GET['search'] : '';
$limit = 5;
$offset = ($page - 1) * $limit;

$searchFilter = '';
if (!empty($search)) {
    $search = mysqli_real_escape_string($conn, $search);
    $searchFilter = "WHERE students.name LIKE '%$search%' 
                  OR students.username LIKE '%$search%' 
                  OR students.class LIKE '%$search%'";
}

$countQuery = "SELECT COUNT(*) as total FROM students $searchFilter";
$countResult = mysqli_query($conn, $countQuery);
$totalRows = mysqli_fetch_assoc($countResult)['total'];
$totalPages = ceil($totalRows / $limit);

$query = "SELECT students.*, 
                 schools.school_name, 
                 teachers.name AS teacher_name 
          FROM students 
          JOIN schools ON students.school_id = schools.id 
          LEFT JOIN teachers ON students.teacher_id = teachers.id 
          $searchFilter 
          ORDER BY students.id DESC 
          LIMIT $limit OFFSET $offset";

$result = mysqli_query($conn, $query);

$students = [];
while ($row = mysqli_fetch_assoc($result)) {
    unset($row['password']);
    $students[] = $row;
}

echo json_encode([
    'students' => $students,
    'pages' => $totalPages
]);
