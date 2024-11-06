document.querySelectorAll('.estacionamiento').forEach((espacio) => {
    espacio.addEventListener('click', function () {
        const estacionamientoId = this.dataset.numero;
        
        const formData = new FormData();
        formData.append('estacionamiento', estacionamientoId);

        fetch('procesar_estacionamiento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Reservado")) {
                alert("Estacionamiento reservado correctamente.");
                this.classList.add('ocupado');
            } else if (data.includes("Ocupado")) {
                alert("El estacionamiento ya está ocupado.");
                this.classList.add('ocupado');
            } else {
                alert("Hubo un error. Intente nuevamente.");
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un problema al reservar el estacionamiento.');
        });
    });
});
