const upload = require('./middlewares/multer');
const express = require('express');
const router = express.Router();
const { verificarRol } = require('../middleware/auth');
const upload = require('../middleware/multerConfig'); // Importa la configuración de multer

// Ruta para que un empleado suba un nuevo producto (maneja un solo archivo de imagen llamado 'imagenProducto')
router.post('/productos', verificarRol('empleado'), upload.single('imagenProducto'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const nombreImagen = req.file ? req.file.filename : null; // Nombre del archivo subido

    // Aquí guardarías la información del producto en tu base de datos
    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      imagen: nombreImagen ? `/imagenes/${nombreImagen}` : null // Guarda la ruta relativa a la imagen
    }; res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: nuevoProducto });
} catch (error) {
  console.error('Error al crear el producto:', error);
  res.status(500).json({ mensaje: 'Error al crear el producto' });
}
});

module.exports = router;