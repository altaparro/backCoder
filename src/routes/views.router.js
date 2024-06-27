const express = require('express');
const router = express.Router();
const path = require('path');
const products = require(path.join(__dirname, '../../productos.json'));

router.get('/', (req, res) => {
    res.render('home', { products });
});

module.exports = router;
