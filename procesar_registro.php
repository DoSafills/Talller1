<?php
// procesar_registro.php

// Conectar con la base de datos
$servername = "localhost";
$username = "tu_usuario_db";
$password = "tu_contraseña_db";
$dbname = "bicicletero";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

// Verificar si el correo pertenece a la institución
if (!preg_match('/^[a-zA-Z0-9._%+-]+@(alu\.uct\.cl|profe\.uct\.cl)$/', $correo)) {
    echo "El correo no pertenece a la institución.";
    exit;
}

// Insertar datos en la tabla 'estudiante'
$sql = "INSERT INTO estudiante (NombreDeUsuario, Contraseña) VALUES ('$correo', '$contraseña')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
