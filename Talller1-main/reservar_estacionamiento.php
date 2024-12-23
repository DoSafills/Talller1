<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'conex.inc';

// Obtener el ID del estacionamiento desde el POST
$estacionamiento_id = $_POST['estacionamiento_id'];

// Consultar si el estacionamiento está ocupado
$sql = "SELECT * FROM estacionamientos WHERE id = $estacionamiento_id AND estado = 'ocupado'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Ocupado";
} else {
    // Marcar el estacionamiento como reservado
    $update_sql = "UPDATE estacionamientos SET estado = 'ocupado' WHERE id = $estacionamiento_id";
    if ($conn->query($update_sql) === TRUE) {
        echo "Reservado";
    } else {
        echo "Error";
    }
}

// Cerrar la conexión
$conn->close();
?>
