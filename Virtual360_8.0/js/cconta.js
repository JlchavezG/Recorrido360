// Crear el div dinámicamente para el contador
const counterDiv = document.createElement('div');
counterDiv.id = 'visit-counter'; // cuanta el numero de visitas al abrir el localstoreg
counterDiv.innerText = 'Visitas: 0';
document.body.appendChild(counterDiv);

// Obtener visitas desde localStorage
let visits = localStorage.getItem('visits');
visits = visits ? parseInt(visits) + 1 : 1;
localStorage.setItem('visits', visits);

// Animación de cuenta ascendente
let current = 0;
const duration = 1000; // duración total en ms pueden cambiarla 
const steps = 60; // número de pasos de la animación
const increment = visits / steps;
const interval = duration / steps;

const countUp = setInterval(() => {
    current += increment;
    if (current >= visits) {
        current = visits;
        clearInterval(countUp);
    }
    counterDiv.innerText = `Numero de visitas. a la pagina: ${Math.floor(current)}`;
}, interval);

// funcion para determinar la geolocalizacion 
function mostrarUbicacion() {
    const modal = document.getElementById("ubicacionModal");
    const ubicacionInfo = document.getElementById("ubicacionInfo");
    const linkRuta = document.getElementById("linkRuta");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                ubicacionInfo.textContent = `Latitud: ${lat.toFixed(6)}, Longitud: ${lon.toFixed(6)}`;

                // Coordenadas de CONALEP Atizapán I
                const destinoLat = 19.573809;
                const destinoLon = -99.257534;

                // Enlace a Google Maps con ruta
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${destinoLat},${destinoLon}&travelmode=driving`;

                linkRuta.href = mapsUrl;
                linkRuta.textContent = "Cómo llegar a CONALEP Atizapán I";

                modal.style.display = "block";
            },
            function (error) {
                ubicacionInfo.textContent = "No se pudo obtener tu ubicación.";
                linkRuta.style.display = "none";
                modal.style.display = "block";
            }
        );
    } else {
        ubicacionInfo.textContent = "La geolocalización no está disponible en tu navegador.";
        modal.style.display = "block";
    }
}

function cerrarModal() {
    document.getElementById("ubicacionModal").style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function (event) {
    const modal = document.getElementById("ubicacionModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};