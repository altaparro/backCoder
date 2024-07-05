const express = require('express');
const router = express.Router();
const path = require('path');
const products = require(path.join(__dirname, '../../productos.json'));

router.get('/', (req, res) => {
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
