// Asistente Virtual CONALEP - Lobo Estético
class VirtualAssistant {
    constructor() {
        this.assistant = document.getElementById('virtual-assistant');
        this.messageElement = document.getElementById('assistant-message');
        this.toggleBtn = document.getElementById('assistant-toggle');
        this.helpBtn = document.getElementById('assistant-help');
        this.navToggleBtn = document.getElementById('assistant-toggle-nav');
        
        this.isVisible = true;
        this.isMuted = false;
        this.isSpeaking = false;
        this.currentScene = null;
        this.messageQueue = [];
        this.currentMessageIndex = 0;
        this.wasHidden = false; // Para detectar si el asistente fue cerrado previamente
        this.currentAudio = null; // Para controlar que solo se reproduzca un audio a la vez
        
        this.messages = {
            welcome: "¡Hola! Soy Coni, tu guía virtual del CONALEP Atizapán 1. Haz clic en las miniaturas para explorar nuestras instalaciones.",
            cafeteria: "Esta es nuestra cafetería, un espacio donde los estudiantes pueden disfrutar de sus alimentos y socializar durante los descansos.",
            auditorio: "El auditorio es donde realizamos eventos importantes, ceremonias de graduación y presentaciones académicas.",
            'plaza-roja': "La Plaza Roja es el corazón de nuestro plantel, donde se realizan actividades culturales y eventos estudiantiles.",
            parque: "Nuestra zona verde es perfecta para el esparcimiento y actividades al aire libre.",
            'arco-techo': "El Arco Techo es un punto de referencia importante en nuestro campus.",
            'cancha-futbol': "La cancha de fútbol es donde nuestros estudiantes practican deportes y se mantienen activos.",
            'edificio-b': "El Edificio B alberga aulas y laboratorios especializados para diferentes carreras técnicas.",
            'edificio-c': "El Edificio C contiene más espacios académicos y administrativos.",
            'taller-autotronica': "El taller de Autotrónica es donde los estudiantes aprenden sobre sistemas automotrices modernos.",
            exterior: "Esta es la vista exterior del CONALEP Atizapán 1 usando Google Maps Street View. Aquí puedes ver el acceso principal y el entorno urbano de nuestro plantel.",
            estacionamiento: "El estacionamiento proporciona espacio seguro para los vehículos de estudiantes y personal.",
            'lab-computo-1': "El Laboratorio de Cómputo 1 es donde los estudiantes desarrollan habilidades en informática y programación.",
            'lab-computo-2': "El Laboratorio de Cómputo 2 cuenta con equipos especializados para proyectos tecnológicos avanzados.",
            'lab-computo-3': "El Laboratorio de Cómputo 3 es ideal para trabajos colaborativos y presentaciones multimedia.",
            'aula-tipo': "Las aulas tipo están diseñadas para proporcionar un ambiente de aprendizaje óptimo para todas las carreras.",
            biblioteca: "La biblioteca es un espacio de estudio y consulta con amplia colección de recursos educativos.",
            laboratorio: "Los laboratorios especializados permiten a los estudiantes aplicar conocimientos teóricos en la práctica.",
            orientacion: "El área de orientación es donde los estudiantes reciben apoyo académico y vocacional.",
            direccion: "La dirección es el centro administrativo donde se coordinan todas las actividades del plantel.",
            informatica: "El área de informática es donde se imparten las carreras relacionadas con tecnología y sistemas.",
            'taller-mecatronica': "El taller de Mecatrónica combina mecánica, electrónica e informática para crear sistemas automatizados.",
            help: "Puedes usar las miniaturas para navegar entre las escenas, el botón de la luna/sol para cambiar el tema, y los controles para ocultar las miniaturas si lo deseas. Si necesitas ayuda, ¡pregúntale a Coni!",
            audioPlaying: "Coni está reproduciendo la descripción de audio para esta escena...",
            audioStopped: "Audio detenido. Haz clic en las miniaturas para explorar más con Coni.",
            muted: "Coni está silenciada. Haz clic en el botón de volumen para activarla.",
            unmuted: "¡Coni está activada! Estoy aquí para ayudarte.",
            thinking: "Hmm... déjame pensar en eso... Soy Coni, tu asistente virtual.",
            excited: "¡Excelente elección! Esta área es muy especial. Coni te acompaña en el recorrido.",
            curious: "¿Te gustaría explorar más áreas del campus con Coni?",
            helpful: "Recuerda que puedes hacer clic en mi avatar para obtener ayuda adicional de Coni."
        };
        
        this.initializeAssistant();
        this.setupEventListeners();
        this.loadState();
    }
    
    initializeAssistant() {
        // Asegurar que el asistente esté visible por defecto
        if (this.assistant) {
            this.assistant.classList.remove('hidden');
            this.assistant.classList.add('entering');
            setTimeout(() => {
                this.assistant.classList.remove('entering');
            }, 800);
        }
        
        // Configurar el botón de navegación
        if (this.navToggleBtn) {
            this.navToggleBtn.classList.add('active');
        }
    }
    
    setupEventListeners() {
        // Botón de toggle principal
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleAssistant());
        }
        
        // Botón de toggle en navegación
        if (this.navToggleBtn) {
            this.navToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAssistant();
            });
        }
        
        // Botón de ayuda
        if (this.helpBtn) {
            this.helpBtn.addEventListener('click', () => this.showHelp());
        }
        
        // Click en el avatar para activar
        if (this.assistant) {
            this.assistant.addEventListener('click', (e) => {
                if (e.target.closest('.assistant-controls')) return;
                this.activateAssistant();
            });
        }
        
        // Escuchar cambios de escena
        document.addEventListener('sceneChanged', (e) => {
            this.onSceneChange(e.detail.sceneId);
        });
        
        // Escuchar reproducción de audio
        document.addEventListener('audioStarted', () => {
            this.onAudioStart();
        });
        
        document.addEventListener('audioStopped', () => {
            this.onAudioStop();
        });
        
        // Efectos de hover en la burbuja de diálogo
        const speechBubble = document.querySelector('.assistant-speech-bubble');
        if (speechBubble) {
            speechBubble.addEventListener('mouseenter', () => this.onBubbleHover());
            speechBubble.addEventListener('mouseleave', () => this.onBubbleLeave());
        }
    }
    
    toggleAssistant() {
        if (this.isVisible) {
            this.hideAssistant();
        } else {
            this.showAssistant();
        }
    }
    
    showAssistant() {
        if (!this.assistant) return;
        
        this.isVisible = true;
        this.assistant.classList.remove('hidden', 'leaving');
        this.assistant.classList.add('entering');
        
        if (this.navToggleBtn) {
            this.navToggleBtn.classList.add('active');
        }
        
        // Reproducir sonido 03 solo si el asistente fue cerrado previamente
        if (this.wasHidden) {
            this.playAudio('coni-message3-audio');
            this.wasHidden = false;
        }
        
        setTimeout(() => {
            this.assistant.classList.remove('entering');
        }, 800);
        
        this.saveState();
        this.speak('¡Hola! Soy Coni, estoy de vuelta para ayudarte.');
    }
    
    hideAssistant() {
        if (!this.assistant) return;
        
        // Marcar que el asistente fue cerrado
        this.wasHidden = true;
        
        // NO reproducir audio de apagado aquí, solo marcar que fue cerrado

        this.isVisible = false;
        this.assistant.classList.add('leaving');
        
        if (this.navToggleBtn) {
            this.navToggleBtn.classList.remove('active');
        }
        
        setTimeout(() => {
            this.assistant.classList.add('hidden');
            this.assistant.classList.remove('leaving');
        }, 600);
        
        this.saveState();
    }
    
    activateAssistant() {
        if (!this.isVisible) {
            this.showAssistant();
            return;
        }
        this.speak('¿En qué puedo ayudarte? Soy Coni, tu asistente virtual. Puedes hacer clic en las miniaturas para explorar las instalaciones o preguntarme sobre cualquier área específica.');
    }
    
    speak(message, immediate = false) {
        if (this.isMuted) return;
        
        // NO reproducir audio 02 aquí automáticamente

        if (immediate) {
            this.messageQueue = [message];
            this.currentMessageIndex = 0;
        } else {
            this.messageQueue.push(message);
        }
        
        if (!this.isSpeaking) {
            this.processMessageQueue();
        }
    }
    
    processMessageQueue() {
        if (this.messageQueue.length === 0 || this.currentMessageIndex >= this.messageQueue.length) {
            this.stopSpeaking();
            return;
        }
        
        const message = this.messageQueue[this.currentMessageIndex];
        this.displayMessage(message);
        this.startSpeaking();
        
        // Simular tiempo de habla
        const speakTime = Math.max(2000, message.length * 50);
        setTimeout(() => {
            this.currentMessageIndex++;
            this.processMessageQueue();
        }, speakTime);
    }
    
    displayMessage(message) {
        if (!this.messageElement) return;
        
        this.messageElement.textContent = '';
        this.messageElement.style.opacity = '0';
        
        setTimeout(() => {
            this.messageElement.textContent = message;
            this.messageElement.style.opacity = '1';
        }, 200);
    }
    
    startSpeaking() {
        this.isSpeaking = true;
        if (this.assistant) {
            this.assistant.classList.add('speaking');
        }
    }
    
    stopSpeaking() {
        this.isSpeaking = false;
        if (this.assistant) {
            this.assistant.classList.remove('speaking');
        }
    }
    
    showHelp() {
        // Reproducir sonido 02 cuando se hace clic en el botón de ayuda
        this.playAudio('coni-message2-audio');
        
        const helpMessages = [
            '¡Hola! Soy Coni, tu asistente virtual del CONALEP Atizapán 1.',
            'Puedo ayudarte a:',
            '• Explorar las instalaciones usando las miniaturas',
            '• Proporcionar información sobre cada área',
            '• Guiarte durante tu recorrido virtual',
            '• Responder preguntas sobre el plantel',
            '¡Haz clic en cualquier miniatura para comenzar! Coni siempre está lista para ayudarte.'
        ];
        this.speak(helpMessages.join(' '), true);
    }
    
    onSceneChange(sceneId) {
        this.currentScene = sceneId;
        
        if (this.messages[sceneId]) {
            // Agregar un pequeño delay para que se sienta más natural
            setTimeout(() => {
                this.speak(this.messages[sceneId], true);
            }, 1000);
        }
    }
    
    changeScene(sceneId) {
        this.onSceneChange(sceneId);
    }
    
    onAudioStart() {
        this.speak(this.messages.audioPlaying, true);
    }
    
    onAudioStop() {
        this.speak(this.messages.audioStopped, true);
    }
    
    onBubbleHover() {
        if (this.assistant) {
            this.assistant.style.filter = 'drop-shadow(0 12px 40px rgba(0,0,0,0.2))';
        }
    }
    
    onBubbleLeave() {
        if (this.assistant) {
            this.assistant.style.filter = 'drop-shadow(0 8px 32px rgba(0,0,0,0.15))';
        }
    }
    
    saveState() {
        try {
            localStorage.setItem('assistantVisible', this.isVisible);
            localStorage.setItem('assistantMuted', this.isMuted);
        } catch (e) {
            console.warn('No se pudo guardar el estado del asistente:', e);
        }
    }
    
    loadState() {
        try {
            const visible = localStorage.getItem('assistantVisible');
            const muted = localStorage.getItem('assistantMuted');
            
            if (visible !== null) {
                this.isVisible = visible === 'true';
                if (!this.isVisible) {
                    this.hideAssistant();
                }
            }
            
            if (muted !== null) {
                this.isMuted = muted === 'true';
                if (this.isMuted && this.toggleBtn) {
                    this.toggleBtn.classList.add('muted');
                    this.toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }
        } catch (e) {
            console.warn('No se pudo cargar el estado del asistente:', e);
        }
    }
    
    // Función para reproducir audio con control de un solo sonido a la vez
    playAudio(audioId) {
        // Detener cualquier audio que esté reproduciéndose
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        
        const audio = document.getElementById(audioId);
        if (audio) {
            this.currentAudio = audio;
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.log('No se pudo reproducir el audio:', error);
            });
            
            // Limpiar la referencia cuando termine el audio
            audio.addEventListener('ended', () => {
                this.currentAudio = null;
            }, { once: true });
        }
    }
}

// Inicializar el asistente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.virtualAssistant = new VirtualAssistant();
    
    // Mensaje de bienvenida después de que termine la pantalla de carga (2 segundos + 800ms de transición)
    setTimeout(() => {
        if (window.virtualAssistant) {
            // Reproducir audio de bienvenida (sonido 01)
            window.virtualAssistant.playAudio('coni-welcome-audio');
            window.virtualAssistant.speak('¡Bienvenido al Recorrido Virtual del CONALEP Atizapán 1! Soy Coni, tu asistente virtual. Haz clic en las miniaturas para explorar las instalaciones.');
        }
    }, 2800); // 2000ms (duración del preloader) + 800ms (transición)
});

// Función global para activar el asistente desde otros scripts
window.activateAssistant = function() {
    if (window.virtualAssistant) {
        window.virtualAssistant.activateAssistant();
    }
};

// Función para mostrar mensaje específico de escena
window.showSceneMessage = function(sceneName) {
    if (window.virtualAssistant) {
        const message = window.virtualAssistant.getSceneMessage(sceneName);
        window.virtualAssistant.speak(message, true);
    }
}; 