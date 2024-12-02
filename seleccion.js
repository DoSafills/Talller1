document.addEventListener('DOMContentLoaded', () => {
    const areas = {
        1: 15, // Área 1 con 10 estacionamientos
        2: 10  // Área 2 con 15 estacionamientos
    };

    const areaButtons = document.querySelectorAll('.area-btn');
    const estacionamientosContainer = document.getElementById('estacionamientos');

    areaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const area = button.getAttribute('data-area');
            const totalEstacionamientos = areas[area];

            // Limpiar estacionamientos existentes
            estacionamientosContainer.innerHTML = '';

            // Generar nuevos estacionamientos para el área seleccionada
            for (let i = 1; i <= totalEstacionamientos; i++) {
                const estacionamiento = document.createElement('div');
                estacionamiento.className = 'estacionamiento';
                estacionamiento.textContent = i;
                estacionamiento.setAttribute('data-numero', i);

                // Añadir evento para seleccionar estacionamiento
                estacionamiento.addEventListener('click', () => {
                    document.querySelectorAll('.estacionamiento').forEach(est => 
                        est.classList.remove('seleccionado')
                    );
                    estacionamiento.classList.add('seleccionado');
                });

                estacionamientosContainer.appendChild(estacionamiento);
            }
        });
    });
})

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

        document.addEventListener('DOMContentLoaded', () => {
            // Seleccionamos todos los estacionamientos
            const estacionamientos = document.querySelectorAll('.estacionamiento');
        
            estacionamientos.forEach(estacionamiento => {
                // Agregamos un evento de clic a cada estacionamiento
                estacionamiento.addEventListener('click', () => {
                    // Desmarcar todos los estacionamientos previamente seleccionados
                    estacionamientos.forEach(est => est.classList.remove('seleccionado'));
        
                    // Marcar el estacionamiento actual como seleccionado
                    estacionamiento.classList.add('seleccionado');
                });
            });
        });
        
    });
});
