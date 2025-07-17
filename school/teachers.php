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

if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $query = "SELECT id, name, subject FROM teachers WHERE id = $id AND school_id = $school_id LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'Teacher not found']);
    }

} else {
    $search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
    $where = "WHERE school_id = $school_id";
    if (!empty($search)) {
        $where .= " AND (name LIKE '%$search%' OR username LIKE '%$search%' OR subject LIKE '%$search%')";
    }

    $query = "SELECT id, name, username, subject FROM teachers $where ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    $teachers = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $teachers[] = $row;
    }

    echo json_encode($teachers);
}
?>
