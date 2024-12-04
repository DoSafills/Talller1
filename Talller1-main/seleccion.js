document.addEventListener('DOMContentLoaded', () => {
    const areas = {
        1: 10, // Área 1 con 10 estacionamientos
        2: 15  // Área 2 con 15 estacionamientos
    };

    const areaButtons = document.querySelectorAll('.area-btn');
    const estacionamientosContainer = document.getElementById('estacionamientos');
    const btnAceptar = document.getElementById('btnAceptar');

    let estacionamientoSeleccionado = null;

    areaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const area = button.getAttribute('data-area');
            const totalEstacionamientos = areas[area];

            // Limpiar estacionamientos existentes
            estacionamientosContainer.innerHTML = '';
            estacionamientoSeleccionado = null;
            toggleAceptarButton();

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
                    estacionamientoSeleccionado = i;
                    toggleAceptarButton();
                });

                estacionamientosContainer.appendChild(estacionamiento);
            }
        });
    });

    // Activar o desactivar el botón Aceptar
    const toggleAceptarButton = () => {
        if (estacionamientoSeleccionado !== null) {
            btnAceptar.classList.add('enabled');
            btnAceptar.disabled = false;
            btnAceptar.style.cursor = 'pointer';
        } else {
            btnAceptar.classList.remove('enabled');
            btnAceptar.disabled = true;
            btnAceptar.style.cursor = 'not-allowed';
        }
    };

    // Evento para el botón Aceptar
    btnAceptar.addEventListener('click', () => {
        if (estacionamientoSeleccionado !== null) {
            alert(`Estacionamiento ${estacionamientoSeleccionado} seleccionado. Procediendo al registro...`);
            // Aquí puedes agregar el redireccionamiento o registro.
        }
    });
});



document.querySelectorAll('.estacionamiento').forEach(est => {
    est.addEventListener('click', function () {
        const estacionamiento_id = this.id.replace('est', ''); // Obtiene el ID numérico del estacionamiento
        fetch('https://pillan.inf.uct.cl/~camilo.gangas/Taller1/reservar_estacionamiento.php', {
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
