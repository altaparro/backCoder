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

async function crearProducto(req, res) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'productos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    // Obtener los datos del nuevo producto del cuerpo de la solicitud
    const newProduct = req.body;

    // Validar que los datos del nuevo producto estén completos
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.category || typeof newProduct.stock !== 'number' || typeof newProduct.status !== 'boolean') {
      return res.status(400).json({
        ok: false,
        status: 400,
        error: 'Faltan datos del producto o los datos no son válidos',
      });
    }

    // Generar un nuevo id para el producto
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    newProduct.id = newId

    // Añadir el nuevo producto al array de productos
    products.push(newProduct);

    // Escribir el array actualizado de productos de vuelta al archivo
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    // Devolver una respuesta con el nuevo producto creado
    res.status(201).json({
      ok: true,
      status: 201,
      body: newProduct,
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

async function actualizarProducto(req, res) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'productos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    // Obtener el ID del producto desde los parámetros de la ruta
    const productId = parseInt(req.params.id, 10);

    // Buscar el producto con el ID especificado
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Producto no encontrado",
      });
    }

    // Actualizar los campos del producto
    const updateFields = req.body;
    products[productIndex] = { ...products[productIndex], ...updateFields };

    // Escribir el array actualizado de productos de vuelta al archivo
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Producto actualizado correctamente",
      body: products[productIndex],
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

async function eliminarProducto(req, res) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'productos.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    // Obtener el ID del producto desde los parámetros de la ruta
    const productId = parseInt(req.params.id, 10);

    // Buscar el índice del producto con el ID especificado
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Producto no encontrado",
      });
    }

    // Eliminar el producto del array
    const deletedProduct = products.splice(productIndex, 1);

    // Escribir el array actualizado de productos de vuelta al archivo
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Producto eliminado correctamente",
      body: deletedProduct[0],
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

module.exports = { obtenerTodosLosProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };
