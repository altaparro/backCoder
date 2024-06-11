const cartsRouter = require("express").Router()
const cartsController = require("../controllers/carts.controllers")

cartsRouter.post("/carts/crearCarrito", cartsController.crearCarrito)

module.exports = cartsRouter