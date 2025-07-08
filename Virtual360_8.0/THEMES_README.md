# Sistema de Temas - Dark y Claro

## Descripción

Este sistema permite cambiar entre un tema oscuro y un tema claro en la aplicación de Recorrido Virtual 360°. El sistema es completamente independiente y se puede integrar fácilmente en cualquier proyecto.

## Archivos

### CSS (`css/themes.css`)
- Contiene todas las variables CSS para ambos temas
- Define los estilos del botón de cambio de tema
- Incluye animaciones y transiciones suaves
- Responsive design para dispositivos móviles

### JavaScript (`js/theme.js`)
- Clase `ThemeManager` que maneja toda la lógica
- Persistencia de preferencias en localStorage
- Detección automática de preferencias del sistema
- API completa para controlar temas programáticamente

## Características

### ✅ Funcionalidades Implementadas

1. **Cambio de Temas**
   - Tema Oscuro (por defecto)
   - Tema Claro
   - Transiciones suaves entre temas

2. **Persistencia**
   - Guarda la preferencia del usuario en localStorage
   - Recupera el tema al recargar la página

3. **Detección Automática**
   - Detecta las preferencias del sistema operativo
   - Cambia automáticamente si no hay preferencia guardada

4. **Accesibilidad**
   - Soporte completo para navegación por teclado
   - Etiquetas ARIA apropiadas
   - Indicadores visuales claros

5. **Responsive**
   - Adaptado para dispositivos móviles
   - Botón de tema optimizado para touch

## Uso

### Inclusión en HTML

```html
<!-- CSS -->
<link rel="stylesheet" href="./css/themes.css">

<!-- JavaScript -->
<script src="js/theme.js"></script>
```

### Uso Básico

El sistema se inicializa automáticamente cuando se carga la página. El botón de cambio de tema aparecerá en la esquina superior derecha.

### API JavaScript

```javascript
// Obtener el tema actual
const currentTheme = window.themeManager.getCurrentTheme();

// Cambiar a tema claro
window.themeManager.setTheme('light');

// Cambiar a tema oscuro
window.themeManager.setTheme('dark');

// Alternar entre temas
window.themeManager.toggleTheme();

// Verificar si es tema oscuro
const isDark = window.themeManager.isDarkTheme();

// Verificar si es tema claro
const isLight = window.themeManager.isLightTheme();

// Obtener información del tema actual
const themeInfo = window.themeManager.getCurrentThemeInfo();

// Restablecer a preferencias del sistema
window.themeManager.resetToSystemPreference();
```

### Eventos

```javascript
// Escuchar cambios de tema
document.addEventListener('themeChanged', (event) => {
    console.log('Tema cambiado a:', event.detail.theme);
    console.log('Información del tema:', event.detail.themeInfo);
});
```

## Variables CSS

### Tema Oscuro (por defecto)
```css
:root {
    --primary-color: #2f2c79;
    --text-color: #ff9800;
    --bg-main: #000020;
    --bg-section: #171a4a;
    --text-light: #ffffff;
    --text-dark: #222222;
    /* ... más variables */
}
```

### Tema Claro
```css
[data-theme="light"] {
    --primary-color: #2f2c79;
    --text-color: #2f2c79;
    --bg-main: #f8f9fa;
    --bg-section: #ffffff;
    --text-light: #ffffff;
    --text-dark: #333333;
    /* ... más variables */
}
```

## Personalización

### Agregar Nuevos Temas

1. **En `themes.css`:**
```css
[data-theme="custom"] {
    --primary-color: #tu-color;
    --bg-main: #tu-fondo;
    /* ... más variables */
}
```

2. **En `theme.js`:**
```javascript
this.themes = {
    dark: { name: 'Oscuro', icon: 'fas fa-moon' },
    light: { name: 'Claro', icon: 'fas fa-sun' },
    custom: { name: 'Personalizado', icon: 'fas fa-palette' }
};
```

### Personalizar Colores

Modifica las variables CSS en `themes.css` para cambiar los colores de cada tema:

```css
:root {
    --primary-color: #tu-color-primario;
    --secondary-color: #tu-color-secundario;
    --accent-color: #tu-color-accento;
    /* ... */
}
```

## Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Móviles (iOS Safari, Chrome Mobile)

## Dependencias

- Font Awesome 6.0+ (para íconos)
- No requiere frameworks adicionales

## Estructura de Archivos

```
Virtual360_3.0/
├── css/
│   ├── styles.css      # Estilos principales
│   └── themes.css      # Sistema de temas
├── js/
│   ├── theme.js        # Lógica de temas
│   ├── main.js         # Lógica principal
│   └── contact.js      # Lógica de contacto
└── index.html          # Página principal
```

## Troubleshooting

### El botón no aparece
- Verifica que `theme.js` esté incluido en el HTML
- Revisa la consola del navegador para errores

### Los colores no cambian
- Asegúrate de que `themes.css` esté incluido después de `styles.css`
- Verifica que las variables CSS estén definidas correctamente

### No se guarda la preferencia
- Verifica que localStorage esté habilitado
- Revisa si hay errores en la consola

## Contribuir

Para agregar mejoras al sistema de temas:

1. Modifica `themes.css` para cambios visuales
2. Modifica `theme.js` para cambios funcionales
3. Actualiza esta documentación
4. Prueba en diferentes navegadores

## Licencia

Este sistema de temas es parte del proyecto Virtual360_3.0 y está disponible bajo la misma licencia del proyecto principal. 