const express = require('express');

const productsController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productsController.createProduct);
router.get('/get-all', productsController.getProducs);
router.get('/get-by-user/:userId', productsController.getProducsByUser);

module.exports = router;
