const productoRouter = require("express").Router()
const productosController = require("../controllers/products.controllers")

productoRouter.get("/products/obtenerTodosLosProductos", productosController.obtenerTodosLosProductos)

productoRouter.get("/products/obtenerProductoPorId/:id", productosController.obtenerProductoPorId)

productoRouter.post("/products/crearProducto", productosController.crearProducto)

productoRouter.put("/products/actualizarProducto/:id", productosController.actualizarProducto)

productoRouter.delete("/products/eliminarProducto/:id", productosController.eliminarProducto)

module.exports = productoRouter