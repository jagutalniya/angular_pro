<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $teacherRes = $conn->query("SELECT COUNT(*) as count FROM teachers");
    $studentRes = $conn->query("SELECT COUNT(*) as count FROM students");
    $schoolsRes = $conn->query("SELECT id, school_name, username FROM schools");

    $teacherCount = $teacherRes->fetch_assoc()['count'];
    $studentCount = $studentRes->fetch_assoc()['count'];

    $schools = [];
    while ($row = $schoolsRes->fetch_assoc()) {
        $schools[] = $row;
    }

    echo json_encode([
        'success' => true,
        'teacherCount' => $teacherCount,
        'studentCount' => $studentCount,
        'schools' => $schools
    ]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id'] ?? 0);

    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid ID']);
        exit();
    }

    $conn->query("DELETE FROM teachers WHERE school_id = $id");
    $conn->query("DELETE FROM students WHERE school_id = $id");

    $delete = $conn->query("DELETE FROM schools WHERE id = $id");
    if ($delete) {
        echo json_encode(['success' => true, 'message' => 'School deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Delete failed']);
    }
    exit();
}

echo json_encode(['success' => false, 'message' => 'Invalid request']);
$conn->close();
?>
