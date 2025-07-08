// Estado de la aplicación
const appState = {
    currentScene: null,
    viewer: null,
    thumbnailsState: {
        hidden: false,
        minimized: false,
        topPosition: false
    }
};

// Función para generar miniaturas dinámicamente desde la configuración
function generateThumbnails() {
    console.log('Generando miniaturas dinámicamente...');
    
    const thumbnailsContainer = document.getElementById('scene-thumbnails-container');
    if (!thumbnailsContainer) {
        console.error('Contenedor de miniaturas no encontrado');
        return;
    }

    // Limpiar contenedor
    thumbnailsContainer.innerHTML = '';

    // Obtener todas las escenas de la configuración
    const scenes = tourConfig.scenes;
    const sceneKeys = Object.keys(scenes);

    // Ordenar las escenas según un orden lógico (opcional)
    const sceneOrder = [
        'plaza-roja', 'taller-autotronica', 'auditorio', 'edificio-b', 'edificio-c',
        'parque', 'cafeteria', 'arco-techo', 'cancha-futbol', 'exterior',
        'lab-computo-1', 'lab-computo-2', 'lab-computo-3', 'orientacion',
        'taller-mecatronica', 'aula-tipo', 'biblioteca', 'laboratorio',
        'direccion', 'informatica', 'estacionamiento'
    ];

    // Filtrar solo las escenas que existen en la configuración
    const orderedScenes = sceneOrder.filter(key => sceneKeys.includes(key));

    // Crear miniaturas para cada escena
    orderedScenes.forEach(sceneKey => {
        const scene = scenes[sceneKey];
        if (!scene || !scene.thumbnail) {
            console.warn(`Escena ${sceneKey} no tiene configuración de miniatura`);
            return;
        }

        const thumbnailBtn = document.createElement('button');
        thumbnailBtn.className = 'thumbnail-btn';
        thumbnailBtn.setAttribute('data-scene', sceneKey);
        
        // Agregar tooltip si es Street View
        if (scene.thumbnail.isStreetView) {
            thumbnailBtn.setAttribute('data-tooltip', 'Ver en Google Maps Street View');
        }

        // Crear contenido de la miniatura
        const img = document.createElement('img');
        img.src = scene.thumbnail.image;
        img.alt = scene.thumbnail.alt;
        
        // ID especial para la miniatura exterior
        if (sceneKey === 'exterior') {
            img.id = 'exterior-thumbnail-img';
        }

        const span = document.createElement('span');
        
        // Agregar icono para Street View
        if (scene.thumbnail.isStreetView) {
            span.innerHTML = `<i class=\"fas fa-map-marker-alt\"></i> ${scene.thumbnail.displayName}`;
        } else {
            span.textContent = scene.thumbnail.displayName;
        }

        thumbnailBtn.appendChild(img);
        thumbnailBtn.appendChild(span);

        // Agregar evento de clic
        thumbnailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const sceneId = this.getAttribute('data-scene');
            if (sceneId) {
                initializeViewer(sceneId);
                // Marcar miniatura activa
                markActiveThumbnail(sceneId);
            }
        });

        thumbnailsContainer.appendChild(thumbnailBtn);
    });

    console.log(`✅ Se generaron ${orderedScenes.length} miniaturas dinámicamente`);
}

// Función para marcar la miniatura activa
function markActiveThumbnail(sceneId) {
    document.querySelectorAll('.thumbnail-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-scene') === sceneId);
    });
}

// Variables globales para Google Maps
let streetViewPanorama = null;
let streetViewService = null;

// Coordenadas del CONALEP Atizapán 1 (ajustadas para Street View disponible)
const CONALEP_COORDINATES = {
    lat: 19.552140452825576,
    lng: -99.26598129024873
};

// Verificar dependencias
async function checkDependencies() {
    const dependencies = {
        'THREE': window.THREE,
        'PANOLENS': window.PANOLENS,
        'Pannellum': window.pannellum
    };

    const missingDeps = Object.entries(dependencies)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missingDeps.length > 0) {
        throw new Error(`Faltan las siguientes dependencias: ${missingDeps.join(', ')}`);
    }

    return true;
}

// Función para crear elementos HTML personalizados para hotspots de navegación
function createNavigationHotspotElement(hotspot) {
    const div = document.createElement('div');
    let iconClass = '';
    let tooltipText = hotspot.text || '';

    // Si el hotspot tiene imagen personalizada
    if (hotspot.image) {
        div.className = hotspot.cssClass || '';
        const img = document.createElement('img');
        img.src = hotspot.image;
        img.alt = hotspot.text || '';
        div.appendChild(img);
    } else {
        if (hotspot.text && hotspot.text.includes('Siguiente')) {
        div.className = 'hotspot-next';
        iconClass = 'fas fa-arrow-circle-right';
            tooltipText = hotspot.text;
        } else if (hotspot.text && hotspot.text.includes('Anterior')) {
        div.className = 'hotspot-prev';
        iconClass = 'fas fa-arrow-circle-left';
            tooltipText = hotspot.text;
        } else if (hotspot.cssClass) {
            div.className = hotspot.cssClass;
    }
        if (iconClass) {
    div.innerHTML = `<i class="${iconClass}"></i>`;
        }
    }

    div.setAttribute('data-tooltip', tooltipText);
    div.addEventListener('click', () => {
        initializeViewer(hotspot.target);
    });
    return div;
}

// Inicializar el visor de panorama
function initializeViewer(sceneId) {
    const panoramaContainer = document.getElementById('panorama');
    const streetViewContainer = document.getElementById('streetview-panorama');

    // Manejar la escena exterior (Google Maps Street View)
    if (sceneId === 'exterior') {
        if (panoramaContainer) panoramaContainer.style.display = 'none';
        if (streetViewContainer) {
            streetViewContainer.style.display = 'block';
            streetViewContainer.innerHTML = `<iframe id="streetview-iframe-full" width="100%" height="100%" style="border:0; border-radius:0; min-height:100vh; min-width:100vw;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!3m2!1ses!2smx!4v1751519867040!5m2!1ses!2smx!6m8!1m7!1sSqaY_JtS5QmpYRAe53Gx-w!2m2!1d19.55265896593928!2d-99.26671167342474!3f170.37060101457956!4f-31.333625581753417!5f0.7820865974627469"></iframe>`;
        }
        return;
    } else {
        if (streetViewContainer) {
            streetViewContainer.style.display = 'none';
            streetViewContainer.innerHTML = '';
        }
        if (panoramaContainer) panoramaContainer.style.display = 'block';
    }
    
    const scene = tourConfig.scenes[sceneId];
    if (!scene) return;

    console.log('Inicializando visor para la escena:', sceneId);

    if (!panoramaContainer) return;

    // Destruir el visor existente si hay uno
    if (appState.viewer) {
        appState.viewer.destroy();
    }

    // Configuración base de Pannellum
    const pannellumOptions = {
        type: 'equirectangular',
        panorama: scene.panorama,
        autoLoad: true,
        autoRotate: -2,
        compass: true,
        northOffset: 0,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        minPitch: -90,
        maxPitch: 90,
        minYaw: -180,
        maxYaw: 180,
        showControls: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        showCompass: true,
        mouseZoom: true,
        touchZoom: true,
        crossOrigin: 'anonymous',
        onLoad: () => {
            console.log('Panorama cargado correctamente');
            updateSceneInfo(sceneId);

            // Añadir hotspots después de cargar el panorama
            if (scene.hotspots) {
                scene.hotspots.forEach(hotspot => {
                    appState.viewer.addHotspot({
                        "id": hotspot.target + '-hotspot',
                        "pitch": hotspot.pitch,
                        "yaw": hotspot.yaw,
                        "type": hotspot.type, // 'scene' para navegación, 'info' para información
                        "text": hotspot.text,
                        "cssClass": hotspot.cssClass, // Clase CSS para estilos personalizados
                        "clickHandlerFunc": function(e) {
                            // Manejar clics solo para hotspots de escena
                            if (hotspot.type === 'scene') {
                                initializeViewer(hotspot.target);
                            }
                        }
                    });
                });
            }
        },
        onError: (errorMsg) => {
            console.error('Error al cargar el panorama:', errorMsg);
            showError('Error al cargar la imagen panorámica. Por favor, intenta de nuevo.');
        }
    };

    appState.viewer = pannellum.viewer('panorama', pannellumOptions);
    appState.currentScene = sceneId;
    
    // Actualizar inmediatamente la información de la escena y marcar miniatura activa
    updateSceneInfo(sceneId);
}

// Mostrar mensaje de error
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button onclick="window.location.reload()">Reintentar</button>
        </div>
    `;
    document.body.appendChild(errorDiv);
}

// Actualizar información de la escena
function updateSceneInfo(sceneId) {
    const scene = tourConfig.scenes[sceneId];
    if (!scene) return;

    // Actualizar el overlay de información
    const sceneTitle = document.querySelector('.scene-info-overlay .scene-title');
    const sceneDescription = document.querySelector('.scene-info-overlay .scene-description');
    if (sceneTitle) sceneTitle.textContent = scene.title;
    if (sceneDescription) sceneDescription.textContent = scene.description;

    // Marcar miniatura activa usando la nueva función
    markActiveThumbnail(sceneId);
    
    // Notificar al asistente virtual sobre el cambio de escena
    if (window.virtualAssistant) {
        window.virtualAssistant.changeScene(sceneId);
    }
    
    // Disparar evento personalizado para el cambio de escena
    const sceneChangeEvent = new CustomEvent('sceneChanged', {
        detail: { sceneId: sceneId }
    });
    document.dispatchEvent(sceneChangeEvent);
}

// Inicializar el tour
function initializeTour() {
    const startButton = document.querySelector('.cta-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            const tourSection = document.querySelector('.tour-section');
            if (tourSection) {
                tourSection.style.display = 'block';
                initializeViewer('plaza-roja');
                tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Miniaturas de escenas (ahora se manejan dinámicamente en generateThumbnails)
    // Los eventos se configuran automáticamente al generar las miniaturas

    // Menú superior (Home/Contacto)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            if (section === 'contact') {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                    document.querySelector('.tour-section').style.display = 'none';
                    contactSection.classList.add('active');
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (section === 'home') {
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                document.querySelector('.tour-section').style.display = 'none';
                document.getElementById('home').classList.add('active');
                document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Inicializar el formulario de contacto
    if (window.contactFunctions && window.contactFunctions.initializeContactForm) {
        window.contactFunctions.initializeContactForm();
    }
}

// Función para inicializar la escena inicial
function initializeInitialScene() {
    // Obtener todas las escenas disponibles de la configuración
    const sceneIds = Object.keys(tourConfig.scenes);
    
    // Elegir una escena al azar
    const randomScene = sceneIds[Math.floor(Math.random() * sceneIds.length)];
    
    // Inicializar el visor
    initializeViewer(randomScene);
    
    // Asegurar que la miniatura se marque como activa después de un breve delay
    setTimeout(() => {
        // Marcar miniatura activa usando la nueva función
        markActiveThumbnail(randomScene);
        console.log(`Miniatura activa establecida: ${randomScene}`);
        
        // Actualizar información de la escena
        updateSceneInfo(randomScene);
    }, 200);
}

// Inicializar el tour automáticamente
window.addEventListener('DOMContentLoaded', () => {
    initializeInitialScene();
    
    // El audio se reproducirá después de que termine el preloader
    // (ver código del preloader más abajo)

    // Botón de Inicio
    const inicioBtn = document.querySelector('.nav-link[data-section="home"]');
    if (inicioBtn) {
        inicioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.tour-section').style.display = 'block';
            document.getElementById('contact').classList.remove('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // Botón de Contacto
    const contactoBtn = document.querySelector('.nav-link[data-section="contact"]');
    if (contactoBtn) {
        contactoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.tour-section').style.display = 'none';
            document.getElementById('contact').classList.add('active');
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    setupThumbnailNavigation();
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    if (appState.viewer) {
        appState.viewer.resize();
    }
});

// Manejo de miniaturas para cambiar de escena
// Función para configurar navegación de miniaturas (simplificada)
function setupThumbnailNavigation() {
    document.querySelectorAll('.thumbnail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const sceneId = btn.getAttribute('data-scene');
            if (sceneId) {
                initializeViewer(sceneId);
                // Marcar miniatura activa usando la nueva función
                markActiveThumbnail(sceneId);
            }
        });
    });
} 

// --- TOOLTIP DINÁMICO ---
function createTooltip(element, text) {
    let tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = text;
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 8 + window.scrollY) + 'px';
    setTimeout(() => tooltip.classList.add('show'), 10);
    element._tooltip = tooltip;
}
function removeTooltip(element) {
    if (element._tooltip) {
        element._tooltip.classList.remove('show');
        setTimeout(() => {
            if (element._tooltip) document.body.removeChild(element._tooltip);
            element._tooltip = null;
        }, 200);
    }
}
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
        createTooltip(this, this.getAttribute('data-tooltip'));
    });
    el.addEventListener('mouseleave', function() {
        removeTooltip(this);
    });
});

// --- MENSAJE DE BIENVENIDA (solo la primera vez) ---
window.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('v360_welcome_shown')) {
        showNotification('¡Bienvenido! Usa las miniaturas para explorar y el botón de la luna/sol para cambiar el tema.', 'info', 7000);
        localStorage.setItem('v360_welcome_shown', '1');
    }
});

// --- NOTIFICACIONES VISUALES ---
function showNotification(text, type = 'info', duration = 4000) {
    let notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerText = text;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 400);
    }, duration);
}

// --- Preloader llamativo para el recorrido virtual ---
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader-v360');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Reproducir sonido 01 después de que termine la intro de carga
                const audio01 = document.getElementById('coni-welcome-audio');
                if (audio01) {
                    audio01.currentTime = 0;
                    audio01.play().catch(error => {
                        console.log('No se pudo reproducir el audio automáticamente:', error);
                    });
                    console.log('🎵 Audio de bienvenida reproducido después del preloader');
                }
            }, 800);
        }, 2000);
    }
});

// --- Notificación de cambio de tema ---
function notifyThemeChange(theme) {
    const themeName = theme === 'light' ? 'Tema claro activado' : 'Tema oscuro activado';
    showNotification(themeName, 'info', 5000);
}
// Detecta cambio de tema por botón o por código
(function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                const theme = document.body.getAttribute('data-theme');
                notifyThemeChange(theme);
            }
        });
    });
    observer.observe(document.body, { attributes: true });
})();

// --- Audio descriptivo por escena ---
const audioDescriptions = {
    'cafeteria': { src: 'assets/audio/cafeteria.mp3', title: 'Cafetería' },
    'zona-verde': { src: 'assets/audio/zona-verde.mp3', title: 'Zona Verde' },
    'arco-techo': { src: 'assets/audio/arco-techo.mp3', title: 'Arco Techo' },
    'cancha-futbol': { src: 'assets/audio/cancha-futbol.mp3', title: 'Cancha de Fútbol' },
    'edificio-b': { src: 'assets/audio/edificio-b.mp3', title: 'Edificio B' },
    'edificio-c': { src: 'assets/audio/edificio-c.mp3', title: 'Edificio C' },
    'estacionamiento': { src: 'assets/audio/estacionamiento.mp3', title: 'Estacionamiento' },
    'lab-computo-1': { src: 'assets/audio/lab-computo-1.mp3', title: 'Lab. Cómputo 1' },
    'lab-computo-2': { src: 'assets/audio/lab-computo-2.mp3', title: 'Lab. Cómputo 2' },
    'lab-computo-3': { src: 'assets/audio/lab-computo-3.mp3', title: 'Lab. Cómputo 3' },
    'aula-tipo': { src: 'assets/audio/aula-tipo.mp3', title: 'Aula Tipo' },
    'biblioteca': { src: 'assets/audio/biblioteca.mp3', title: 'Biblioteca' },
    'laboratorio': { src: 'assets/audio/laboratorio.mp3', title: 'Laboratorio' },
    'orientacion': { src: 'assets/audio/orientacion.mp3', title: 'Orientación' },
    'direccion': { src: 'assets/audio/direccion.mp3', title: 'Dirección' },
    'informatica': { src: 'assets/audio/informatica.mp3', title: 'Informática' },
    'taller-mecatronica': { src: 'assets/audio/taller-mecatronica.mp3', title: 'Taller de Mecatrónica' }
    // Agrega más escenas y audios según sea necesario
};

function showAudioDescription(sceneKey) {
    const container = document.getElementById('audio-description-container');
    const audio = document.getElementById('audio-description');
    const source = document.getElementById('audio-description-source');
    const title = document.getElementById('audio-description-title');
    if (audioDescriptions[sceneKey]) {
        source.src = audioDescriptions[sceneKey].src;
        audio.load();
        container.style.display = 'flex';
        title.textContent = audioDescriptions[sceneKey].title;
        
        // Notificar al asistente virtual sobre el inicio del audio
        const audioStartEvent = new CustomEvent('audioStarted', {
            detail: { sceneKey: sceneKey }
        });
        document.dispatchEvent(audioStartEvent);
        
        // Escuchar cuando el audio termine
        audio.addEventListener('ended', () => {
            const audioStopEvent = new CustomEvent('audioStopped', {
                detail: { sceneKey: sceneKey }
            });
            document.dispatchEvent(audioStopEvent);
        });
        
        // Escuchar cuando el audio se pause
        audio.addEventListener('pause', () => {
            const audioStopEvent = new CustomEvent('audioStopped', {
                detail: { sceneKey: sceneKey }
            });
            document.dispatchEvent(audioStopEvent);
        });
    } else {
        source.src = '';
        audio.load();
        container.style.display = 'none';
        title.textContent = '';
    }
}
// Vincula el cambio de escena con el audio descriptivo
// Si ya tienes una función que maneja el cambio de escena, llama a showAudioDescription(sceneKey) ahí.
document.querySelectorAll('.thumbnail-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const sceneKey = this.getAttribute('data-scene');
        showAudioDescription(sceneKey);
    });
});

// Navegación con flechas laterales
const sceneButtons = Array.from(document.querySelectorAll('.thumbnail-btn'));
const leftArrow = document.getElementById('thumbnails-arrow-left');
const rightArrow = document.getElementById('thumbnails-arrow-right');

function goToSceneByArrow(direction) {
    const activeBtn = document.querySelector('.thumbnail-btn.active');
    const idx = sceneButtons.findIndex(btn => btn === activeBtn);
    let nextIdx = idx;
    if (direction === 'left') {
        nextIdx = idx > 0 ? idx - 1 : sceneButtons.length - 1;
    } else if (direction === 'right') {
        nextIdx = idx < sceneButtons.length - 1 ? idx + 1 : 0;
    }
    sceneButtons[nextIdx].click();
}

if (leftArrow) {
    leftArrow.addEventListener('click', () => goToSceneByArrow('left'));
}
if (rightArrow) {
    rightArrow.addEventListener('click', () => goToSceneByArrow('right'));
}

// --- Inicialización específica de miniaturas ---
function initializeThumbnails() {
    console.log('Inicializando miniaturas...');
    
    // Generar miniaturas dinámicamente primero
    generateThumbnails();
    
    const thumbnailsWrapper = document.querySelector('.scene-thumbnails-wrapper');
    const thumbnails = document.querySelector('.scene-thumbnails');
    const miniMinBtn = document.getElementById('mini-carousel-minimize-btn');
    const miniHideBtn = document.getElementById('mini-carousel-hide-btn');
    const carouselLeftBtn = document.getElementById('carousel-nav-left');
    const carouselRightBtn = document.getElementById('carousel-nav-right');
    const showThumbnailsBtn = document.getElementById('show-thumbnails-btn');

    if (!thumbnailsWrapper || !thumbnails) {
        console.error('Elementos de miniaturas no encontrados');
        return;
    }

    // Restaurar estado desde localStorage
    if (localStorage.getItem('miniCarouselMinimized') === 'true') {
        thumbnails.classList.add('minimized');
    if (miniMinBtn) {
            miniMinBtn.innerHTML = '<i class="fas fa-plus"></i>';
        }
    }
    if (localStorage.getItem('miniCarouselHidden') === 'true') {
        thumbnailsWrapper.classList.add('hidden');
        if (miniHideBtn) {
            miniHideBtn.innerHTML = '<i class="fas fa-eye"></i>';
        }
        
        // Mostrar indicador si las miniaturas están ocultas
        const indicator = document.getElementById('thumbnails-hidden-indicator');
        if (indicator) {
            indicator.classList.add('show');
            console.log('Mostrando indicador al cargar página (miniaturas ocultas)');
        }
    }

    // Configurar botón minimizar/maximizar
    if (miniMinBtn) {
        // Remover event listeners existentes
        miniMinBtn.replaceWith(miniMinBtn.cloneNode(true));
        const newMiniMinBtn = document.getElementById('mini-carousel-minimize-btn');
        
        newMiniMinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const minimized = thumbnails.classList.toggle('minimized');
            newMiniMinBtn.innerHTML = minimized ? '<i class="fas fa-plus"></i>' : '<i class="fas fa-minus"></i>';
            localStorage.setItem('miniCarouselMinimized', minimized);
            
            console.log(`Miniaturas ${minimized ? 'minimizadas' : 'maximizadas'}`);
            
            // Mostrar notificación
            if (typeof showNotification === 'function') {
                showNotification(`Miniaturas ${minimized ? 'minimizadas' : 'maximizadas'}`, 'info', 2000);
            }
        });
        
        console.log('✅ Botón minimizar configurado correctamente');
    }

    // Configurar botón ocultar/mostrar
    if (miniHideBtn) {
        // Remover event listeners existentes
        miniHideBtn.replaceWith(miniHideBtn.cloneNode(true));
        const newMiniHideBtn = document.getElementById('mini-carousel-hide-btn');
        
        newMiniHideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const hidden = thumbnailsWrapper.classList.toggle('hidden');
            newMiniHideBtn.innerHTML = hidden ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            localStorage.setItem('miniCarouselHidden', hidden);
            
            console.log(`Miniaturas ${hidden ? 'ocultadas' : 'mostradas'}`);
            
            // Mostrar/ocultar indicador
            const indicator = document.getElementById('thumbnails-hidden-indicator');
            if (indicator) {
                if (hidden) {
                    indicator.classList.add('show');
                    console.log('Mostrando indicador de miniaturas ocultas');
                } else {
                    indicator.classList.remove('show');
                    console.log('Ocultando indicador de miniaturas ocultas');
                }
            }
            
            // Mostrar notificación
            if (typeof showNotification === 'function') {
                showNotification(`Miniaturas ${hidden ? 'ocultadas' : 'mostradas'}`, 'info', 2000);
            }
        });
        
        console.log('✅ Botón ocultar configurado correctamente');
    }

    // Configurar botón para mostrar miniaturas cuando están ocultas
    if (showThumbnailsBtn) {
        // Remover event listeners existentes
        showThumbnailsBtn.replaceWith(showThumbnailsBtn.cloneNode(true));
        const newShowThumbnailsBtn = document.getElementById('show-thumbnails-btn');
        
        newShowThumbnailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Botón de mostrar miniaturas clickeado');
            thumbnailsWrapper.classList.remove('hidden');
            
            if (miniHideBtn) {
                miniHideBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            }
            
            localStorage.setItem('miniCarouselHidden', false);
            
            const indicator = document.getElementById('thumbnails-hidden-indicator');
            if (indicator) {
                indicator.classList.remove('show');
            }
            
            console.log('✅ Miniaturas mostradas desde indicador');
        });
        
        console.log('✅ Botón mostrar miniaturas configurado correctamente');
    }

    // Configurar botones de navegación del carrusel
    if (carouselLeftBtn) {
        carouselLeftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            thumbnails.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }
    if (carouselRightBtn) {
        carouselRightBtn.addEventListener('click', function(e) {
            e.preventDefault();
            thumbnails.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Verificar que las miniaturas se generaron correctamente
    const thumbnailButtons = document.querySelectorAll('.thumbnail-btn');
    if (thumbnailButtons.length > 0) {
        console.log(`✅ Se generaron ${thumbnailButtons.length} miniaturas dinámicamente`);
    } else {
        console.warn('No se generaron miniaturas');
    }

    // Añadir atajos de teclado para los controles
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + T para toggle minimizar/maximizar
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            if (miniMinBtn) miniMinBtn.click();
        }
        
        // Ctrl/Cmd + H para ocultar/mostrar
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            if (miniHideBtn) miniHideBtn.click();
        }
    });

    // Mostrar tooltips informativos en los controles
    if (miniMinBtn) {
        miniMinBtn.setAttribute('title', 'Minimizar/Maximizar miniaturas (Ctrl+T)');
    }
    if (miniHideBtn) {
        miniHideBtn.setAttribute('title', 'Ocultar/Mostrar miniaturas (Ctrl+H)');
    }

    console.log('✅ Inicialización de miniaturas completada');
}

// Llamar a la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando inicialización...');
    
    // Inicializar miniaturas después de un pequeño delay para asegurar que todo esté cargado
    setTimeout(initializeThumbnails, 100);
    
    // Verificar Google Maps API
    console.log('Verificando Google Maps API...');
    if (typeof google !== 'undefined' && google.maps) {
        console.log('✅ Google Maps API disponible, inicializando Street View...');
        initializeStreetView();
    } else {
        console.log('⏳ Google Maps API no disponible, esperando carga...');
        // Esperar a que Google Maps se cargue
        window.addEventListener('load', function() {
            console.log('Página completamente cargada, verificando Google Maps...');
            if (typeof google !== 'undefined' && google.maps) {
                console.log('✅ Google Maps API cargada, inicializando Street View...');
                initializeStreetView();
            } else {
                console.error('❌ Google Maps API no disponible después de la carga completa');
            }
        });
    }
});

// --- Lógica para Street View ---
function mostrarStreetView() {
    console.log('Mostrando Street View con coordenadas:', CONALEP_COORDINATES);
    
    if (!streetViewPanorama) {
        console.log('Inicializando Street View...');
        initializeStreetView();
    }
    
    if (streetViewPanorama) {
        console.log('Actualizando posición del Street View...');
        streetViewPanorama.setPosition(CONALEP_COORDINATES);
        
        // Forzar la actualización del panorama
        streetViewPanorama.setPov({
            heading: 34,
            pitch: 10
        });
    }
    
    // Actualizar información de la escena
    updateSceneInfo('exterior');
    
    // Marcar miniatura activa usando la nueva función
    markActiveThumbnail('exterior');
    
    showNotification('Vista exterior del CONALEP Atizapán 1 - Google Maps Street View', 'info', 3000);
}

// Función para inicializar Google Maps Street View
function initializeStreetView() {
    console.log('Inicializando Street View...');
    console.log('Coordenadas a usar:', CONALEP_COORDINATES);
    
    if (typeof google === 'undefined' || !google.maps) {
        console.error('Google Maps API no está cargada');
        return;
    }
    
    const streetViewContainer = document.getElementById('streetview-panorama');
    if (!streetViewContainer) {
        console.error('Contenedor de Street View no encontrado');
        return;
    }
    
    streetViewService = new google.maps.StreetViewService();
    
    // Crear el panorama de Street View con configuración mejorada
    streetViewPanorama = new google.maps.StreetViewPanorama(
        streetViewContainer,
        {
            position: CONALEP_COORDINATES,
            pov: {
                heading: 34,
                pitch: 10
            },
            zoom: 1,
            addressControl: false,
            fullscreenControl: false,
            motionTracking: false,
            motionTrackingControl: false,
            panControl: true,
            zoomControl: true,
            streetViewControl: false,
            clickToGo: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            enableCloseButton: false
        }
    );
    
    // Agregar eventos de carga y error
    streetViewPanorama.addListener('position_changed', function() {
        console.log('Street View posición actualizada a:', streetViewPanorama.getPosition().toJSON());
    });
    
    streetViewPanorama.addListener('status_changed', function() {
        const status = streetViewPanorama.getStatus();
        console.log('Street View status:', status);
        
        if (status === google.maps.StreetViewStatus.OK) {
            console.log('✅ Street View cargado correctamente');
        } else {
            console.warn('⚠️ Street View status:', status);
            // Intentar buscar ubicación alternativa automáticamente
            findNearestStreetView();
        }
    });
    
    // Verificar si hay Street View disponible en la ubicación
    streetViewService.getPanorama({
        location: CONALEP_COORDINATES,
        radius: 100 // Aumentar el radio de búsqueda
    }, function(data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
            console.log('✅ Street View disponible en CONALEP Atizapán 1');
            console.log('Panorama ID:', data.location.pano);
        } else {
            console.warn('⚠️ Street View no disponible en esta ubicación:', status);
            console.log('Intentando con coordenadas alternativas...');
            
            // Usar la función mejorada para buscar ubicaciones alternativas
            findNearestStreetView();
        }
    });
}

// Generar miniatura dinámica para la escena exterior
function setExteriorThumbnail() {
    console.log('Configurando miniatura del exterior...');
    const exteriorBtn = document.querySelector('.thumbnail-btn[data-scene="exterior"]');
    if (exteriorBtn) {
        const img = exteriorBtn.querySelector('img');
        const span = exteriorBtn.querySelector('span');
        
        if (img && span) {
            console.log('Elementos de miniatura exterior encontrados, configurando...');
            
            // Coordenadas del CONALEP Atizapán 1
            const lat = 19.55208991260491;
            const lng = -99.26675375046344;
            const apiKey = 'AIzaSyA5xxkl63r6KGfXhfZplo528NqcUQNRoiA';
            
            // URL de Street View con mejor configuración
            const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=120x80&location=${lat},${lng}&fov=90&heading=0&pitch=0&key=${apiKey}`;
            
            console.log('Intentando cargar imagen de Street View:', streetViewUrl);
            
            // Crear una nueva imagen para probar la carga
            const testImg = new Image();
            testImg.onload = function() {
                console.log('Imagen de Street View cargada exitosamente');
                img.src = streetViewUrl;
                img.alt = 'Vista Exterior (Street View)';
                span.innerHTML = '<i class="fas fa-map-marker-alt"></i> Exterior (Street View)';
            };
            
            testImg.onerror = function() {
                console.warn('Error al cargar imagen de Street View, usando imagen personalizada');
                // Usar la imagen SVG personalizada para el exterior
                img.src = 'assets/360/exterior.svg';
                img.alt = 'Vista Exterior del CONALEP';
                span.innerHTML = '<i class="fas fa-map-marker-alt"></i> Exterior (Maps)';
            };
            
            testImg.src = streetViewUrl;
        } else {
            console.error('No se encontraron los elementos de la miniatura del exterior');
        }
    } else {
        console.error('No se encontró el botón de miniatura del exterior');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que Google Maps se cargue
    setTimeout(setExteriorThumbnail, 2000);

    // Lógica para Street View modal al hacer clic en la miniatura "Exterior"
    const exteriorBtn = document.querySelector('.thumbnail-btn[data-scene="exterior"]');
    const streetviewModal = document.getElementById('streetview-modal');
    const closeStreetview = document.getElementById('close-streetview');
    const streetviewIframe = document.getElementById('streetview-iframe');

    if (exteriorBtn && streetviewModal && streetviewIframe) {
        exteriorBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar el modal
            streetviewModal.style.display = 'block';
            // Asegurar que el iframe tenga las coordenadas correctas
            streetviewIframe.src = 'https://www.google.com/maps/embed?pb=!3m2!1ses!2smx!4v1751519867040!5m2!1ses!2smx!6m8!1m7!1sSqaY_JtS5QmpYRAe53Gx-w!2m2!1d19.55265896593928!2d-99.26671167342474!3f170.37060101457956!4f-31.333625581753417!5f0.7820865974627469';
        });
    }
    if (closeStreetview && streetviewModal) {
        closeStreetview.addEventListener('click', function() {
            streetviewModal.style.display = 'none';
        });
    }
});

// Función para buscar la ubicación más cercana con Street View disponible
function findNearestStreetView() {
    console.log('Buscando ubicación más cercana con Street View...');
    
    // Lista de coordenadas alternativas alrededor del CONALEP
    const alternativeLocations = [
        { lat: CONALEP_COORDINATES.lat + 0.001, lng: CONALEP_COORDINATES.lng + 0.001 },
        { lat: CONALEP_COORDINATES.lat - 0.001, lng: CONALEP_COORDINATES.lng - 0.001 },
        { lat: CONALEP_COORDINATES.lat + 0.002, lng: CONALEP_COORDINATES.lng },
        { lat: CONALEP_COORDINATES.lat, lng: CONALEP_COORDINATES.lng + 0.002 },
        { lat: CONALEP_COORDINATES.lat - 0.002, lng: CONALEP_COORDINATES.lng },
        { lat: CONALEP_COORDINATES.lat, lng: CONALEP_COORDINATES.lng - 0.002 }
    ];
    
    let attempts = 0;
    const maxAttempts = alternativeLocations.length;
    
    function tryNextLocation() {
        if (attempts >= maxAttempts) {
            console.warn('⚠️ No se encontró Street View en ninguna ubicación cercana');
            showNotification('Street View no disponible en esta área. Mostrando vista alternativa.', 'info', 5000);
            return;
        }
        
        const coords = alternativeLocations[attempts];
        console.log(`Intentando ubicación ${attempts + 1}:`, coords);
        
        streetViewService.getPanorama({
            location: coords,
            radius: 300
        }, function(data, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                console.log('✅ Street View encontrado en ubicación alternativa:', coords);
                streetViewPanorama.setPosition(coords);
                showNotification('Vista exterior del CONALEP (ubicación cercana)', 'info', 3000);
            } else {
                attempts++;
                tryNextLocation();
            }
        });
    }
    
    tryNextLocation();
}

// Función para obtener y mostrar el contador de visitas
function updateVisitCounter() {
    fetch('/api/visits')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            const counterElement = document.getElementById('visit-counter');
            if (counterElement) {
                counterElement.textContent = data.count;
                console.log('✅ Contador de visitas actualizado:', data.count);
            } else {
                console.error('❌ Elemento del contador no encontrado');
            }
        })
        .catch(error => {
            console.error('❌ Error al obtener el contador de visitas:', error);
        });
}

// Inicializar el contador de visitas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que todo se cargue
    setTimeout(updateVisitCounter, 1000);
}); 