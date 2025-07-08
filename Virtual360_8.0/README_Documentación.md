# Virtual360_7.0

Proyecto de recorrido virtual interactivo en 360° para instituciones educativas.

## Descripción
Virtual360_7.0 es una plataforma web que permite explorar espacios educativos mediante imágenes 360°, hotspots interactivos y formularios de contacto. El objetivo es ofrecer una experiencia inmersiva para visitantes, estudiantes y personal.

## Características principales
- Recorrido virtual con imágenes panorámicas 360°.
- Hotspots interactivos para navegación y visualización de información.
- Formulario de contacto integrado (soporte para EmailJS, Formspree y Formsubmit).
- Temas visuales personalizables (modo claro/oscuro).
- Miniaturas generadas dinámicamente.
- Soporte para integración con Google Maps.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Accede a la carpeta del proyecto:
   ```bash
   cd Virtual360_7.0/Virtual360_7.0
   ```
3. Instala las dependencias (si aplica):
   ```bash
   npm install
   ```
   > Nota: El proyecto es principalmente frontend, pero incluye un archivo `server.js` para pruebas locales.

## Uso
- Abre `index.html` en tu navegador para iniciar el recorrido virtual.
- Para pruebas de funcionalidades específicas, utiliza los archivos de testeo (por ejemplo, `test-contact-form.html`, `test-buttons.html`, etc.).
- Si deseas ejecutar un servidor local:
   ```bash
   node server.js
   ```
   Luego accede a `http://localhost:3000` (o el puerto configurado).

## Estructura del proyecto
```
Virtual360_7.0/
├── assets/           # Imágenes 360° y recursos gráficos
│   ├── 360/          # Panorámicas de los espacios
│   └── img/          # Imágenes generales y logos
├── css/              # Hojas de estilo
├── js/               # Scripts principales (lógica, configuración, temas, tour, contacto)
├── sounds/           # Audios y videos asociados
├── *.html            # Archivos HTML principales y de pruebas
├── *.md              # Documentación y guías de cambios
├── server.js         # Servidor local para pruebas
├── package.json      # Dependencias y scripts (si aplica)
└── logs/             # Logs de depuración
```

## Dependencias
- [Node.js](https://nodejs.org/) (solo para pruebas con `server.js`)
- [EmailJS](https://www.emailjs.com/) (opcional, para formularios)
- [Formspree](https://formspree.io/) / [Formsubmit](https://formsubmit.co/) (alternativas para formularios)
- [Google Maps API](https://developers.google.com/maps) (opcional, integración de mapas)

## Créditos y agradecimientos
- Equipo de desarrollo de Virtual360_7.0
- Recursos gráficos e imágenes proporcionados por la institución
- Bibliotecas y servicios de terceros mencionados en dependencias

## Contacto
Para dudas, sugerencias o soporte, contacta a:
- Correo: [tu-email@ejemplo.com]
- Sitio web: [URL de la institución o proyecto]

---

> Consulta los archivos `.md` incluidos para guías específicas de configuración, cambios y ejemplos de uso. 