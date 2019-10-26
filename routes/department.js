const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

// importing middleware
const {authPage}  = require('../middlewares/auth');

// ?importing controller
const departmentController = require('../controllers/department');



router.get('/',departmentController.allDepartments);
router.get('/create',departmentController.createDepartmentPage);
router.post('/create',departmentController.createDepartment);
router.get('/:id/update',
                authPage,
                departmentController.updatePage
            )
router.post('/:id/update',authPage,departmentController.update);
router.get('/:id/delete',authPage , departmentController.deletePage);
router.post('/:id/delete',authPage,departmentController.delete);

module.exports = router;