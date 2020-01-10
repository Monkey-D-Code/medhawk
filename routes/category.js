const express = require('express');
const router = express.Router();

// importing middleware
const {authPage}  = require('../middlewares/auth');

// importing validators
const {create} = require('../validators/category');

// importing controller
const categoryController = require('../controllers/category');

router.get('/' , categoryController.allCategoriesPage);

router.get('/create',authPage,categoryController.createCategoryPage);
router.post('/create',authPage,create,categoryController.createCategory);

router.get('/:id/details',categoryController.categoryDetailsPage);

router.get('/:id/update',authPage,categoryController.categoryUpdatePage);
router.post('/:id/update',authPage,create,categoryController.categoryUpdate);

router.get('/:id/delete',authPage,categoryController.categoryDeletePage);
router.post('/:id/delete',authPage,categoryController.categoryDelete);

module.exports = router;