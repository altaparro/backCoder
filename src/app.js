const express = require("express");
const app = express()
const PUERTO = 8080
const productoRouter = require("../src/routes/products.routes");
const cartsRouter = require("../src/routes/carts.routes")

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use("/api/v1", productoRouter);

app.use("/api/v1", cartsRouter);

app.listen(PUERTO, () => {
    console.log('Servidor ON');
})