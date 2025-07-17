<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include 'db.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

$countQuery = "SELECT COUNT(*) as total FROM teachers";
$countResult = mysqli_query($conn, $countQuery);
$total = mysqli_fetch_assoc($countResult)['total'];

$query = "SELECT teachers.*, schools.school_name 
          FROM teachers 
          JOIN schools ON teachers.school_id = schools.id 
          ORDER BY teachers.id DESC 
          LIMIT $limit OFFSET $offset";

$result = mysqli_query($conn, $query);

$teachers = [];
while ($row = mysqli_fetch_assoc($result)) {
    unset($row['password']);
    $teachers[] = $row;
}

echo json_encode([
    'success' => true,
    'teachers' => $teachers,
    'total' => $total
]);
