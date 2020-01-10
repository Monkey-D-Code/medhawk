const express = require('express');
const router = express.Router();
const chalk = require('chalk');

// importing controllers
const serviceController = require('../controllers/service');
const messageController = require('../controllers/message');


// importing models
const Department = require('../models').department;
const Doctor = require('../models').doctor;
const Post = require('../models').post;

router.get('/',(req,res,next)=>{
    
    Promise.all([
        Department.findAll(),
        Doctor.findAll(),
        Post.findAll({limit:4})
    ])
    .then(([departments,doctors,posts])=>{
        res.render('index',{
            title:'Welcome to Medhawk',
            activeHome : true,
            heading : 'Medhawk EMS',
            tagline : 'Saving lives is our motto',
            short_bio : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Consultancy for medical and para medical jobs; Ambulance services and many more',
            why_choose_us : 'We are the one and only, who will assist you for multiple services under one roof. Guided by a group of medicos peoples’ need is easily understood and multiple customizable essential services provided up to the mark',
            departments,
            doctors,
            posts,
        });

    })
    .catch(err=>{
        console.log(err);
        res.render('index',{
            title:'Welcome to Medhawk',
            activeHome : true,
            heading : 'Medhawk EMS',
            tagline : 'Saving lives is our motto',
            short_bio : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Consultancy for medical and para medical jobs; Ambulance services and many more',
            why_choose_us : 'We are the one and only, who will assist you for multiple services under one roof. Guided by a group of medicos peoples’ need is easily understood and multiple customizable essential services provided up to the mark',
            err,
        });
    })
    
})
router.get('/about',(req,res,next)=>{
    Promise.all([
        Department.findAll(),
        Doctor.findAll(),
    ])
    .then(([departments,doctors])=>{
        res.render('about',{
            title:'About Us | Medhawk',
            activeAbout : true,
            isAuthenticated : req.session.isAuthenticated,
            departments,
            doctors,
        });
    })
    .catch(err=>{
        console.log(chalk.red(err));
        res.render('about',{
            title:'About Us | Medhawk',
            activeAbout : true,
            isAuthenticated : req.session.isAuthenticated,
            err,
        });
    })
    
})


router.get('/contact',(req,res,next)=>{
    res.render('contact',{
        title:'Contact Us | Medhawk',
        activeContact : true,
        isAuthenticated : req.session.isAuthenticated,
    });
})

router.post('/contact',messageController.sendMessage);
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