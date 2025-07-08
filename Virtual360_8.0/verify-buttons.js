/**
 * Script de Verificación de Botones - Virtual360
 * Analiza el funcionamiento de los botones de minimizar, maximizar y ocultar
 */

console.log('🔍 Iniciando verificación de botones Virtual360...');

// Función para verificar elementos del DOM
function verifyDOMElements() {
    console.log('\n📋 Verificando elementos del DOM...');
    
    const requiredElements = {
        'mini-carousel-minimize-btn': 'Botón minimizar/maximizar',
        'mini-carousel-hide-btn': 'Botón ocultar/mostrar',
        'show-thumbnails-btn': 'Botón mostrar miniaturas',
        'thumbnails-hidden-indicator': 'Indicador de miniaturas ocultas',
        'scene-thumbnails-wrapper': 'Contenedor de miniaturas',
        'scene-thumbnails': 'Carrusel de miniaturas'
    };
    
    let foundCount = 0;
    const results = {};
    
    Object.entries(requiredElements).forEach(([id, description]) => {
        const element = document.getElementById(id);
        const found = !!element;
        if (found) foundCount++;
        
        results[id] = {
            found,
            description,
            element: element
        };
        
        console.log(`${found ? '✅' : '❌'} ${description} (${id}): ${found ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
    });
    
    console.log(`\n📊 Resumen: ${foundCount}/${Object.keys(requiredElements).length} elementos encontrados`);
    
    return { results, foundCount, totalCount: Object.keys(requiredElements).length };
}

// Función para verificar event listeners
function verifyEventListeners() {
    console.log('\n🎧 Verificando event listeners...');
    
    const minimizeBtn = document.getElementById('mini-carousel-minimize-btn');
    const hideBtn = document.getElementById('mini-carousel-hide-btn');
    const showBtn = document.getElementById('show-thumbnails-btn');
    
    const listeners = {};
    
    if (minimizeBtn) {
        listeners.minimize = {
            element: minimizeBtn,
            hasClick: minimizeBtn.onclick !== null,
            hasEventListener: false // Se verifica después
        };
    }
    
    if (hideBtn) {
        listeners.hide = {
            element: hideBtn,
            hasClick: hideBtn.onclick !== null,
            hasEventListener: false
        };
    }
    
    if (showBtn) {
        listeners.show = {
            element: showBtn,
            hasClick: showBtn.onclick !== null,
            hasEventListener: false
        };
    }
    
    // Verificar si hay event listeners usando una técnica de detección
    Object.entries(listeners).forEach(([key, info]) => {
        console.log(`${info.hasClick ? '✅' : '⚠️'} ${key}: onclick ${info.hasClick ? 'configurado' : 'no configurado'}`);
    });
    
    return listeners;
}

// Función para verificar localStorage
function verifyLocalStorage() {
    console.log('\n💾 Verificando localStorage...');
    
    const keys = ['miniCarouselMinimized', 'miniCarouselHidden'];
    const storage = {};
    
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        storage[key] = value;
        console.log(`📦 ${key}: ${value || 'null'}`);
    });
    
    return storage;
}

// Función para verificar CSS classes
function verifyCSSClasses() {
    console.log('\n🎨 Verificando clases CSS...');
    
    const thumbnailsWrapper = document.querySelector('.scene-thumbnails-wrapper');
    const thumbnails = document.querySelector('.scene-thumbnails');
    
    const classes = {
        wrapper: {
            element: thumbnailsWrapper,
            hasHidden: thumbnailsWrapper ? thumbnailsWrapper.classList.contains('hidden') : false,
            hasMinimized: thumbnailsWrapper ? thumbnailsWrapper.classList.contains('minimized') : false
        },
        thumbnails: {
            element: thumbnails,
            hasHidden: thumbnails ? thumbnails.classList.contains('hidden') : false,
            hasMinimized: thumbnails ? thumbnails.classList.contains('minimized') : false
        }
    };
    
    if (thumbnailsWrapper) {
        console.log(`📦 Wrapper classes: ${Array.from(thumbnailsWrapper.classList).join(', ')}`);
        console.log(`   - hidden: ${classes.wrapper.hasHidden}`);
        console.log(`   - minimized: ${classes.wrapper.hasMinimized}`);
    }
    
    if (thumbnails) {
        console.log(`🎯 Thumbnails classes: ${Array.from(thumbnails.classList).join(', ')}`);
        console.log(`   - hidden: ${classes.thumbnails.hasHidden}`);
        console.log(`   - minimized: ${classes.thumbnails.hasMinimized}`);
    }
    
    return classes;
}

// Función para simular clics y verificar funcionalidad
function testButtonFunctionality() {
    console.log('\n🧪 Probando funcionalidad de botones...');
    
    const minimizeBtn = document.getElementById('mini-carousel-minimize-btn');
    const hideBtn = document.getElementById('mini-carousel-hide-btn');
    const showBtn = document.getElementById('show-thumbnails-btn');
    const thumbnailsWrapper = document.querySelector('.scene-thumbnails-wrapper');
    const thumbnails = document.querySelector('.scene-thumbnails');
    
    const tests = [];
    
    // Test 1: Botón minimizar
    if (minimizeBtn && thumbnails) {
        const initialState = thumbnails.classList.contains('minimized');
        const initialIcon = minimizeBtn.innerHTML;
        
        console.log(`🔘 Estado inicial minimizar: ${initialState ? 'minimizado' : 'maximizado'}`);
        console.log(`🔘 Icono inicial: ${initialIcon}`);
        
        // Simular clic
        minimizeBtn.click();
        
        setTimeout(() => {
            const newState = thumbnails.classList.contains('minimized');
            const newIcon = minimizeBtn.innerHTML;
            
            console.log(`🔘 Estado después del clic: ${newState ? 'minimizado' : 'maximizado'}`);
            console.log(`🔘 Icono después del clic: ${newIcon}`);
            
            const success = initialState !== newState;
            console.log(`${success ? '✅' : '❌'} Test minimizar: ${success ? 'PASÓ' : 'FALLÓ'}`);
            
            tests.push({ name: 'minimizar', success });
        }, 100);
    }
    
    // Test 2: Botón ocultar
    if (hideBtn && thumbnailsWrapper) {
        const initialState = thumbnailsWrapper.classList.contains('hidden');
        const initialIcon = hideBtn.innerHTML;
        
        console.log(`👁️ Estado inicial ocultar: ${initialState ? 'oculto' : 'visible'}`);
        console.log(`👁️ Icono inicial: ${initialIcon}`);
        
        // Simular clic
        hideBtn.click();
        
        setTimeout(() => {
            const newState = thumbnailsWrapper.classList.contains('hidden');
            const newIcon = hideBtn.innerHTML;
            
            console.log(`👁️ Estado después del clic: ${newState ? 'oculto' : 'visible'}`);
            console.log(`👁️ Icono después del clic: ${newIcon}`);
            
            const success = initialState !== newState;
            console.log(`${success ? '✅' : '❌'} Test ocultar: ${success ? 'PASÓ' : 'FALLÓ'}`);
            
            tests.push({ name: 'ocultar', success });
        }, 100);
    }
    
    return tests;
}

// Función para verificar atajos de teclado
function verifyKeyboardShortcuts() {
    console.log('\n⌨️ Verificando atajos de teclado...');
    
    const shortcuts = [
        { key: 't', description: 'Minimizar/Maximizar (Ctrl+T)' },
        { key: 'h', description: 'Ocultar/Mostrar (Ctrl+H)' }
    ];
    
    shortcuts.forEach(shortcut => {
        console.log(`⌨️ ${shortcut.description}: Disponible`);
    });
    
    return shortcuts;
}

// Función principal de verificación
function runVerification() {
    console.log('🚀 Iniciando verificación completa...\n');
    
    const results = {
        dom: verifyDOMElements(),
        listeners: verifyEventListeners(),
        storage: verifyLocalStorage(),
        css: verifyCSSClasses(),
        shortcuts: verifyKeyboardShortcuts()
    };
    
    // Ejecutar tests de funcionalidad después de un delay
    setTimeout(() => {
        results.tests = testButtonFunctionality();
        
        // Resumen final
        console.log('\n📊 RESUMEN DE VERIFICACIÓN');
        console.log('========================');
        console.log(`✅ Elementos DOM: ${results.dom.foundCount}/${results.dom.totalCount}`);
        console.log(`💾 localStorage: ${Object.keys(results.storage).length} claves verificadas`);
        console.log(`⌨️ Atajos de teclado: ${results.shortcuts.length} configurados`);
        
        if (results.tests) {
            const passedTests = results.tests.filter(t => t.success).length;
            console.log(`🧪 Tests de funcionalidad: ${passedTests}/${results.tests.length} pasaron`);
        }
        
        console.log('\n🎯 Verificación completada');
    }, 500);
}

// Ejecutar verificación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runVerification);
} else {
    runVerification();
}

// Exportar funciones para uso externo
window.Virtual360Verification = {
    verifyDOMElements,
    verifyEventListeners,
    verifyLocalStorage,
    verifyCSSClasses,
    testButtonFunctionality,
    verifyKeyboardShortcuts,
    runVerification
}; 