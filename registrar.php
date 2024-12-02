<?php
include "conex.inc";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST["email"];
    $password = md5($_POST["password"]); // Encriptar contraseña con md5.

    // Consulta para insertar el usuario.
    $sql = "INSERT INTO Usuarios (usuario, password) VALUES (?, ?)";
    $query = $conn->prepare($sql); 
    $query->bind_param("ss", $usuario, $password);

    if ($query->execute()) {
        echo "Usuario registrado correctamente.";
        
        header("Location: index.html");
        exit(); 
    } else {
        echo "Error al registrar usuario: " . $query->error;
    }
} else {
    echo "Método no permitido.";
}
?>
