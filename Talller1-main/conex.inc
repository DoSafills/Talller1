<?php


$servidor = "mysql.inf.uct.cl";
$user     = "camilo_gangas";
$password = "OODQS-y0qkyJGu-8P";
$basedato = "A2023_camilo_gangas";


$conn = mysqli_connect($servidor, $user, $password, $basedato);


if(!$conn) {
    echo "Error de conexiÃ³n a la BD";
    exit();
}
