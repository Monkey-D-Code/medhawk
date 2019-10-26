const express = require('express');
const router = express.Router();

// importing middlewares
const {authPage} = require('../middlewares/auth');

// importing controllers
const doctorController = require('../controllers/doctor');

router.get('/create',authPage, doctorController.createDoctorPage);
router.post('/create',authPage,doctorController.createDoctor);

router.get('/:id/update',authPage,doctorController.updateDoctorPage);
router.post('/:id/update',authPage,doctorController.updateDoctor);

router.get('/:id/delete',authPage,doctorController.deleteDoctorPage);
router.post('/:id/delete',authPage,doctorController.deleteDoctor);


module.exports = router;