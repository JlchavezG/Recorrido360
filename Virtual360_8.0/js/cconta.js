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