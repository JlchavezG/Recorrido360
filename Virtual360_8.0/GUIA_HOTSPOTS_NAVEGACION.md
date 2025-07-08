image.png# 🎯 Guía Completa: Hotspots de Navegación en Virtual360

## ¿Qué son los Hotspots?

Los **hotspots** son puntos interactivos dentro de las imágenes panorámicas que permiten al usuario navegar a otras escenas o ver información adicional. Son como "botones invisibles" que aparecen cuando el usuario mueve el cursor sobre ellos.

## 📍 Tipos de Hotspots

### 1. **Hotspots de Navegación** (`type: 'scene'`)
- Permiten ir a otra escena del recorrido
- Se usan para crear rutas de navegación
- Ejemplo: "Ir al Auditorio", "Siguiente escena"

### 2. **Hotspots de Información** (`type: 'info'`)
- Muestran información adicional sobre un elemento
- No navegan, solo muestran texto o imágenes
- Ejemplo: "Descripción de equipos", "Horarios"

## 🛠️ Cómo Agregar Hotspots

### Paso 1: Editar el archivo `config.js`

Localiza la escena donde quieres agregar hotspots en el archivo `js/config.js`:

```javascript
'nombre-escena': {
    title: 'Título de la Escena',
    description: 'Descripción de la escena',
    panorama: 'assets/360/imagen.jpeg',
    details: {
        features: [
            'Característica 1',
            'Característica 2'
        ]
    },
    hotspots: [
        // AQUÍ VAN TUS HOTSPOTS
    ]
}
```

### Paso 2: Agregar Hotspots de Navegación

```javascript
hotspots: [
    {
        pitch: 0,           // Posición vertical (-90 a 90)
        yaw: 150,           // Posición horizontal (-180 a 180)
        type: 'scene',      // Tipo: navegación
        text: 'Ir al Auditorio',  // Texto que aparece
        target: 'auditorio',      // Escena destino
        cssClass: 'hotspot-next'  // Clase CSS para estilos
    },
    {
        pitch: -10,         // Mirando un poco hacia abajo
        yaw: -90,           // Mirando hacia la izquierda
        type: 'scene',
        text: 'Ir a la Cafetería',
        target: 'cafeteria',
        cssClass: 'hotspot-nav-point'
    }
]
```

## 🎯 Coordenadas de Posicionamiento

### **Pitch (Vertical)**
- **0**: Nivel del horizonte
- **-90**: Mirando hacia abajo
- **90**: Mirando hacia arriba
- **Valores típicos**: -30 a 30

### **Yaw (Horizontal)**
- **0**: Norte (frente)
- **90**: Este (derecha)
- **180/-180**: Sur (atrás)
- **-90**: Oeste (izquierda)

## 📐 Ejemplos Prácticos de Posicionamiento

### **Hotspot al Frente**
```javascript
{ pitch: 0, yaw: 0, type: 'scene', text: 'Adelante', target: 'siguiente-escena' }
```

### **Hotspot a la Derecha**
```javascript
{ pitch: 0, yaw: 90, type: 'scene', text: 'A la derecha', target: 'escena-derecha' }
```

### **Hotspot Mirando Hacia Arriba**
```javascript
{ pitch: 30, yaw: 0, type: 'scene', text: 'Mirar arriba', target: 'escena-superior' }
```

### **Hotspot en el Suelo**
```javascript
{ pitch: -45, yaw: 0, type: 'scene', text: 'Ver suelo', target: 'escena-inferior' }
```

## 🎨 Clases CSS para Hotspots

### **Clases Predefinidas**
```javascript
cssClass: 'hotspot-next'      // Flecha hacia adelante (azul)
cssClass: 'hotspot-prev'      // Flecha hacia atrás (naranja)
cssClass: 'hotspot-nav-point' // Punto de navegación (verde)
cssClass: 'hotspot-info'      // Información (amarillo)
```

### **Clases Personalizadas**
Puedes crear tus propias clases CSS en `themes.css`:

```css
.hotspot-custom {
    background: #ff6b6b;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.hotspot-custom:hover {
    transform: scale(1.2);
    background: #ff5252;
}
```

## 🔄 Ejemplo Completo de Escena con Hotspots

```javascript
'plaza-roja': {
    title: 'Plaza Roja',
    description: 'Área central de reunión y eventos al aire libre',
    panorama: 'assets/360/plaza-roja.jpeg',
    details: {
        features: [
            'Área central de reunión',
            'Espacio para eventos',
            'Zona de descanso'
        ]
    },
    hotspots: [
        // Hotspot hacia el taller de autotrónica
        {
            pitch: 0,
            yaw: 150,
            type: 'scene',
            text: 'Ir al Taller de Autotrónica',
            target: 'taller-autotronica',
            cssClass: 'hotspot-next'
        },
        // Hotspot hacia la cancha de fútbol
        {
            pitch: 0,
            yaw: -150,
            type: 'scene',
            text: 'Ir a la Cancha de Fútbol',
            target: 'cancha-futbol',
            cssClass: 'hotspot-prev'
        },
        // Hotspot hacia la cafetería
        {
            pitch: -5,
            yaw: 90,
            type: 'scene',
            text: 'Ir a la Cafetería',
            target: 'cafeteria',
            cssClass: 'hotspot-nav-point'
        },
        // Hotspot de información
        {
            pitch: 10,
            yaw: 0,
            type: 'info',
            text: 'Esta es la Plaza Roja, el corazón del CONALEP',
            cssClass: 'hotspot-info'
        }
    ]
}
```

## 🎯 Consejos para Posicionar Hotspots

### **1. Usar Herramientas de Desarrollo**
- Abre las herramientas de desarrollador (F12)
- En la consola, escribe: `pannellum.viewer('panorama').getViewer().mouseEventToCoords(event)`
- Haz clic en la imagen donde quieres el hotspot
- Copia las coordenadas que aparecen

### **2. Posicionamiento Intuitivo**
- **Puertas**: Coloca hotspots en las puertas para navegar
- **Pasillos**: Usa hotspots en los extremos de pasillos
- **Escaleras**: Posiciona en la base y cima de escaleras
- **Ventanas**: Para vistas a otras áreas

### **3. Distribución Equilibrada**
- No sobrecargues una escena con demasiados hotspots
- Distribuye los hotspots en diferentes direcciones
- Usa diferentes alturas (pitch) para variedad

## 🔧 Hotspots Avanzados

### **Hotspots con Imágenes**
```javascript
{
    pitch: 0,
    yaw: 0,
    type: 'info',
    text: 'Información del equipo',
    cssClass: 'hotspot-info',
    image: 'assets/img/equipo-info.jpg'  // Imagen adicional
}
```

### **Hotspots con Audio**
```javascript
{
    pitch: 0,
    yaw: 0,
    type: 'info',
    text: 'Escuchar descripción',
    cssClass: 'hotspot-audio',
    audio: 'sounds/descripcion.mp3'
}
```

### **Hotspots Condicionales**
```javascript
{
    pitch: 0,
    yaw: 0,
    type: 'scene',
    text: 'Acceso restringido',
    target: 'laboratorio',
    cssClass: 'hotspot-locked',
    condition: 'userRole === "admin"'  // Solo para administradores
}
```

## 🧪 Cómo Probar Hotspots

### **1. Verificar en el Navegador**
1. Abre la aplicación en un servidor local
2. Navega a la escena donde agregaste hotspots
3. Mueve el cursor por la imagen
4. Los hotspots deben aparecer como puntos o flechas
5. Haz clic para probar la navegación

### **2. Debugging**
- Abre la consola del navegador (F12)
- Busca mensajes de error relacionados con hotspots
- Verifica que las coordenadas sean válidas
- Confirma que las escenas destino existan

### **3. Responsive Testing**
- Prueba en diferentes tamaños de pantalla
- Verifica en dispositivos móviles
- Asegúrate de que los hotspots sean accesibles con touch

## 📋 Checklist para Hotspots

### **Antes de Publicar**
- [ ] Coordenadas correctas (pitch y yaw)
- [ ] Textos descriptivos y claros
- [ ] Escenas destino existen
- [ ] Clases CSS aplicadas correctamente
- [ ] Navegación funciona en ambas direcciones
- [ ] Responsive en móviles
- [ ] Sin errores en consola

### **Optimización**
- [ ] Hotspots distribuidos equilibradamente
- [ ] No más de 3-4 hotspots por escena
- [ ] Rutas de navegación lógicas
- [ ] Textos informativos útiles

## 🚀 Ejemplo de Implementación Completa

```javascript
// En config.js - Escena del Auditorio
'auditorio': {
    title: 'Auditorio',
    description: 'Espacio para eventos y presentaciones',
    panorama: 'assets/360/Auditorio.jpeg',
    details: {
        features: [
            'Capacidad para eventos',
            'Equipamiento audiovisual',
            'Espacio para presentaciones'
        ]
    },
    hotspots: [
        // Navegación hacia el edificio B
        {
            pitch: 0,
            yaw: 120,
            type: 'scene',
            text: 'Salir al Edificio B',
            target: 'edificio-b',
            cssClass: 'hotspot-next'
        },
        // Navegación hacia el taller
        {
            pitch: 0,
            yaw: -120,
            type: 'scene',
            text: 'Ir al Taller de Autotrónica',
            target: 'taller-autotronica',
            cssClass: 'hotspot-prev'
        },
        // Información sobre el escenario
        {
            pitch: -10,
            yaw: 0,
            type: 'info',
            text: 'Escenario principal con equipamiento audiovisual profesional',
            cssClass: 'hotspot-info'
        },
        // Navegación hacia la cafetería
        {
            pitch: -5,
            yaw: 180,
            type: 'scene',
            text: 'Ir a la Cafetería',
            target: 'cafeteria',
            cssClass: 'hotspot-nav-point'
        }
    ]
}
```

---

**¡Con esta guía ya puedes crear hotspots de navegación completos y funcionales en tu recorrido virtual!**

**Desarrollado por**: Asistente Virtual  
**Fecha**: 2025  
**Versión**: Virtual360 6.0 