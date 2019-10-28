const express = require('express');
const router = express.Router();

// importing controller
const appointmentController = require('../controllers/appointment');

router.get('/',appointmentController.addAppointmentPage);
router.post('/',appointmentController.addAppointment);

module.exports = router;