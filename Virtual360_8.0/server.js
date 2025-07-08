const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para contar visitas
app.get('/api/visits', (req, res) => {
    const visitsPath = path.join(__dirname, 'visits.json');
    
    // Crear archivo si no existe
    if (!fs.existsSync(visitsPath)) {
        fs.writeFileSync(visitsPath, JSON.stringify({ count: 0 }));
    }
    
    fs.readFile(visitsPath, (err, data) => {
        if (err) {
            console.error('Error leyendo visitas:', err);
            return res.status(500).json({ error: 'Error leyendo visitas' });
        }
        
        let visits = JSON.parse(data);
        visits.count += 1;
        
        fs.writeFile(visitsPath, JSON.stringify(visits), (writeErr) => {
            if (writeErr) {
                console.error('Error escribiendo visitas:', writeErr);
                return res.status(500).json({ error: 'Error guardando visitas' });
            }
            res.json({ count: visits.count });
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});