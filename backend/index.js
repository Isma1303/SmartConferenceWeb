// Importaciones
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes');
const connectionDB = require('./db/db');

// Inicializar Db
connectionDB();


// Puerto
const port = 3000;

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rutas
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});