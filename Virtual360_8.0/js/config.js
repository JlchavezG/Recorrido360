// Configuración de escenas del tour virtual
const tourConfig = {
    // Configuración general
    settings: {
        autoRotate: true,
        autoRotateSpeed: 0.5,
        enableGyroscope: true,
        initialScene: 'plaza-roja',
        defaultImageUrl: 'assets/360/placeholder.jpg',
        loadingTimeout: 10000
    },

    // Definición de escenas
    scenes: {
        'plaza-roja': {
            title: 'Plaza Roja',
            description: 'Área central de reunión y eventos al aire libre',
            panorama: 'assets/360/plaza-roja.jpeg',
            thumbnail: {
                image: 'assets/360/plaza-roja.jpeg',
                alt: 'Plaza Roja',
                displayName: 'Plaza Roja'
            },
            details: {
                features: [
                    'Área central de reunión',
                    'Espacio para eventos',
                    'Zona de descanso'
                ]
            },
            hotspots: [
                // Navegación hacia el taller de autotrónica
                { pitch: 0, yaw: 150, type: 'scene', text: 'Ir al Taller de Autotrónica', target: 'taller-autotronica', cssClass: 'hotspot-next' },
                // Navegación hacia la cancha de fútbol
                { pitch: 0, yaw: -150, type: 'scene', text: 'Ir a la Cancha de Fútbol', target: 'cancha-futbol', cssClass: 'hotspot-prev' },
                // Navegación hacia la cafetería
                { pitch: -5, yaw: 90, type: 'scene', text: 'Ir a la Cafetería', target: 'cafeteria', cssClass: 'hotspot-nav-point' },
                // Navegación hacia el auditorio
                { pitch: 0, yaw: 180, type: 'scene', text: 'Ir al Auditorio', target: 'auditorio', cssClass: 'hotspot-nav-point' },
                // Navegación hacia el edificio C con imagen personalizada
                { pitch: 0, yaw: 60, type: 'scene', text: 'Ir al Edificio C', target: 'edificio-c', cssClass: 'hotspot-img', image: 'assets/img/hotspot-edificio-c.png' },
                // Navegación hacia el arco techo con imagen personalizada
                { pitch: -5, yaw: -90, type: 'scene', text: 'Ir al Arco Techo', target: 'arco-techo', cssClass: 'hotspot-img', image: 'assets/img/hotspot-arco-techo.png' },
                // Información sobre la plaza
                { pitch: 10, yaw: 0, type: 'info', text: 'Esta es la Plaza Roja, el corazón del CONALEP donde se realizan eventos y reuniones', cssClass: 'hotspot-info' }
            ]
        },
        'taller-autotronica': {
            title: 'Taller de Autotrónica',
            description: 'Laboratorio especializado en autotrónica donde los estudiantes desarrollan habilidades prácticas en sistemas automotrices.',
            panorama: 'assets/360/Autotronica.jpeg',
            thumbnail: {
                image: 'assets/360/Autotronica.jpeg',
                alt: 'Taller de Autotrónica',
                displayName: 'Taller de Autotrónica'
            },
            details: {
                features: [
                    'Equipamiento especializado en sistemas automotrices',
                    'Área de diagnóstico y reparación',
                    'Herramientas profesionales',
                    'Espacio para prácticas estudiantiles'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Auditorio', target: 'auditorio', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Plaza Roja', target: 'plaza-roja', cssClass: 'hotspot-prev' }
            ]
        },
        'auditorio': {
            title: 'Auditorio',
            description: 'Espacio para eventos y presentaciones',
            panorama: 'assets/360/Auditorio.jpeg',
            thumbnail: {
                image: 'assets/360/Auditorio.jpeg',
                alt: 'Auditorio',
                displayName: 'Auditorio'
            },
            details: {
                features: [
                    'Capacidad para eventos',
                    'Equipamiento audiovisual',
                    'Espacio para presentaciones'
                ]
            },
            hotspots: [
                // Navegación hacia el edificio B
                { pitch: 0, yaw: 120, type: 'scene', text: 'Salir al Edificio B', target: 'edificio-b', cssClass: 'hotspot-next' },
                // Navegación hacia el taller de autotrónica
                { pitch: 0, yaw: -120, type: 'scene', text: 'Ir al Taller de Autotrónica', target: 'taller-autotronica', cssClass: 'hotspot-prev' },
                // Navegación hacia la cafetería
                { pitch: -5, yaw: 180, type: 'scene', text: 'Ir a la Cafetería', target: 'cafeteria', cssClass: 'hotspot-nav-point' },
                // Información sobre el escenario
                { pitch: -10, yaw: 0, type: 'info', text: 'Escenario principal con equipamiento audiovisual profesional para presentaciones', cssClass: 'hotspot-info' },
                // Información sobre las butacas
                { pitch: -15, yaw: 45, type: 'info', text: 'Butacas cómodas con capacidad para eventos masivos', cssClass: 'hotspot-info' }
            ]
        },
        'edificio-b': {
            title: 'Edificio B - Primer Piso',
            description: 'Primer piso del Edificio B',
            panorama: 'assets/360/edificio-b-p1.jpeg',
            thumbnail: {
                image: 'assets/360/edificio-b-p1.jpeg',
                alt: 'Edificio B - Primer Piso',
                displayName: 'Edificio B'
            },
            details: {
                features: [
                    'Aulas de clase',
                    'Áreas administrativas',
                    'Espacios de estudio'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Edificio C', target: 'edificio-c', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Auditorio', target: 'auditorio', cssClass: 'hotspot-prev' }
            ]
        },
        'edificio-c': {
            title: 'Edificio C',
            description: 'Edificio C',
            panorama: 'assets/360/edificio-c.jpeg',
            thumbnail: {
                image: 'assets/360/edificio-c.jpeg',
                alt: 'Edificio C',
                displayName: 'Edificio C'
            },
            details: {
                features: [
                    'Aulas de clase',
                    'Laboratorios',
                    'Espacios de estudio'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Zona Verde', target: 'parque', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Edificio B - Primer Piso', target: 'edificio-b', cssClass: 'hotspot-prev' }
            ]
        },
        'parque': {
            title: 'Zona Verde',
            description: 'Área de esparcimiento y recreación',
            panorama: 'assets/360/parque.jpeg',
            thumbnail: {
                image: 'assets/360/parque.jpeg',
                alt: 'Zona Verde',
                displayName: 'Zona Verde'
            },
            details: {
                features: [
                    'Áreas verdes',
                    'Espacios de descanso',
                    'Zona de recreación'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Cafetería', target: 'cafeteria', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Zona Verde', target: 'parque', cssClass: 'hotspot-prev' }
            ]
        },
        'cafeteria': {
            title: 'Cafetería',
            description: 'Área de alimentación y descanso',
            panorama: 'assets/360/cafeteria.jpeg',
            thumbnail: {
                image: 'assets/360/cafeteria.jpeg',
                alt: 'Cafetería',
                displayName: 'Cafetería'
            },
            details: {
                features: [
                    'Área de alimentación',
                    'Espacio de descanso',
                    'Servicio de cafetería'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Arco Techo', target: 'arco-techo', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Cafetería', target: 'cafeteria', cssClass: 'hotspot-prev' }
            ]
        },
        'arco-techo': {
            title: 'Arco Techo',
            description: 'Área techada multiusos',
            panorama: 'assets/360/arco-techo.jpeg',
            thumbnail: {
                image: 'assets/360/arco-techo.jpeg',
                alt: 'Arco Techo',
                displayName: 'Arco Techo'
            },
            details: {
                features: [
                    'Área techada',
                    'Espacio multiusos',
                    'Zona de eventos'
                ]
            },
            hotspots: [
                { pitch: -10, yaw: 5, type: 'scene', text: 'Ir a la Cancha de Fútbol', target: 'cancha-futbol', cssClass: 'hotspot-nav-point' },
                { pitch: -5, yaw: 90, type: 'scene', text: 'Ir a la Plaza Roja', target: 'plaza-roja', cssClass: 'hotspot-nav-point' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Cafetería', target: 'cafeteria', cssClass: 'hotspot-prev' }
            ]
        },
        'cancha-futbol': {
            title: 'Cancha de Fútbol',
            description: 'Cancha de fútbol principal',
            panorama: 'assets/360/cancha-futbol.jpg.jpeg',
            thumbnail: {
                image: 'assets/360/cancha-futbol.jpg.jpeg',
                alt: 'Cancha de Fútbol',
                displayName: 'Cancha de Fútbol'
            },
            details: {
                features: [
                    'Cancha de fútbol',
                    'Área deportiva',
                    'Espacio para actividades físicas'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Plaza Roja', target: 'plaza-roja', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Arco Techo', target: 'arco-techo', cssClass: 'hotspot-prev' }
            ]
        },
        'exterior': {
            title: 'Vista Exterior - CONALEP Atizapán 1',
            description: 'Vista exterior del plantel usando Google Maps Street View',
            panorama: null, // No se usa panorama para Street View
            isStreetView: true, // Indicador de que es Street View
            thumbnail: {
                image: 'assets/360/exterior.svg',
                alt: 'Vista Exterior',
                displayName: 'Exterior (Maps)',
                isStreetView: true
            },
            details: {
                features: [
                    'Vista exterior del plantel',
                    'Acceso principal',
                    'Entorno urbano',
                    'Google Maps Street View'
                ]
            },
            coordinates: {
                lat: 19.55265896593928,
                lng: -99.26671167342474
            }
        },
        'lab-computo-3': {
            title: 'Laboratorio de Cómputo 3',
            description: 'Laboratorio de cómputo especializado para trabajos colaborativos y presentaciones multimedia',
            panorama: 'assets/360/l3.jpeg',
            thumbnail: {
                image: 'assets/360/l3.jpeg',
                alt: 'Laboratorio de Cómputo 3',
                displayName: 'Lab. Cómputo 3'
            },
            details: {
                features: [
                    'Equipos de cómputo especializados',
                    'Espacio para trabajos colaborativos',
                    'Equipamiento para presentaciones multimedia',
                    'Área de desarrollo de proyectos'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Aula Tipo', target: 'aula-tipo', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Lab. Cómputo 2', target: 'lab-computo-2', cssClass: 'hotspot-prev' }
            ]
        },
        'orientacion': {
            title: 'Área de Orientación',
            description: 'Área donde los estudiantes reciben apoyo académico y vocacional',
            panorama: 'assets/360/orientación.jpeg',
            thumbnail: {
                image: 'assets/360/orientación.jpeg',
                alt: 'Orientación',
                displayName: 'Orientación'
            },
            details: {
                features: [
                    'Apoyo académico',
                    'Orientación vocacional',
                    'Asesoría estudiantil',
                    'Espacio de consulta'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Dirección', target: 'direccion', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Laboratorio', target: 'laboratorio', cssClass: 'hotspot-prev' }
            ]
        },
        'estacionamiento': {
            title: 'Estacionamiento',
            description: 'Área de estacionamiento para estudiantes y personal',
            panorama: 'assets/360/placeholder.jpg',
            thumbnail: {
                image: 'assets/360/placeholder.jpg',
                alt: 'Estacionamiento',
                displayName: 'Estacionamiento (Maps)',
                isStreetView: true
            },
            details: {
                features: [
                    'Espacios de estacionamiento',
                    'Seguridad vehicular',
                    'Acceso controlado'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Lab. Cómputo 1', target: 'lab-computo-1', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Edificio C', target: 'edificio-c', cssClass: 'hotspot-prev' }
            ]
        },
        'lab-computo-1': {
            title: 'Laboratorio de Cómputo 1',
            description: 'Laboratorio de cómputo para desarrollo de habilidades en informática y programación',
            panorama: 'assets/360/l1.jpeg',
            thumbnail: {
                image: 'assets/360/l1.jpeg',
                alt: 'Laboratorio de Cómputo 1',
                displayName: 'Lab. Cómputo 1'
            },
            details: {
                features: [
                    'Equipos de cómputo',
                    'Software especializado',
                    'Área de programación',
                    'Espacio de práctica'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Lab. Cómputo 2', target: 'lab-computo-2', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Estacionamiento', target: 'estacionamiento', cssClass: 'hotspot-prev' }
            ]
        },
        'lab-computo-2': {
            title: 'Laboratorio de Cómputo 2',
            description: 'Laboratorio de cómputo con equipos especializados para proyectos tecnológicos avanzados',
            panorama: 'assets/360/l2.jpeg',
            thumbnail: {
                image: 'assets/360/l2.jpeg',
                alt: 'Laboratorio de Cómputo 2',
                displayName: 'Lab. Cómputo 2'
            },
            details: {
                features: [
                    'Equipos especializados',
                    'Proyectos tecnológicos',
                    'Desarrollo avanzado',
                    'Área de innovación'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Lab. Cómputo 3', target: 'lab-computo-3', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Lab. Cómputo 1', target: 'lab-computo-1', cssClass: 'hotspot-prev' }
            ]
        },
        'aula-tipo': {
            title: 'Aula Tipo',
            description: 'Aula estándar diseñada para proporcionar un ambiente de aprendizaje óptimo',
            panorama: 'assets/360/aulatipo.jpeg',
            thumbnail: {
                image: 'assets/360/aulatipo.jpeg',
                alt: 'Aula Tipo',
                displayName: 'Aula Tipo'
            },
            details: {
                features: [
                    'Ambiente de aprendizaje',
                    'Equipamiento básico',
                    'Espacio para todas las carreras',
                    'Área de enseñanza'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Biblioteca', target: 'biblioteca', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Lab. Cómputo 3', target: 'lab-computo-3', cssClass: 'hotspot-prev' }
            ]
        },
        'biblioteca': {
            title: 'Biblioteca',
            description: 'Espacio de estudio y consulta con amplia colección de recursos educativos',
            panorama: 'assets/360/biblioteca.jpeg',
            thumbnail: {
                image: 'assets/360/biblioteca.jpeg',
                alt: 'Biblioteca',
                displayName: 'Biblioteca'
            },
            details: {
                features: [
                    'Colección de libros',
                    'Área de estudio',
                    'Recursos digitales',
                    'Espacio de consulta'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Laboratorio', target: 'laboratorio', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Aula Tipo', target: 'aula-tipo', cssClass: 'hotspot-prev' }
            ]
        },
        'laboratorio': {
            title: 'Laboratorio',
            description: 'Laboratorio especializado donde los estudiantes aplican conocimientos teóricos en la práctica',
            panorama: 'assets/360/placeholder.jpg',
            thumbnail: {
                image: 'assets/360/placeholder.jpg',
                alt: 'Laboratorio',
                displayName: 'Laboratorio'
            },
            details: {
                features: [
                    'Equipamiento especializado',
                    'Prácticas experimentales',
                    'Aplicación de conocimientos',
                    'Área de investigación'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Orientación', target: 'orientacion', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Biblioteca', target: 'biblioteca', cssClass: 'hotspot-prev' }
            ]
        },
        'direccion': {
            title: 'Dirección',
            description: 'Centro administrativo donde se coordinan todas las actividades del plantel',
            panorama: 'assets/360/placeholder.jpg',
            thumbnail: {
                image: 'assets/360/placeholder.jpg',
                alt: 'Dirección',
                displayName: 'Dirección'
            },
            details: {
                features: [
                    'Administración central',
                    'Coordinación académica',
                    'Gestión estudiantil',
                    'Oficinas administrativas'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Informática', target: 'informatica', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Orientación', target: 'orientacion', cssClass: 'hotspot-prev' }
            ]
        },
        'informatica': {
            title: 'Área de Informática',
            description: 'Área donde se imparten las carreras relacionadas con tecnología y sistemas',
            panorama: 'assets/360/placeholder.jpg',
            thumbnail: {
                image: 'assets/360/placeholder.jpg',
                alt: 'Informática',
                displayName: 'Informática'
            },
            details: {
                features: [
                    'Carreras tecnológicas',
                    'Sistemas informáticos',
                    'Desarrollo de software',
                    'Área de innovación tecnológica'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Taller de Mecatrónica', target: 'taller-mecatronica', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Dirección', target: 'direccion', cssClass: 'hotspot-prev' }
            ]
        },
        'taller-mecatronica': {
            title: 'Taller de Mecatrónica',
            description: 'Taller que combina mecánica, electrónica e informática para crear sistemas automatizados',
            panorama: 'assets/360/mecatronica.jpeg',
            thumbnail: {
                image: 'assets/360/mecatronica.jpeg',
                alt: 'Taller de Mecatrónica',
                displayName: 'Mecatrónica'
            },
            details: {
                features: [
                    'Sistemas automatizados',
                    'Integración mecatrónica',
                    'Robótica industrial',
                    'Control de sistemas'
                ]
            },
            hotspots: [
                { pitch: 0, yaw: 150, type: 'scene', text: 'Siguiente: Taller de Autotrónica', target: 'taller-autotronica', cssClass: 'hotspot-next' },
                { pitch: 0, yaw: -150, type: 'scene', text: 'Anterior: Informática', target: 'informatica', cssClass: 'hotspot-prev' }
            ]
        }
    },
    defaultScene: "plaza-roja",
    viewerConfig: {
        default: {
            firstScene: "plaza-roja",
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
            showFullscreenCtrl: true,
            showControls: true,
            mouseZoom: true,
            touchZoom: true,
            gyroTolerance: 10,
            gyroInvert: false,
            showHotSpots: true,
            hotSpotDebug: false
        }
    }
};

// Función para validar la configuración
function validateConfig() {
    try {
        // Verificar que la configuración exista
        if (!tourConfig || !tourConfig.scenes) {
            throw new Error('La configuración del tour no está definida correctamente');
        }

        // Verificar que haya al menos una escena
        if (Object.keys(tourConfig.scenes).length === 0) {
            throw new Error('No hay escenas definidas en la configuración');
        }

        // Verificar que la escena inicial exista
        const initialScene = tourConfig.settings.initialScene;
        if (!tourConfig.scenes[initialScene]) {
            throw new Error(`La escena inicial "${initialScene}" no existe`);
        }

        // Verificar que cada escena tenga los campos requeridos
        Object.entries(tourConfig.scenes).forEach(([id, scene]) => {
            if (!scene.title || !scene.description || !scene.panorama) {
                throw new Error(`La escena "${id}" no tiene todos los campos requeridos`);
            }
        });

        console.log('Configuración validada correctamente');
        return true;
    } catch (error) {
        console.error('Error validando la configuración:', error);
        return false;
    }
}

// Función para precargar imágenes
async function preloadImages() {
    const imagePromises = Object.values(tourConfig.scenes).map(scene => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(scene.panorama);
            img.onerror = () => {
                console.warn(`Error cargando imagen: ${scene.panorama}, usando imagen por defecto`);
                scene.panorama = tourConfig.settings.defaultImageUrl;
                resolve(scene.panorama);
            };
            img.src = scene.panorama;
        });
    });

    try {
        await Promise.all(imagePromises);
        console.log('Todas las imágenes precargadas correctamente');
        return true;
    } catch (error) {
        console.error('Error precargando imágenes:', error);
        return false;
    }
}

// Exportar la configuración y funciones auxiliares
window.tourConfig = tourConfig;
window.validateConfig = validateConfig;
window.preloadImages = preloadImages; 