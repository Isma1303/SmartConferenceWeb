// Importaciones
const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes/routes.js')
const auth = require('./routes/auth.routes.js')
const connectionDB = require('./db/db.js')

// Inicializar Db
connectionDB()


// Puerto
const port = 3000;

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.static(path.join(__dirname, '../frontend/public/src')));



// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/public/src/templates'));




// Rutas
app.use('/', routes);
app.use('/login', auth);

//Servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});