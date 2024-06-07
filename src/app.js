const express = require("express");
const app = express()
const PUERTO = 8080
const productoRouter = require("../src/routes/products.routes");

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use("/api/v1", productoRouter);

app.listen(PUERTO, () => {
    console.log('Servidor ON');
})