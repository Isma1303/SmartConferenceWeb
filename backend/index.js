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

// Servir el archivo productos.html en la ruta inicial
// app.get('/', (req, res) => {

//   res.render(path.join(__dirname, '../frontend/public/src/templates/index.ejs'));
// });
// Rutas
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});