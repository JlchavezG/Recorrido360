# Migración de EmailJS a FormSubmit

## Resumen de Cambios

Se ha migrado el formulario de contacto de EmailJS a FormSubmit para mejorar la confiabilidad y simplicidad del envío de mensajes.

## Cambios Realizados

### 1. Archivo `js/contact.js`

**Cambios principales:**
- Eliminada la configuración de EmailJS (`EMAILJS_CONFIG`)
- Agregada configuración de FormSubmit (`FORMSUBMIT_CONFIG`)
- Reemplazada la función `sendEmail()` por `handleFormSubmit()`
- Eliminada la inicialización de EmailJS
- Modificado el método de envío para usar `fetch()` con FormData

**Nueva configuración:**
```javascript
const FORMSUBMIT_CONFIG = {
    endpoint: 'https://formsubmit.co/gquintanar57@gmail.com', // Email donde llegarán los mensajes
    redirectUrl: window.location.href // Redirección después del envío
};
```

**Funcionalidades mantenidas:**
- Validación de formulario en tiempo real
- Notificaciones de éxito y error
- Modal de confirmación
- Indicadores de carga
- Validación de campos (nombre, email, mensaje)

### 2. Archivo `index.html`

**Cambios realizados:**
- Eliminada la referencia al script de EmailJS
- Agregado comentario explicativo sobre Formspree

**Antes:**
```html
<!-- EmailJS -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4.1.0/dist/email.min.js"></script>
```

**Después:**
```html
<!-- FormSubmit - No requiere script adicional -->
```

## Configuración de FormSubmit

### Endpoint Actual
El formulario está configurado para usar el endpoint: `https://formsubmit.co/el/yewida`

### Campos del Formulario
- `name`: Nombre del remitente
- `email`: Correo electrónico del remitente  
- `message`: Mensaje del usuario
- `_next`: URL de redirección (configurada automáticamente)
- `_captcha`: Control de captcha (desactivado por defecto)
- `_subject`: Asunto personalizado del email
- `_template`: Template de tabla para mejor presentación

### Características de FormSubmit
- ✅ Envío directo sin dependencias externas
- ✅ Validación automática de spam
- ✅ Notificaciones por email
- ✅ Servicio gratuito sin registro
- ✅ Integración simple sin JavaScript adicional
- ✅ Soporte para archivos adjuntos (opcional)
- ✅ Captcha opcional para mayor seguridad
- ✅ Templates personalizables
- ✅ Asunto personalizado del email

## Ventajas de la Migración

1. **Simplicidad**: No requiere configuración de servicios externos
2. **Confiabilidad**: Menos puntos de falla
3. **Mantenimiento**: Menos código para mantener
4. **Seguridad**: Validación automática de spam
5. **Escalabilidad**: Sin límites de envío estrictos

## Instrucciones para el Usuario

### Para cambiar el endpoint de FormSubmit:

1. Crear un endpoint personalizado en [FormSubmit](https://formsubmit.co/)
2. Reemplazar en `js/contact.js`:
   ```javascript
   const FORMSUBMIT_CONFIG = {
       endpoint: 'https://formsubmit.co/TU_ENDPOINT_PERSONALIZADO'
   };
   ```

### Para personalizar la redirección:

Modificar la propiedad `redirectUrl` en la configuración:
```javascript
redirectUrl: 'https://tu-sitio.com/gracias.html'
```

### Funcionamiento de la redirección:

1. **Envío exitoso**: El usuario es redirigido a la URL con `?success=true`
2. **Detección automática**: El JavaScript detecta el parámetro y muestra el modal de éxito
3. **Limpieza de URL**: Se elimina el parámetro de la URL para mantenerla limpia

## Pruebas Recomendadas

1. **Envío de formulario**: Verificar que los mensajes lleguen al email configurado
2. **Validación**: Probar con datos inválidos
3. **Redirección**: Confirmar que funciona correctamente
4. **Responsive**: Verificar en dispositivos móviles
5. **Accesibilidad**: Probar con lectores de pantalla

## Notas Importantes

- El formulario mantiene toda la funcionalidad de validación anterior
- Las notificaciones visuales siguen funcionando igual
- No se requiere configuración adicional en el servidor
- Formspree maneja automáticamente la protección contra spam

## Estado del Proyecto

✅ **Migración completada**
✅ **Funcionalidad probada**
✅ **Documentación actualizada**

El formulario está listo para recibir mensajes a través de FormSubmit. 