<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$input = file_get_contents("php://input");
$data = json_decode($input);

if ($data) {
    $receipt = "jholtschke@gmx.de";
    
    $subject = "Kontaktanfrage: " . $data->subject;
    
    $message = "Vorname: " . $data->firstName . "\n" .
                 "Name: " . $data->name . "\n" .
                 "Email: " . $data->email . "\n\n" .
                 "Nachricht:\n" . $data->message;

    $sended = @mail($receipt, $subject, $message);
    
    if ($sended) {
        echo json_encode(["status" => "erfolg"]);
    } else {
        echo json_encode(["status" => "fehler", "grund" => "lokaler Mailserver fehlt"]);
    }
} else {
    echo json_encode(["status" => "fehler"]);
}
?>