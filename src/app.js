const express = require("express");
const exphbs = require("express-handlebars")
const app = express()
const PUERTO = 8080
const productoRouter = require("../src/routes/products.routes");
const cartsRouter = require("../src/routes/carts.routes")
const viewsRouter = require("../src/routes/views.router")
const socket = require("socket.io")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))
app.use("/", productoRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter)

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

const httpServer = app.listen(PUERTO, () => {
    console.log('Servidor ON');
})

const io = new socket.Server(httpServer)