// Variables globales
let viewer = null;
let currentScene = null;
let isInitialized = false;

// Inicialización del tour
function initializeTour() {
    if (isInitialized) {
        console.log('El tour ya está inicializado');
        return;
    }

    try {
        console.log('Iniciando inicialización del tour...');
        
        // Verificar que PANOLENS esté disponible
        if (typeof PANOLENS === 'undefined') {
            throw new Error('PANOLENS no está disponible');
        }

        // Verificar que THREE esté disponible
        if (typeof THREE === 'undefined') {
            throw new Error('THREE.js no está disponible');
        }

        // Mostrar loader
        showLoader();

        // Crear el contenedor del visor
        const container = document.querySelector('#panoramaContainer');
        if (!container) {
            throw new Error('Contenedor del panorama no encontrado');
        }

        // Verificar que la configuración esté disponible
        if (!window.tourConfig || !window.tourConfig.scenes) {
            throw new Error('La configuración del tour no está disponible');
        }

        console.log('Creando visor PANOLENS...');
        viewer = new PANOLENS.Viewer({
            container: container,
            controlBar: false,
            autoRotate: window.tourConfig.settings.autoRotate,
            autoRotateSpeed: window.tourConfig.settings.autoRotateSpeed,
            enableReticle: false,
            output: 'console',
            initialLookAt: new THREE.Vector3(0, 0, 5000)
        });

        // Verificar que el visor se haya creado correctamente
        if (!viewer) {
            throw new Error('Error al crear el visor PANOLENS');
        }

        console.log('Visor creado correctamente');

        // Crear las escenas
        createScenes();

        // Configurar eventos
        setupEventListeners();

        // Cargar el menú de escenas
        loadSceneMenu();

        // Marcar como inicializado
        isInitialized = true;

        // Cargar la primera escena
        const firstSceneId = Object.keys(window.tourConfig.scenes)[0];
        if (firstSceneId) {
            loadScene(firstSceneId);
        }

        // Ocultar loader
        hideLoader();
        
        console.log('Tour inicializado correctamente');
    } catch (error) {
        console.error('Error en initializeTour:', error);
        hideLoader();
        window.appUtils.showMessage('Error al inicializar el tour virtual: ' + error.message, 'error');
    }
}

// Crear todas las escenas desde la configuración
function createScenes() {
    Object.entries(window.tourConfig.scenes).forEach(([id, sceneData]) => {
        createScene(id, sceneData);
    });
}

// Crear una escena individual
function createScene(id, sceneData) {
    console.log(`Creando escena: ${id}`);
    
    // Cargar la imagen o video 360
    const panorama = new PANOLENS.ImagePanorama(sceneData.imageUrl);
    
    // Manejar errores de carga
    panorama.addEventListener('error', (error) => {
        console.error(`Error al cargar la imagen para la escena ${id}:`, error);
        window.appUtils.showMessage(`Error al cargar la escena ${sceneData.title}. Por favor, intenta de nuevo.`, 'error');
    });

    // Manejar carga exitosa
    panorama.addEventListener('load', () => {
        console.log(`Escena ${id} cargada correctamente`);
    });
    
    // Configurar eventos de la escena
    panorama.addEventListener('enter', () => {
        console.log(`Entrando a la escena: ${id}`);
        updateSceneInfo(sceneData);
    });

    // Agregar hotspots
    if (sceneData.hotspots) {
        sceneData.hotspots.forEach(hotspot => {
            const sprite = createHotspotSprite(hotspot.name);
            panorama.add(sprite);
            sprite.position.set(hotspot.position.x, hotspot.position.y, hotspot.position.z);
            
            sprite.addEventListener('click', () => {
                loadScene(hotspot.target);
            });
        });
    }

    // Guardar referencia de la escena
    window.tourConfig.scenes[id].panorama = panorama;
    
    // Agregar al visor
    viewer.add(panorama);
}

// Crear sprite para hotspot
function createHotspotSprite(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 256;
    canvas.height = 256;
    
    // Dibujar el fondo del hotspot
    ctx.beginPath();
    ctx.arc(128, 128, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#BFA181';
    ctx.fill();
    
    // Agregar efecto de brillo
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 50);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Agregar texto
    ctx.font = 'bold 24px Montserrat';
    ctx.fillStyle = '#0A192F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 128);
    
    // Crear sprite
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
    });
    return new THREE.Sprite(material);
}

// Cargar una escena
function loadScene(sceneId) {
    try {
        const sceneData = window.tourConfig.scenes[sceneId];
        if (!sceneData) {
            throw new Error(`Escena ${sceneId} no encontrada`);
        }

        showLoader();

        if (currentScene !== sceneData.panorama) {
            if (!sceneData.panorama) {
                throw new Error(`La escena ${sceneId} no tiene un panorama cargado`);
            }

            viewer.setPanorama(sceneData.panorama);
            currentScene = sceneData.panorama;
            
            // Actualizar información de la escena
            updateSceneInfo(sceneData);
        }

        hideLoader();
    } catch (error) {
        console.error('Error al cargar la escena:', error);
        hideLoader();
        window.appUtils.showMessage('Error al cargar la escena: ' + error.message, 'error');
    }
}

// Actualizar información de la escena
function updateSceneInfo(sceneData) {
    // Actualizar título
    const titleElement = document.querySelector('#sceneTitle');
    if (titleElement) {
        titleElement.textContent = sceneData.title;
        titleElement.style.opacity = '1';
        setTimeout(() => {
            titleElement.style.opacity = '0';
        }, 3000);
    }

    // Actualizar descripción
    const descElement = document.querySelector('#sceneDescription');
    if (descElement) {
        descElement.textContent = sceneData.description;
        descElement.style.opacity = '1';
        setTimeout(() => {
            descElement.style.opacity = '0.7';
        }, 3000);
    }
}

// Cargar el menú de escenas
function loadSceneMenu() {
    const scenesList = document.getElementById('scenesList');
    if (!scenesList) return;

    // Limpiar lista actual
    scenesList.innerHTML = '';

    // Agregar cada escena al menú
    Object.entries(window.tourConfig.scenes).forEach(([id, sceneData]) => {
        const li = document.createElement('li');
        li.setAttribute('data-scene', id);
        
        // Determinar el ícono según el tipo de escena
        const icon = getSceneIcon(id);
        
        li.innerHTML = `
            <i class="fas ${icon}"></i>
            ${sceneData.title}
        `;
        
        li.addEventListener('click', () => {
            loadScene(id);
            document.querySelector('.menu-items').classList.remove('active');
        });
        
        scenesList.appendChild(li);
    });
}

// Obtener ícono según el tipo de escena
function getSceneIcon(sceneId) {
    const iconMap = {
        'entrada': 'fa-door-open',
        'cancha-futbol': 'fa-futbol',
        'arco-techo': 'fa-archway',
        'canchas-basquet': 'fa-basketball-ball',
        'edificio-a': 'fa-building',
        'edificio-b': 'fa-building',
        'edificio-c': 'fa-building',
        'taller-mecatronica': 'fa-robot',
        'taller-autotronica': 'fa-car',
        'lab-info': 'fa-desktop'
    };

    // Buscar coincidencia parcial en el ID de la escena
    const matchingKey = Object.keys(iconMap).find(key => sceneId.includes(key));
    return iconMap[matchingKey] || 'fa-map-marker-alt';
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación con teclado
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Botones de navegación
    document.querySelectorAll('.nav-control').forEach(button => {
        button.addEventListener('click', (e) => {
            const direction = e.currentTarget.classList[1].replace('nav-', '');
            navigateScene(direction);
        });
    });
    
    // Botón de volver al inicio
    document.getElementById('backToHome').addEventListener('click', () => {
        window.appUtils.transitionToSection('home');
    });
}

// Manejar navegación con teclado
function handleKeyNavigation(e) {
    if (!document.getElementById('viewer').classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            navigateScene('left');
            break;
        case 'ArrowRight':
            navigateScene('right');
            break;
        case 'ArrowUp':
            navigateScene('up');
            break;
        case 'ArrowDown':
            navigateScene('down');
            break;
        case 'Escape':
            window.appUtils.transitionToSection('home');
            break;
    }
}

// Navegar entre escenas
function navigateScene(direction) {
    const currentSceneId = Object.entries(window.tourConfig.scenes).find(
        ([id, data]) => data.panorama === currentScene
    )?.[0];

    if (!currentSceneId) return;

    const currentSceneData = window.tourConfig.scenes[currentSceneId];
    let targetSceneId = null;

    // Buscar el hotspot en la dirección indicada
    if (currentSceneData.hotspots) {
        const hotspot = currentSceneData.hotspots.find(h => {
            switch(direction) {
                case 'left':
                    return h.position.x < -1000;
                case 'right':
                    return h.position.x > 1000;
                case 'up':
                    return h.position.y > 500;
                case 'down':
                    return h.position.y < -500;
                default:
                    return false;
            }
        });

        if (hotspot) {
            targetSceneId = hotspot.target;
        }
    }

    if (targetSceneId) {
        loadScene(targetSceneId);
    }
}

// Mostrar/ocultar loader
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Exportar funciones necesarias
window.tourFunctions = {
    initializeTour,
    loadScene
}; 