const router = require('express').Router();

const employeController = require('../controllers/employe.controller')

router.post('/signup', employeController.createEmploye);







module.exports = router;