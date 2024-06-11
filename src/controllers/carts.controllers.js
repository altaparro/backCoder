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

  async function obtenerCarritoPorId(req, res) {
    try {
      const filePath = path.join(__dirname, '..', '..', 'carts.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const carts = JSON.parse(data);
      // Obtener el ID del carrito desde los parámetros de la ruta
      const cartId = req.params.id;
  
      // Buscar el carrito con el ID especificado
      const cart = carts.find(c => c.id === parseInt(cartId));
  
      if (cart) {
        res.status(200).json({
          ok: true,
          status: 200,
          body: cart,
        });
      } else {
        res.status(404).json({
          ok: false,
          status: 404,
          error: `Carrito con ID ${cartId} no encontrado`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        status: 500,
        error: error.message,
      });
    }
  }

  async function agregarProducto(req, res) {
    try {
      const filePath = path.join(__dirname, '..', '..', 'carts.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const carts = JSON.parse(data);
  
      // Buscar el carrito con el ID especificado
      const cartId = req.params.cid;
      const cart = carts.find(c => c.id === parseInt(cartId));
      const quantity = parseInt(req.body.quantity)
      //buscar producto
      const productId = req.params.pid
      const existeProducto = cart.products.find(p => p.product === productId)
      
      if (existeProducto) {
        existeProducto.quantity += quantity
      } else {
        cart.products.push({ product: productId, quantity})
      }

      // Escribir el array actualizado de carritos de vuelta al archivo
      await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
  
      // Devolver una respuesta con el nuevo carrito creado
      res.status(201).json({
        ok: true,
        status: 201
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
  

  module.exports = { crearCarrito, obtenerCarritoPorId, agregarProducto }