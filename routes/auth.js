const express = require('express');
const router = express.Router();

// importing controllers
const authController = require('../controllers/auth');


router.get('/login', authController.loginPage);
router.post('/login' , authController.login);
router.get('/profile',authController.profilePage);
router.get('/logout',authController.logout);



module.exports = router;