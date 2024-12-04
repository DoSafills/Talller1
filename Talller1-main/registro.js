document.getElementById('registro-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar la recarga de la página

    // Obtener los valores de los campos de correo y contraseña
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

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

    fetch('https://pillan.inf.uct.cl/~camilo.gangas/Taller1/procesar_registro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosRegistro)
    })
    .then(response => {
        // Verifica si la respuesta está en formato JSON
        return response.json().catch(() => {
            // Si no es JSON, lanza un mensaje de error
            throw new Error('La respuesta del servidor no es válida');
        });
    })
    .then(data => {
        if (data.success) {
            alert(data.success);
            // Redirigir a la página de selección de estacionamiento
            window.location.href = 'seleccionar_estacionamiento.html';
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al enviar los datos. Intente de nuevo.');
    });
});
