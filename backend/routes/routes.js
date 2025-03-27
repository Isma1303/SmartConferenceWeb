// Importaciones
const express = require('express');
const router = express.Router()
const morgan = require('morgan')
const path = require('path')
// Middelwares
router.use(morgan('dev'))
router.use(express.json())
router.use(express.json());  // Asegura que el servidor pueda leer JSON


// Ruta Principal
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/public/src/templates/index.ejs'));
});

// Rutas
router.all('/login', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/public/src/templates/login.ejs'));
});

router.get('/404', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/public/src/templates/404.ejs'));
});

// Exportaciones
module.exports = router

