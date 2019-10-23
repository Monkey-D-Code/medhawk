const express = require('express');
const router = express.Router();


// importing controllers
const serviceController = require('../controllers/service');

router.get('/',(req,res,next)=>{
    
    res.render('index',{
        title:'Welcome to Medhawk',
        activeHome : true,
        heading : 'Medhawk EMS',
        tagline : 'Saving lives is our motto',
        short_bio : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Consultancy for medical and para medical jobs; Ambulance services and many more',
        why_choose_us : 'We are the one and only, who will assist you for multiple services under one roof. Guided by a group of medicos peoples’ need is easily understood and multiple customizable essential services provided up to the mark',
        isAuthenticated : req.session.isAuthenticated,
    });
})
router.get('/about',(req,res,next)=>{
    res.render('about',{
        title:'About Us | Medhawk',
        activeAbout : true,
        isAuthenticated : req.session.isAuthenticated,
    });
})
router.get('/departments',(req,res,next)=>{
    res.render('department' , {
        title:'Our Departments | Medhawk',
        activeDpt : true,
        isAuthenticated : req.session.isAuthenticated,
    });
})

router.get('/contact',(req,res,next)=>{
    res.render('contact',{
        title:'Contact Us | Medhawk',
        activeContact : true,
        isAuthenticated : req.session.isAuthenticated,
    });
})
router.get('/appointment',(req,res,next)=>{
    res.render('apointment' ,{
        title : 'Appointment | Medhawk',
        isAuthenticated : req.session.isAuthenticated,
    });
})
// service related routes
router.get('/services',serviceController.allServices);
router.get('/service/:id',serviceController.singleService);
router.get('/create-new-service',serviceController.createServicePage);
router.post('/create-new-service',serviceController.createService);
router.get('/service/:id/update',serviceController.updateServicePage);
router.post('/service/:id/update',serviceController.updateService);
router.get('/service/:id/delete',serviceController.destroyServicePage);
router.post('/service/:id/delete',serviceController.destroyService);


module.exports = router;