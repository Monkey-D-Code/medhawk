const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    
    res.render('index',{
        title:'Welcome to Medhawk',
        activeHome : true,
        heading : 'Medhawk EMS',
        tagline : 'Saving lives is our motto',
        short_bio : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Consultancy for medical and para medical jobs; Ambulance services and many more',
        about : 'Emergency Medical services with assistance provided for doctor consultation provision for hiring nurses, physiotherapist, Aaya, Dietician etc. Learning Basic life saving skills, first aid skills, wound dressing skills etc Hiring or purchase of medical devices Provision for Lab tests , imaging etc. Consultancy for medical and para medical jobs Ambulance services and many more',

    });
})
router.get('/about',(req,res,next)=>{
    res.render('about',{
        title:'About Us | Medhawk',
        activeAbout : true,
    });
})
router.get('/departments',(req,res,next)=>{
    res.send('departments');
})
router.get('/doctors',(req,res,next)=>{
    res.send('doctors');
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


module.exports = router;