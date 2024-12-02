<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!file_exists("conex.inc")) {
    die("Error: El archivo conex.inc no existe en la ruta especificada.");
}
include "conex.inc";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;

    if ($usuario && $password) {
        $password = md5($password); // Encripta la contraseña con md5.

        if (!$conn) {
            die("Error de conexión a la base de datos: " . mysqli_connect_error());
        }

        $sql = "SELECT password FROM Usuarios WHERE usuario = ?";
        $query = $conn->prepare($sql);

        if (!$query) {
            die("Error al preparar la consulta: " . $conn->error);
        }

        $query->bind_param("s", $usuario);
        $query->execute();
        $resultado = $query->get_result();

        if (!$resultado) {
            die("Error al ejecutar la consulta: " . $query->error);
        }

        $item = $resultado->fetch_assoc();

        if ($item && $item["password"] === $password) {
            $_SESSION["usuario"] = $usuario;
            header("Location: seleccionar_estacionamiento.html");
            exit;
        } else {
            echo "Usuario o contraseña incorrectos.";
        }
    } else {
        echo "Por favor complete todos los campos.";
    }
} else {
    echo "Método no permitido.";
}
?>
