# Configuración de Google Maps API para Vista Exterior

## Requisitos

Para que la vista exterior funcione correctamente, necesitas configurar una API key de Google Maps.

## Pasos para obtener la API key:

### 1. Crear un proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - Maps JavaScript API
   - Street View Static API
   - Places API

### 2. Crear credenciales
1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Clave de API"
3. Copia la API key generada

### 3. Configurar la API key en el proyecto
1. Abre el archivo `index.html`
2. Busca la línea:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
   ```
3. Reemplaza `YOUR_API_KEY` con tu API key real:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places"></script>
   ```

### 4. Configurar restricciones (recomendado)
1. En Google Cloud Console, ve a "APIs y servicios" > "Credenciales"
2. Haz clic en tu API key
3. En "Restricciones de aplicación", selecciona "Sitios web"
4. Agrega los dominios donde se usará la API:
   - `localhost` (para desarrollo)
   - Tu dominio de producción

## Funcionalidades incluidas:

- **Street View**: Vista exterior del CONALEP Atizapán 1
- **Navegación**: Controles de zoom y rotación
- **Integración**: Se integra perfectamente con el recorrido virtual interno
- **Responsivo**: Funciona en dispositivos móviles y tablets

## Notas importantes:

- La API key es gratuita para uso básico (hasta 25,000 cargas por mes)
- Para uso en producción, considera configurar facturación
- Las coordenadas están configuradas para CONALEP Atizapán 1
- Si Street View no está disponible en la ubicación, se mostrará un mensaje informativo

## Solución de problemas:

### Error: "Google Maps API no está cargada"
- Verifica que la API key sea correcta
- Asegúrate de que las APIs estén habilitadas en Google Cloud Console

### Error: "Street View no disponible"
- Las coordenadas pueden no tener Street View disponible
- Considera usar coordenadas cercanas que sí tengan Street View

### Error de cuota excedida
- Verifica el uso en Google Cloud Console
- Considera habilitar facturación para mayor cuota 