const router = require('express').Router();
const orederController = require('../controllers/order.controller');
// Routes pour les commandes
router.post('/create', orederController.createOrder);
router.put('/update/:id', orederController.updateOrder);
router.get('/info/:id', orederController.getOrderInfo);
router.delete('/delete/:id', orederController.deleteOrder);
router.get('/all', orederController.getAllOrders);

module.exports = router;
