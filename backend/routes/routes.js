// Importaciones
const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const auth = require('./auth.routes')



// Middelwares
router.use(morgan('dev'))
router.use(express.json())
router.use(express.json())

router.use('/auth', auth)

router.get('/', (req, res) => {
    res.render('index') 
  });
router.get('/404', (req, res) => {
    res.render( '404')
});

module.exports = router

