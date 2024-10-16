document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar la recarga de la página

    // Obtener los valores de los campos de correo y contraseña
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Validar que el correo pertenezca a la institución
    const correoValido = /^[a-zA-Z0-9._%+-]+@(alu\.uct\.cl|profe\.uct\.cl)$/;

    if (!correoValido.test(correo)) {
        alert("El correo no pertenece a la institución. Debe ser @alu.uct.cl o @profe.uct.cl.");
        return; // Detener el proceso si el correo no es válido
    }

    // Crear un objeto con los datos para enviar al servidor
    const datosRegistro = {
        correo: correo,
        contraseña: contraseña
    };

    // Enviar los datos al servidor mediante fetch
    fetch('procesar_registro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosRegistro)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mostrar el mensaje recibido del servidor
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });
});
