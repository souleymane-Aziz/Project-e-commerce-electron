const router = require('express').Router();

const categoryController = require('../controllers/category.controller');

router.post('/create', categoryController.createCategory);
router.put('/update/:id', categoryController.updateCategory);
router.get('/info/:id', categoryController.getCategoryInfo);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/all', categoryController.getAllCategories);


module.exports = router;
