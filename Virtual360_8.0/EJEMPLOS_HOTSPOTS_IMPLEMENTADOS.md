# 🎯 Ejemplos de Hotspots Implementados - Virtual360

## 📍 Hotspots en Plaza Roja

### **Configuración Actual**
```javascript
'plaza-roja': {
    title: 'Plaza Roja',
    description: 'Área central de reunión y eventos al aire libre',
    panorama: 'assets/360/plaza-roja.jpeg',
    hotspots: [
        // Navegación hacia el taller de autotrónica
        { pitch: 0, yaw: 150, type: 'scene', text: 'Ir al Taller de Autotrónica', target: 'taller-autotronica', cssClass: 'hotspot-next' },
        // Navegación hacia la cancha de fútbol
        { pitch: 0, yaw: -150, type: 'scene', text: 'Ir a la Cancha de Fútbol', target: 'cancha-futbol', cssClass: 'hotspot-prev' },
        // Navegación hacia la cafetería
        { pitch: -5, yaw: 90, type: 'scene', text: 'Ir a la Cafetería', target: 'cafeteria', cssClass: 'hotspot-nav-point' },
        // Navegación hacia el auditorio
        { pitch: 0, yaw: 180, type: 'scene', text: 'Ir al Auditorio', target: 'auditorio', cssClass: 'hotspot-nav-point' },
        // Información sobre la plaza
        { pitch: 10, yaw: 0, type: 'info', text: 'Esta es la Plaza Roja, el corazón del CONALEP donde se realizan eventos y reuniones', cssClass: 'hotspot-info' }
    ]
}
```

### **Descripción de Hotspots**

#### 🎯 **Hotspot 1: Taller de Autotrónica**
- **Posición**: `pitch: 0, yaw: 150` (Mirando hacia la derecha)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-next` (Flecha azul hacia adelante)
- **Función**: Lleva al taller de autotrónica

#### 🎯 **Hotspot 2: Cancha de Fútbol**
- **Posición**: `pitch: 0, yaw: -150` (Mirando hacia la izquierda)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-prev` (Flecha naranja hacia atrás)
- **Función**: Lleva a la cancha de fútbol

#### 🎯 **Hotspot 3: Cafetería**
- **Posición**: `pitch: -5, yaw: 90` (Mirando hacia la derecha, ligeramente hacia abajo)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-nav-point` (Punto verde de navegación)
- **Función**: Lleva a la cafetería

#### 🎯 **Hotspot 4: Auditorio**
- **Posición**: `pitch: 0, yaw: 180` (Mirando hacia atrás)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-nav-point` (Punto verde de navegación)
- **Función**: Lleva al auditorio

#### ℹ️ **Hotspot 5: Información de la Plaza**
- **Posición**: `pitch: 10, yaw: 0` (Mirando hacia adelante, ligeramente hacia arriba)
- **Tipo**: Información (`info`)
- **Clase CSS**: `hotspot-info` (Punto amarillo de información)
- **Función**: Muestra información sobre la plaza

## 📍 Hotspots en Auditorio

### **Configuración Actual**
```javascript
'auditorio': {
    title: 'Auditorio',
    description: 'Espacio para eventos y presentaciones',
    panorama: 'assets/360/Auditorio.jpeg',
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
}
```

### **Descripción de Hotspots**

#### 🎯 **Hotspot 1: Edificio B**
- **Posición**: `pitch: 0, yaw: 120` (Mirando hacia la derecha)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-next` (Flecha azul hacia adelante)
- **Función**: Sale al edificio B

#### 🎯 **Hotspot 2: Taller de Autotrónica**
- **Posición**: `pitch: 0, yaw: -120` (Mirando hacia la izquierda)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-prev` (Flecha naranja hacia atrás)
- **Función**: Regresa al taller de autotrónica

#### 🎯 **Hotspot 3: Cafetería**
- **Posición**: `pitch: -5, yaw: 180` (Mirando hacia atrás, ligeramente hacia abajo)
- **Tipo**: Navegación (`scene`)
- **Clase CSS**: `hotspot-nav-point` (Punto verde de navegación)
- **Función**: Lleva a la cafetería

#### ℹ️ **Hotspot 4: Información del Escenario**
- **Posición**: `pitch: -10, yaw: 0` (Mirando hacia adelante, hacia abajo)
- **Tipo**: Información (`info`)
- **Clase CSS**: `hotspot-info` (Punto amarillo de información)
- **Función**: Describe el escenario principal

#### ℹ️ **Hotspot 5: Información de Butacas**
- **Posición**: `pitch: -15, yaw: 45` (Mirando hacia la derecha, hacia abajo)
- **Tipo**: Información (`info`)
- **Clase CSS**: `hotspot-info` (Punto amarillo de información)
- **Función**: Describe las butacas del auditorio

## 🎨 Clases CSS Utilizadas

### **hotspot-next** (Flecha Azul)
```css
.hotspot-next {
    background: #0066ff;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* Flecha hacia adelante */
}
```

### **hotspot-prev** (Flecha Naranja)
```css
.hotspot-prev {
    background: #ff6b35;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* Flecha hacia atrás */
}
```

### **hotspot-nav-point** (Punto Verde)
```css
.hotspot-nav-point {
    background: #00c48c;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    /* Punto de navegación */
}
```

### **hotspot-info** (Punto Amarillo)
```css
.hotspot-info {
    background: #ffd93d;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    /* Punto de información */
}
```

## 🧪 Cómo Probar los Hotspots

### **1. Navegación en Plaza Roja**
1. Abre la aplicación en un servidor local
2. Navega a la escena "Plaza Roja"
3. Mueve el cursor por la imagen
4. Deberías ver:
   - ⬅️ Flecha naranja hacia la cancha de fútbol
   - ➡️ Flecha azul hacia el taller de autotrónica
   - 🟢 Punto verde hacia la cafetería
   - 🟢 Punto verde hacia el auditorio
   - 🟡 Punto amarillo con información

### **2. Navegación en Auditorio**
1. Navega a la escena "Auditorio"
2. Mueve el cursor por la imagen
3. Deberías ver:
   - ➡️ Flecha azul hacia el edificio B
   - ⬅️ Flecha naranja hacia el taller de autotrónica
   - 🟢 Punto verde hacia la cafetería
   - 🟡 Punto amarillo con información del escenario
   - 🟡 Punto amarillo con información de butacas

### **3. Funcionalidad de Hotspots**
- **Hotspots de navegación**: Al hacer clic, cambian a la escena destino
- **Hotspots de información**: Al hacer clic, muestran un tooltip con información
- **Hover effects**: Los hotspots se agrandan al pasar el cursor
- **Responsive**: Funcionan en dispositivos móviles con touch

## 📋 Checklist de Verificación

### **Plaza Roja**
- [x] Hotspot hacia Taller de Autotrónica (flecha azul)
- [x] Hotspot hacia Cancha de Fútbol (flecha naranja)
- [x] Hotspot hacia Cafetería (punto verde)
- [x] Hotspot hacia Auditorio (punto verde)
- [x] Hotspot de información (punto amarillo)

### **Auditorio**
- [x] Hotspot hacia Edificio B (flecha azul)
- [x] Hotspot hacia Taller de Autotrónica (flecha naranja)
- [x] Hotspot hacia Cafetería (punto verde)
- [x] Hotspot de información del escenario (punto amarillo)
- [x] Hotspot de información de butacas (punto amarillo)

## 🚀 Próximos Pasos

### **Agregar Hotspots a Otras Escenas**
1. **Taller de Autotrónica**: Agregar hotspots hacia laboratorios
2. **Cafetería**: Agregar hotspots hacia diferentes áreas
3. **Edificio B**: Agregar hotspots hacia aulas y oficinas
4. **Laboratorios**: Agregar hotspots entre laboratorios

### **Mejorar Hotspots Existentes**
1. **Posicionamiento más preciso**: Ajustar coordenadas
2. **Más información**: Agregar hotspots informativos
3. **Navegación circular**: Crear rutas completas
4. **Hotspots especiales**: Para áreas restringidas

---

**¡Los hotspots están funcionando correctamente y proporcionan una navegación intuitiva en el recorrido virtual!**

**Desarrollado por**: Asistente Virtual  
**Fecha**: 2025  
**Versión**: Virtual360 6.0 