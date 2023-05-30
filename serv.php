<?php
$_post = file_get_contents('php://input');
echo "Recibido";

$datos = json_decode($_post, true);
$nombre = $datos["persona"];
$tarea = $datos["tarea"];
file_put_contents("datos/$nombre", json_encode($tarea));
?>
