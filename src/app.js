const express = require("express");
const exphbs = require("express-handlebars")
const app = express()
const PUERTO = 8081
const PUERTO2 = 8082
const productoRouter = require("../src/routes/products.routes");
const cartsRouter = require("../src/routes/carts.routes")
const viewsRouter = require("../src/routes/views.router")
const socket = require("socket.io")
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ noServer: true });

const path = require('path');
const products = path.join(__dirname, '..', '..', 'productos.json');

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

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
    ws.send(JSON.stringify(products)); // Enviar lista inicial de productos
  
    ws.on('message', (message) => {
      const { action, product } = JSON.parse(message);
      if (action === 'add') {
        products.push(product);
      } else if (action === 'delete') {
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          products.splice(index, 1);
        }
      }
      // Notificar a todos los clientes
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(products));
        }
      });
    });
  });
  
  // Integrar WebSocket con el servidor HTTP de Express
  const server = app.listen(PUERTO2, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO2}`);
  });
  
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

// Endpoint para renderizar la vista realTimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
  });