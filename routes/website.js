const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    
    res.render('index',{
        title:'Welcome to Medhawk',
        activeHome : true,
        heading : 'Medhawk EMS',
        tagline : 'Saving lives is our motto',
        short_bio : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Consultancy for medical and para medical jobs; Ambulance services and many more',
        why_choose_us : 'We are the one and only, who will assist you for multiple services under one roof. Guided by a group of medicos peoples’ need is easily understood and multiple customizable essential services provided up to the mark',

    });
})
router.get('/about',(req,res,next)=>{
    res.render('about',{
        title:'About Us | Medhawk',
        activeAbout : true,
    });
})
router.get('/departments',(req,res,next)=>{
    res.render('department' , {
        title:'Our Departments | Medhawk',
        activeDpt : true,
    });
})

router.get('/contact',(req,res,next)=>{
    res.render('contact',{
        title:'Contact Us | Medhawk',
        activeContact : true,
    });
})
router.get('/appointment',(req,res,next)=>{
    res.render('apointment' ,{
        title : 'Appointment | Medhawk'
    });
})
router.get('/services',(req,res,next)=>{
    res.render('services' ,{
        title : 'Our Services | Medhawk',
        activeServices : true,
    });
})


module.exports = router;