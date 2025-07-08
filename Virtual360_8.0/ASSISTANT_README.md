# Asistente Virtual CONALEP - Lobo Estético

## Descripción
El asistente virtual es un personaje animado en forma de lobo que guía a los usuarios a través del recorrido virtual 360° del CONALEP Atizapán 1. Diseñado con un enfoque estético moderno y funcional.

## Características del Diseño

### 🎨 **Diseño Visual**
- **Avatar de Lobo**: Cabeza de lobo estilizada con gradientes modernos
- **Ojos Expresivos**: Pupilas animadas con efecto de brillo
- **Orejas Dinámicas**: Orejas puntiagudas con detalles de pelaje
- **Hocico Detallado**: Nariz y boca bien definidas
- **Burbuja de Diálogo**: Diseño moderno con efectos de cristal (glassmorphism)

### ✨ **Animaciones y Efectos**
- **Efecto de Escritura**: Los mensajes aparecen carácter por carácter
- **Animación de Habla**: El lobo se anima cuando está hablando
- **Parpadeo de Ojos**: Los ojos parpadean ocasionalmente
- **Efectos de Hover**: El avatar responde al pasar el mouse
- **Burbuja Flotante**: La burbuja de diálogo tiene un efecto de flotación suave
- **Efectos de Brillo**: Resplandor cuando el asistente está activo

### 🎯 **Funcionalidades**

#### Controles Principales
- **Botón de Volumen**: Activar/desactivar el asistente
- **Botón de Ayuda**: Mostrar información de ayuda
- **Clic en Avatar**: Interacción directa con el asistente
- **Navegación**: Botón en el menú principal para ocultar/mostrar

#### Mensajes Contextuales
- **Mensaje de Bienvenida**: Saludo inicial al cargar la página
- **Descripciones por Escena**: Información específica de cada área
- **Ayuda Interactiva**: Consejos de navegación
- **Respuestas Aleatorias**: Interacciones variadas al hacer clic

#### Estados del Asistente
- **Activo**: Mostrando mensajes y animaciones
- **Silenciado**: Sin mensajes pero visible
- **Oculto**: Completamente invisible
- **Hablando**: Animaciones especiales durante el habla

## Especificaciones Técnicas

### 🎨 **Paleta de Colores**
- **Cabeza del Lobo**: Gradiente gris azulado (#f8f9fa → #495057)
- **Orejas**: Gradiente más oscuro (#495057 → #adb5bd)
- **Ojos**: Blanco con pupilas doradas (#ffc107)
- **Burbuja**: Blanco translúcido con blur
- **Controles**: Azul moderno (#007bff)

### 📱 **Responsive Design**
- **Desktop**: Tamaño completo con todos los efectos
- **Tablet**: Tamaño reducido manteniendo funcionalidad
- **Mobile**: Diseño compacto optimizado para touch

### ⚡ **Rendimiento**
- **Animaciones Optimizadas**: Usando CSS transforms
- **Cola de Mensajes**: Sistema de cola para evitar superposición
- **Lazy Loading**: Animaciones cargan según necesidad
- **Memory Management**: Limpieza automática de eventos

## Interacciones del Usuario

### 🖱️ **Eventos de Mouse**
- **Hover en Avatar**: Escala ligeramente
- **Hover en Burbuja**: Sombra más pronunciada
- **Clic en Avatar**: Mensaje aleatorio de interacción
- **Clic en Controles**: Funciones específicas

### ⌨️ **Eventos de Teclado**
- **Navegación por Escenas**: El asistente responde automáticamente
- **Reproducción de Audio**: Notificaciones de estado
- **Cambios de Tema**: Adaptación automática

### 📱 **Eventos Touch**
- **Tap en Avatar**: Interacción en dispositivos móviles
- **Tap en Controles**: Funciones táctiles
- **Swipe**: Navegación entre escenas

## Mensajes Disponibles

### 🏫 **Escenas del Campus**
1. **Plaza Roja** - Área central de reunión
2. **Taller de Autotrónica** - Laboratorio especializado
3. **Auditorio** - Espacio para eventos
4. **Edificio B** - Aulas y laboratorios
5. **Edificio C** - Espacios académicos
6. **Zona Verde** - Área de esparcimiento
7. **Cafetería** - Área de alimentación
8. **Arco Techo** - Punto de referencia
9. **Cancha de Fútbol** - Área deportiva
10. **Estacionamiento** - Acceso vehicular
11. **Laboratorios de Cómputo** - Salas 1, 2 y 3
12. **Aula Tipo** - Aula estándar
13. **Biblioteca** - Área de estudio
14. **Laboratorio** - Espacio de prácticas
15. **Orientación** - Área de asesoría
16. **Dirección** - Oficinas administrativas
17. **Informática** - Departamento de informática
18. **Taller de Mecatrónica** - Laboratorio especializado

### 💬 **Mensajes de Sistema**
- **Bienvenida**: Saludo inicial
- **Ayuda**: Instrucciones de navegación
- **Audio**: Notificaciones de reproducción
- **Silenciado**: Estado de asistente desactivado
- **Interacciones**: Respuestas aleatorias

## Personalización

### 🎨 **Temas**
- **Tema Oscuro**: Colores adaptados para modo oscuro
- **Tema Claro**: Colores adaptados para modo claro
- **Transiciones Suaves**: Cambios automáticos entre temas

### 🔧 **Configuración**
- **Estado Persistente**: Se guarda en localStorage
- **Preferencias**: Mute/Unmute se mantiene entre sesiones
- **Visibilidad**: Estado de oculto/mostrado se recuerda

## Compatibilidad

### 🌐 **Navegadores**
- **Chrome**: Compatibilidad completa
- **Firefox**: Compatibilidad completa
- **Safari**: Compatibilidad completa
- **Edge**: Compatibilidad completa

### 📱 **Dispositivos**
- **Desktop**: Funcionalidad completa
- **Tablet**: Funcionalidad adaptada
- **Mobile**: Funcionalidad optimizada

## Desarrollo

### 📁 **Archivos Principales**
- **HTML**: `index.html` - Estructura del asistente
- **CSS**: `css/themes.css` - Estilos y animaciones
- **JavaScript**: `js/assistant.js` - Lógica y funcionalidad

### 🔧 **Clase Principal**
```javascript
class VirtualAssistant {
    // Gestión de mensajes
    // Animaciones
    // Interacciones
    // Estados
}
```

### 🎯 **Métodos Principales**
- `showMessage()`: Mostrar mensaje con efectos
- `typeMessage()`: Efecto de escritura
- `interact()`: Interacción del usuario
- `toggleMute()`: Activar/desactivar
- `addAnimations()`: Configurar animaciones

## Solución de Problemas

### ❓ **Problemas Comunes**
1. **Asistente no aparece**: Verificar que JavaScript esté habilitado
2. **Animaciones lentas**: Verificar rendimiento del dispositivo
3. **Mensajes no se muestran**: Verificar estado de mute
4. **Estilos no se aplican**: Verificar carga de CSS

### 🔧 **Debugging**
- **Console Logs**: Información de estado en consola
- **Estado Visual**: Indicadores visuales de estado
- **Event Listeners**: Verificación de eventos activos

## Futuras Mejoras

### 🚀 **Funcionalidades Planificadas**
- **Síntesis de Voz**: Reproducción de audio de mensajes
- **Gestos Avanzados**: Más interacciones táctiles
- **Personalización**: Temas adicionales
- **IA Básica**: Respuestas más inteligentes
- **Multilingüe**: Soporte para múltiples idiomas

### 🎨 **Mejoras Visuales**
- **Partículas**: Efectos de partículas
- **3D**: Efectos 3D básicos
- **Microinteracciones**: Más detalles animados
- **Temas Dinámicos**: Cambios según hora del día

---

*El asistente virtual está diseñado para proporcionar una experiencia de usuario atractiva y funcional, combinando estética moderna con utilidad práctica.* 