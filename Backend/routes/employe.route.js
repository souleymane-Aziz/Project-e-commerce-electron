const router = require('express').Router();

const employeController = require('../controllers/employe.controller')

router.post('/signup', employeController.createEmploye);
router.put("/update/:id", employeController.upload.single("image"), employeController.updateEmploye);
router.get('/allemployes', employeController.getAllEmploye);






module.exports = router;