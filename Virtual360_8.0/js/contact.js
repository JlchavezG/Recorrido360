// Configuración de FormSubmit
const FORMSUBMIT_CONFIG = {
    endpoint: 'https://formsubmit.co/el/yewida', // Endpoint personalizado de FormSubmit para CONALEP
    activationEmail: 'yewida@gmail.com' // Email para activación
};

// Inicializar el formulario de contacto
async function initializeContactForm() {
    // Activar FormSubmit primero
    await activateFormSubmit();
    
    // Configurar el formulario
    const form = document.getElementById('contactForm');
    if (form) {
        // Configurar action y method para FormSubmit (aunque usaremos fetch)
        form.setAttribute('action', FORMSUBMIT_CONFIG.endpoint);
        form.setAttribute('method', 'POST');
        
        // Los campos ocultos se agregarán dinámicamente en el envío
        // para evitar conflictos con la validación
        
        // Remover el onsubmit del HTML para evitar conflictos
        form.removeAttribute('onsubmit');
        form.addEventListener('submit', handleFormSubmit);
        
        // No necesitamos verificar redirección ya que usamos fetch
        
        console.log('Formulario de contacto inicializado con FormSubmit');
    } else {
        console.error('No se encontró el formulario de contacto');
    }

    // Configurar validación en tiempo real
    setupFormValidation();
}

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault(); // Prevenir envío normal del formulario
    console.log('Iniciando envío de formulario...');

    // Validar el formulario antes de enviar
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    if (!validateForm(formData)) {
        return false;
    }

    // Mostrar indicador de carga
    const submitButton = e.target.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;

    // Configurar campos ocultos para FormSubmit
    const form = e.target;
    
    // Limpiar campos ocultos existentes
    form.querySelectorAll('input[name^="_"]').forEach(input => input.remove());
    
    // Agregar campos ocultos necesarios para FormSubmit
    const hiddenFields = {
        '_captcha': 'false',
        '_subject': 'Nuevo mensaje desde CONALEP Virtual 360°',
        '_template': 'table',
        '_next': window.location.href // Redirigir a la misma página
    };
    
    Object.entries(hiddenFields).forEach(([name, value]) => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = name;
        hiddenInput.value = value;
        form.appendChild(hiddenInput);
    });

    console.log('Enviando formulario con datos:', formData);
    console.log('Endpoint:', FORMSUBMIT_CONFIG.endpoint);

    // Enviar formulario usando el método tradicional de FormSubmit
    // Esto permite que FormSubmit procese correctamente los datos
    const formDataObj = new FormData(form);
    
    // Mostrar datos que se van a enviar para depuración
    console.log('Datos a enviar:');
    for (let [key, value] of formDataObj.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    fetch(FORMSUBMIT_CONFIG.endpoint, {
        method: 'POST',
        body: formDataObj
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        
        // Verificar diferentes códigos de respuesta exitosos
        if (response.ok || response.status === 200 || response.status === 302) {
            console.log('✅ Formulario enviado exitosamente');
            showSuccessModal();
            form.reset();
        } else {
            // Intentar leer el texto de la respuesta para más información
            return response.text().then(text => {
                console.log('Respuesta del servidor (texto):', text);
                throw new Error(`HTTP error! status: ${response.status} - ${text.substring(0, 100)}`);
            });
        }
    })
    .catch(error => {
        console.error('❌ Error al enviar formulario:', error);
        
        // Mostrar mensaje de error más específico
        let errorMessage = 'Error al enviar el mensaje. ';
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Verifica tu conexión a internet.';
        } else if (error.message.includes('429')) {
            errorMessage += 'Demasiados intentos. Espera un momento.';
        } else {
            errorMessage += 'Por favor, intenta de nuevo.';
        }
        
        showNotification(errorMessage, 'error');
    })
    .finally(() => {
        // Restaurar el botón
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });

    return false;
}

// Validar el formulario
function validateForm(formData) {
    // Validar nombre
    if (!formData.name || formData.name.trim().length < 2) {
        showNotification('Por favor, ingresa un nombre válido.', 'error');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return false;
    }
    
    // Validar mensaje
    if (!formData.message || formData.message.trim().length < 10) {
        showNotification('Por favor, ingresa un mensaje de al menos 10 caracteres.', 'error');
        return false;
    }
    
    return true;
}

// Configurar validación en tiempo real
function setupFormValidation() {
    const inputs = {
        name: {
            element: document.getElementById('name'),
            validate: (value) => value.trim().length >= 2
        },
        email: {
            element: document.getElementById('email'),
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: {
            element: document.getElementById('message'),
            validate: (value) => value.trim().length >= 10
        }
    };
    
    // Agregar validación a cada campo
    Object.entries(inputs).forEach(([field, { element, validate }]) => {
        if (element) {
            element.addEventListener('input', () => {
                const isValid = validate(element.value);
                updateFieldValidation(element, isValid);
            });
            
            element.addEventListener('blur', () => {
                const isValid = validate(element.value);
                updateFieldValidation(element, isValid, true);
            });
        }
    });
}

// Actualizar validación visual de un campo
function updateFieldValidation(element, isValid, showMessage = false) {
    // Actualizar clases CSS
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
    
    // Mostrar mensaje de error si es necesario
    if (showMessage && !isValid) {
        let message = '';
        switch (element.id) {
            case 'name':
                message = 'El nombre debe tener al menos 2 caracteres.';
                break;
            case 'email':
                message = 'Por favor, ingresa un email válido.';
                break;
            case 'message':
                message = 'El mensaje debe tener al menos 10 caracteres.';
                break;
        }
        showNotification(message, 'warning');
    }
}

// Mostrar modal de éxito
function showSuccessModal() {
    // Detectar si el tema oscuro está activo (mover al inicio)
    const isDarkTheme = document.body.classList.contains('dark-theme') || 
                       document.documentElement.classList.contains('dark-theme') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: ${isDarkTheme ? '#f7fafc' : '#333'}; margin-bottom: 1rem; font-size: 1.5rem;">¡Mensaje Enviado!</h3>
            <p style="color: ${isDarkTheme ? '#e2e8f0' : '#666'}; margin-bottom: 1.5rem; line-height: 1.6;">Gracias por contactarnos. Te responderemos pronto.</p>
            <button class="close-success-modal">Aceptar</button>
        </div>
    `;
    
    // Agregar estilos al modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = modal.querySelector('.success-modal-content');
    
    content.style.cssText = `
        background: ${isDarkTheme ? '#2d3748' : 'white'};
        color: ${isDarkTheme ? '#e2e8f0' : '#333'};
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: slideIn 0.3s ease;
        border: ${isDarkTheme ? '1px solid #4a5568' : 'none'};
        box-shadow: ${isDarkTheme ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.1)'};
    `;
    
    const icon = modal.querySelector('.success-icon');
    icon.style.cssText = `
        font-size: 3rem;
        color: ${isDarkTheme ? '#48bb78' : '#28a745'};
        margin-bottom: 1rem;
        filter: ${isDarkTheme ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'};
    `;
    
    const button = modal.querySelector('.close-success-modal');
    
    // Colores del botón adaptados al tema
    const buttonColors = {
        primary: isDarkTheme ? '#4299e1' : '#007bff',
        hover: isDarkTheme ? '#3182ce' : '#0056b3'
    };
    
    button.style.cssText = `
        background: ${buttonColors.primary};
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 1rem;
        transition: all 0.3s ease;
        font-weight: 600;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.background = buttonColors.hover;
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = buttonColors.primary;
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
    
    // Agregar animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Cerrar modal
    button.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Agregar modal al DOM
    document.body.appendChild(modal);
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Configurar estilos según el tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border: ${type === 'error' ? '2px solid #ff6b6b' : 'none'};
        font-weight: ${type === 'error' ? '600' : 'normal'};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
    `;
    
    // Agregar animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes errorPulse {
            0% { box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3); }
            50% { box-shadow: 0 4px 12px rgba(220, 53, 69, 0.6); }
            100% { box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3); }
        }
    `;
    document.head.appendChild(style);
    
    // Aplicar efecto de parpadeo para errores
    if (type === 'error') {
        notification.style.animation = 'slideInRight 0.3s ease, errorPulse 2s infinite';
    }
    
    // Cerrar notificación
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-cerrar después de un tiempo variable según el tipo
    const autoCloseTime = type === 'error' ? 25000 : 15000; // 25 segundos para errores, 15 para otros
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, autoCloseTime);
    
    // Agregar notificación al DOM
    document.body.appendChild(notification);
}

// Obtener icono para la notificación
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Inicializar cuando el DOM esté listo
function initializeContactWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeContactForm);
    } else {
        initializeContactForm();
    }
}

// Inicializar
initializeContactWhenReady();

// Función para activar FormSubmit si es necesario
async function activateFormSubmit() {
    try {
        console.log('Verificando activación de FormSubmit...');
        
        // Crear formulario de activación
        const activationForm = new FormData();
        activationForm.append('email', FORMSUBMIT_CONFIG.activationEmail);
        activationForm.append('_subject', 'Activación FormSubmit - CONALEP Virtual 360°');
        activationForm.append('_template', 'table');
        activationForm.append('_captcha', 'false');
        
        const response = await fetch(FORMSUBMIT_CONFIG.endpoint, {
            method: 'POST',
            body: activationForm
        });
        
        console.log('Respuesta de activación:', response);
        
        if (response.ok || response.status === 200) {
            console.log('✅ FormSubmit activado correctamente');
            return true;
        } else {
            console.log('⚠️ FormSubmit ya está activado o hay un problema');
            return true; // Continuar de todas formas
        }
    } catch (error) {
        console.error('Error en activación de FormSubmit:', error);
        return false;
    }
} 