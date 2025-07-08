# 🚨 SOLUCIÓN INMEDIATA - Error 412 EmailJS

## ⚠️ Problema Identificado

El error 412 persiste porque la plantilla de EmailJS no está configurada correctamente. Este error significa que los parámetros enviados no coinciden con las variables esperadas por la plantilla.

## 🔧 SOLUCIÓN PASO A PASO

### Paso 1: Acceder a EmailJS Dashboard
1. Ve a [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Inicia sesión con tu cuenta
3. Ve a **Email Templates**

### Paso 2: Encontrar la Plantilla
1. Busca la plantilla con ID: `template_d91p9sf`
2. Haz clic en **Edit** (Editar)

### Paso 3: Reemplazar la Plantilla
1. **ELIMINA TODO** el contenido actual de la plantilla
2. **COPIA Y PEGA** el siguiente código HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Mensaje - CONALEP Virtual 360°</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .field {
            margin: 20px 0;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            word-wrap: break-word;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
        }
        .logo {
            font-size: 24px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🏫</div>
        <h1>Nuevo Mensaje del Recorrido Virtual</h1>
        <p>CONALEP Atizapán 1</p>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="label">👤 Nombre del Remitente:</div>
            <div class="value">{{from_name}}</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email del Remitente:</div>
            <div class="value">{{from_email}}</div>
        </div>
        
        <div class="field">
            <div class="label">💬 Mensaje:</div>
            <div class="value">{{message}}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Este mensaje fue enviado desde el recorrido virtual 360° de CONALEP Atizapán 1</p>
        <p>📍 Av. Adolfo López Mateos 207, San Juan Atlamica, 52948 Cd López Mateos, Méx.</p>
        <p>📞 55 5864 7000 | 📧 quintanargwork@gmail.com</p>
    </div>
</body>
</html>
```

### Paso 4: Configurar Variables de la Plantilla
En la sección **Template Variables**, asegúrate de que estén definidas:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{from_name}}` | Nombre del remitente | Juan Pérez |
| `{{from_email}}` | Email del remitente | juan@email.com |
| `{{message}}` | Mensaje del usuario | Hola, me gustaría... |

### Paso 5: Configurar Destinatario
En la configuración de la plantilla:
- **To Email**: `gquintanar57@gmail.com`
- **From Name**: `CONALEP Virtual 360°`
- **Reply To**: `{{from_email}}`

### Paso 6: Guardar y Publicar
1. Haz clic en **Save** (Guardar)
2. Haz clic en **Publish** (Publicar)
3. Confirma que la plantilla esté **Published** (Publicada)

## 🧪 VERIFICACIÓN

### Opción 1: Usar el Diagnóstico
1. Abre `diagnostico-emailjs.html` en un servidor local
2. Ejecuta "Diagnóstico Completo"
3. Deberías ver: ✅ Servicio activo

### Opción 2: Probar el Formulario
1. Abre `test-contact-form.html` en un servidor local
2. Llena el formulario con datos de prueba
3. Envía el mensaje
4. Deberías ver: ✅ Email enviado exitosamente: 200

## 🔍 VARIABLES CRÍTICAS

**IMPORTANTE**: El código ahora envía SOLO estas 3 variables:
- `from_name` - Nombre del usuario
- `from_email` - Email del usuario  
- `message` - Mensaje del usuario

**NO** uses variables adicionales como:
- `user_name`, `user_email`, `user_message`
- `to_name`, `reply_to`, `subject`
- `time`, `date`, etc.

## 🚨 SI EL ERROR PERSISTE

### Verificar Configuración:
- ✅ Service ID: `service_qqop09l`
- ✅ Template ID: `template_d91p9sf`
- ✅ User ID: `k6J2rX8JkOD0DrIG5`

### Verificar Estado:
- ✅ Servicio activo en EmailJS
- ✅ Plantilla publicada
- ✅ Cuenta activa

### Contactar Soporte:
Si el problema persiste después de seguir estos pasos:
1. Contacta soporte de EmailJS
2. Proporciona los IDs de configuración
3. Menciona el error 412 específico

## ✅ RESULTADO ESPERADO

Después de aplicar esta solución:
- ✅ Error 412 eliminado
- ✅ Emails enviados correctamente
- ✅ Plantilla con diseño profesional
- ✅ Variables funcionando correctamente

## 📞 CONFIGURACIÓN FINAL

El código JavaScript ahora:
- ✅ Usa solo parámetros mínimos
- ✅ Maneja errores específicos
- ✅ Proporciona mensajes claros
- ✅ Es compatible con la nueva plantilla

**¡El error 412 debería estar completamente resuelto!** 