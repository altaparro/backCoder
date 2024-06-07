const productoRouter = require("express").Router()
const productosController = require("../controllers/products.controllers");

productoRouter.get("/products/obtenerTodosLosProductos", productosController.obtenerTodosLosProductos);

productoRouter.get("/products/obtenerProductoPorId/:id", productosController.obtenerProductoPorId);

module.exports = productoRouter