<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$message = $data['message'] ;

$sql = "INSERT INTO contact (name, email, message, created_at) 
        VALUES ('$name', '$email', '$message', NOW())";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed"]);
}

$conn->close();
?>
