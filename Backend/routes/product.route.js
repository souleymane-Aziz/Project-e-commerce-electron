const router = require('express').Router();

const productController = require('../controllers/product.controller');

// Routes pour les produits
router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/info/:id', productController.getProductInfo);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/all', productController.getAllProducts);

module.exports = router;