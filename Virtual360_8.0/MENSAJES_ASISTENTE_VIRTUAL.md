# 🤖 MENSAJES DEL ASISTENTE VIRTUAL - CONALEP ATIZAPÁN 1

## 📍 Ubicación de los Mensajes

Los mensajes del asistente virtual se encuentran en el archivo:
- **`js/assistant.js`** - Líneas 15-55 (objeto `messages`)

## 🎯 Mensaje Principal (HTML)

**Ubicación**: `index.html` - Línea 109
```html
<p id="assistant-message">¡Hola! Soy Coni tu guía virtual. Haz clic en las miniaturas para explorar las instalaciones del CONALEP Atizapán 1.</p>
```

## 📋 Todos los Mensajes del Asistente

### 🏠 Mensaje de Bienvenida
```javascript
welcome: "¡Hola! Soy tu guía virtual del CONALEP Atizapán 1. Haz clic en las miniaturas para explorar nuestras instalaciones."
```

### 🏢 Mensajes por Área/Instalación

#### 🍽️ Cafetería
```javascript
cafeteria: "Esta es nuestra cafetería, un espacio donde los estudiantes pueden disfrutar de sus alimentos y socializar durante los descansos."
```

#### 🎭 Auditorio
```javascript
auditorio: "El auditorio es donde realizamos eventos importantes, ceremonias de graduación y presentaciones académicas."
```

#### 🔴 Plaza Roja
```javascript
'plaza-roja': "La Plaza Roja es el corazón de nuestro plantel, donde se realizan actividades culturales y eventos estudiantiles."
```

#### 🌳 Parque/Zona Verde
```javascript
parque: "Nuestra zona verde es perfecta para el esparcimiento y actividades al aire libre."
```

#### 🏛️ Arco Techo
```javascript
'arco-techo': "El Arco Techo es un punto de referencia importante en nuestro campus."
```

#### ⚽ Cancha de Fútbol
```javascript
'cancha-futbol': "La cancha de fútbol es donde nuestros estudiantes practican deportes y se mantienen activos."
```

#### 🏢 Edificio B
```javascript
'edificio-b': "El Edificio B alberga aulas y laboratorios especializados para diferentes carreras técnicas."
```

#### 🏢 Edificio C
```javascript
'edificio-c': "El Edificio C contiene más espacios académicos y administrativos."
```

#### 🔧 Taller de Autotrónica
```javascript
'taller-autotronica': "El taller de Autotrónica es donde los estudiantes aprenden sobre sistemas automotrices modernos."
```

#### 🚗 Estacionamiento
```javascript
estacionamiento: "El estacionamiento proporciona espacio seguro para los vehículos de estudiantes y personal."
```

#### 💻 Laboratorio de Cómputo 1
```javascript
'lab-computo-1': "El Laboratorio de Cómputo 1 es donde los estudiantes desarrollan habilidades en informática y programación."
```

#### 💻 Laboratorio de Cómputo 2
```javascript
'lab-computo-2': "El Laboratorio de Cómputo 2 cuenta con equipos especializados para proyectos tecnológicos avanzados."
```

#### 💻 Laboratorio de Cómputo 3
```javascript
'lab-computo-3': "El Laboratorio de Cómputo 3 es ideal para trabajos colaborativos y presentaciones multimedia."
```

#### 📚 Aula Tipo
```javascript
'aula-tipo': "Las aulas tipo están diseñadas para proporcionar un ambiente de aprendizaje óptimo para todas las carreras."
```

#### 📖 Biblioteca
```javascript
biblioteca: "La biblioteca es un espacio de estudio y consulta con amplia colección de recursos educativos."
```

#### 🔬 Laboratorio
```javascript
laboratorio: "Los laboratorios especializados permiten a los estudiantes aplicar conocimientos teóricos en la práctica."
```

#### 🎓 Orientación
```javascript
orientacion: "El área de orientación es donde los estudiantes reciben apoyo académico y vocacional."
```

#### 🏛️ Dirección
```javascript
direccion: "La dirección es el centro administrativo donde se coordinan todas las actividades del plantel."
```

#### 💻 Informática
```javascript
informatica: "El área de informática es donde se imparten las carreras relacionadas con tecnología y sistemas."
```

#### ⚙️ Taller de Mecatrónica
```javascript
'taller-mecatronica': "El taller de Mecatrónica combina mecánica, electrónica e informática para crear sistemas automatizados."
```

### 🆘 Mensajes de Ayuda y Sistema

#### 📖 Ayuda General
```javascript
help: "Puedes usar las miniaturas para navegar entre las escenas, el botón de la luna/sol para cambiar el tema, y los controles para ocultar las miniaturas si lo deseas."
```

#### 🎵 Audio Reproduciendo
```javascript
audioPlaying: "Reproduciendo descripción de audio para esta escena..."
```

#### ⏹️ Audio Detenido
```javascript
audioStopped: "Audio detenido. Haz clic en las miniaturas para explorar más."
```

#### 🔇 Asistente Silenciado
```javascript
muted: "Asistente silenciado. Haz clic en el botón de volumen para activarlo."
```

#### 🔊 Asistente Activado
```javascript
unmuted: "¡Asistente activado! Estoy aquí para ayudarte."
```

#### 🤔 Pensando
```javascript
thinking: "Hmm... déjame pensar en eso..."
```

#### 😊 Emocionado
```javascript
excited: "¡Excelente elección! Esta área es muy especial."
```

#### 🤔 Curioso
```javascript
curious: "¿Te gustaría explorar más áreas del campus?"
```

#### 💡 Útil
```javascript
helpful: "Recuerda que puedes hacer clic en mi avatar para obtener ayuda adicional."
```

### 🎬 Mensajes Dinámicos (Generados en Tiempo Real)

#### 👋 Mensaje de Bienvenida Inicial
```javascript
// Línea 318 en assistant.js
'¡Bienvenido al Recorrido Virtual del CONALEP Atizapán 1! Soy tu asistente virtual. Haz clic en las miniaturas para explorar las instalaciones.'
```

#### 🔄 Mensaje de Regreso
```javascript
// Línea 143 en assistant.js
'¡Hola! Estoy de vuelta para ayudarte.'
```

#### ❓ Mensaje de Activación
```javascript
// Línea 170 en assistant.js
'¿En qué puedo ayudarte? Puedes hacer clic en las miniaturas para explorar las instalaciones o preguntarme sobre cualquier área específica.'
```

#### 📋 Mensaje de Ayuda Detallado
```javascript
// Líneas 233-243 en assistant.js
const helpMessages = [
    '¡Hola! Soy Coni tu asistente virtual del CONALEP Atizapán 1.',
    'Puedo ayudarte a:',
    '• Explorar las instalaciones usando las miniaturas',
    '• Proporcionar información sobre cada área',
    '• Guiarte durante tu recorrido virtual',
    '• Responder preguntas sobre el plantel',
    '¡Haz clic en cualquier miniatura para comenzar!'
];
```

## 🎮 Cómo Funcionan los Mensajes

### 📍 Activación por Escena
Cuando el usuario hace clic en una miniatura, se activa el evento `sceneChanged` y el asistente muestra el mensaje correspondiente a esa área.

### ⏱️ Timing de los Mensajes
- **Delay inicial**: 1 segundo después del cambio de escena
- **Tiempo de habla**: Mínimo 2 segundos + 50ms por carácter
- **Transiciones**: 200ms de fade in/out

### 🎵 Estados del Asistente
- **Normal**: Muestra mensajes de escena
- **Hablando**: Animación de ondas de audio
- **Silenciado**: No reproduce mensajes
- **Oculto**: No visible pero funcional

## 🔧 Personalización de Mensajes

Para agregar o modificar mensajes:

1. **Editar el objeto `messages`** en `js/assistant.js` (líneas 15-55)
2. **Agregar nueva escena**: Añadir clave con el ID de la escena
3. **Modificar mensaje existente**: Cambiar el valor del mensaje
4. **Agregar mensajes dinámicos**: Usar `speak()` en eventos específicos

### 📝 Ejemplo de Agregar Mensaje
```javascript
// En el objeto messages, agregar:
'nueva-area': "Descripción de la nueva área del CONALEP Atizapán 1."
```

## 🎯 Resumen

**Total de mensajes**: 25+ mensajes predefinidos
**Categorías**: 
- 18 mensajes de áreas específicas
- 7 mensajes de sistema/ayuda
- 3+ mensajes dinámicos

**Ubicación principal**: `js/assistant.js` - Objeto `messages`
**Mensaje inicial**: `index.html` - Elemento `#assistant-message`

---

**Nota**: El asistente virtual se llama "Coni" según el mensaje inicial en el HTML, pero en el código JavaScript se refiere como "guía virtual del CONALEP Atizapán 1". 