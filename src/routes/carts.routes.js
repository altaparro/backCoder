const cartsRouter = require("express").Router()
const cartsController = require("../controllers/carts.controllers")

cartsRouter.post("/carts/crearCarrito", cartsController.crearCarrito)

cartsRouter.get("/carts/obtenerCarritoPorId/:id", cartsController.obtenerCarritoPorId)

cartsRouter.post("/carts/agregarProducto/:cid/product/:pid", cartsController.agregarProducto)

module.exports = cartsRouter