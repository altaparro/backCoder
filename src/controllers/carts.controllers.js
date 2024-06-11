const fs = require('fs').promises;
const path = require('path');

async function crearCarrito(req, res) {
    try {
      const filePath = path.join(__dirname, '..', '..', 'carts.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const carts = JSON.parse(data);
  
      // Obtener los datos del nuevo carrito del cuerpo de la solicitud
      const newCart = req.body;
  
      // Validar que los datos del nuevo carrito estén completos
      if ( !newCart.products ) {
        return res.status(400).json({
          ok: false,
          status: 400,
          error: 'Faltan datos del carrito o los datos no son válidos',
        });
      }
  
      // Generar un nuevo id para el carrito.
      const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1
      newCart.id = newId
  
      // Añadir el nuevo carrito al array de carritos
      carts.push(newCart);
  
      // Escribir el array actualizado de carritos de vuelta al archivo
      await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
  
      // Devolver una respuesta con el nuevo carrito creado
      res.status(201).json({
        ok: true,
        status: 201,
        body: newCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        status: 500,
        error: error.message,
      });
    }
  }

  module.exports = { crearCarrito }