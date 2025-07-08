# Cambios: Hotspots con Imagen Personalizada en Plaza Roja

## Descripción
Se modificaron los hotspots de la escena Plaza Roja para que los puntos de navegación hacia Edificio C y Arco Techo utilicen una imagen personalizada como ícono, en vez del punto verde estándar.

## Archivos Modificados
- `js/config.js`: Se agregaron las propiedades `image` y la clase `hotspot-img` a los hotspots correspondientes.
- `css/themes.css`: Se agregaron estilos para `.hotspot-img` y su imagen interna.

## Ejemplo de Configuración en `config.js`
```javascript
{
    pitch: 0,
    yaw: 60,
    type: 'scene',
    text: 'Ir al Edificio C',
    target: 'edificio-c',
    cssClass: 'hotspot-img',
    image: 'assets/img/hotspot-edificio-c.png'
},
{
    pitch: -5,
    yaw: -90,
    type: 'scene',
    text: 'Ir al Arco Techo',
    target: 'arco-techo',
    cssClass: 'hotspot-img',
    image: 'assets/img/hotspot-arco-techo.png'
},
```

## Ejemplo de CSS en `themes.css`
```css
.hotspot-img {
    background: none !important;
    border: none !important;
    width: 48px !important;
    height: 48px !important;
    box-shadow: none !important;
    cursor: pointer;
    position: relative;
}
.hotspot-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    transition: transform 0.2s;
}
.hotspot-img:hover img {
    transform: scale(1.15);
}
```

## Notas
- Cada hotspot puede tener su propia imagen, por ejemplo:
  - `hotspot-edificio-c.png` para Edificio C
  - `hotspot-arco-techo.png` para Arco Techo
- Las imágenes deben estar en la carpeta `assets/img/`.
- Si se requiere otro nombre de archivo, solo cámbialo en la propiedad `image` del hotspot.

---
**Desarrollado por:** Asistente Virtual 