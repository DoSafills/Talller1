<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletero";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$estacionamiento = $_POST['estacionamiento'];

// Consultar si el estacionamiento está ocupado
$sql = "SELECT * FROM estacionamientos WHERE id = $estacionamiento AND estado = 'ocupado'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Ocupado";
} else {
    // Marcar el estacionamiento como reservado
    $update_sql = "UPDATE estacionamientos SET estado = 'ocupado' WHERE id = $estacionamiento";
    if ($conn->query($update_sql) === TRUE) {
        echo "Reservado";
    } else {
        echo "Error";
    }
}

$conn->close();
?>
