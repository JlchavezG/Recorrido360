# Guía para Corregir Plantilla EmailJS - Error 412

## 🔍 Diagnóstico del Error 412

El error 412 (Precondition Failed) indica que la plantilla de EmailJS no está configurada correctamente o que los parámetros enviados no coinciden con las variables esperadas.

## 📋 Pasos para Corregir la Plantilla

### 1. Acceder a EmailJS Dashboard

1. Ve a [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Inicia sesión con tu cuenta
3. Ve a la sección "Email Templates"

### 2. Verificar la Plantilla Actual

Busca la plantilla con ID: `template_d91p9sf`

### 3. Configurar la Plantilla Correctamente

#### Opción A: Plantilla Simple (Recomendada)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Mensaje del Recorrido Virtual</title>
</head>
<body>
    <h2>Nuevo Mensaje del Recorrido Virtual CONALEP</h2>
    
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{{message}}</p>
    
    <hr>
    <p><small>Enviado desde el recorrido virtual 360° de CONALEP Atizapán 1</small></p>
</body>
</html>
```

#### Opción B: Plantilla Avanzada

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Mensaje - CONALEP Virtual 360°</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f9fa; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #333; }
        .value { background: white; padding: 10px; border-radius: 5px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Nuevo Mensaje del Recorrido Virtual</h1>
            <p>CONALEP Atizapán 1</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Nombre:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Mensaje:</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Este mensaje fue enviado desde el recorrido virtual 360° de CONALEP Atizapán 1</p>
            <p>Fecha: {{time}}</p>
        </div>
    </div>
</body>
</html>
```

### 4. Configurar Variables de la Plantilla

En la configuración de la plantilla, asegúrate de que estén definidas estas variables:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{from_name}}` | Nombre del remitente | Juan Pérez |
| `{{from_email}}` | Email del remitente | juan@email.com |
| `{{message}}` | Mensaje del usuario | Hola, me gustaría... |
| `{{time}}` | Fecha y hora (opcional) | 15 de enero de 2025, 14:30 |

### 5. Configurar Destinatario

En la configuración de la plantilla:
- **To Email**: `gquintanar57@gmail.com`
- **From Name**: `CONALEP Virtual 360°`
- **Reply To**: `{{from_email}}`

## 🔧 Verificación de la Configuración

### 1. Verificar Service ID
- Service ID: `service_qqop09l`
- Asegúrate de que el servicio esté activo

### 2. Verificar Template ID
- Template ID: `template_d91p9sf`
- Confirma que la plantilla esté publicada

### 3. Verificar User ID
- User ID: `k6J2rX8JkOD0DrIG5`
- Confirma que la cuenta esté activa

## 🧪 Pruebas de Verificación

### 1. Usar el Archivo de Prueba
Abre `test-contact-form.html` y verifica:

```
✅ EmailJS disponible
✅ Configuración encontrada
✅ Formulario de contacto encontrado
```

### 2. Enviar Email de Prueba
Usa datos de prueba:
- Nombre: `Prueba Automática`
- Email: `test@conalep.edu.mx`
- Mensaje: `Este es un mensaje de prueba para verificar el funcionamiento del sistema.`

### 3. Verificar Respuesta
Deberías ver:
```
✅ Email enviado exitosamente: 200
```

## 🚨 Soluciones para Error 412

### Si el error persiste:

1. **Verificar Variables de Plantilla**
   - Asegúrate de que las variables en la plantilla coincidan exactamente con los parámetros enviados
   - No uses espacios ni caracteres especiales en los nombres de variables

2. **Simplificar la Plantilla**
   - Usa solo las variables básicas: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Elimina variables no utilizadas

3. **Verificar Configuración del Servicio**
   - Asegúrate de que el servicio de email esté configurado correctamente
   - Verifica que no haya restricciones de dominio

4. **Probar con Plantilla de EmailJS**
   - Usa una plantilla básica proporcionada por EmailJS
   - Modifica gradualmente hasta obtener la funcionalidad deseada

## 📞 Contacto para Soporte

Si el problema persiste después de seguir esta guía:

1. **Verificar Logs**: Revisa la consola del navegador para mensajes de error específicos
2. **Contactar EmailJS**: Usa el soporte oficial de EmailJS
3. **Verificar Límites**: Confirma que no hayas excedido los límites del plan gratuito

## ✅ Checklist de Verificación

- [ ] Plantilla configurada con variables correctas
- [ ] Service ID verificado y activo
- [ ] Template ID verificado y publicado
- [ ] User ID verificado y activo
- [ ] Variables de plantilla coinciden con parámetros enviados
- [ ] Prueba de envío exitosa
- [ ] Email recibido correctamente

## 🔄 Actualización del Código

El código actual implementa un sistema de fallback que:
1. Intenta primero con `sendForm`
2. Si falla, intenta con `send`
3. Proporciona mensajes de error específicos
4. Limpia automáticamente los campos adicionales

Esto debería resolver el error 412 y proporcionar una experiencia de usuario más robusta. 