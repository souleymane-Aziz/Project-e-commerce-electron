const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
//auth admin
router.post('/admin/signup', adminController.createAdmin);
router.post('/admin/login', adminController.signInAdmin);
router.get('/admin/logout', adminController.logoutAdmin);

//auth client
router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);
// Routes pour les utilisateurs

router.put('/update/:id', userController.updateUser);
router.get('/info/:id', userController.UserInfo)
router.delete('/delete/:id', userController.deleteUser);
router.get('/allusers', userController.getAllUsers)


module.exports = router;
