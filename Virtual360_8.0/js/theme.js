/**
 * Sistema de Temas - Dark y Claro
 * Maneja el cambio entre temas y la persistencia de preferencias
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark'; // Tema por defecto
        this.themes = {
            dark: {
                name: 'Oscuro',
                icon: 'fas fa-moon',
                description: 'Tema oscuro para mejor experiencia nocturna'
            },
            light: {
                name: 'Claro',
                icon: 'fas fa-sun',
                description: 'Tema claro para mejor visibilidad diurna'
            }
        };
        
        this.init();
    }

    /**
     * Inicializa el sistema de temas
     */
    init() {
        // Cargar tema guardado o usar preferencia del sistema
        this.loadSavedTheme();
        
        // Crear botón de cambio de tema
        this.createThemeToggle();
        
        // Crear indicador de tema
        this.createThemeIndicator();
        
        // Aplicar tema inicial
        this.applyTheme(this.currentTheme);
        
        // Escuchar cambios en preferencias del sistema
        this.listenForSystemThemeChanges();
        
        console.log('Sistema de temas inicializado');
    }

    /**
     * Carga el tema guardado en localStorage o usa preferencia del sistema
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('virtual360-theme');
        
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        } else {
            // Usar preferencia del sistema si está disponible
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                this.currentTheme = 'light';
            }
        }
    }

    /**
     * Crea el botón de cambio de tema
     */
    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Cambiar tema');
        toggle.setAttribute('title', 'Cambiar entre tema claro y oscuro');
        
        const icon = document.createElement('i');
        icon.className = this.getOppositeThemeIcon();
        toggle.appendChild(icon);
        
        // Evento de clic
        toggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Eventos de teclado para accesibilidad
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        document.body.appendChild(toggle);
    }

    /**
     * Crea el indicador de tema actual
     */
    createThemeIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'theme-indicator';
        indicator.id = 'theme-indicator';
        document.body.appendChild(indicator);
    }

    /**
     * Cambia entre temas
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * Establece un tema específico
     * @param {string} theme - Nombre del tema ('dark' o 'light')
     */
    setTheme(theme) {
        if (!this.themes[theme]) {
            console.error(`Tema "${theme}" no válido`);
            return;
        }

        // Agregar clase de transición
        document.body.setAttribute('data-theme-transitioning', 'true');
        
        // Cambiar tema
        this.currentTheme = theme;
        this.applyTheme(theme);
        
        // Guardar preferencia
        this.saveThemePreference(theme);
        
        // Actualizar botón
        this.updateThemeToggle();
        
        // Mostrar indicador
        this.showThemeIndicator();
        
        // Remover clase de transición después de la animación
        setTimeout(() => {
            document.body.removeAttribute('data-theme-transitioning');
        }, 300);
        
        // Disparar evento personalizado
        this.dispatchThemeChangeEvent(theme);
    }

    /**
     * Aplica el tema al documento
     * @param {string} theme - Nombre del tema
     */
    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        // Actualizar meta theme-color para móviles
        this.updateMetaThemeColor(theme);
    }

    /**
     * Actualiza el color del tema en meta tags para móviles
     * @param {string} theme - Nombre del tema
     */
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            dark: '#000020',
            light: '#f8f9fa'
        };
        
        metaThemeColor.content = colors[theme] || colors.dark;
    }

    /**
     * Guarda la preferencia de tema en localStorage
     * @param {string} theme - Nombre del tema
     */
    saveThemePreference(theme) {
        try {
            localStorage.setItem('virtual360-theme', theme);
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de tema:', error);
        }
    }

    /**
     * Actualiza el botón de cambio de tema
     */
    updateThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = this.getOppositeThemeIcon();
            }
            
            // Actualizar título
            const oppositeTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            toggle.title = `Cambiar a tema ${this.themes[oppositeTheme].name}`;
        }
    }

    /**
     * Obtiene el ícono del tema opuesto
     * @returns {string} Clase del ícono
     */
    getOppositeThemeIcon() {
        return this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    /**
     * Muestra el indicador de tema actual
     */
    showThemeIndicator() {
        const indicator = document.getElementById('theme-indicator');
        if (!indicator) return;
        
        const themeInfo = this.themes[this.currentTheme];
        indicator.textContent = `Tema ${themeInfo.name} activado`;
        indicator.classList.add('show');
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 3000);
    }

    /**
     * Escucha cambios en las preferencias del sistema
     */
    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Solo cambiar si no hay tema guardado
                const savedTheme = localStorage.getItem('virtual360-theme');
                if (!savedTheme) {
                    const newTheme = e.matches ? 'light' : 'dark';
                    this.setTheme(newTheme);
                }
            });
        }
    }

    /**
     * Dispara un evento personalizado cuando cambia el tema
     * @param {string} theme - Nombre del tema
     */
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: theme,
                themeInfo: this.themes[theme]
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Obtiene el tema actual
     * @returns {string} Nombre del tema actual
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Obtiene información del tema actual
     * @returns {object} Información del tema
     */
    getCurrentThemeInfo() {
        return this.themes[this.currentTheme];
    }

    /**
     * Verifica si el tema actual es oscuro
     * @returns {boolean} True si es tema oscuro
     */
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    /**
     * Verifica si el tema actual es claro
     * @returns {boolean} True si es tema claro
     */
    isLightTheme() {
        return this.currentTheme === 'light';
    }

    /**
     * Obtiene todos los temas disponibles
     * @returns {object} Objeto con todos los temas
     */
    getAvailableThemes() {
        return { ...this.themes };
    }

    /**
     * Restablece el tema a las preferencias del sistema
     */
    resetToSystemPreference() {
        localStorage.removeItem('virtual360-theme');
        this.loadSavedTheme();
        this.applyTheme(this.currentTheme);
        this.updateThemeToggle();
    }
}

// Inicializar el sistema de temas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} 