document.querySelectorAll('.estacionamiento').forEach(est => {
    est.addEventListener('click', function () {
        const estacionamiento_id = this.id.replace('est', ''); // Obtiene el ID numérico del estacionamiento
        fetch('http://localhost/Taller1-main/procesar_estacionamiento.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `estacionamiento_id=${estacionamiento_id}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === "Reservado") {
                alert("El estacionamiento ha sido reservado.");
                this.style.backgroundColor = 'blue';
                this.textContent = ""; // Quita el número si está reservado
            } else if (data === "Ocupado") {
                alert("El estacionamiento ya está ocupado.");
                this.style.backgroundColor = 'grey';
                this.textContent = ""; // Quita el número si está ocupado
            } else {
                alert("Error al reservar el estacionamiento.");
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un problema al enviar los datos. Intente de nuevo.");
        });
    });
});
