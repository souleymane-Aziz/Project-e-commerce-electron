const router = require('express').Router();

const SaisieOperationController = require('../controllers/saisieoperation.controller');

router.post('/create', SaisieOperationController.createOperation);
router.put('/update/:id', SaisieOperationController.updateOperation);
router.get('/all', SaisieOperationController.getAllOperation);

module.exports = router;