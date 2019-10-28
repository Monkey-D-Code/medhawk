const express = require('express');
const router = express.Router();

// importing middlewares
const {authPage} = require('../middlewares/auth');

// importing controller
const brandController = require('../controllers/brand');

router.get('/create' , authPage , brandController.createBrandPage);
router.post('/create' , authPage , brandController.createBrand);

router.get('/:id/update' , authPage , brandController.brandUpdatePage);
router.post('/:id/update' , authPage , brandController.updateBrand);


module.exports = router;