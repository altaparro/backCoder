const fs = require('fs').promises;
const path = require('path');

async function obtenerTodosLosProductos(req, res) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'productos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    // Filtrar productos con cantidad mayor a 0
    const filteredProducts = products.filter(product => product.stock > 0);

    res.status(200).json({
      ok: true,
      status: 200,
      body: filteredProducts,
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

async function obtenerProductoPorId(req, res) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'productos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    // Obtener el ID del producto desde los parámetros de la ruta
    const productId = req.params.id;

    // Buscar el producto con el ID especificado
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
      res.status(200).json({
        ok: true,
        status: 200,
        body: product,
      });
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        error: `Producto con ID ${productId} no encontrado`,
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

module.exports = { obtenerTodosLosProductos, obtenerProductoPorId };
