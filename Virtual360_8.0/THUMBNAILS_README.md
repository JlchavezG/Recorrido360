# Controles de Miniaturas - Recorrido Virtual 360°

## Descripción
Las miniaturas permiten navegar rápidamente entre las diferentes escenas del recorrido virtual. Incluyen controles para personalizar la experiencia de visualización.

## Controles Disponibles

### 1. Botón Minimizar/Maximizar (📉/📈)
- **Función**: Reduce el tamaño de las miniaturas mostrando solo las imágenes sin texto
- **Ubicación**: Esquina superior derecha del contenedor de miniaturas
- **Icono**: Flecha hacia abajo (minimizar) / Flecha hacia arriba (maximizar)
- **Atajo de teclado**: `Ctrl + T` (Windows/Linux) o `Cmd + T` (Mac)

### 2. Botón Ocultar/Mostrar (👁️/👁️‍🗨️)
- **Función**: Oculta completamente las miniaturas para una vista más limpia
- **Ubicación**: Esquina superior derecha del contenedor de miniaturas
- **Icono**: Ojo (mostrar) / Ojo tachado (ocultar)
- **Atajo de teclado**: `Ctrl + H` (Windows/Linux) o `Cmd + H` (Mac)
- **Indicador**: Cuando están ocultas, aparece un indicador en la esquina inferior izquierda

### 3. Botón Cambiar Posición (↕️)
- **Función**: Mueve las miniaturas entre la parte superior e inferior de la pantalla
- **Ubicación**: Esquina superior derecha del contenedor de miniaturas
- **Icono**: Flechas verticales
- **Atajo de teclado**: `Ctrl + P` (Windows/Linux) o `Cmd + P` (Mac)

## Estados de las Miniaturas

### Estado Normal
- Miniaturas completas con imagen y texto
- Altura completa visible
- Todas las funciones disponibles

### Estado Minimizado
- Solo se muestran las imágenes de las miniaturas
- Texto oculto para ahorrar espacio
- Altura reducida
- Mantiene la funcionalidad de navegación

### Estado Oculto
- Miniaturas completamente ocultas
- Indicador visual en la esquina inferior izquierda
- Navegación disponible solo con flechas laterales o hotspots

### Posición Superior
- Miniaturas movidas a la parte superior de la pantalla
- Útil para pantallas grandes o cuando se quiere ver más contenido del panorama

## Características Técnicas

### Persistencia
- Los estados se guardan automáticamente en el navegador
- Al recargar la página, se restauran los últimos ajustes
- Configuración independiente para cada usuario

### Responsive Design
- Los controles se adaptan automáticamente al tamaño de pantalla
- En dispositivos móviles, los botones son más pequeños
- Funcionalidad completa en todos los dispositivos

### Accesibilidad
- Tooltips informativos en todos los controles
- Atajos de teclado para usuarios avanzados
- Indicadores visuales claros del estado actual

## Escenas Disponibles

1. **Plaza Roja** - Área central de reunión
2. **Taller de Autotrónica** - Laboratorio especializado
3. **Auditorio** - Espacio para eventos
4. **Edificio B** - Primer piso
5. **Edificio C** - Aulas y laboratorios
6. **Zona Verde** - Área de esparcimiento
7. **Cafetería** - Área de alimentación
8. **Arco Techo** - Área techada multiusos
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

## Solución de Problemas

### Las miniaturas no aparecen
1. Verificar que JavaScript esté habilitado
2. Recargar la página (F5)
3. Verificar la conexión a internet
4. Limpiar la caché del navegador

### Los controles no funcionan
1. Verificar que la página esté completamente cargada
2. Intentar usar los atajos de teclado
3. Verificar que no haya errores en la consola del navegador

### Estados no se guardan
1. Verificar que las cookies estén habilitadas
2. Verificar que el almacenamiento local esté disponible
3. Probar en modo incógnito

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Sistemas**: Windows, macOS, Linux, iOS, Android

## Desarrollo

Para desarrolladores que quieran modificar los controles:

- **Archivo JavaScript**: `js/main.js`
- **Archivo CSS**: `css/themes.css`
- **Archivo HTML**: `index.html`

Los controles utilizan el sistema de estado global `appState.thumbnailsState` para mantener la consistencia. 