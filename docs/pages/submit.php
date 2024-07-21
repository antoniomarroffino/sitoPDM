<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $oggetto = htmlspecialchars($_POST['oggetto']);
    $messaggio = htmlspecialchars($_POST['messaggio']);

    $to = 'marroffino22@gmail.com';
    $subject = "Nuovo messaggio dal sito: $oggetto";
    $message = "Nome: $nome\nEmail: $email\n\nMessaggio:\n$messaggio";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true, "message" => "Email inviata con successo."]);
    } else {
        echo json_encode(["success" => false, "message" => "A causa di un errore l'email non è stata inviata."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Richiesta non valida."]);
}
?>

